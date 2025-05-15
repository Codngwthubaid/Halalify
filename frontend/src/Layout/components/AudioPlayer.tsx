import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSong = useRef<string | null>(null);
    const { currentSong, isPlaying, setIsPlaying } = usePlayerStore();

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleError = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("error", handleError);
        };
    }, [setIsPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch((err) => {
                console.warn("playback error:", err);
                setIsPlaying(false)
            });
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        const isNewSong = prevSong.current !== currentSong.audioUrl;

        if (isNewSong) {
            audio.src = currentSong.audioUrl;
            audio.currentTime = 0;
            prevSong.current = currentSong.audioUrl;

            const handleCanPlay = () => {
                if (isPlaying) {
                    audio.play().catch(err => {
                        console.warn("autoplay error:", err);
                        setIsPlaying(false);
                    });
                }
            };

            audio.addEventListener("canplay", handleCanPlay);
            return () => audio.removeEventListener("canplay", handleCanPlay);
        }
    }, [currentSong, isPlaying]);

    return <audio ref={audioRef} preload="auto" />;
}
