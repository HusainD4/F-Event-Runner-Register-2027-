import { io } from 'socket.io-client';
import { API_BASE_URL } from './api.js';

let socket;
let hasConnected = false;

function getSocketUrl() {
  if (API_BASE_URL.startsWith('/')) return window.location.origin;
  return API_BASE_URL.replace(/\/api\/?$/, '');
}

export function getRealtimeSocket() {
  if (!socket) {
    socket = io(getSocketUrl(), {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true,
      auth: {}
    });

    socket.on('connect', () => {
      if (hasConnected) {
        window.dispatchEvent(new CustomEvent('realtime:reconnected'));
      }
      hasConnected = true;
    });
  }

  return socket;
}

export function connectRealtimeSocket(adminToken) {
  const realtimeSocket = getRealtimeSocket();
  if (adminToken) {
    realtimeSocket.auth = { token: adminToken };
    if (realtimeSocket.connected) realtimeSocket.disconnect();
  }
  if (!realtimeSocket.connected) realtimeSocket.connect();
  return realtimeSocket;
}

export function disconnectRealtimeSocket() {
  socket?.disconnect();
}
