import MessageController from "./controller/MessageController";
import { io } from "./http";
import { receivedMessageChatGpt } from "./openai";

interface RoomUser {
    socket_id: string,
    userId: number | undefined,
    room: string
}

const users: RoomUser[] = [];
io.on("connection", socket => {
    console.log('connection,select_room');
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
        console.log('select_room');
        const messageRoom = MessageController.get(data.room).then((res) => {
            console.log('then', res);
            callback(res);
        });
    });

    socket.on("input_message", async (data: any, callback) => {
        io.to(data.room).emit("update_room", [data]);
        const textGpt = await receivedMessageChatGpt(data.description);
        const insertUser = await MessageController.create(data);
        const insertGPT = await MessageController.create({ userId: 2, description: textGpt, room: data.room });
        const messageRoom = await MessageController.get(data.room);
        await Promise.all([textGpt, insertGPT, insertUser, messageRoom]).then((response) => {
            io.to(data.room).emit("update_room", [response[3]?.pop()]);
            io.to(data.room).emit('typping_message_api', false);
        });
    });

    socket.on("typping_message", (data) => {
        io.to(data.room).emit('typping_message_api', true);
    })
});

console.log('Server running! ::)')
