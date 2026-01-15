import React from 'react';
import { Search } from 'lucide-react';

export const DiscoverTab: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Discover</h1>
      
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

      {/* Horizontal Scroll Topics */}
      <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: '8px' }}>
        <TopicCard title="World" subtitle="How God created everything from n..." />
        <TopicCard title="The first two" subtitle="The first two humans break th..." />
        <TopicCard title="Two brothers" subtitle="Two brothers fight for God's approv..." />
      </div>

      {/* Bible Characters */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Bible Characters</h3>
          <span style={{ color: '#7A3E00', fontSize: '0.9rem', fontWeight: '600' }}>see all</span>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-lg)', overflowX: 'auto', paddingBottom: '8px' }}>
          <CharacterCard name="Adam" subtitle="The first" image="/ancient-city-bg.png" />
          <CharacterCard name="Eve" subtitle="Humanity's first" image="/beach-bg.png" />
          <CharacterCard name="Cain" subtitle="Adam and" image="/sky-bg.png" />
        </div>
      </section>

      {/* Recently Added (Reusing HomeScreen logic) */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Recently Added</h3>
          <span style={{ color: '#7A3E00', fontSize: '0.9rem', fontWeight: '600' }}>see all</span>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: '8px' }}>
          <MomentCard title="The Sacrifice of Isaac" image="/ancient-city-bg.png" />
          <MomentCard title="Isaac and Rebekah" image="/beach-bg.png" />
          <MomentCard title="Jacob and Esau" image="/sky-bg.png" />
        </div>
      </section>
    </div>
  );
};

const TopicCard: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ minWidth: '160px', padding: '16px', background: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>{title}</h4>
    <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.3' }}>{subtitle}</p>
  </div>
);

const CharacterCard: React.FC<{ name: string, subtitle: string, image: string }> = ({ name, subtitle, image }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px' }}>
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
      <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={name} />
    </div>
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{name}</h4>
      <p style={{ fontSize: '0.75rem', color: '#666' }}>{subtitle}</p>
    </div>
  </div>
);

const MomentCard: React.FC<{ title: string, image: string }> = ({ title, image }) => (
  <div style={{ width: '140px', flexShrink: 0 }}>
    <div style={{ width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', marginBottom: '8px' }}>
      <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={title} />
    </div>
    <p style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.3' }}>{title}</p>
  </div>
);
