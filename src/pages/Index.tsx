import { useLanguage } from '../context/LanguageProvider';
import index from '../language';
import { Container, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';

export default function Index() {
  const { lang } = useLanguage();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: isSmallScreen ? '63vh' : '100vh',
        }}
      >
        {index.title[lang]}
      </Container>
    </>
  );
}
