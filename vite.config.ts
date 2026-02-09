import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ROYAL-CAKES-AND-BAKES/', // Set base path for GitHub Pages deployment
  plugins: [vue()]
});
