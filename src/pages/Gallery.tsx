import background_image from '../assets/background.jpg';
import { Container, ImageList, ImageListItem } from '@mui/material';

export default function Gallery() {
  const images = [
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
    {
      src: background_image,
    },
  ];
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ImageList variant="masonry" cols={3} gap={5}>
        {images.map((image) => (
          <ImageListItem>
            <img
              srcSet={`${image.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.src}?w=248&fit=crop&auto=format`}
              loading="lazy"
            ></img>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
