import MessageController from "./controller/MessageController";
import { io } from "./http";
import { receivedMessageChatGpt } from "./openai";
import { CustomerService } from "./typing/CustomerService";
import { TypeUser } from "./typing/Enuns/TypeUser";
import { RoomUser } from "./typing/RoomUser";

const users: RoomUser[] = [];
var customerService: CustomerService = { userId: TypeUser.chatbot, room: 'sala-home' };

io.on("connection", socket => {
  socket.on("select_room", (data: any, callback) => {
    socket.join(data.room);
    const userInRoom = users.find(user => user.userId === data.userId && user.room === data.room);
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        userId: data.userId,
        socket_id: socket.id
      });
    }
    const messageRoom = MessageController.get(data.room).then((res) => {
      callback(res);
    });
  });

  socket.on("input_message", async (data: any, callback) => {
    io.to(data.room).emit("update_room", [data]);
    const textGpt = await receivedMessageChatGpt(data.description);
    const insertUser = await MessageController.create(data);
    var insertGPT;
    if (customerService?.userId === TypeUser.chatbot) {
      insertGPT = await MessageController.create({ userId: TypeUser.chatbot, name: 'Dito', typeUser: TypeUser.service, description: textGpt, room: data.room });
    }
    const messageRoom = await MessageController.get(data.room);
    await Promise.all([textGpt, insertGPT, insertUser, messageRoom]).then((response) => {
      if (customerService?.userId === TypeUser.chatbot) {
        io.to(data.room).emit("update_room", [response[3]?.pop()]);
      }
      io.to(data.room).emit('typping_message_api', false);
    });
  });

  socket.on("typping_message", (data) => {
    io.to(data.room).emit('typping_message_api', true);
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });

  socket.on("change_customer_service", async (data: CustomerService) => {
    customerService = data;
    const optionService = data.userId === TypeUser.client ? "Human Service" : "Smart Contact - Dito";
    const message = `🔒 You changed the chat contact method to ${optionService}.`;
    const messageSystem = { userId: TypeUser.system, name: 'Dito', description: message, room: data.room };
    const insertMessage = await MessageController.create(messageSystem);
    await Promise.all([insertMessage]).then((response) => {
      io.to(data.room).emit("update_room", [messageSystem]);
      io.to(data.room).emit("change_service", data.userId);

    });
  });

});