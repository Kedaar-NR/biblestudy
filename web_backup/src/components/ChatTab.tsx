import React from 'react';
import { Button } from './Button';

export const ChatTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Chat</h1>
      
      <p style={{ textAlign: 'center', color: '#7A3E00', fontWeight: '600' }}>Select a topic or start a new chat</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <ChatTopicCard 
          title="Find a bible verse for your situation" 
          image="/sky-bg.png" 
        />
        <ChatTopicCard 
          title="Get Biblical advice" 
          image="/beach-bg.png" 
        />
        <ChatTopicCard 
          title="Explain something in the Bible" 
          image="/ancient-city-bg.png" 
        />
      </div>

      <div style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}>
        <Button>Start a new chat</Button>
      </div>
    </div>
  );
};

const ChatTopicCard: React.FC<{ title: string, image: string }> = ({ title, image }) => (
  <div style={{ 
    position: 'relative', 
    height: '120px', 
    borderRadius: '24px', 
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }}>
    <img src={image} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} alt={title} />
    <h3 style={{ position: 'relative', color: 'white', textAlign: 'center', padding: '0 20px', fontSize: '1.1rem', fontWeight: '700' }}>
      {title}
    </h3>
  </div>
);
