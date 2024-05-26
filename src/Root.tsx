import Sidebar from './components/Sidebar';
import { Stack, useMediaQuery } from '@mui/material';
import theme from './theme/theme';
import { Outlet } from 'react-router-dom';

export default function Root() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Stack direction={isSmallScreen ? 'column' : 'row'}>
        <Sidebar></Sidebar>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Outlet></Outlet>
        </Stack>
      </Stack>
    </>
  );
}
