import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import Gallery from './pages/Gallery';
import AboutMe from './pages/AboutMe';
import Index from './pages/Index';
import Contact from './pages/Contact';
import { LanguageProvider } from './context/LanguageProvider';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <AboutMe /> },
      { path: 'portfolio', element: <Gallery /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);
