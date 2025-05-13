import { Message } from "../models/message.model.js";
import { Server } from "socket.io"


export const initSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    const userSockets = new Map();
    const userActivity = new Map();

    io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;
        if (!userId) return;

        userSockets.set(userId, socket.id);
        userActivity.set(userId, "Idle");

        io.emit("user_connected", userId);
        socket.emit("users_online", Array.from(userSockets.keys()));
        io.emit("activity", Array.from(userActivity.entries()));

        socket.on("update_activity", ({ userId, activity }) => {
            userActivity.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        });

        socket.on("send_message", async ({ senderId, receiverId, content }) => {
            try {
                const newMessage = await Message.create({ senderId, receiverId, content });
                const receiverSocketId = userSockets.get(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive_message", newMessage);
                }

                socket.emit("message_sent", newMessage);
            } catch (error) {
                console.log("Error in send_message:", error);
                socket.emit("message_error", error.message);
            }
        });

        socket.on("disconnect", () => {
            let disconnectedUserId;
            for (const [uid, sid] of userSockets.entries()) {
                if (sid === socket.id) {
                    disconnectedUserId = uid;
                    userSockets.delete(uid);
                    userActivity.delete(uid);
                    break;
                }
            }

            if (disconnectedUserId) {
                io.emit("user_disconnected", disconnectedUserId);
            }
        });
    });
};
