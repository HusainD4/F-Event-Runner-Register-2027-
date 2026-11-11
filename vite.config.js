import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    appType: 'mpa',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
          adminModular: resolve(__dirname, 'admin/index.html'),
          ticketDetail: resolve(__dirname, 'ticket-detail.html'),
          cekTiket: resolve(__dirname, 'cek-tiket.html'),
          payment: resolve(__dirname, 'payment.html'),
          eTicket: resolve(__dirname, 'e-ticket.html'),
          notFound: resolve(__dirname, '404.html'),
          serverError: resolve(__dirname, '500.html'),
          serviceUnavailable: resolve(__dirname, '503.html')
        }
      }
    },
    server: {
      port: 5173,
      allowedHosts: ['siexa.haisen.my.id'],
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  };
});
