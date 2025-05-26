import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  if (isDev) {
    return {
      plugins: [react()],
      root: 'test',
      resolve: {
        alias: {
          '@': resolve(__dirname, './lib'),
          '@react': resolve(__dirname, './lib/frameworks/react')
        }
      }
    };
  }

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ['lib/**/*'],
        exclude: ['node_modules/**', 'dist/**'],
        outDir: 'dist/types'
      }),
      libInjectCss()
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/index.ts'),
        name: 'chromaflow',
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          assetFileNames: 'index.css',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      sourcemap: false
    },
    publicDir: 'lib/public',
    resolve: {
      alias: {
        '@': resolve(__dirname, './lib'),
        '@react': resolve(__dirname, './lib/frameworks/react')
      }
    }
  };
});
