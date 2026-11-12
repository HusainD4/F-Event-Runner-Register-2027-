import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_DEV_API_PROXY_TARGET || 'http://127.0.0.1:3000';

  return {
    appType: 'mpa',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
          adminModular: resolve(__dirname, 'admin/index.html'),
          racepackLive: resolve(__dirname, 'racepack-live.html'),
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
      allowedHosts: ['siexa.haisen.my.id', 'localhost', '127.0.0.1','api.haisen.my.id'],
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true
        },
        '/socket.io': {
          target: apiProxyTarget,
          changeOrigin: true,
          ws: true
        }
      }
    }
  };
});
