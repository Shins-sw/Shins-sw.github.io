import ResponsiveGallery from 'react-responsive-gallery';

export default function Gallery() {
  const images = [
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background_sidebar.jpeg',
    },
    {
      src: './src/assets/background.png',
    },
    {
      src: './src/assets/background2.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
    {
      src: './src/assets/background.jpg',
    },
  ];
  return (
    <div className="image-gallery">
      <ResponsiveGallery media={images} />
    </div>
  );
}
