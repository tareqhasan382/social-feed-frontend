import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (token?: string) => {
  if (!socket && token) {
    console.log('[Socket] Initializing socket connection...');
    socket = io(`${import.meta.env.VITE_APP_BASE_URL}/realtime`, {
      auth: { token },
      transports: ['websocket'],
      autoConnect: false,
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected to realtime namespace. ID:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected. Reason:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error);
    });
  } else if (socket && token) {
    socket.auth = { token };
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
