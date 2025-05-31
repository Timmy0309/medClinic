import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    const baseClasses = 'h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50';
    
    const variantClasses = error
      ? 'border border-error-500 focus:ring-error-500'
      : 'border border-neutral-300 bg-white focus:ring-primary-500';
    
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`${baseClasses} ${variantClasses} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;