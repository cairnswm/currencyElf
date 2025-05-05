import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/exchange/', // Sets the base path for the installation to /exchange
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
