import { axiosInstance } from '@/lib/axios'
import { create } from 'zustand'


interface NasheedStore {
    albums: any[];
    nasheeds: any[];
    isLoading: boolean;
    fetchAlbums: () => Promise<void>;
    error: string | null;
  }


export const useNasheedStore = create<NasheedStore>((set) => ({
    albums: [],
    nasheeds: [],
    isLoading: false,
    error: null,

    fetchAlbums: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get("/albums");
            set({ albums: res.data })
            console.log({ albums: res.data });
            

        } catch (error: any) {
            set({ error: error.res.data.message })
        } finally {
            set({ isLoading: false })
        }
    }

}))






