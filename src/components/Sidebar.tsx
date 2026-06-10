// @ts-nocheck
import { Drawer, Stack, useMediaQuery, IconButton, Divider, Box } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FaceLogo from './Sidebar/FaceLogo';
import Menu from './Sidebar/Menu';
import SignLogo from './Sidebar/SignLogo';
import Social from './Sidebar/Social';
import Footer from './Sidebar/Footer';
import theme from '../theme/theme';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import szymonLogo from '../assets/Szymon_logo_new.png';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidthDesktop = '350px';
  const drawerHeightMobile = '100px';
  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <Drawer
      open={true}
      variant="persistent"
      anchor={isSmallScreen ? 'top' : 'left'}
      sx={{
        width: { xs: '100vw', md: drawerWidthDesktop },
        height: { xs: 0, md: '100%' },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: { xs: '100vw', md: drawerWidthDesktop },
          height: { xs: drawerHeightMobile, md: '100%' },
          boxSizing: 'border-box',
          padding: { xs: '0px', md: '20px' },
        },
      }}
    >
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        justifyContent={{ xs: 'left', md: 'center' }}
        alignItems="center"
        height={{ xs: '100px', md: 'auto' }}
        width={{ xs: '100%' }}
        spacing={3}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          sx={{
            display: { xs: 'block', md: 'none' },
            color: 'white',
          }}
          onClick={openDrawer}
        >
          <MenuIcon sx={{ fontSize: '60px', paddingLeft: '16px' }} />
        </IconButton>
        <SignLogo display={{ xs: 'none', md: 'block' }} />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <FaceLogo />
        </Box>
        <SignLogo display={{ xs: 'block', md: 'none' }} />
        <Social />
        <Menu display={{ xs: 'none', md: 'flex' }} />
        <Footer />
        <SwipeableDrawer
          open={open}
          onClose={closeDrawer}
          onOpen={openDrawer}
          disableSwipeToOpen={true}
          sx={{
            marginTop: '100px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              boxSizing: 'border-box',
              padding: { xs: '0', md: '20px' },
              marginTop: '100px',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
            <img src={szymonLogo} alt="Szymon" style={{ width: '60px', objectFit: 'contain' }} />
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
          <Menu
            display={{ xs: 'flex', md: 'none' }}
            closeSidebarHandler={closeDrawer}
          ></Menu>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 1 }} />
          <Social display={{ xs: 'flex', md: 'none' }} iconSize="22px" direction="column" />
        </SwipeableDrawer>
      </Stack>
    </Drawer>
  );
}
