import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon: Icon,
  size = 'md',
  fullWidth = false,
  leftAddon,
  rightAddon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const baseInputClasses = `
    block border rounded-lg shadow-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
    placeholder-gray-400
  `.trim();

  const inputClasses = [
    baseInputClasses,
    error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    Icon ? 'pl-10' : '',
    leftAddon ? 'rounded-l-none' : '',
    rightAddon ? 'rounded-r-none' : '',
    className
  ].filter(Boolean).join(' ');

  const renderInput = () => (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      )}
      <input
        id={inputId}
        className={inputClasses}
        {...props}
      />
    </div>
  );

  const renderWithAddons = () => {
    if (!leftAddon && !rightAddon) {
      return renderInput();
    }

    return (
      <div className="flex">
        {leftAddon && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {leftAddon}
          </span>
        )}
        {renderInput()}
        {rightAddon && (
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {rightAddon}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {renderWithAddons()}
      {(error || helperText) && (
        <div className="mt-1">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
      )}
    </div>
  );
};
