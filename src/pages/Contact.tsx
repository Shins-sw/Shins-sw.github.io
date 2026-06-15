import { useState } from 'react';
import { useLanguage } from '../context/LanguageProvider';
import { useIsMobile } from '../hooks/useIsMobile';
import strings from '../language/contact';
import './Contact.css';

// Paste your Formspree form ID here after signing up at formspree.io
const FORMSPREE_ID = 'YOUR_FORM_ID';

export default function Contact() {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div
      style={{
        minHeight: isMobile ? 'calc(100vh - 98px)' : '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '24px 18px' : '40px 64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 24 : 44,
          width: '100%',
          background: 'rgba(255,255,255,0.34)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.55)',
          borderRadius: 22,
          padding: isMobile ? 24 : 40,
          boxShadow: '0 30px 70px -36px rgba(0,0,0,0.5)',
        }}
      >
        {/* Left column — info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 12,
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
              fontSize: isMobile ? 28 : 46,
              color: '#1d2225',
              margin: '12px 0 0',
              lineHeight: 1.05,
            }}
          >
            {strings.heading[lang]}
          </h2>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? 14 : 16,
              color: '#39424a',
              maxWidth: 330,
              margin: '18px 0 0',
              lineHeight: 1.7,
            }}
          >
            {strings.body[lang]}
          </p>

          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: 2,
                  color: '#5a6268',
                  textTransform: 'uppercase',
                }}
              >
                {strings.email_label[lang]}
              </div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: isMobile ? 15 : 18,
                  color: '#23282b',
                  marginTop: 5,
                }}
              >
                shins.sw<span>@</span>gmail.com
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: 2,
                  color: '#5a6268',
                  textTransform: 'uppercase',
                }}
              >
                {strings.location_label[lang]}
              </div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: isMobile ? 15 : 18,
                  color: '#23282b',
                  marginTop: 5,
                }}
              >
                {strings.location_value[lang]}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div
          style={{
            flexBasis: isMobile ? 'auto' : 380,
            flexShrink: 0,
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: 16,
            padding: 30,
          }}
        >
          {status === 'sent' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 200,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                color: '#1d2225',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {strings.success[lang]}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <label>
                <span>{strings.field_name[lang]}</span>
                <input type="text" name="name" required />
              </label>

              <label>
                <span>{strings.field_email[lang]}</span>
                <input type="email" name="email" required />
              </label>

              <label>
                <span>{strings.field_message[lang]}</span>
                <textarea name="message" rows={4} required />
              </label>

              {status === 'error' && (
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: '#c0392b', margin: '0 0 10px' }}>
                  {lang === 'polish' ? 'Coś poszło nie tak. Spróbuj ponownie.' : 'Something went wrong. Please try again.'}
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.6 : 1 }}>
                {status === 'sending'
                  ? (lang === 'polish' ? 'Wysyłanie…' : 'Sending…')
                  : strings.submit[lang]}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
