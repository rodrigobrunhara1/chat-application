import { io } from 'socket.io-client';

export const socket = io("https://chat-application-server-ten.vercel.app", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  },
  forceNew: true,
  transports: ['websocket']
});

// emit => emitir alguma informação
// on => escutando alguma informação

socket.on("connect", () => {
  console.log("Connect:", socket.connected); // true
});
