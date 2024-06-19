import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageProvider';
import { Stack, Typography } from '@mui/material';
import sidebar from '../../language/sidebar';

export default function Menu({ display, closeSidebarHandler }) {
  const { lang } = useLanguage();
  const closeSidebar = () => {
    closeSidebarHandler();
  };

  const links = [
    { to: 'aboutme', text: sidebar.aboutme[lang] },
    { to: 'gallery', text: sidebar.portfolio[lang] },
  ];

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ paddingTop: { xs: '5px', md: '7vh' }, display: display }}
    >
      {links.map((link, index) => (
        <Typography
          key={index}
          onClick={closeSidebar}
          variant="menu_link"
          sx={{
            paddingTop: { xs: '15px', md: '0' },
            paddingLeft: { xs: '15px', md: '0' },
            paddingRight: { xs: '15px', md: '0' },
            '&:hover': { filter: 'grayscale(0.3)' },
            '& a': { textDecoration: 'none' },
          }}
        >
          <Link to={link.to}>{link.text}</Link>
        </Typography>
      ))}
    </Stack>
  );
}
