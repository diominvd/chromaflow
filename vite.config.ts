import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['lib/**/*'],
      exclude: ['node_modules/**', 'dist/**'],
      outDir: 'dist/types',
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'chromaflow',
      formats: ['es'],
      fileName: () => `chromaflow.js`
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: []
    }
  }
});
