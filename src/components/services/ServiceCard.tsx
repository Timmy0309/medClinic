import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Button from '../ui/Button';
import { Service } from '../../types/services';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  
  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated) {
      navigate(`/appointment/${service.id}`);
    } else {
      navigate('/login', { state: { from: `/appointment/${service.id}` } });
    }
  };
  
  return (
    <Link
      to={`/services/${service.id}`}
      className="block card overflow-hidden transition-shadow hover:shadow-md"
    >
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center text-sm text-neutral-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>Длительность: {service.duration} мин.</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-700">
            {service.price.toLocaleString('ru-RU')} ₽
          </span>
          
          <Button
            onClick={handleAppointmentClick}
            size="sm"
          >
            Записаться
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;