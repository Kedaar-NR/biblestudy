import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onNext: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNext }) => {
  return (
    <OnboardingLayout backgroundImage="/sky-bg.png" showBack={false}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-xl)' }}
      >
        <div style={{ position: 'relative', width: '200px', height: '240px' }}>
          {/* Bible BFF Logo Placeholder - Replicating the book icon */}
          <div style={{ 
            background: '#5A2E00', 
            width: '180px', 
            height: '220px', 
            borderRadius: '12px 24px 24px 12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '8px solid #3d1f00',
            position: 'relative'
          }}>
            <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0' }}>Bible</h1>
            <h1 style={{ color: '#FFD700', fontSize: '3rem', marginTop: '-10px' }}>BFF</h1>
            
            {/* Bookmark */}
            <div style={{ 
              position: 'absolute', 
              bottom: '-15px', 
              left: '30px', 
              width: '30px', 
              height: '40px', 
              background: '#3d1f00',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)'
            }} />
          </div>
          
          {/* Pages effect */}
          <div style={{ 
            position: 'absolute', 
            bottom: '5px', 
            right: '5px', 
            width: '170px', 
            height: '20px', 
            background: '#f5e6d3', 
            borderRadius: '0 0 12px 0',
            zIndex: -1
          }} />
        </div>

        <p className="serif" style={{ fontSize: '1.5rem', maxWidth: '300px', lineHeight: '1.4' }}>
          The easiest and most relatable way to learn about the Bible
        </p>
      </motion.div>

      <div style={{ width: '100%', marginTop: 'auto' }}>
        <Button onClick={onNext}>Get Started</Button>
      </div>
    </OnboardingLayout>
  );
};
