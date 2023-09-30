import { io } from 'socket.io-client';

export const socket = io("http://localhost:3330");

// emit => emitir alguma informação
// on => escutando alguma informação

socket.on("connect", () => {
  console.log("Connect:", socket.connected); // true
});
