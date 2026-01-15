import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  backgroundImage, 
  onBack, 
  showBack = true 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        {showBack && (
          <button 
            onClick={onBack}
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              border: 'none', 
              borderRadius: '50%', 
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)'
            }}
          >
            <ChevronLeft color="black" size={24} />
          </button>
        )}
      </div>
      
      <div className="content-center">
        {children}
      </div>
    </motion.div>
  );
};
