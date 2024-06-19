import polishFlag from '../../assets/poland_flag.gif';
import englishFlag from '../../assets/english_flag.png';
import { useLanguage, Language } from '../../context/LanguageProvider';
import { Box } from '@mui/material';
import Image from 'mui-image';

export default function Footer() {
  const { setLang } = useLanguage();
  const flags = [
    { src: polishFlag, lang: Language.polish, alt: 'Polish Flag' },
    { src: englishFlag, lang: Language.english, alt: 'English Flag' },
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '10px',
      }}
    >
      {flags.map((flag, index) => (
        <Image
          key={index}
          src={flag.src}
          // @ts-expect-error package doesnt include a onClick prop
          onClick={() => setLang(flag.lang)}
          height="30px"
          width="50px"
          alt={flag.alt}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          duration={0}
        />
      ))}
    </Box>
  );
}
