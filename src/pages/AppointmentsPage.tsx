import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ClipboardList } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchUserAppointments,
  selectAppointments,
  selectAppointmentsLoading,
  selectAppointmentsError,
} from '../store/slices/appointmentsSlice';
import AppointmentCard from '../components/appointments/AppointmentCard';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import { parseISO, isBefore } from 'date-fns';

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const isLoading = useAppSelector(selectAppointmentsLoading);
  const error = useAppSelector(selectAppointmentsError);
  
  useEffect(() => {
    dispatch(fetchUserAppointments());
  }, [dispatch]);
  
  useEffect(() => {
    document.title = 'Мои записи - МедЦентр';
  }, []);

  const now = new Date();
  
  // Сортируем и фильтруем записи
  const sortAppointments = (appointments: typeof appointments) => {
    return [...appointments].sort((a, b) => {
      const dateA = parseISO(`${a.date}T${a.time}`);
      const dateB = parseISO(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  };
  
  const upcomingAppointments = sortAppointments(
    appointments.filter(appointment => {
      const appointmentDate = parseISO(`${appointment.date}T${appointment.time}`);
      return !isBefore(appointmentDate, now) && appointment.status === 'scheduled';
    })
  );
  
  const completedAppointments = sortAppointments(
    appointments.filter(appointment => {
      const appointmentDate = parseISO(`${appointment.date}T${appointment.time}`);
      return isBefore(appointmentDate, now) && appointment.status === 'completed';
    })
  );
  
  if (isLoading && appointments.length === 0) {
    return (
      <div className="container py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Мои записи</h1>
        <p className="text-neutral-600">
          Управляйте своими записями на прием, просматривайте историю посещений
        </p>
      </div>
      
      {error && <Alert type="error" message={error} className="mb-6" />}
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary-600" />
          Предстоящие записи
        </h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-neutral-600 mb-4">У вас нет предстоящих записей</p>
            <Button as={Link} to="/services">
              Записаться на прием
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-primary-600" />
          История посещений
        </h2>
        
        {completedAppointments.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-neutral-600">В истории нет завершенных записей</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;