import { useState } from 'react';
import { Box, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';
import GalleryLightbox from '../components/GalleryLightbox';

const imageModules = import.meta.glob('../assets/portfolio/*.{jpg,jpeg,png,webp}', { eager: true });
const images = Object.keys(imageModules)
  .sort()
  .map(key => ({ src: (imageModules[key] as any).default }));

export default function Gallery() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box
      sx={{
        overflow: 'auto',
        height: { xs: 'calc(100vh - 100px)', md: '100vh' },
        paddingTop: { xs: '100px', md: '0px' },
      }}
    >
      <ImageList variant="masonry" cols={isSmallScreen ? 2 : 4} gap={5}>
        {images.map((image, index) => (
          <ImageListItem
            key={index}
            onClick={() => setOpenIndex(index)}
            sx={{
              cursor: 'zoom-in',
              '& img': { transition: 'opacity 0.2s' },
              '&:hover img': { opacity: 0.8 },
            }}
          >
            <img
              srcSet={`${image.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.src}?w=248&fit=crop&auto=format`}
              loading="lazy"
              alt={`Gallery Image ${index + 1}`}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <GalleryLightbox
        images={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(i) => setOpenIndex(i)}
      />
    </Box>
  );
}
