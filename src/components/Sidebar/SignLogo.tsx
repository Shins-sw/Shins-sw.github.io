// @ts-nocheck
import Image from 'mui-image';
import logo from '../../assets/Shins_logo.png';
import { Box } from '@mui/material';

export default function SignLogo({ display }) {
  return (
    <Box
      sx={{
        display: display,
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '0 80px 0 0', md: '20px 0' },
        width: '100%',
      }}
    >
      <Image
        duration={0}
        src={logo}
        // @ts-expect-error package doesnt include a sx prop
        sx={{
          maxWidth: { xs: '140px', md: '305px' },
          transitionProperty: 'none',
        }}
      />
    </Box>
  );
}
