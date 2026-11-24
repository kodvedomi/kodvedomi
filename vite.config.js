import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relativní cesty – složku dist lze nahrát FileZillou kamkoli na Wedos.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: 4096, chunkSizeWarningLimit: 900 }
});
