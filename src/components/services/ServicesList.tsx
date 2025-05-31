import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchServices,
  selectServices,
  selectFilters,
  selectServicesLoading,
  selectServicesError,
} from '../../store/slices/servicesSlice';
import ServiceCard from './ServiceCard';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';

const ServicesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const filters = useAppSelector(selectFilters);
  const isLoading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);
  
  useEffect(() => {
    dispatch(fetchServices(filters));
  }, [dispatch, filters]);
  
  if (isLoading && services.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return <Alert type="error" message={error} />;
  }
  
  if (services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600">
          По вашему запросу не найдено ни одной услуги. Попробуйте изменить параметры поиска.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;