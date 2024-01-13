import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env.REACT_APP_BACKEND_API_BASE_URL': `"${process.env.REACT_APP_BACKEND_API_BASE_URL}"`
  },
  plugins: [
    react()

  ],
  server: {
    host: true,
    port: 3000, // Port used by docker container
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ['@mui/lab'],
  },
});
