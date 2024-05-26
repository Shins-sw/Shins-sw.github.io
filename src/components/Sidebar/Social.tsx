import { Link } from 'react-router-dom';
import instagram_icon from '../../assets/instagram_icon.svg';
import artstation_icon from '../../assets/artstation_icon.webp';
import email_icon from '../../assets/email_icon.png';
import { Stack, useMediaQuery } from '@mui/material';
import Image from 'mui-image';
import theme from '../../theme/theme';

export default function Social() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent="center">
      <Link to="/" style={{ padding: '5px' }}>
        <Image
          src={instagram_icon}
          width="30px"
          sx={{
            filter: 'grayscale(1)',
            '&:hover': { filter: 'grayscale(0)' },
          }}
        ></Image>
      </Link>
      <Link to="/" style={{ padding: '5px' }}>
        <Image
          src={artstation_icon}
          width="30px"
          sx={{
            filter: 'grayscale(1)',
            '&:hover': { filter: 'grayscale(0)' },
          }}
        ></Image>
      </Link>
      <Link to="/" style={{ padding: '5px' }}>
        <Image
          src={email_icon}
          width="30px"
          sx={{
            filter: 'grayscale(1)',
            '&:hover': { filter: 'grayscale(0)' },
          }}
        ></Image>
      </Link>
    </Stack>
  );
}
