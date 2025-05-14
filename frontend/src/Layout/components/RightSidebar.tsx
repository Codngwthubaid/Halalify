import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LibraryBigIcon, Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PlayButton from "@/pages/home/components/playButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

export default function RightSidebar() {
    const { isLoading, songs, fetchSongs } = useMusicStore();
    const { currentSong } = usePlayerStore();
    const [isDuration, setIsDuration] = useState(0);
    const [isCurrentTime, setIsCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    console.log("songs from right sidebar", songs);

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setIsCurrentTime(audio.currentTime);
        };
        const updateDuration = () => {
            setIsDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="bg-zinc-900 rounded-lg m-3 p-4">
                <div className="space-y-2">
                    <Link
                        to="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start hover:bg-zinc-800"
                        )}
                    >
                        <Music className="size-6 mr-2" />
                        <span className="hidden md:block">Nasheeds</span>
                    </Link>
                </div>
            </div>

            <div className="flex-1 p-4 m-3 mt-0 rounded-lg bg-zinc-900">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LibraryBigIcon className="size-6 mr-2" />
                        <span className="hidden md:block">Nasheed lists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-280px)] mt-5 w-full">
                    <div className="space-y-1">
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            Array.isArray(songs) &&
                            songs.map((song) => (
                                <div
                                    key={song._id}
                                    className="group flex items-center gap-2 hover:bg-zinc-800 p-2 rounded-md cursor-pointer relative"
                                >
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className="size-12 flex-shrink-0 object-cover rounded-md"
                                    />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="truncate font-medium">{song.title}</p>
                                        <p className="truncate text-sm text-zinc-400">
                                            song {song.artist}
                                        </p>
                                        {currentSong?._id === song._id && (
                                            <p className="text-xs text-zinc-500">
                                                {formatTime(isCurrentTime)} / {formatTime(isDuration)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayButton song={song} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}