import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Calendar, LogOut, Home, Stethoscope } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated, selectUser, logout } from '../../store/slices/authSlice';
import { toggleMobileMenu, closeMobileMenu, selectMobileMenuOpen } from '../../store/slices/uiSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  
  // Закрываем мобильное меню при переходе на другую страницу
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location.pathname, dispatch]);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-700">МедЦентр</span>
          </Link>
          
          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-neutral-700 hover:text-primary-600 font-medium"
            >
              Главная
            </Link>
            <Link
              to="/services"
              className="text-neutral-700 hover:text-primary-600 font-medium"
            >
              Услуги
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600 font-medium">
                  <span>{user?.firstName || 'Пользователь'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Личный кабинет
                    </Link>
                    <Link
                      to="/appointments"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Мои записи
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 font-medium transition-colors"
              >
                Войти
              </Link>
            )}
          </nav>
          
          {/* Мобильное меню (бургер) */}
          <button
            className="md:hidden text-neutral-700"
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Мобильная навигация */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="flex items-center text-neutral-700 hover:text-primary-600"
              >
                <Home className="mr-2 h-5 w-5" />
                Главная
              </Link>
              <Link
                to="/services"
                className="flex items-center text-neutral-700 hover:text-primary-600"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Услуги
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-neutral-700 hover:text-primary-600"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Личный кабинет
                  </Link>
                  <Link
                    to="/appointments"
                    className="flex items-center text-neutral-700 hover:text-primary-600"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Мои записи
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-neutral-700 hover:text-primary-600"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Выйти
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-md px-4 py-2 transition-colors"
                >
                  Войти
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;