import { isServerAvailable, monitorServer } from './server-status.js';

async function startHome() {
  if (await isServerAvailable()) {
    try {
      await import('./app.js');
      document.getElementById('serverCheck')?.remove();

      monitorServer((available) => {
        if (!available && !document.getElementById('regModal')?.classList.contains('active')) {
          window.location.replace('/dummy_site.html');
        }
      });
    } catch (error) {
      console.error('Halaman utama gagal dimuat:', error);
      document.getElementById('serverCheck').textContent = 'Halaman utama gagal dimuat. Silakan muat ulang halaman.';
    }
  } else {
    window.location.replace('/dummy_site.html');
  }
}

startHome();
