import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, Clock, Tag, X, ChevronRight } from 'lucide-react';
import { Appointment } from '../../types/appointments';
import Button from '../ui/Button';
import { useAppDispatch } from '../../store/hooks';
import { cancelAppointment } from '../../store/slices/appointmentsSlice';
import { addNotification } from '../../store/slices/uiSlice';
import AppointmentDetails from './AppointmentDetails';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const dispatch = useAppDispatch();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'd MMMM yyyy (EEEE)', { locale: ru });
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary-100 text-primary-800';
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Запланирован';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };
  
  const handleCancelAppointment = async () => {
    if (window.confirm('Вы уверены, что хотите отменить запись?')) {
      try {
        await dispatch(cancelAppointment(appointment.id)).unwrap();
        dispatch(
          addNotification({
            type: 'success',
            message: 'Запись успешно отменена',
          })
        );
      } catch (error) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'Не удалось отменить запись',
          })
        );
      }
    }
  };

  const handleCardClick = () => {
    if (appointment.status === 'completed') {
      setIsDetailsOpen(true);
    }
  };
  
  return (
    <>
      <div 
        className={`card overflow-hidden ${
          appointment.status === 'completed' ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="p-4 border-b bg-neutral-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{appointment.serviceName}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                appointment.status
              )}`}
            >
              {getStatusText(appointment.status)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              <div>
                <p className="text-sm font-medium">Дата</p>
                <p className="text-neutral-700">{formatDate(appointment.date)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-primary-600" />
              <div>
                <p className="text-sm font-medium">Время</p>
                <p className="text-neutral-700">{appointment.time}</p>
              </div>
            </div>
            
            {appointment.specialistName && (
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Врач</p>
                  <p className="text-neutral-700">{appointment.specialistName}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start">
              <Tag className="h-5 w-5 mr-2 text-primary-600" />
              <div>
                <p className="text-sm font-medium">Стоимость</p>
                <p className="text-neutral-700">{appointment.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {appointment.status === 'scheduled' && (
              <Button
                variant="outline"
                size="sm"
                className="text-error-600 border-error-300 hover:bg-error-50"
                icon={<X className="h-4 w-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelAppointment();
                }}
              >
                Отменить запись
              </Button>
            )}
            {appointment.status === 'completed' && (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                icon={<ChevronRight className="h-4 w-4" />}
              >
                Подробнее
              </Button>
            )}
          </div>
        </div>
      </div>

      <AppointmentDetails
        appointment={appointment}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default AppointmentCard;