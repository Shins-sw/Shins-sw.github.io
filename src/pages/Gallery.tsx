import ResponsiveGallery from 'react-responsive-gallery';
import background_image from '../assets/background.jpg';
import './Gallery.css';

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
  ];
  return (
    <div className="image-gallery">
      <ResponsiveGallery media={images} />
    </div>
  );
}
