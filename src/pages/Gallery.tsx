import { useState } from 'react';
import { useLanguage } from '../context/LanguageProvider';
import { useIsMobile } from '../hooks/useIsMobile';
import GalleryLightbox from '../components/GalleryLightbox';
import './Gallery.css';

const illustrationThumbs = import.meta.glob(
  '../assets/portfolio/illustration/*.{jpg,jpeg,png,webp}',
  { eager: true, query: { w: 600, format: 'webp', as: 'url' } }
);
const illustrationOrig = import.meta.glob(
  '../assets/portfolio/illustration/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const sketchesThumbs = import.meta.glob(
  '../assets/portfolio/sketches/*.{jpg,jpeg,png,webp}',
  { eager: true, query: { w: 600, format: 'webp', as: 'url' } }
);
const sketchesOrig = import.meta.glob(
  '../assets/portfolio/sketches/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

function buildImages(
  thumbMods: Record<string, unknown>,
  origMods: Record<string, unknown>,
  category: string
) {
  return Object.keys(origMods)
    .sort()
    .map((key) => {
      const thumbMod = thumbMods[key];
      const thumb =
        typeof thumbMod === 'string'
          ? thumbMod
          : (thumbMod as { default: string }).default;
      return {
        src: (origMods[key] as { default: string }).default,
        thumb,
        category,
      };
    });
}

const allImages = [
  ...buildImages(illustrationThumbs, illustrationOrig, 'illustration'),
  ...buildImages(sketchesThumbs, sketchesOrig, 'sketches'),
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'illustration', label: 'Illustration' },
  { key: 'sketches', label: 'Sketches' },
];

export default function Gallery() {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? allImages : allImages.filter((img) => img.category === filter);

  return (
    <div
      style={{
        minHeight: isMobile ? 'calc(100vh - 98px)' : '100vh',
        overflowY: 'auto',
        padding: isMobile ? '24px 18px 32px' : '48px 56px 48px',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 5,
              color: '#cdd7df',
              textTransform: 'uppercase',
              textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            }}
          >
            {lang === 'polish' ? 'Galeria' : 'Gallery'}
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: isMobile ? 30 : 48,
              color: '#f5f7f8',
              margin: '8px 0 0',
              lineHeight: 1,
              textShadow: '0 3px 24px rgba(0,0,0,0.6)',
            }}
          >
            Portfolio
          </h2>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setFilter(key); setOpenIndex(null); }}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: isMobile ? 12 : 13,
                color: filter === key ? '#f2f4f5' : '#2f373c',
                background: filter === key ? 'rgba(28,32,35,0.85)' : 'rgba(255,255,255,0.45)',
                border: filter === key ? 'none' : '1px solid rgba(255,255,255,0.55)',
                borderRadius: 20,
                padding: isMobile ? '6px 14px' : '8px 18px',
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="gallery-grid">
        {filtered.map((image, index) => (
          <div
            key={image.src}
            className="gallery-cell"
            onClick={() => setOpenIndex(index)}
          >
            <img
              src={image.thumb}
              alt={`Portfolio ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        images={filtered.map((i) => ({ src: i.src }))}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(i) => setOpenIndex(i)}
      />
    </div>
  );
}
