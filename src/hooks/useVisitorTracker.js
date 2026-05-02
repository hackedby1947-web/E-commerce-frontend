// src/hooks/useVisitorTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socket from '../socket/socket.js';

// Session ID — browser বন্ধ না হওয়া পর্যন্ত same থাকবে
function getSessionId() {
  let sid = sessionStorage.getItem('vsid');
  if (!sid) {
    sid = crypto.randomUUID(); // uuid package ছাড়াই কাজ করে modern browser এ
    sessionStorage.setItem('vsid', sid);
  }
  return sid;
}

export default function useVisitorTracker() {
  const location = useLocation();
  const sessionId = getSessionId();

  useEffect(() => {
    // Socket connect করো
    if (!socket.connected) socket.connect();

    // Backend কে জানাও কোন page এ আছো
    socket.emit('visitor_join', {
      page: location.pathname,
      sessionId,
    });

    // Page leave হলে duration সহ backend কে জানাও
    const startTime = Date.now();

    const handleLeave = () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/visitors/leave`,
        new Blob(
          [JSON.stringify({ sessionId, page: location.pathname, duration })],
          { type: 'application/json' }
        )
      );
    };

    window.addEventListener('beforeunload', handleLeave);

    return () => {
      window.removeEventListener('beforeunload', handleLeave);
      handleLeave(); // page change হলেও call করো
    };
  }, [location.pathname]);

  // App unmount হলে disconnect
  useEffect(() => {
    return () => socket.disconnect();
  }, []);
}