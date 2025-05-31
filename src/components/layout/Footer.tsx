import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О клинике */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">МедЦентр</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Современная медицинская клиника, предоставляющая полный спектр медицинских услуг для всей семьи.
            </p>
            <div className="flex space-x-3 text-neutral-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary-500" />
                <span className="text-sm">г. Москва, ул. Медицинская, д. 123</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-500" />
                <a href="tel:+74951234567" className="text-sm hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-500" />
                <a href="mailto:info@medcenter.ru" className="text-sm hover:text-white transition-colors">
                  info@medcenter.ru
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-primary-500" />
                <div className="text-sm">
                  <p>Пн-Пт: 8:00 - 20:00</p>
                  <p>Сб: 9:00 - 18:00</p>
                  <p>Вс: Выходной</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Услуги */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services?category=1" className="text-sm hover:text-white transition-colors">
                  Терапия
                </Link>
              </li>
              <li>
                <Link to="/services?category=2" className="text-sm hover:text-white transition-colors">
                  Стоматология
                </Link>
              </li>
              <li>
                <Link to="/services?category=3" className="text-sm hover:text-white transition-colors">
                  Офтальмология
                </Link>
              </li>
              <li>
                <Link to="/services?category=4" className="text-sm hover:text-white transition-colors">
                  Неврология
                </Link>
              </li>
              <li>
                <Link to="/services?category=5" className="text-sm hover:text-white transition-colors">
                  Лабораторные исследования
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Навигация */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-white transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-white transition-colors">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-6 text-sm text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} МедЦентр. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;