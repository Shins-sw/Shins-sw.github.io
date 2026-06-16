import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';
import { useIsMobile } from '../hooks/useIsMobile';
import strings from '../language/index';
import avatarImg from '../assets/Szymon_logo_new.png';

export default function Index() {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: isMobile ? 'calc(100vh - 62px)' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: isMobile ? '40px 28px' : '40px 70px',
      }}
    >
      {isMobile && (
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#0e1112',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.25), 0 10px 24px -8px rgba(0,0,0,0.6)',
            marginBottom: 18,
            flexShrink: 0,
          }}
        >
          <img src={avatarImg} alt="Szymon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 6,
          color: '#cdd7df',
          textTransform: 'uppercase',
          textShadow: '0 1px 12px rgba(0,0,0,0.5)',
        }}
      >
        {strings.label[lang]}
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: isMobile ? 36 : 70,
          color: '#f5f7f8',
          margin: '18px 0 0',
          letterSpacing: 0.5,
          lineHeight: 1.04,
          textShadow: '0 3px 30px rgba(0,0,0,0.6)',
          maxWidth: isMobile ? '100%' : 700,
        }}
      >
        {strings.title[lang]}
      </h1>

      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: isMobile ? 14 : 18,
          color: '#dde2e6',
          maxWidth: 540,
          margin: '22px 0 0',
          lineHeight: 1.7,
          textShadow: '0 1px 14px rgba(0,0,0,0.5)',
        }}
      >
        {strings.subtitle[lang]}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 10 : 14,
          marginTop: 38,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <button
          onClick={() => navigate('/portfolio')}
          style={{
            background: 'rgba(28,32,35,0.85)',
            color: '#f2f4f5',
            padding: isMobile ? '13px' : '14px 30px',
            borderRadius: 30,
            fontFamily: "'Jost', sans-serif",
            fontSize: isMobile ? 13 : 14,
            letterSpacing: 0.8,
            border: 'none',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            textAlign: 'center',
          }}
        >
          {strings.cta_portfolio[lang]}
        </button>
        <button
          onClick={() => navigate('/about')}
          style={{
            border: '1px solid rgba(255,255,255,0.55)',
            color: '#f1f3f4',
            padding: isMobile ? '13px' : '14px 30px',
            borderRadius: 30,
            fontFamily: "'Jost', sans-serif",
            fontSize: isMobile ? 13 : 14,
            letterSpacing: 0.8,
            background: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          {strings.cta_about[lang]}
        </button>
      </div>
    </div>
  );
}
