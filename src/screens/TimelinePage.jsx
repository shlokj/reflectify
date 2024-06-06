import React from 'react';
import Header from '../components/Header';

export default function TimelinePage() {
  return (
    <div>
      <Header isLoggedIn={true} userName='<username>' />
      <div style={{ marginTop: '200px' }}>
        <img
          src={`${process.env.PUBLIC_URL}/timeline_sample.png`}
          alt='Timeline Sample'
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
}
