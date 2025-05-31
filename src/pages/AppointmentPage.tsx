import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchServiceById, selectSelectedService } from '../store/slices/servicesSlice';
import AppointmentForm from '../components/appointment/AppointmentForm';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const AppointmentPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const dispatch = useAppDispatch();
  const service = useAppSelector(selectSelectedService);

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = 'Запись на прием - МедЦентр';
  }, []);

  if (!serviceId) {
    return (
      <div className="container py-8">
        <Alert type="error" message="Не указан идентификатор услуги" />
        <div className="mt-4">
          <Button
            as={Link}
            to="/services"
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Вернуться к списку услуг
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button
          as={Link}
          to="/services"
          variant="outline"
          className="mb-4"
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Вернуться к списку услуг
        </Button>

        <h1 className="text-3xl font-bold mb-2">Запись на прием</h1>
        <p className="text-neutral-600">
          Выберите удобные дату и время для записи на услугу{' '}
          {service && <strong>"{service.name}"</strong>}
        </p>
      </div>

      <AppointmentForm serviceId={serviceId} />
    </div>
  );
};

export default AppointmentPage;