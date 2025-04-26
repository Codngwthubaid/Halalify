
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSong = useRef<string | null>(null)
    const audio = audioRef.current;
    const { currentSong, isPlaying, playNext } = usePlayerStore()

    // toggle play/pause the song
    useEffect(() => {
        if (!isPlaying) audio?.pause()
        else audio?.play()
    }, [isPlaying, audio])

    // handle song end
    useEffect(() => {
        const handleEnded = () => { playNext() }
        audio?.addEventListener('ended', handleEnded)
        return () => { audio?.removeEventListener('ended', handleEnded) }
    }, [audio, playNext])

    // handle song changes
    useEffect(() => {
        if (!audio || !currentSong) return
        const isSongChange = prevSong.current !== currentSong?._id
        if (isSongChange) {
            audio.src = currentSong?.audioUrl
            audio.currentTime = 0
            prevSong.current = currentSong?.audioUrl
            if (isPlaying) audio.play()
        }
    }, [playNext, audio, currentSong, isPlaying])

    return <audio ref={audioRef} />
}