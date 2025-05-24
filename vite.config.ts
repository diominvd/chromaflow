import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['lib/**/*'],
      exclude: ['node_modules/**', 'dist/**'],
      outDir: 'dist/types',
      rollupTypes: true
    }),
    libInjectCss(),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false,
      },
    },
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'chromaflow',
      formats: ['es'],
      fileName: () => `index.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        minifyInternalExports: true,
        compact: true,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'index.css'
      }
    }
  },
  publicDir: 'lib/public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
    }
  },
});
