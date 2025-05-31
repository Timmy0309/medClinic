import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNotifications, removeNotification } from '../../store/slices/uiSlice';
import Alert from './Alert';

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  
  // Автоматически закрываем уведомления через 5 секунд
  useEffect(() => {
    if (notifications.length > 0) {
      const notificationId = notifications[0].id;
      const timer = setTimeout(() => {
        dispatch(removeNotification(notificationId));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="max-w-sm w-full transition-all duration-300 ease-in-out animate-slide-in"
        >
          <Alert
            type={notification.type}
            message={notification.message}
            onClose={() => dispatch(removeNotification(notification.id))}
          />
        </div>
      ))}
    </div>
  );
};

export default Notifications;