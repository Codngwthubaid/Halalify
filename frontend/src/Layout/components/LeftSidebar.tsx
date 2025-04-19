import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { Home, LibraryBigIcon, MessageCircleMoreIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

export default function LeftSidebar() {

    const { songs, albums, isLoading, error, fetchAlbums } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    console.log("Albums fetched : ", { albums })

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
                        <Home className="size-6 mr-2" />
                        <span className="hidden md:block">Home</span>
                    </Link>

                    <SignedIn>
                        <Link
                            to="/"
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-full justify-start hover:bg-zinc-800"
                            )}
                        >
                            <MessageCircleMoreIcon className="size-6 mr-2" />
                            <span className="hidden md:block">Message</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>

            <div className="flex-1 p-4 m-3 mt-0 rounded-lg bg-zinc-900">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LibraryBigIcon className="size-6 mr-2" />
                        <span className="hidden md:block">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[400px] my-5 w-full ">
                    <div className="space-y-2">
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <div>album</div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}