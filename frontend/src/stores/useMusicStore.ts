import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"

interface MusicProps {
    songs: any[];
    albums: any[];
    isLoading: boolean;
    error: string | any;
    fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicProps>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error: null,

    fetchAlbums: async () => {
        try {
            const result = await axiosInstance.get("/albums");
            set({ albums: result.data });
        } catch (error: any) {
            console.log("Error present in fetching albums", error);
            set({ error: error.response.data.message });
        }
    }
}))