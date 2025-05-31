import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button' | 'a' | typeof Link;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  as = 'button',
  to,
  href,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
    outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100 focus-visible:ring-primary-500',
    ghost: 'bg-transparent hover:bg-neutral-100 focus-visible:ring-primary-500',
    link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline focus-visible:ring-primary-500 p-0 h-auto',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-5 py-2 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClass = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  // Компонент <Link>
  if (as === Link && to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  // Компонент <a>
  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }

  // Стандартная <button>
  return (
    <button
      type="button"
      className={combinedClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
