import react from '@vitejs/plugin-react';
import { VitePluginVue } from '@vitejs/plugin-vue';

export default {
  plugins: [
    react(),
    VitePluginVue({
      include: [/\.vue$/, /\.md$/], // Dodaj wszystkie niezbędne rozszerzenia plików Vue
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
};
