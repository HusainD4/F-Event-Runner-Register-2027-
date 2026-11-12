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
      withCredentials: true
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

export function subscribeRealtimeEvent(eventName, handler) {
  const realtimeSocket = getRealtimeSocket();
  realtimeSocket.off(eventName, handler);
  realtimeSocket.on(eventName, handler);
  return () => realtimeSocket.off(eventName, handler);
}

export function connectRealtimeSocket() {
  const realtimeSocket = getRealtimeSocket();
  if (!realtimeSocket.connected) realtimeSocket.connect();
  return realtimeSocket;
}

export function disconnectRealtimeSocket() {
  socket?.disconnect();
}
