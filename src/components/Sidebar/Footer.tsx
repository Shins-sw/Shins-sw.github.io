import polishFlag from '../../assets/poland_flag.gif';
import englishFlag from '../../assets/english_flag.png';
import { useLanguage } from '../../context/LanguageProvider';
import { Language } from '../../context/LanguageProvider';
import { Box } from '@mui/material';
import Image from 'mui-image';

export default function Footer() {
  const { setLang } = useLanguage();
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        display: 'flex',
        gap: '10px',
      }}
    >
      <Image
        src={polishFlag}
        onClick={() => setLang(Language.polish)}
        height="30px"
        width="50px"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      ></Image>
      <Image
        src={englishFlag}
        onClick={() => setLang(Language.english)}
        height="30px"
        width="50px"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      ></Image>
    </Box>
  );
}
