import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-react'],
      },
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`, // Optional, to auto-import React in `.js` files
    loader: 'jsx', // Allows JSX in .js files
  },
});
