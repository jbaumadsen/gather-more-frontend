import React, { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

interface AlertDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'default',
  className = '',
}) => {
  // Define variant-specific styles
  const variantStyles = {
    default: 'bg-gray-100 border-gray-300 text-gray-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    error: 'bg-red-50 border-red-300 text-red-800'
  };

  return (
    <div 
      className={`p-4 border rounded-md ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div className={`text-sm mt-1 ${className}`}>
      {children}
    </div>
  );
};

export default Alert;