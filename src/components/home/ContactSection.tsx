import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как нас найти</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Мы находимся в центре города, удобно добраться общественным транспортом или на автомобиле.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden h-96 w-full">
              <iframe
                title="Карта Яндекс"
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A0b922f3870f4d059e2044575a0d3b37b53ad6bca6a83fc8e3a2b56b9ab0b8d2c&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>

          <div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Контактная информация</h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary-600" />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-neutral-600">г. Москва, ул. Медицинская, д. 123</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary-600" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <a href="tel:+74951234567" className="text-primary-600 hover:underline">
                      +7 (495) 123-45-67
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@medcenter.ru" className="text-primary-600 hover:underline">
                      info@medcenter.ru
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary-600" />
                  <div>
                    <p className="font-medium">Часы работы</p>
                    <p className="text-neutral-600">Пн-Пт: 8:00 - 20:00</p>
                    <p className="text-neutral-600">Сб: 9:00 - 18:00</p>
                    <p className="text-neutral-600">Вс: Выходной</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;