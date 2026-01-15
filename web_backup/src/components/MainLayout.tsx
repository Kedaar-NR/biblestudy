import React from 'react';
import { Home, BookOpen, Search, MessageSquare, User } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'stories' | 'discover' | 'chat';
  onTabChange: (tab: 'home' | 'stories' | 'discover' | 'chat') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#fdf8f3', 
      color: '#333',
      overflow: 'hidden'
    }}>
      {/* Top Bar */}
      <div style={{ 
        padding: 'var(--spacing-lg) var(--spacing-lg) var(--spacing-md)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h2 className="serif" style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>bible bff</h2>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          background: '#7A3E00', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <User size={18} color="white" />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--spacing-lg) 100px' }}>
        {children}
      </div>

      {/* Bottom Navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        width: '100%', 
        height: '80px', 
        background: 'white', 
        borderTop: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        paddingBottom: '20px'
      }}>
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <NavItem 
          icon={<BookOpen size={24} />} 
          label="Stories" 
          active={activeTab === 'stories'} 
          onClick={() => onTabChange('stories')} 
        />
        <NavItem 
          icon={<Search size={24} />} 
          label="Discover" 
          active={activeTab === 'discover'} 
          onClick={() => onTabChange('discover')} 
        />
        <NavItem 
          icon={<MessageSquare size={24} />} 
          label="Chat" 
          active={activeTab === 'chat'} 
          onClick={() => onTabChange('chat')} 
        />
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{ 
      background: 'none', 
      border: 'none', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '4px',
      color: active ? '#7A3E00' : '#999',
      cursor: 'pointer'
    }}
  >
    {icon}
    <span style={{ fontSize: '0.75rem', fontWeight: active ? '600' : '400' }}>{label}</span>
  </button>
);
