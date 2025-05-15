import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Album, LibraryBigIcon, LogInIcon, Music } from "lucide-react"; // Added Music, User icons
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Added Dialog components
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import Playbutton from "@/pages/home/components/playButton";
import SignInOAuthbutton from "@/components/SignInOAuthButton";

export default function LeftSidebar() {
    const { albums, isLoading, fetchAlbums, songs, fetchSongs } = useMusicStore();
    const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
    const [isSongDialogOpen, setIsSongDialogOpen] = useState(false);

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
    }, [fetchAlbums, fetchSongs]);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="bg-zinc-900 rounded-lg m-3 p-1 sm:p-4">
                <div className="space-y-2">
                    <div className="sm:block hidden">
                        <Link
                            to="/"
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-full justify-start hover:bg-zinc-800"
                            )}
                        >
                            <Album className="size-6 mr-2" />
                            <span>Album</span>
                        </Link>
                </div>
                    <div className="sm:hidden block">
                        <div
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "flex items-center gap-2 hover:bg-zinc-800 w-full cursor-pointer"
                            )}
                        >
                            <SignedOut>
                                <SignInOAuthbutton title={<LogInIcon />} />
                            </SignedOut>

                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-1 sm:p-4 m-3 mt-0 rounded-lg bg-zinc-900 ">
                <div className="hidden sm:flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LibraryBigIcon className="size-6 sm:mr-2" />
                        <span className="hidden md:block">Playlists</span>
                    </div>
                </div>


                <div className="sm:mt-5">
                    <div className="hidden sm:block">
                        <ScrollArea className="h-[calc(100vh-280px)] w-full">
                            <div className="space-y-1">
                                {isLoading ? (
                                    <LoadingSkeleton />
                                ) : (
                                    Array.isArray(albums) &&
                                    albums.map((album) => (
                                        <Link
                                            to={`/albums/${album._id}`}
                                            key={album._id}
                                            className="flex items-center gap-2 hover:bg-zinc-800 p-2 rounded-md cursor-pointer"
                                        >
                                            <img
                                                src={album.imageUrl}
                                                alt={album.title}
                                                className="size-12 flex-shrink-0 object-cover rounded-md"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate font-medium">{album.title}</p>
                                                <p className="truncate text-sm text-zinc-400">Album {album.artist}</p>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="sm:hidden flex flex-col gap-4">
                        <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
                            <DialogTrigger asChild>
                                <button
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "flex items-center gap-2 hover:bg-zinc-800 cursor-pointer"
                                    )}
                                >
                                    <Album className="size-6" />
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Albums</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="max-h-[60vh] w-full">
                                    <div className="space-y-2">
                                        {isLoading ? (
                                            <LoadingSkeleton />
                                        ) : (
                                            Array.isArray(albums) &&
                                            albums.map((album) => (
                                                <Link
                                                    to={`/albums/${album._id}`}
                                                    key={album._id}
                                                    className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-md"
                                                    onClick={() => setIsAlbumDialogOpen(false)}
                                                >
                                                    <img
                                                        src={album.imageUrl}
                                                        alt={album.title}
                                                        className="size-10 flex-shrink-0 object-cover rounded-md"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{album.title}</p>
                                                        <p className="text-sm text-zinc-400">Album {album.artist}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isSongDialogOpen} onOpenChange={setIsSongDialogOpen}>
                            <DialogTrigger asChild>
                                <button
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "flex items-center gap-2 hover:bg-zinc-800 cursor-pointer"
                                    )}
                                >
                                    <Music className="size-6" />
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Nasheeds</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="max-h-[60vh] w-full">
                                    <div className="space-y-1">
                                        {isLoading ? (
                                            <LoadingSkeleton />
                                        ) : (
                                            Array.isArray(songs) &&
                                            songs.map((song) => (
                                                <div
                                                    key={song._id}
                                                    className="group flex items-center gap-2 hover:bg-zinc-800 p-2 rounded-md cursor-pointer relative "
                                                >
                                                    <img
                                                        src={song.imageUrl}
                                                        alt={song.title}
                                                        className="size-12 flex-shrink-0 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="truncate font-medium">{song.title}</p>
                                                        <p className="truncate text-sm text-zinc-400">
                                                            song {song.artist}
                                                        </p>
                                                    </div>
                                                    <div className="absolute left-3 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <Playbutton song={song} />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}