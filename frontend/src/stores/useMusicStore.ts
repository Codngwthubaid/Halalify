import { axiosInstance } from "@/lib/axios"
import { Albums, Songs } from "@/types";
import { create } from "zustand"

interface MusicProps {
  songs: Songs[];
  albums: Albums[];
  isLoading: boolean;
  error: string | any;
  currentAlbum: Albums | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicProps>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.get("/albums");
      console.log("API response:", result.data);
      const albumsData = Array.isArray(result.data) ? result.data : result.data?.albums || [];
      set({ albums: albumsData, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching albums:", error);
      set({ error: error.response?.data?.message || "Failed to fetch albums", albums: [], isLoading: false });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAlbumById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const result = await axiosInstance.get(`/albums/${id}`);
      console.log("API response for specific album:", result.data);
      set({ currentAlbum: result.data, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching album by ID:", error);
      set({ error: error.response?.data?.message || "Failed to fetch album by ID", isLoading: false });
    }
  },
}))