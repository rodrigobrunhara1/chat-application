import Message from "../database/schemas/Message";


class MessageController {

    async create(responseMessage: any) {
        const { userId, description, room, name, typeUser } = responseMessage;
        try {
            await Message.create({
                userId,
                description,
                room,
                name,
                typeUser
            })
        } catch (error) {
            console.error(error);
            process.exit(1);

        }
    }

    async get(room: string) {

        try {

            const messages = await Message.find({ room });
            return messages;

        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

}

export default new MessageController;