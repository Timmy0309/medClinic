import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated, selectAuthLoading } from '../../store/slices/authSlice';
import Spinner from '../ui/Spinner';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  
  // Показываем спиннер, пока проверяется статус авторизации
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // Перенаправляем на страницу логина, если пользователь не авторизован
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Если пользователь авторизован, показываем дочерние маршруты
  return <Outlet />;
};

export default ProtectedRoute;