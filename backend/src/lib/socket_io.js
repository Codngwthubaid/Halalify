import { Message } from "../models/message.model.js";
import { Server } from "socket.io"

export const initSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    })

    // ya user ke bare main batayga ki user kya socket ke connection le rha hai
    const userSockets = new Map()

    // ya user ke bare mian batayga ki wo konsa song kya play kr rha hai
    const userActivity = new Map()

    // connect yaha se start hoga
    io.on("connection", (socket) => {
        socket.on("user_connected", (userId) => {
            // userId hii socket.io ki id hogi
            userSockets.set(userId, socket.id)
            userActivity.set(userId, "Idle")

            io.emit("user_connected", userId)
            socket.emit("users_online", Array.from(userSockets.keys()))
            io.emit("activity", Array.from(userActivity.entries()))
        })

        // ya upadted song ke bare main batayga ki user current song konsa sun reha hain
        socket.on("update_activity", ({ userId, userActivity }) => {
            console.log(userId, userActivity)
            userActivity.set(userId, userActivity)
            io.emit("activity_updated", { userId, userActivity })
        })

        // ya socket batayga ki konse user ne kisko message dala hain
        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, message } = data
                // database main baatain store hongi
                const newMessage = await Message.create({ senderId, receiverId, content: message })

                // agar recevier online hain toh message send krenge
                const receiverSocketId = userSockets.get(receiverId)
                if (receiverSocketId) io.to(receiverSocketId).emit("receive_message", newMessage)

                socket.emit("message_sent", newMessage)

            } catch (error) {
                console.log(" Error present in send message:", error)
                socket.emit("message_error", error.message)
            }
        })

        // ya socket user ko disconnect karega and ausski chats and activity ko bhi delete krdega
        socket.on("disconnected", () => {
            let disConnnectedUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    disConnnectedUserId = userId
                    userSockets.delete(userId)
                    userActivity.delete(userId)
                    break
                }
            }

            // ya batayga baki sab users ko ki ab ya disconncted ho chuka hain  
            if (disConnnectedUserId) io.emit("user_disconnected", disConnnectedUserId)
        })

    })
}