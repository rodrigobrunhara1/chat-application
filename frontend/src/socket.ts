import { io } from 'socket.io-client';

export const socket = io("https://vercel.com/rodrigobrunhara/chat-application-server");

// emit => emitir alguma informação
// on => escutando alguma informação

socket.on("connect", () => {
  console.log("Connect:", socket.connected); // true
});
