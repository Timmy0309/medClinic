import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneCall } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Современная клиника для всей семьи
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              Профессиональная забота о вашем здоровье. Доверьтесь нашим опытным специалистам.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                to="/services"
                size="lg"
                variant="outline"
                className="bg-white text-primary-700 hover:bg-primary-50 border-white"
                icon={<Calendar className="h-5 w-5" />}
              >
                Записаться на прием
              </Button>
              <Button
                as="a"
                href="tel:+74951234567"
                size="lg"
                variant="ghost"
                className="text-white border border-primary-300 hover:bg-primary-700"
                icon={<PhoneCall className="h-5 w-5" />}
              >
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <img
              src="https://images.pexels.com/photos/7088486/pexels-photo-7088486.jpeg"
              alt="Врач осматривает пациента"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;