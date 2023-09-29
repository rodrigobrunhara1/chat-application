import Message from "../database/schemas/Message";


class MessageController {

    async create(responseMessage: any) {
        const { userId, description } = responseMessage;
        try {
            const message = await Message.create({
                userId,
                description
            })
            console.log("Creating message- OK!!");

        } catch (error) {
            console.log("Error creating message");
        }
    }

}

export default new MessageController;