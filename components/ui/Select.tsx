import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder,
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const selectClasses = [
    'block border rounded-lg shadow-sm transition-colors appearance-none bg-white',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    'pr-10', // Space for chevron icon
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select id={selectId} className={selectClasses} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
      {(error || helperText) && (
        <div className="mt-1">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!error && helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
      )}
    </div>
  );
};
