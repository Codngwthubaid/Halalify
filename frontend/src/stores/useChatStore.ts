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

}

const baseUrl = import.meta.env.BASE_URL_BACKEND!
const socketInstance = io(baseUrl, {
    withCredentials: true,
    autoConnect: false
})

export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    isSelectedUser: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
            const result = await axiosInstance.get("/users")
            const userData = result?.data?.users
            set({ users: userData, isLoading: false })
        } catch (error: any) {
            set({ error: error.result.data.message, isLoading: false })
        } finally {
            set({ isLoading: false })
        }
    },

    initSocket: async (userId: string) => {
        // agar user connected nhi hain tho ausse connect karo by socket
        if (!get().isConnected) {
            socketInstance.auth = { userId }
            socketInstance.connect()

            // agar user online hain tho update krdo
            socketInstance.on("users_online", (users: string[]) => {
                set({ onlineUsers: new Set(users) })
            })

            // agar user activity update hain tho update krdo
            socketInstance.on("users_activity", (userActivities: [string, string][]) => {
                set({ userActivities: new Map(userActivities) })
            })

            // agar user connected hain tho ausse update krdo instantly
            socketInstance.on("user_connected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId])
                }))
            })

            // agar user disconnected hain tho ausse update krdo instantly
            socketInstance.on("user_disconnected", (userId: string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers)
                    newOnlineUsers.delete(userId)
                    return { onlineUsers: newOnlineUsers }
                })
            })

            // agar reveice huwa hain kyo message tho update krdo
            socketInstance.on("receive_message", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }))
            })

            // agar send huwa hain kyo message tho update krdo
            socketInstance.on("message_sent", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message]
                }))
            })

            // update krdo user ki activity 
            socketInstance.on("update_activity", ({ userId, userActivity }) => {
                set((state) => {
                    const newUserActivities = new Map(state.userActivities)
                    newUserActivities.set(userId, userActivity)
                    return { userActivities: newUserActivities }
                })
            })

            // ✅ Emit after registering listeners
            socketInstance.emit("user_connected", userId)

            // ✅ Mark connection active
            set({ isConnected: true, socket: socketInstance })

        }
    },

    disconnectSocket: () => {
        if (get().isConnected) {
            socketInstance.disconnect()
            set({ isConnected: false })
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket
        if (!socket) return
        socket.emit("send_message", { receiverId, senderId, content })
    },

    fetchMessage: async (userId: string) => {
        try {
            set({ isLoading: true, error: null })
            const result = await axiosInstance.get(`/users/messages/${userId}`)
            set({ messages: result.data, isLoading: false })
        } catch (error: any) {
            console.log(error)
            set({ error: error.response.data.message, isLoading: false })
        } finally {
            set({ isLoading: false })
        }
    },

    setIsSelectedUser: (user: User | null) => {
        set({ isSelectedUser: user })
    }
}))