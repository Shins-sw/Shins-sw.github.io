import logo from '../../assets/Szymon_logo_new.png';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Image from 'mui-image';

export default function FaceLogo() {
  return (
    <Link to="/">
      <Image src={logo} sx={{ maxWidth: '30vw' }}></Image>
    </Link>
  );
}
