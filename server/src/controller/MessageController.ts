import Message from "../database/schemas/Message";


class MessageController {

    async create(responseMessage: any) {
        const { userId, description, room } = responseMessage;
        console.log(responseMessage);
        try {
            const message = await Message.create({
                userId,
                description,
                room
            })
            console.log("Creating message- OK!!");

        } catch (error) {
            console.log("Error creating message");
        }
    }

    async get(room: string) {

        try {
            const messages = await Message.find({
                room
            })

            console.log("get message- OK!!", messages);
            return messages;

        } catch (error) {
            console.log("Error get message");
        }
    }

}

export default new MessageController;