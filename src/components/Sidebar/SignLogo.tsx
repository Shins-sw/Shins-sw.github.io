import Image from 'mui-image';
import logo from '../../assets/Shins_logo.png';
import logo2 from '../../assets/Shins_logo_vertical.png';
import { Box, useMediaQuery } from '@mui/material';
import theme from '../../theme/theme';

export default function SignLogo() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Image
        src={isSmallScreen ? logo2 : logo}
        sx={{ maxWidth: '30vw', maxHeight: '25vh' }}
      ></Image>
    </Box>
  );
}
