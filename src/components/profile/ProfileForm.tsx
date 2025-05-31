import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectUser,
  selectAuthLoading,
  selectAuthError,
  updateProfile,
} from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    gender: user?.gender || '',
    address: user?.address || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(updateProfile(formData)).unwrap();
      dispatch(
        addNotification({
          type: 'success',
          message: 'Профиль успешно обновлен',
        })
      );
    } catch (error) {
      // Ошибка обрабатывается в slice
    }
  };
  
  if (!user) {
    return <Alert type="error" message="Пользователь не найден" />;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
            Имя
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
            Фамилия
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
          required
        />
      </div>
      
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-neutral-700 mb-1">
          Дата рождения
        </label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-1">
          Пол
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="input"
        >
          <option value="">Не указан</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
          Адрес
        </label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Город, улица, дом, квартира"
        />
      </div>
      
      <Button type="submit" loading={isLoading}>
        Сохранить изменения
      </Button>
    </form>
  );
};

export default ProfileForm;