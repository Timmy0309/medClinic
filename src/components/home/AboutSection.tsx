import React from 'react';
import { CheckCircle, Award, Heart, UserPlus } from 'lucide-react';

const AboutSection: React.FC = () => {
  const advantages = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: 'Квалифицированные специалисты',
      description: 'Врачи с многолетним опытом работы и регулярным повышением квалификации',
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: 'Современное оборудование',
      description: 'Диагностика и лечение на новейшем медицинском оборудовании ведущих производителей',
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: 'Индивидуальный подход',
      description: 'Разработка индивидуальных программ лечения и профилактики для каждого пациента',
    },
    {
      icon: <UserPlus className="h-8 w-8 text-primary-600" />,
      title: 'Доступность',
      description: 'Доступные цены и удобное расположение клиники в центре города',
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">О нашей клинике</h2>
            <p className="text-neutral-700 mb-6">
              МедЦентр - современная многопрофильная клиника, оказывающая полный спектр медицинских услуг для взрослых и детей. Мы стремимся сделать качественную медицинскую помощь доступной для каждого.
            </p>
            <p className="text-neutral-700 mb-6">
              Наша миссия - улучшать качество жизни наших пациентов через заботу о здоровье, профилактику заболеваний и применение передовых медицинских технологий.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-3">{advantage.icon}</div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{advantage.title}</h3>
                    <p className="text-sm text-neutral-600">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg"
              alt="Врачи нашей клиники"
              className="rounded-lg shadow-lg z-10 relative"
            />
            <div className="absolute w-full h-full top-4 left-4 rounded-lg bg-primary-100 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;