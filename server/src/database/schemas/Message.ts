import mongoose from "mongoose";

const Message = new mongoose.Schema({
    userId: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    room: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Message", Message);