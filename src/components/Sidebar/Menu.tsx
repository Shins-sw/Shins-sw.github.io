import sidebar from '../../language/sidebar';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageProvider';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import theme from '../../theme/theme';

export default function Menu() {
  const { lang } = useLanguage();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack
      direction={isSmallScreen ? 'row' : 'column'}
      alignItems="center"
      justifyContent="center"
      sx={{
        paddingTop: isSmallScreen ? '5px' : '7vh',
        textDecoration: 'none',
      }}
    >
      <Typography
        variant="menu_link"
        sx={{
          paddingLeft: isSmallScreen ? '15px' : '0',
          '&:hover': { filter: 'grayscale(0.3)' },
          '& a': { textDecoration: 'none' },
        }}
      >
        <Link to="aboutme">{sidebar.aboutme[lang]}</Link>
      </Typography>
      <Typography
        variant="menu_link"
        sx={{
          paddingLeft: isSmallScreen ? '15px' : '0',
          '&:hover': { filter: 'grayscale(0.3)' },
          '& a': { textDecoration: 'none' },
        }}
      >
        <Link to="gallery">{sidebar.portfolio[lang]}</Link>
      </Typography>
      <Typography
        variant="menu_link"
        sx={{
          paddingLeft: isSmallScreen ? '15px' : '0',
          '&:hover': { filter: 'grayscale(0.3)' },
          '& a': { textDecoration: 'none' },
        }}
      >
        <Link to="cv">{sidebar.cv[lang]}</Link>
      </Typography>
    </Stack>
  );
}
