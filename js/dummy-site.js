import { monitorServer } from './server-status.js';

const button = document.getElementById('retryServer');
const message = document.getElementById('connectionMessage');

const check = monitorServer((available) => {
  if (available) {
    window.location.replace('/');
  } else {
    message.textContent = 'Server belum dapat dijangkau. Kami akan mencoba lagi secara otomatis.';
  }
});

button.addEventListener('click', async () => {
  button.disabled = true;
  message.textContent = 'Memeriksa koneksi server...';
  try {
    await check();
  } finally {
    button.disabled = false;
  }
});

check();
