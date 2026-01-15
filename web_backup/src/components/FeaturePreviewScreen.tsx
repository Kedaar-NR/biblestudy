import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturePreview {
  title: string;
  content: React.ReactNode;
}

interface FeaturePreviewScreenProps {
  previews: FeaturePreview[];
  onBack: () => void;
  onFinish: () => void;
}

export const FeaturePreviewScreen: React.FC<FeaturePreviewScreenProps> = ({ previews, onBack, onFinish }) => {
  const [index, setIndex] = React.useState(0);

  const handleNext = () => {
    if (index < previews.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <OnboardingLayout backgroundImage="/ancient-city-bg.png" onBack={onBack}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-lg)' }}
          >
            <h2 className="serif" style={{ fontSize: '2rem', textAlign: 'center', color: 'white' }}>
              {previews[index].title}
            </h2>
            
            <div style={{ width: '100%' }}>
              {previews[index].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--spacing-md)' }}>
          {previews.map((_, i) => (
            <div 
              key={i}
              style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: i === index ? 'white' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s'
              }} 
            />
          ))}
        </div>
      </div>

      <div style={{ width: '100%', marginTop: 'auto' }}>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </OnboardingLayout>
  );
};
