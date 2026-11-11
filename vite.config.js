import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminModular: resolve(__dirname, 'admin/index.html'),
        ticketDetail: resolve(__dirname, 'ticket-detail.html'),
        cekTiket: resolve(__dirname, 'cek-tiket.html'),
        payment: resolve(__dirname, 'payment.html'),
        eTicket: resolve(__dirname, 'e-ticket.html')
      }
    }
  },
  server: {
    port: 5173,
    allowedHosts: [
      'api.haisen.my.id',
      'haisen.my.id',
      'www.haisen.my.id',
      'pendaftaran-running.haisen.my.id',
      'tegalrun2027.com',
      'www.tegalrun2027.com'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
