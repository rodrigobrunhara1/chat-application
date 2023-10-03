import mongoose from "mongoose";

const Message = new mongoose.Schema({
    userId: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    typeUser: {
        type: Number,
        require: true,
    },
    room: {
        type: String,
        require: true,
        default: 'sala-home',
    },
    createdAt: {
        type: Date
    },

});

Message.pre("save", async function (next) {
    const data = new Date();
    this.createdAt = data;
    next();
})

export default mongoose.model("Message", Message);