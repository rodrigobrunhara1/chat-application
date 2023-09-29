import MessageController from "./controller/MessageController";
import { io } from "./http";
import { receivedMessage } from "./openai";


var obj = {
    userId: 1,
    description: 'Oi meu povo, tudo bem?',
}
// receivedMessage("Olá");
MessageController.create(obj);

console.log('Server running! ::)')
