import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success-500" />,
    error: <AlertCircle className="h-5 w-5 text-error-500" />,
    info: <Info className="h-5 w-5 text-primary-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning-500" />,
  };
  
  const styles = {
    success: 'bg-success-50 border-success-500 text-success-700',
    error: 'bg-error-50 border-error-500 text-error-700',
    info: 'bg-primary-50 border-primary-500 text-primary-700',
    warning: 'bg-warning-50 border-warning-500 text-warning-700',
  };
  
  return (
    <div className={`rounded-md border-l-4 p-4 ${styles[type]}`}>
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="ml-3">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;