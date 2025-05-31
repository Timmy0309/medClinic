import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchAvailableSlots,
  createAppointment,
  selectAvailableSlots,
  selectAppointmentsLoading,
  selectAppointmentsError,
} from '../../store/slices/appointmentsSlice';
import {
  fetchServiceById,
  selectSelectedService,
  selectServicesLoading,
} from '../../store/slices/servicesSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';

interface AppointmentFormProps {
  serviceId: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ serviceId }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const availableSlots = useAppSelector(selectAvailableSlots);
  const service = useAppSelector(selectSelectedService);
  const isLoadingService = useAppSelector(selectServicesLoading);
  const isLoadingAppointment = useAppSelector(selectAppointmentsLoading);
  const error = useAppSelector(selectAppointmentsError);
  
  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
    dispatch(fetchAvailableSlots(serviceId));
  }, [dispatch, serviceId]);
  
  // Группируем доступные слоты по датам
  const slotsByDate: Record<string, string[]> = {};
  availableSlots.forEach((slot) => {
    if (!slotsByDate[slot.date]) {
      slotsByDate[slot.date] = [];
    }
    slotsByDate[slot.date].push(slot.time);
  });
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // сбрасываем выбранное время при смене даты
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      return;
    }
    
    try {
      await dispatch(
        createAppointment({
          serviceId,
          date: selectedDate,
          time: selectedTime,
          notes: notes.trim() || undefined,
        })
      ).unwrap();
      
      dispatch(
        addNotification({
          type: 'success',
          message: 'Вы успешно записались на прием',
        })
      );
      
      navigate('/appointments');
    } catch (error) {
      // ошибка обрабатывается в slice
    }
  };
  
  if (isLoadingService || (!service && !error)) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!service) {
    return <Alert type="error" message="Услуга не найдена" />;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM (EEEE)', { locale: ru });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">Информация об услуге</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Услуга:</span> {service.name}
          </p>
          <p>
            <span className="font-medium">Длительность:</span> {service.duration} мин.
          </p>
          <p>
            <span className="font-medium">Стоимость:</span>{' '}
            {service.price.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary-600" />
          Выберите дату
        </h3>
        
        {Object.keys(slotsByDate).length === 0 ? (
          <p className="text-neutral-600">
            На ближайшее время нет доступных слотов для записи
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.keys(slotsByDate).map((date) => (
              <button
                key={date}
                type="button"
                className={`p-2 border rounded-md text-center ${
                  selectedDate === date
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 hover:border-primary-500'
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <span className="text-sm block">{formatDate(date)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {selectedDate && (
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary-600" />
            Выберите время
          </h3>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {slotsByDate[selectedDate].map((time) => (
              <button
                key={time}
                type="button"
                className={`p-2 border rounded-md text-center ${
                  selectedTime === time
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-neutral-300 hover:border-primary-500'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">Дополнительная информация</h3>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
            Комментарий к записи (необязательно)
          </label>
          <textarea
            id="notes"
            className="input h-24 resize-none"
            placeholder="Укажите дополнительную информацию для врача или администратора..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isLoadingAppointment}
        disabled={!selectedDate || !selectedTime}
      >
        Записаться на прием
      </Button>
    </form>
  );
};

export default AppointmentForm;