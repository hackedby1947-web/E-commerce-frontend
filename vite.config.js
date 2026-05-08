
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ES Modules এর জন্য __dirname তৈরি
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],

//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // import সহজ করার জন্য
//     },
//   },

//   build: {
//     chunkSizeWarningLimit: 1000, // kB, বড় chunk warning কমানোর জন্য

//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           // node_modules আলাদা chunk এ ভাগ করা
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom')) {
//               return 'react-vendor';
//             }
//             if (id.includes('lodash')) {
//               return 'lodash-vendor';
//             }
//             return 'vendor';
//           }
//         },
//       },
//     },

//     terserOptions: {
//       compress: {
//         drop_console: true, // production থেকে console remove
//       },
//     },
//   },

//   server: {
//     port: 5173,
//     open: true,
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    
    // ✅ নতুন: CSS code splitting
    cssCodeSplit: true,
    
    // ✅ নতুন: minify চালু রাখুন
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },

    rollupOptions: {
      output: {
        // ✅ আরও ভালো chunk splitting
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('socket.io')) return 'socket-vendor';
            if (id.includes('@tanstack')) return 'query-vendor';
            if (id.includes('lucide') || id.includes('react-icons')) return 'icons-vendor';
            return 'vendor';
          }
        },
      },
    },
  },

  server: { port: 5173, open: true },
});