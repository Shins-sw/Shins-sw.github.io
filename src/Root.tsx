import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import bgImage from './assets/background.png';
import './root.css';

export default function Root() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed background layers */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(22,26,30,0.28) 0%, rgba(18,22,26,0.34) 50%, rgba(11,14,17,0.56) 100%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          boxShadow: 'inset 0 0 240px 70px rgba(38,44,49,0.34)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <Sidebar />

      {/* Content area — offset by sidebar on desktop, by top bar on mobile */}
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
}
