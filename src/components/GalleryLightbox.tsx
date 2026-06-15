import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  images: { src: string }[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({ images, openIndex, onClose, onNavigate }: Props) {
  const touchStartX = useRef(0);
  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === 'ArrowRight') onNavigate((openIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((openIndex - 1 + images.length) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, isOpen, images.length, onNavigate, onClose]);

  if (!isOpen || openIndex === null) return null;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) onNavigate((openIndex! + 1) % images.length);
    if (delta < -50) onNavigate((openIndex! - 1 + images.length) % images.length);
  }

  const btnBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    borderRadius: '50%',
    width: 44,
    height: 44,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
    transition: 'background 0.2s',
  };

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          cursor: 'pointer',
          color: '#fff',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate((openIndex - 1 + images.length) % images.length); }}
        style={{ ...btnBase, left: 12 }}
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ padding: '60px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={images[openIndex].src}
          alt={`Gallery image ${openIndex + 1}`}
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            display: 'block',
            userSelect: 'none',
            borderRadius: 4,
          }}
          draggable={false}
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate((openIndex + 1) % images.length); }}
        style={{ ...btnBase, right: 12 }}
        aria-label="Next"
      >
        ›
      </button>
    </div>,
    document.body
  );
}
