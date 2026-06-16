import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLanguage, Language } from '../context/LanguageProvider';
import shinsLogo from '../assets/Shins_logo.png';
import avatarImg from '../assets/Szymon_logo_new.png';
import bgImage from '../assets/background.png';

const SIDEBAR_GLASS: React.CSSProperties = {
  background: 'rgba(22,25,28,0.5)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: '0 24px 56px -22px rgba(0,0,0,0.55)',
};

const NAV_ITEMS = [
  { pl: 'Start', en: 'Start', to: '/', end: true },
  { pl: 'O mnie', en: 'About', to: '/about', end: false },
  { pl: 'Portfolio', en: 'Portfolio', to: '/portfolio', end: false },
  { pl: 'Kontakt', en: 'Contact', to: '/contact', end: false },
];

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dfe4e7"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#dfe4e7" stroke="none" />
    </svg>
  );
}

function ArtStationIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dfe4e7"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M5 17.5h11l-1.7 3H6.8zM8 12.5L12.5 5l4.5 7.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dfe4e7"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </svg>
  );
}

function SocialCircle({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.2s',
      }}
    >
      {children}
    </a>
  );
}

function NavItems({
  fontSize = 16,
  gap = 1,
  onClose,
}: {
  fontSize?: number;
  gap?: number;
  onClose?: () => void;
}) {
  const { lang } = useLanguage();
  const isPl = lang === Language.polish;
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        width: '100%',
        alignItems: 'stretch',
      }}
    >
      {NAV_ITEMS.map(({ pl, en, to, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 11,
            color: isActive ? '#f3f5f6' : '#aab1b6',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 500,
            fontSize,
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            padding: '8px 0',
            transition: 'color 0.2s',
          })}
        >
          {({ isActive }) => (
            <>
              <span
                style={{
                  width: 16,
                  height: 2,
                  background: isActive ? '#9fb2c2' : 'transparent',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {isPl ? pl : en}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

function LanguageToggle({ style }: { style?: React.CSSProperties }) {
  const { lang, setLang } = useLanguage();
  const isPl = lang === Language.polish;
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginTop: 'auto',
        paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.10)',
        width: '100%',
        justifyContent: 'center',
        ...style,
      }}
    >
      <button
        onClick={() => setLang(Language.polish)}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 12,
          letterSpacing: 1,
          color: isPl ? '#1a1c1e' : '#c2c8cc',
          background: isPl ? '#d5dbdf' : 'transparent',
          border: isPl ? 'none' : '1px solid rgba(255,255,255,0.2)',
          borderRadius: 20,
          padding: '5px 13px',
          cursor: 'pointer',
        }}
      >
        PL
      </button>
      <button
        onClick={() => setLang(Language.english)}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 12,
          letterSpacing: 1,
          color: !isPl ? '#1a1c1e' : '#c2c8cc',
          background: !isPl ? '#d5dbdf' : 'transparent',
          border: !isPl ? 'none' : '1px solid rgba(255,255,255,0.2)',
          borderRadius: 20,
          padding: '5px 13px',
          cursor: 'pointer',
        }}
      >
        EN
      </button>
    </div>
  );
}

function DesktopSidebar() {
  return (
    <div
      style={{
        position: 'fixed',
        left: 28,
        top: 28,
        bottom: 28,
        width: 300,
        zIndex: 10,
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 26px',
        color: '#eef1f3',
        ...SIDEBAR_GLASS,
      }}
    >
      <img
        src={shinsLogo}
        alt="SHINS — Szymon Wieczorek"
        style={{
          width: 196,
          height: 'auto',
          marginTop: 2,
          filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
        }}
      />

      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          marginTop: 34,
          overflow: 'hidden',
          background: '#0e1112',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.22), 0 10px 26px -10px rgba(0,0,0,0.6)',
          flexShrink: 0,
        }}
      >
        <img
          src={avatarImg}
          alt="Szymon Wieczorek"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 13, marginTop: 26 }}>
        <SocialCircle href="https://www.instagram.com/shins.sw/">
          <InstagramIcon />
        </SocialCircle>
        <SocialCircle href="https://szymonwieczorek.artstation.com">
          <ArtStationIcon />
        </SocialCircle>
        <SocialCircle href="mailto:shins.sw@gmail.com">
          <EmailIcon />
        </SocialCircle>
      </div>

      <div style={{ marginTop: 38, width: '100%' }}>
        <NavItems />
      </div>

      <LanguageToggle />
    </div>
  );
}

function MobileSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isPl = lang === Language.polish;

  function handleNavClick(to: string) {
    setMenuOpen(false);
    navigate(to);
  }

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          ...SIDEBAR_GLASS,
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
        }}
      >
        {/* Main row */}
        <div
          style={{
            height: 62,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
          }}
        >
          <img
            src={shinsLogo}
            alt="SHINS"
            style={{
              height: 34,
              width: 'auto',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
            }}
          />
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              padding: 4,
            }}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 23,
                  height: 2,
                  background: '#f1f3f4',
                  borderRadius: 2,
                  display: 'block',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 30,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(18,21,24,0.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Close button */}
          <div style={{ position: 'absolute', top: 36, right: 20, zIndex: 1 }}>
            <div
              style={{
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100vw',
                padding: '0 20px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top row with X */}
            <div
              style={{
                height: 98,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: '0 20px 14px',
              }}
            >
              <img
                src={shinsLogo}
                alt="SHINS"
                style={{
                  height: 34,
                  width: 'auto',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
                }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                }}
                aria-label="Close menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f1f3f4"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Centered content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0e1112',
                  boxShadow:
                    '0 0 0 1px rgba(255,255,255,0.22), 0 10px 24px -10px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={avatarImg}
                  alt="Szymon"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <nav
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 34,
                  width: '100%',
                }}
              >
                {NAV_ITEMS.map(({ pl, en, to }) => (
                  <button
                    key={to}
                    onClick={() => handleNavClick(to)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      color: '#aab1b6',
                      background: 'none',
                      border: 'none',
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 500,
                      fontSize: 24,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      padding: '10px 0',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    {isPl ? pl : en}
                  </button>
                ))}
              </nav>

              <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
                <SocialCircle href="https://www.instagram.com/shins_sw/">
                  <InstagramIcon />
                </SocialCircle>
                <SocialCircle href="https://szymonwieczorek.artstation.com">
                  <ArtStationIcon />
                </SocialCircle>
                <SocialCircle href="mailto:shins.sw@gmail.com">
                  <EmailIcon />
                </SocialCircle>
              </div>

              <LanguageToggle style={{ marginTop: 26 }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Sidebar() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
}
