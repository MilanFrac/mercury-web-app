import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    //'process.env.REACT_APP_BACKEND_API_BASE_URL': `"${process.env.REACT_APP_BACKEND_API_BASE_URL}"`,
    'process.env.REACT_APP_BACKEND_API_BASE_URL': `"http://localhost:8080"`,
    'process.env.REACT_APP_PUBLIC_URL': `"/mercury-web-app"`
  },
  plugins: [react()],
  base: '/mercury-web-app',
  server: {
    host: true,
    port: 3000, // Port used by docker container
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  optimizeDeps: {
    esbuildOptions: { define: { global: 'globalThis' } }
    //include: ['@mui/lab']
  }
});
