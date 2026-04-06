import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSocket } from '../redux/api/socket';
import type { RootState } from '../redux/store';

export const useRealtime = (postId?: string) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken || !postId) return;

    const socket = getSocket(accessToken);
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    // Join the room for this specific post
    socket.emit('joinPost', { postId });

    return () => {
      // Leave the room when the component unmounts
      socket.emit('leavePost', { postId });
    };
  }, [accessToken, postId]);
};
