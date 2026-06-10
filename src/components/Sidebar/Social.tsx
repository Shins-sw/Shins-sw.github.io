// @ts-nocheck
import { Link } from 'react-router-dom';
import instagram_icon from '../../assets/instagram_icon.svg';
import artstation_icon from '../../assets/artstation_icon.webp';
import email_icon from '../../assets/email_icon.png';
import { Stack } from '@mui/material';
import Image from 'mui-image';

export default function Social({
  display,
  iconSize = '30px',
  paddingRight = { xs: '50px', md: '0px' },
  direction = 'row',
}: {
  display?: object | string;
  iconSize?: string;
  paddingRight?: object | string;
  direction?: 'row' | 'column';
}) {
  const iconStyle = {
    filter: 'grayscale(1)',
    '&:hover': { filter: 'grayscale(0)' },
    '@media (hover: none)': { filter: 'grayscale(0)' },
  };

  return (
    <Stack
      direction={direction}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      width={{ xs: '100%', md: '200px' }}
      paddingRight={direction === 'column' ? 0 : paddingRight}
      display={display ?? { xs: 'none', md: 'flex' }}
    >
      <Link to="/" style={{ padding: '5px' }}>
        <Image src={instagram_icon} width={iconSize} sx={iconStyle} duration={0} />
      </Link>
      <Link to="/" style={{ padding: '5px' }}>
        <Image src={artstation_icon} width={iconSize} sx={iconStyle} duration={0} />
      </Link>
      <Link to="/" style={{ padding: '5px' }}>
        <Image src={email_icon} width={iconSize} sx={iconStyle} duration={0} />
      </Link>
    </Stack>
  );
}
