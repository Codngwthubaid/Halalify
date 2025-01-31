import mongoose, { mongo } from "mongoose";

const chatSechma = new mongoose.Schema({
    senderId: { // clerk user Id
        type: String,
        require: true
    },
    receiverId: { // clerk user Id
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }

}, {
    timestamps: true
})

export const Chat = mongoose.model("Chat", chatSechma);