import FaceLogo from './Sidebar/FaceLogo';
import Menu from './Sidebar/Menu';
import SignLogo from './Sidebar/SignLogo';
import Social from './Sidebar/Social';
import Footer from './Sidebar/Footer';
import { Drawer, Stack, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';

export default function Sidebar() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = isSmallScreen ? '100vw' : 350;
  return (
    <Drawer
      open={true}
      variant="persistent"
      anchor={isSmallScreen ? 'top' : 'left'}
      sx={{
        width: drawerWidth,
        height: isSmallScreen ? '300px' : '100vh',
        '& .MuiDrawer-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: drawerWidth,
          boxSizing: 'border-box',
          padding: '20px',
          height: isSmallScreen ? '300px' : '100vh',
        },
      }}
    >
      <Stack
        direction={isSmallScreen ? 'row' : 'column'}
        justifyContent="center"
        alignItems="center"
        height={isSmallScreen ? '230px' : 'auto'}
      >
        <SignLogo />
        <FaceLogo />
        <Social />
        {!isSmallScreen && <Menu />}
      </Stack>
      {isSmallScreen && <Menu />}
      {!isSmallScreen && <Footer />}
    </Drawer>
  );
}
