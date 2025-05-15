import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipBack, SkipForward, Volume1, VolumeX } from "lucide-react";

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function PlayControls() {
    const [isVolume, setIsVolume] = useState(75); // Tracks the actual volume level
    const [isMuted, setIsMuted] = useState(false); // Tracks mute state
    const [prevVolume, setPrevVolume] = useState(75); // Stores volume before muting
    const [isDuration, setIsDuration] = useState(0);
    const [isCurrentTime, setIsCurrentTime] = useState(0);
    const { currentSong, togglePlay, isPlaying, playNext, playPrevious } = usePlayerStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => { setIsCurrentTime(audio.currentTime); };
        const updateDuration = () => { setIsDuration(audio.duration); };
        const handleEnded = () => { usePlayerStore.getState().playNext(); };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);

        // Set initial volume
        audio.volume = isVolume / 100;

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);

    const handleSeek = (value: number[]) => {
        if (audioRef.current) audioRef.current.currentTime = value[0];
    };

    const handleMuteToggle = () => {
        if (audioRef.current) {
            if (!isMuted) {
                // Mute: Store current volume and mute audio
                setPrevVolume(isVolume);
                audioRef.current.muted = true;
                setIsMuted(true);
            } else {
                // Unmute: Restore previous volume
                audioRef.current.muted = false;
                setIsVolume(prevVolume);
                audioRef.current.volume = prevVolume / 100;
                setIsMuted(false);
            }
        }
    };

    return (
        <footer className='h-20 sm:h-24 bg-zinc-900 border-t w-full border-zinc-800 px-4'>
            <div className='flex justify-between items-center h-full mx-auto'>
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                    {currentSong && (
                        <>
                            <img
                                src={currentSong.imageUrl}
                                alt={currentSong.title}
                                className='w-14 h-14 object-cover rounded-md'
                            />
                            <div className='flex-1 min-w-0'>
                                <div className='font-medium truncate hover:underline cursor-pointer'>
                                    {currentSong.title}
                                </div>
                                <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                                    {currentSong.artist}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                    <div className='flex items-center gap-4 sm:gap-6'>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400 cursor-pointer'
                            onClick={playPrevious}
                            disabled={!currentSong}
                        >
                            <SkipBack className='h-4 w-4' />
                        </Button>

                        <Button
                            size='icon'
                            className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 cursor-pointer'
                            onClick={togglePlay}
                            disabled={!currentSong}
                        >
                            {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                        </Button>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400 cursor-pointer'
                            onClick={playNext}
                            disabled={!currentSong}
                        >
                            <SkipForward className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='hidden sm:flex items-center gap-2 w-full'>
                        <div className='text-xs text-zinc-400'>{formatTime(isCurrentTime)}</div>
                        <Slider
                            value={[isCurrentTime]}
                            max={isDuration || 100}
                            step={1}
                            className='w-full hover:cursor-grab active:cursor-grabbing'
                            onValueChange={handleSeek}
                        />
                        <div className='text-xs text-zinc-400'>{formatTime(isDuration)}</div>
                    </div>
                </div>

                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
                    <div className='flex items-center gap-2'>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400 cursor-pointer'
                            onClick={handleMuteToggle}
                        >
                            {isMuted ? <VolumeX className='h-4 w-4' /> : <Volume1 className='h-4 w-4' />}
                        </Button>

                        <Slider
                            value={isMuted ? [0] : [isVolume]} // Show 0 when muted
                            max={100}
                            step={1}
                            className='w-24 hover:cursor-grab active:cursor-grabbing'
                            onValueChange={(value) => {
                                setIsVolume(value[0]);
                                if (audioRef.current) {
                                    audioRef.current.volume = value[0] / 100;
                                    audioRef.current.muted = false; // Unmute when slider changes
                                    setIsMuted(false); // Update mute state
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}