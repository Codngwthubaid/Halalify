import { create } from "zustand"
import { Songs } from "@/types/index"


interface PlayerStore {
    currentSong: Songs | null;
    isPlaying: boolean;
    currentIndex: number;
    queue: Songs[];

    initQueue: (songs: Songs[]) => void;
    setCurrentSong: (song: Songs | null) => void;
    playAlbum: (songs: Songs[], index?: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null!,
    isPlaying: false,
    currentIndex: -1,
    queue: [],

    initQueue: (songs) => set(
        { queue: songs, currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex, currentSong: get().currentSong || songs[0], isPlaying: true }
    ),

    playAlbum: (songs: Songs[], index: number = 0) => {
        if (songs.length === 0) return;
        const currentSong = songs[index] || null;
        set({ queue: songs, currentIndex: index, currentSong: currentSong, isPlaying: true });
        console.log("Playing album", songs, currentSong, index)
    },

    setCurrentSong: (song: Songs | null) => {
        if (!song) return;
        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        set({ currentSong: song, currentIndex: songIndex !== -1 ? songIndex : get().currentIndex, isPlaying: true });
    },

    playNext: () => {
        const { queue, currentIndex } = get();
        const nextIndex = (currentIndex + 1)
        if (nextIndex < queue.length) return set({ currentIndex: nextIndex, currentSong: queue[nextIndex], isPlaying: true });
        else set({ isPlaying: false });
    },

    playPrevious: () => {
        const { queue, currentIndex } = get();
        const prevIndex = (currentIndex - 1)
        if (prevIndex >= 0) return set({ currentIndex: prevIndex, currentSong: queue[prevIndex], isPlaying: true });
        else set({ isPlaying: false });
    },

    togglePlay: () => {
        const isPlaying = !get().isPlaying;
        set({ isPlaying: isPlaying });
    }
}))