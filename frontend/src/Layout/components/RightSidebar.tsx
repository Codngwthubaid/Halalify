import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LibraryBigIcon } from "lucide-react";
import { useEffect } from "react";
import PlayButton from "@/pages/home/components/playButton";

export default function RightSidebar() {
    const { isLoading, songs, fetchSongs } = useMusicStore();

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);

    return (
        <div className="h-full flex flex-col gap-2">
            {/* <div className="bg-zinc-900 rounded-lg m-3 p-4">
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
            </div> */}

            <div className="flex-1 p-4 m-3 rounded-lg bg-zinc-900">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LibraryBigIcon className="size-6 mr-2" />
                        <span className="hidden md:block">Nasheed lists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-190px)] mt-5 w-full">
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
                                    </div>
                                    <div className="absolute left-3 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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