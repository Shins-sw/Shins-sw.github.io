import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    menu_link: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    menu_link?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menu_link: true;
  }
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '24px',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 600,
      fontStyle: 'normal',
      color: 'black',
    },
    body1: {
      fontSize: '16px',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontStyle: 'normal',
      color: 'black',
    },
    menu_link: {
      fontFamily: 'Honk',
      fontSize: 30,
      fontWeight: 400,
      fontStyle: 'normal',
      filter: 'grayscale(1)',
    },
  },
  components: {},
});

export default theme;
