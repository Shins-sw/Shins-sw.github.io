import { useEffect, useRef } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme/theme';

interface Props {
  images: { src: string }[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({ images, openIndex, onClose, onNavigate }: Props) {
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
    return () => window.removeEventListener('keydown', handleKey);
  }, [openIndex, isOpen, images.length, onNavigate, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (openIndex === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) onNavigate((openIndex + 1) % images.length);
    if (delta < -50) onNavigate((openIndex - 1 + images.length) % images.length);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={isFullScreen}
      maxWidth={false}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(0,0,0,0.92)',
          boxShadow: 'none',
          borderRadius: isFullScreen ? 0 : '4px',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(0,0,0,0.85)' },
        },
      }}
    >
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: { sm: '60vw' },
          minHeight: { sm: '60vh' },
          p: { xs: '60px 16px', sm: '40px 80px', md: '40px 80px' },
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Prev arrow — desktop/tablet only */}
        <IconButton
          onClick={() => openIndex !== null && onNavigate((openIndex - 1 + images.length) % images.length)}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            left: 12,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.15)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
          }}
        >
          <ArrowBackIosIcon sx={{ ml: '4px' }} />
        </IconButton>

        {/* Image */}
        {openIndex !== null && (
          <Box
            component="img"
            src={images[openIndex].src}
            alt={`Gallery image ${openIndex + 1}`}
            sx={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              WebkitUserDrag: 'none',
            }}
          />
        )}

        {/* Next arrow — desktop/tablet only */}
        <IconButton
          onClick={() => openIndex !== null && onNavigate((openIndex + 1) % images.length)}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            right: 12,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.15)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
}
