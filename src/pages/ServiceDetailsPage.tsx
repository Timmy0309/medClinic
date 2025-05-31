import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchServiceById,
  selectSelectedService,
  selectServicesLoading,
  selectServicesError,
} from '../store/slices/servicesSlice';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  
  const service = useAppSelector(selectSelectedService);
  const isLoading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);
  
  // Обновляем заголовок страницы
  useEffect(() => {
    if (service) {
      document.title = `${service.name} - МедЦентр`;
    } else {
      document.title = 'Услуга - МедЦентр';
    }
  }, [service]);
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error || !service) {
    return (
      <div className="container py-8">
        <Alert type="error" message={error || 'Услуга не найдена'} />
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
      <Button
        as={Link}
        to="/services"
        variant="outline"
        className="mb-6"
        icon={<ArrowLeft className="h-4 w-4" />}
      >
        Вернуться к списку услуг
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-auto rounded-lg mb-6"
            />
          )}
          
          <div className="card p-6 mb-6" data-testid="service-description">
            <h2 className="text-xl font-bold mb-4">Описание услуги</h2>
            <p className="text-neutral-700 whitespace-pre-line">{service.description}</p>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Подготовка к процедуре</h2>
            <p className="text-neutral-700">
              Информация о подготовке к данной процедуре предоставляется пациенту после записи на прием или по телефону.
              При наличии вопросов о подготовке, пожалуйста, свяжитесь с нашим медицинским центром.
            </p>
          </div>
        </div>
        
        <div>
          <div className="card p-6 mb-6 sticky top-4" data-testid="service-details">
            <h2 className="text-xl font-bold mb-4">Информация</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Длительность</p>
                  <p className="text-neutral-700">{service.duration} минут</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Категория</p>
                  <p className="text-neutral-700">{service.category}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Стоимость</p>
                <p className="text-2xl font-bold text-primary-600" data-testid="service-price">
                  {service.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
            
            {isAuthenticated ? (
              <Button
                as={Link}
                to={`/appointment/${service.id}`}
                className="w-full"
                size="lg"
              >
                Записаться
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Войти для записи
                </Button>
                <p className="text-sm text-neutral-500 text-center">
                  Для записи на прием необходимо авторизоваться
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;