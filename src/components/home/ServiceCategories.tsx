import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Bluetooth as Tooth, Eye, Brain, FlaskRound as Flask } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories, selectCategories, selectServicesLoading } from '../../store/slices/servicesSlice';
import Spinner from '../ui/Spinner';

const CategoryIcons: Record<string, React.ReactNode> = {
  stethoscope: <Stethoscope className="h-10 w-10 text-primary-600" />,
  tooth: <Tooth className="h-10 w-10 text-primary-600" />,
  eye: <Eye className="h-10 w-10 text-primary-600" />,
  brain: <Brain className="h-10 w-10 text-primary-600" />,
  flask: <Flask className="h-10 w-10 text-primary-600" />,
};

const ServiceCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectServicesLoading);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  if (isLoading && categories.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Мы предлагаем широкий спектр медицинских услуг для всей семьи с использованием современного оборудования и методик лечения.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/services?category=${category.id}`}
              className="card p-6 hover:shadow-md transition-shadow group"
            >
              <div className="mb-4">
                {category.icon && CategoryIcons[category.icon]}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-neutral-600 text-sm">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;