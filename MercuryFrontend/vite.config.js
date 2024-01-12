import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { VitePluginVue } from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.REACT_APP_BACKEND_API_BASE_URL': `"${process.env.REACT_APP_BACKEND_API_BASE_URL}"`
  },
  plugins: [
    react(),
    VitePluginVue({ 
      include: [/\.vue$/, /\.md$/], // Add all neccessary Vue file extensions
    }),
  ],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    include: ['@mui/lab'],
  },
});
