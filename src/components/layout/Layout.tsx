import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Notifications from '../ui/Notifications';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Компонент для отображения уведомлений */}
      <Notifications />
    </div>
  );
};

export default Layout;