import Sidebar from './components/Sidebar';
import { Stack, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Root() {
  const drawerWidthDesktop = '350px';
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Sidebar />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        width={{ xs: '100vw', md: `calc(100vw - ${drawerWidthDesktop})` }}
      >
        <Outlet />
      </Stack>
    </Box>
  );
}
