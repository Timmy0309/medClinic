import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, selectAuthError, selectAuthLoading } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const location = useLocation();
  const from = location.state?.from || '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      dispatch(addNotification({
        type: 'success',
        message: 'Вы успешно вошли в систему'
      }));
      navigate(from, { replace: true });
    } catch (error) {
      // Ошибка обрабатывается в slice
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.ru"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          required
        />
      </div>

      <Button type="submit" className="w-full" loading={isLoading}>
        Войти
      </Button>

      <p className="text-center text-sm text-neutral-600 mt-4">
        Еще нет аккаунта?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;