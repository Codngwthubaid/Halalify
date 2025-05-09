import { axiosInstance } from "@/lib/axios"
import { Albums, Songs, Stats } from "@/types";
import { toast } from "sonner";
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
  stats: Stats;

  fetchSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
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
  stats: {
    totalAlbums: 0,
    totalSongs: 0,
    totalUsers: 0,
    uniqueArtists: 0
  },

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
      const songsData = Array.isArray(response.data) ? response.data : response.data?.songs || [];
      set({ trendingSongs: songsData, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch trending songs", isLoading: false })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data, isLoading: false })
    } catch (error: any) {
      console.log(error)
      set({ error: error.response?.data?.message || "Failed to fetch stats" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.get("/songs");
      const songsData = Array.isArray(result.data) ? result.data : result.data?.songs || [];
      set({ songs: songsData, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching songs:", error);
      set({ error: error.response?.data?.message || "Failed to fetch songs", songs: [], isLoading: false });
    } finally {
      set({ isLoading: false })
    }
  },

  deleteSong: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await axiosInstance.delete(`/admin/songs/${id}`);
      set(state => ({ songs: state.songs.filter(song => song._id !== id), isLoading: false }));
      toast.success("Song deleted successfully")
    } catch (error: any) {
      console.error("Error deleting song:", error);
      set({ error: error.response?.data?.message + "Failed to delete song", isLoading: false });
      toast.error(error.response?.data?.message || "Failed to delete song")
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await axiosInstance.delete(`/admin/albums/${id}`)
      set((state) =>
      ({
        albums: state.albums.filter(album => album._id !== id),
        songs: state.songs.map((song) => song.albumId === state.albums.find((album) => album._id === id)?.title ? { ...song, album: null } : song
        ),
        isLoading: false
      }))
      toast.success("Album deleted successfully")
    } catch (error: any) {
      console.log("Error deleting album:", error)
      set({ error: error.response?.data?.message + "Failed to delete album", isLoading: false })
      toast.error(error.response?.data?.message || "Failed to delete album")
    } finally {
      set({ isLoading: false })
    }
  },

}))