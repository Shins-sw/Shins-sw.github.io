import logo from '../../assets/Szymon_logo_new.png';
import { Link } from 'react-router-dom';
import Image from 'mui-image';

export default function FaceLogo() {
  return (
    <Link to="/">
      <Image
        src={logo}
        // @ts-expect-error package doesnt include a sx prop
        sx={{
          maxWidth: { xs: '70px', md: '305px' },
          minWidth: { xs: '70px', md: '305px' },
        }}
        duration={0}
      />
    </Link>
  );
}
