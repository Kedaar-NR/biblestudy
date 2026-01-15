import React from 'react';
import { Search, Award } from 'lucide-react';

export const StoriesTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* Search Bar */}
      <div style={{ 
        background: 'rgba(0,0,0,0.05)', 
        borderRadius: 'var(--radius-md)', 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px' 
      }}>
        <Search size={20} color="#666" />
        <span style={{ color: '#666' }}>Search stories, topics or characters</span>
      </div>

      <h2 className="serif" style={{ fontSize: '1.8rem', textAlign: 'center', color: '#7A3E00' }}>Select one to get started</h2>

      {/* Testament Selection */}
      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        <TestamentCard 
          title="Old Testament" 
          description="A big picture adventure from &quot;Let there be light&quot; to a rebuilt Jerusalem." 
          icon="★" 
          color="#fde8e8" 
          iconColor="#c53030"
        />
        <TestamentCard 
          title="New Testament" 
          description="The promised King arrives and the news races around the world." 
          icon="†" 
          color="#e1effe" 
          iconColor="#1e429f"
        />
      </div>

      {/* Streak Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        padding: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          background: '#fef3c7', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Award size={24} color="#d97706" />
        </div>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>0 Day Streak! 🔥</h4>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>Listen to any story to start your streak</p>
        </div>
      </div>

      {/* Progress Section */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.2rem', fontWeight: '700' }}>Progress</h3>
        <div style={{ 
          background: 'white', 
          borderRadius: '24px', 
          padding: '32px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          <div style={{ 
            width: '200px', 
            height: '100px', 
            border: '15px solid #fef3c7', 
            borderBottom: 'none', 
            borderRadius: '100px 100px 0 0',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '10px'
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>0%</span>
          </div>
          <div style={{ marginTop: '10px', fontSize: '2rem' }}>📖</div>
        </div>
      </section>
    </div>
  );
};

const TestamentCard: React.FC<{ title: string, description: string, icon: string, color: string, iconColor: string }> = ({ title, description, icon, color, iconColor }) => (
  <div style={{ 
    flex: 1, 
    background: 'white', 
    borderRadius: '24px', 
    padding: '20px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '8px', 
      background: color, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '1.2rem',
      color: iconColor
    }}>
      {icon}
    </div>
    <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</h4>
    <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>{description}</p>
  </div>
);
