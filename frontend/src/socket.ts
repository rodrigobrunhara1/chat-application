import { io } from 'socket.io-client';

export const socket = io("http://localhost:3350", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  },
  transports: ['websocket']
});

socket.on("connect", () => {
  console.log("Connect:", socket.connected);
});
