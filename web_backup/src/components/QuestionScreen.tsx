import React from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface QuestionScreenProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  onBack: () => void;
  onNext: (answer: string) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ 
  questionNumber, 
  totalQuestions, 
  question, 
  options, 
  onBack, 
  onNext 
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <OnboardingLayout backgroundImage="/beach-bg.png" onBack={onBack}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
          Question {questionNumber} of {totalQuestions}
        </div>
        
        <h2 className="serif" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          {question}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className="btn-glass"
              style={{ 
                border: selected === option ? '2px solid #007AFF' : '1px solid var(--color-glass-border)',
                color: selected === option ? '#007AFF' : 'white',
                fontWeight: selected === option ? '600' : '400'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', marginTop: 'auto' }}>
        <Button 
          disabled={!selected} 
          onClick={() => selected && onNext(selected)}
          style={{ opacity: selected ? 1 : 0.5 }}
        >
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
};
