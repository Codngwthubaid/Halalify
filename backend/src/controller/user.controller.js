import { User } from "../models/user.model.js"
import { Message } from "../models/message.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId
        const users = await User.find({ clerkId: { $ne: currentUserId } })
        res.status(200).json({ success: true, message: "Users fetched successfully except current user", users })
    } catch (error) {
        console.log("Error present in get all users route", error.message)
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId
        const { userID } = req.params
        console.log(myId, userID)

        const message = await Message.find({ $or: [{ senderId: myId, receiverId: userID }, { senderId: userID, receiverId: myId }] }).sort({ createdAt: 1 })
        res.status(200).json({ success: true, message: "Messages fetched successfully", message })
    } catch (error) {
        console.log("Error present in get messages route", error.message)
        next(error)
    }

}