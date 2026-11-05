import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [react(), imagetools()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        palette: resolve(__dirname, 'palette/index.html'),
      },
    },
  },
});
