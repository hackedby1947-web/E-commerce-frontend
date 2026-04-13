// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })


// vite.config.js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modules এর জন্য __dirname তৈরি
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // import সহজ করার জন্য
    },
  },

  build: {
    chunkSizeWarningLimit: 1000, // kB, বড় chunk warning কমানোর জন্য

    rollupOptions: {
      output: {
        manualChunks(id) {
          // node_modules আলাদা chunk এ ভাগ করা
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lodash')) {
              return 'lodash-vendor';
            }
            return 'vendor';
          }
        },
      },
    },

    terserOptions: {
      compress: {
        drop_console: true, // production থেকে console remove
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});