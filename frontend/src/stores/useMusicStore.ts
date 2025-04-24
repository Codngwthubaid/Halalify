import { axiosInstance } from "@/lib/axios"
import { Albums, Songs } from "@/types";
import { create } from "zustand";

interface MusicProps {
  songs: Songs[];
  albums: Albums[];
  isLoading: boolean;
  error: string | any;
  currentAlbum: Albums | null;
  madeForYouSongs: Songs[];
  featuredSongs: Songs[];
  trendingSongs: Songs[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicProps>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.get("/albums");
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
      set({ currentAlbum: result.data, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching album by ID:", error);
      set({ error: error.response?.data?.message || "Failed to fetch album by ID", isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      const songsData = Array.isArray(response.data) ? response.data : response.data?.songs || [];
      console.log("Fetched made for you songs:", songsData);
      set({ madeForYouSongs: songsData, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch made for you songs", isLoading: false });
    } finally {
      set({ isLoading: false })
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get("/songs/featured");
      const songsData = Array.isArray(response.data) ? response.data : response.data?.songs || [];
      console.log("Fetched featured songs:", songsData);
      set({ featuredSongs: songsData, isLoading: false });
    } catch (error: any) {
      set({ error: error.response.data?.message || "Failed to fetch featured songs", isLoading: false })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get("/songs/trending");
      console.log("Fetched trending songs:", response.data);
      set({ trendingSongs: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch trending songs", isLoading: false })
    } finally {
      set({ isLoading: false })
    }
  },

}))