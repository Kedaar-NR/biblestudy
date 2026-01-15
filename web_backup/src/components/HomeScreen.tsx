import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

export const HomeScreen: React.FC = () => {
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
        <span style={{ color: '#666' }}>Find the perfect Bible verse to start your day</span>
      </div>

      {/* Story of the Day */}
      <section>
        <h3 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.2rem', fontWeight: '700' }}>Story of the day</h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
            <img src="/ancient-city-bg.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Story" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Jesus Teaches His Disciples to Pray</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.4' }}>
              Jesus gives a simple prayer and invites bold trust in a generous Father.
            </p>
          </div>
        </div>
      </section>

      {/* Major Bible Moments */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Major Bible Moments</h3>
          <span style={{ color: '#7A3E00', fontSize: '0.9rem', fontWeight: '600' }}>see all</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 'var(--spacing-md)' }}>Explore a playlist of all the major Bible stories.</p>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: '8px' }}>
          <MomentCard title="The Creation of the World" image="/sky-bg.png" />
          <MomentCard title="Adam and Eve" image="/beach-bg.png" />
          <MomentCard title="Cain and Abel" image="/ancient-city-bg.png" />
        </div>
      </section>

      {/* Recently Added */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Recently Added</h3>
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

const MomentCard: React.FC<{ title: string, image: string }> = ({ title, image }) => (
  <div style={{ width: '140px', flexShrink: 0 }}>
    <div style={{ width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', marginBottom: '8px' }}>
      <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={title} />
    </div>
    <p style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.3' }}>{title}</p>
  </div>
);
