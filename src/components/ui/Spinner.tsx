import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  return (
    <div
      className={`animate-spin rounded-full border-t-transparent border-primary-600 ${sizeClasses[size]} ${className}`}
      style={{ borderWidth: size === 'sm' ? '2px' : '3px' }}
      role="status"
      aria-label="Загрузка"
    />
  );
};

export default Spinner;