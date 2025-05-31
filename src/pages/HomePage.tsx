import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServiceCategories from '../components/home/ServiceCategories';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
  // Обновляем заголовок страницы
  React.useEffect(() => {
    document.title = 'МедЦентр - Современная медицинская клиника';
  }, []);
  
  return (
    <div>
      <HeroSection />
      <ServiceCategories />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;