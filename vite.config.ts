import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const viteConfig = () => {
  const reactConf = {
    babel: {
      plugins: [['@emotion/babel-plugin', { autoLabel: 'dev-only', labelFormat: '[filename]--[local]' }]]
    }
  };

  return defineConfig({
    server: {
      open: true
    },
    plugins: [react(reactConf), tsconfigPaths()]
  });
};

// https://vite.dev/config/
export default viteConfig;
