import { defineConfig } from 'vite';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
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
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'chromaflow',
      formats: ['es'],
      fileName: () => `index.js`
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
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
