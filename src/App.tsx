import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentsPage from './pages/AppointmentsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAppDispatch } from './store/hooks';
import { checkAuth } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Проверяем статус авторизации при загрузке приложения
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Прокручиваем страницу вверх при переходе на новую страницу
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetailsPage />} />
        
        {/* Защищенные маршруты (только для авторизованных пользователей) */}
        <Route element={<ProtectedRoute />}>
          <Route path="appointment/:serviceId" element={<AppointmentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
        </Route>
        
        {/* Страницы авторизации */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;