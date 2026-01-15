import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-glass';
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
