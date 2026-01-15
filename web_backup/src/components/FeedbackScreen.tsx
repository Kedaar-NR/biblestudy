import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { motion } from 'framer-motion';

interface FeedbackScreenProps {
  text: string;
  onBack: () => void;
  onNext: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ text, onBack, onNext }) => {
  // Automatically move to next screen after a short delay
  React.useEffect(() => {
    const timer = setTimeout(onNext, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <OnboardingLayout backgroundImage="/beach-bg.png" onBack={onBack}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="serif"
        style={{ fontSize: '2rem', maxWidth: '300px', lineHeight: '1.4', textAlign: 'center', color: 'rgba(255,255,255,0.9)' }}
      >
        {text}
      </motion.div>
    </OnboardingLayout>
  );
};
