import { useLanguage } from '../context/LanguageProvider';
import { useIsMobile } from '../hooks/useIsMobile';
import strings from '../language/aboutme';
import avatarImg from '../assets/Szymon_logo_new.png';

export default function AboutMe() {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        minHeight: isMobile ? 'calc(100vh - 62px)' : '100vh',
        overflowY: 'auto',
        padding: isMobile ? '24px 18px 40px' : '48px 60px',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          minHeight: isMobile ? 'auto' : 560,
          background: 'rgba(255,255,255,0.34)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.55)',
          borderRadius: 22,
          overflow: 'hidden',
          boxShadow: '0 30px 70px -36px rgba(0,0,0,0.5)',
        }}
      >
        {/* Photo — flush, fills full card height on desktop */}
        <div
          style={{
            flex: isMobile ? 'none' : '0 0 38%',
            height: isMobile ? 220 : 'auto',
            position: 'relative',
          }}
        >
          <img
            src={avatarImg}
            alt="Szymon Wieczorek"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
          />
        </div>

        {/* Text column */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? 24 : 44,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 500,
              letterSpacing: 5,
              color: '#516170',
              textTransform: 'uppercase',
            }}
          >
            {strings.label[lang]}
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: isMobile ? 26 : 44,
              color: '#1d2225',
              margin: '12px 0 0',
              lineHeight: 1.05,
            }}
          >
            {strings.name[lang]}
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: isMobile ? 15 : 19,
              color: '#39424a',
              margin: '16px 0 0',
              lineHeight: 1.6,
            }}
          >
            {strings.bio1[lang]}
          </p>

          <div
            style={{
              width: 40,
              height: 2,
              background: 'rgba(81,97,112,0.4)',
              margin: '20px 0',
              borderRadius: 1,
            }}
          />

          {(['para1', 'para2', 'para3', 'para4'] as const).map((key) => (
            <p
              key={key}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: isMobile ? 13 : 14,
                color: '#39424a',
                margin: '0 0 14px',
                lineHeight: 1.75,
              }}
            >
              {strings[key][lang]}
            </p>
          ))}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 9,
              marginTop: 18,
            }}
          >
            {strings.tags[lang].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  color: '#2f373c',
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: 20,
                  padding: isMobile ? '5px 12px' : '6px 14px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
