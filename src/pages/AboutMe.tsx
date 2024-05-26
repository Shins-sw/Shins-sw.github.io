import { useLanguage } from '../context/LanguageProvider';
import aboutme from '../language/aboutme';
import { Container } from '@mui/material';

export default function AboutMe() {
  const { lang } = useLanguage();
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {aboutme.title[lang]}
      {aboutme.description[lang]}
    </Container>
  );
}
