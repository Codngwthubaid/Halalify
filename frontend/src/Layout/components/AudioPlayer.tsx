
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSong = useRef<string | null>(null)
    const audio = audioRef.current;
    const { currentSong, isPlaying, playNext } = usePlayerStore()

    // toggle play/pause the song
    useEffect(() => {
        if (isPlaying) audioRef.current?.play()
        else audioRef.current?.pause()
    }, [isPlaying, audio])

    // handle song end
    useEffect(() => {
        const audio = audioRef.current
        const handleEnded = () => { playNext() }
        audio?.addEventListener('ended', handleEnded)
        return () => { audio?.removeEventListener('ended', handleEnded) }
    }, [audio, playNext])

    // handle song changes
    useEffect(() => {
        if (!audioRef.current || !currentSong) return
        const audio = audioRef.current
        const isSongChange = prevSong.current !== currentSong?.audioUrl
        if (isSongChange) {
            audio.src = currentSong?.audioUrl
            audio.currentTime = 0
            prevSong.current = currentSong?.audioUrl
            if (isPlaying) audio.play()
        }
    }, [currentSong, isPlaying])

    return <audio ref={audioRef} />
}