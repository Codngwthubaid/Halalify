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
        set({ isLoading: true, error: null });
        try {
          const result = await axiosInstance.get("/albums");
          console.log("API response:", result.data); // Log the raw response
          const albumsData = Array.isArray(result.data) ? result.data : result.data?.albums || [];
          set({ albums: albumsData, isLoading: false });
        } catch (error: any) {
          console.error("Error fetching albums:", error);
          set({
            error: error.response?.data?.message || "Failed to fetch albums",
            albums: [],
            isLoading: false,
          });
        }
      }
}))