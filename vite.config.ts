import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    assetsInlineLimit: 1024000, // 设置为0表示所有资源都不内联，可根据需要调整大小阈值
    minify: 'esbuild', // 使用 esbuild 进行代码压缩
    chunkSizeWarningLimit: 1500, // 调整 chunk 大小警告阈值
    rollupOptions: {
      onwarn: () => {},
      output: {
        // 拆分大型依赖
        manualChunks: {
          antd: ['antd'],
          formily: ['@formily/core', '@formily/react', '@formily/antd-v5'],
          leaflet: ['leaflet', 'proj4', 'proj4leaflet'],
        },
      },
    },
  },
});
