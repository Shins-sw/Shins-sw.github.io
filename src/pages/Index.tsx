import { useLanguage } from '../context/LanguageProvider';
import index from '../language';
import { Container } from '@mui/material';

export default function Index() {
  const { lang } = useLanguage();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: {
          xs: '100vh',
          md: '100vh',
        },
        overflow: 'auto',
      }}
    >
      {index.title[lang]}
    </Container>
  );
}
