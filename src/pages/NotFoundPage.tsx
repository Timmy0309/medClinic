import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  // Обновляем заголовок страницы
  useEffect(() => {
    document.title = 'Страница не найдена - МедЦентр';
  }, []);
  
  return (
    <div className="container py-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
        <p className="text-neutral-600 mb-8">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Button
          as={Link}
          to="/"
          size="lg"
          icon={<Home className="h-5 w-5" />}
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;