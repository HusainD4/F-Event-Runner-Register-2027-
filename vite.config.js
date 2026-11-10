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
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});

