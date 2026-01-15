import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'light', className = '' }) => {
  const baseClass = variant === 'light' ? 'glass' : 'glass-dark';
  return (
    <div className={`${baseClass} ${className}`} style={{ padding: 'var(--spacing-lg)' }}>
      {children}
    </div>
  );
};
