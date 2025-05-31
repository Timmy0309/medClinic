import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/profile';

  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = 'Регистрация - МедЦентр';
  }, []);

  // Перенаправляем на страницу профиля, если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
          <p className="text-neutral-600">
            Создайте аккаунт для доступа к записи на прием и личному кабинету
          </p>
        </div>

        <div className="card p-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;