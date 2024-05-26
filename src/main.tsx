import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import Gallery from './pages/Gallery';
import AboutMe from './pages/AboutMe';
import Cv from './pages/Cv';
import Index from './pages/Index';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'cv', element: <Cv /> },
      { path: 'aboutme', element: <AboutMe /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
