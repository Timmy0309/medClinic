import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/slices/authSlice';
import ProfileForm from '../components/profile/ProfileForm';

const ProfilePage: React.FC = () => {
  const user = useAppSelector(selectUser);
  
  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = 'Личный кабинет - МедЦентр';
  }, []);
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
        <p className="text-neutral-600">
          Управляйте своим профилем и просматривайте историю посещений
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Персональные данные</h2>
            <ProfileForm />
          </div>
        </div>
        
        <div>
          <div className="card p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Информация</h2>
            
            {user && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-neutral-700">{user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Телефон</p>
                  <p className="text-neutral-700">{user.phone}</p>
                </div>
                
                {user.birthDate && (
                  <div>
                    <p className="text-sm font-medium mb-1">Дата рождения</p>
                    <p className="text-neutral-700">{user.birthDate}</p>
                  </div>
                )}
                
                {user.gender && (
                  <div>
                    <p className="text-sm font-medium mb-1">Пол</p>
                    <p className="text-neutral-700">
                      {user.gender === 'male' ? 'Мужской' : 'Женский'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;