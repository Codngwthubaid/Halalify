import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface AuthStore {
    isAdmin: boolean,
    error: string | any,
    isLoading: boolean,

    isAdminCheck: () => Promise<void>,
    reset: () => void,
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    error: null,
    isLoading: false,

    isAdminCheck: async () => {
        try {
            const result = await axiosInstance.get("/admin/check")
            const isAdmin = result.data?.isAdmin || false
            console.log("isAdmin from auth store :", isAdmin)
            set({ isAdmin, isLoading: false })
        } catch (error: any) {
            set({ error: error.result.data.message, isLoading: false })
        } finally {
            set({ isLoading: false })
        }
    },

    reset: () => set({ isAdmin: false, error: null, isLoading: false }),
}))