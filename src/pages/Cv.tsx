import { Container } from '@mui/material';
import cv from '../assets/cv.pdf';
export default function Cv() {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <iframe src={cv} width="850" height="870"></iframe>
    </Container>
  );
}
