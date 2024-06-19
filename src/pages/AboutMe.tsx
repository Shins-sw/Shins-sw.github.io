import { useLanguage } from '../context/LanguageProvider';
import aboutme from '../language/aboutme';
import { Container, Box } from '@mui/material';

export default function AboutMe() {
  const { lang } = useLanguage();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: '100vh', md: '100vh' },
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        <h1>{aboutme.title[lang]}</h1>
        <p>{aboutme.description[lang]}</p>
      </Box>
    </Container>
  );
}
