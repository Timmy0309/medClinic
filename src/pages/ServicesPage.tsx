import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setFilter } from '../store/slices/servicesSlice';
import ServiceFilters from '../components/services/ServiceFilters';
import ServicesList from '../components/services/ServicesList';

const ServicesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  
  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = 'Услуги - МедЦентр';
  }, []);
  
  // Устанавливаем фильтры из URL-параметров
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilter({ category }));
    }
  }, [searchParams, dispatch]);
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Медицинские услуги</h1>
        <p className="text-neutral-600">
          Мы предлагаем широкий спектр медицинских услуг для взрослых и детей. Выберите интересующую вас услугу и запишитесь на прием.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ServiceFilters />
        </div>
        
        <div className="md:col-span-3">
          <ServicesList />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;