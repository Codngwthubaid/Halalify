import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"

interface ChatStore {
    users: string[] | any[],
    isLoading: boolean,
    error: string | null,

    fetchUsers: () => Promise<void>,
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
            const result = await axiosInstance.get("/users")
            const userData = Array.isArray(result.data) ? result.data : result.data?.users || []
            set({ users: userData, isLoading: false })
        } catch (error: any) {
            set({ error: error.result.data.message, isLoading: false })
        } finally {
            set({ isLoading: false })
        }
    },
}))