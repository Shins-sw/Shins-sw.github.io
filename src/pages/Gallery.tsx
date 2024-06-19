import portfolio from '../assets/portfolio/portfolio';
import { Box, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';

export default function Gallery() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const images = portfolio.map((img) => {
    return { src: img };
  });

  return (
    <Box
      sx={{
        overflow: 'auto',
        height: { xs: 'calc(100vh - 100px)', md: '100vh' },
        paddingTop: { xs: '190px', md: '0px' },
      }}
    >
      <ImageList variant="masonry" cols={isSmallScreen ? 2 : 4} gap={5}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${image.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.src}?w=248&fit=crop&auto=format`}
              loading="lazy"
              alt={`Gallery Image ${index + 1}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
