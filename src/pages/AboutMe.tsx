import { useLanguage } from '../context/LanguageProvider';
import aboutme from '../language/aboutme';
import { Container, Box, Typography } from '@mui/material';

export default function AboutMe() {
  const { lang } = useLanguage();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: { xs: 'flex-start', md: 'center' },
        height: { xs: 'calc(100vh - 100px)', md: '100vh' },
        marginTop: { xs: '100px', md: 0 },
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
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: '1.4rem', md: '2.125rem' }, mb: 2, color: 'white' }}
        >
          {aboutme.title[lang]}
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.7, color: 'white' }}
        >
          {aboutme.description[lang]}
        </Typography>
      </Box>
    </Container>
  );
}
