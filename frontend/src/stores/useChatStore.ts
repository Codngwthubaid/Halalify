import { axiosInstance } from "@/lib/axios"
import { Message, User } from "@/types"
import { create } from "zustand"
import { io } from "socket.io-client"

interface ChatStore {
    users: User[],
    isLoading: boolean,
    error: string | null,
    socket: any,
    isConnected: boolean,
    onlineUsers: Set<string>,
    userActivities: Map<string, string>,
    messages: Message[],
    isSelectedUser: User | null

    fetchUsers: () => Promise<void>,
    initSocket: (userId: string) => void
    disconnectSocket: () => void
    sendMessage: (senderId: string, receiverId: string, content: string) => void
    fetchMessage: (userId: string) => Promise<void>
    setIsSelectedUser: (user: User | null) => void
    setMessages: (msgs: Message[]) => void

}

const baseUrl = import.meta.env.VITE_BASE_URL_BACKEND!
const socket = io(baseUrl, {
    withCredentials: true,
    autoConnect: false
})

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: socket,
    isConnected: false,
    onlineUsers: new Set<string>(),
    userActivities: new Map(),
    messages: [],
    isSelectedUser: null,

    setMessages: (msgs: Message[]) => set({ messages: msgs }),
    setIsSelectedUser: (user) => set({ isSelectedUser: user }),

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/users");
            const userData = response?.data?.users
            console.log("users data from useChatStore : ", userData)
            set({ users: userData, isLoading: false })
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    initSocket: (userId) => {
        if (!get().isConnected) {
            socket.auth = { userId };
            socket.connect();

            socket.emit("user_connected", userId);

            socket.on("users_online", (users: string[]) => {
                console.log("Received online users:", users);
                set(() => ({ onlineUsers: new Set(users.map(String)) }));
            });


            socket.on("activity", (activities: [string, string][]) => {
                set({ userActivities: new Map(activities) });
            });

            socket.on("user_connected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId]),
                }));
            });

            socket.on("user_disconnected", (userId: string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                });
            });

            socket.on("receive_message", (message: Message) => {
                set((state) => {
                    const currentMessages = Array.isArray(state.messages) ? state.messages : [];
                    const exists = currentMessages.some((m) => m._id === message._id);
                    return {
                        messages: exists ? currentMessages : [...currentMessages, message],
                    };
                });
            });

            socket.on("message_sent", (message: Message) => {
                set((state) => {
                    const currentMessages = Array.isArray(state.messages) ? state.messages : [];
                    const exists = currentMessages.some((m) => m._id === message._id);
                    return {
                        messages: exists ? currentMessages : [...currentMessages, message],
                    };
                });
            });


            socket.on("activity_updated", ({ userId, activity }) => {
                set((state) => {
                    const newActivities = new Map(state.userActivities);
                    newActivities.set(userId, activity);
                    return { userActivities: newActivities };
                });
            });

            set({ isConnected: true });
        }
    },

    disconnectSocket: () => {
        if (get().isConnected) {
            socket.disconnect();
            set({ isConnected: false });
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket;
        if (!socket) return;

        socket.emit("send_message", { receiverId, senderId, content });
    },

    fetchMessage: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`);
            set({ messages: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));












