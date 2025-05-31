import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, selectAuthError, selectAuthLoading } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const apiError = useAppSelector(selectAuthError);
  const location = useLocation();
  const from = location.state?.from || '/profile';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Очищаем ошибку для поля, которое изменяется
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    if (!formData.phone) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^\+?[0-9\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await dispatch(register(registerData)).unwrap();
      dispatch(addNotification({
        type: 'success',
        message: 'Вы успешно зарегистрировались'
      }));
      navigate(from, { replace: true });
    } catch (error) {
      // Ошибка обрабатывается в slice
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="register-form">
      {apiError && <Alert type="error" message={apiError} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
            Имя
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder='Имя'
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            data-testid="firstName-input"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
            Фамилия
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder='Фамилия'
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            data-testid="lastName-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder='example@mail.ru'
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          data-testid="email-input"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
          Телефон
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          error={errors.phone}
          required
          data-testid="phone-input"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
          Пароль
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder='Пароль'
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          data-testid="password-input"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
          Подтверждение пароля
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder='Подтверждение пароля'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          data-testid="confirmPassword-input"
        />
      </div>

      <Button type="submit" className="w-full" loading={isLoading} data-testid="submit-button">
        Зарегистрироваться
      </Button>

      <p className="text-center text-sm text-neutral-600 mt-4">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium" data-testid="login-link">
          Войти
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;