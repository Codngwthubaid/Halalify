import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, List, Music, Pause, Play } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function AlbumPage() {
    const { albumId } = useParams();
    const { fetchAlbumById, isLoading, currentAlbum } = useMusicStore();
    const { currentSong, playAlbum, isPlaying, togglePlay } = usePlayerStore()

    const secondsToMinutes = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return
        playAlbum(currentAlbum?.songs, index)
    }

    const handlePlayAlbum = () => {
        if (!currentAlbum) return
        const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id)
        if (isCurrentAlbumPlaying) togglePlay()
        else playAlbum(currentAlbum?.songs, 0)
    }


    useEffect(() => { if (albumId) fetchAlbumById(albumId) }, [fetchAlbumById, albumId]);
    if (isLoading) return null;


    return (
        <div className="h-full">
            <ScrollArea className="h-full">
                <div className="min-h-full relative">

                    <div className="relative z-10 flex mt-3 m-6">
                        <div className="flex items-center justify-center gap-4">
                            <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className="w-60 h-60 shadow-xl rounded-xl" />
                            <div className="flex justify-end flex-col">
                                <p className="text-sm text-white">Album</p>
                                <h1 className="text-5xl font-bold text-white">{currentAlbum?.title}</h1>
                                <div className="flex items-center gap-2 mt-2 text-zinc-100">
                                    <p className="text-sm text-white font-bold">{currentAlbum?.artist} &#9679;</p>
                                    <p className="text-sm text-white">{currentAlbum?.releaseYear} &#9679;</p>
                                    <p className="text-sm text-white">{currentAlbum?.songs.length} songs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-4 flex items-center gap-6">
                        <Button className="size-16 bg-purple-700 cursor-pointer hover:bg-purple-800 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out" onClick={handlePlayAlbum}>
                            {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                                <Pause className="mr-2 size-6 ml-2 text-black/80 transition-all hover:scale-125" fill="currentColor" />
                            ) : (
                                <Play className="mr-2 size-6 ml-2 text-black/80 transition-all hover:scale-125" fill="currentColor" />
                            )}
                        </Button>
                    </div>

                    <div className="mx-4 sm:mx-6 overflow-x-auto">
                        <Table className="min-w-full">
                            <TableCaption className="text-sm text-gray-500 mb-4">
                                All nasheeds in the {currentAlbum?.title} album
                            </TableCaption>
                            <TableHeader>
                                <TableRow className="bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400">
                                    <TableHead className="w-12 text-center">
                                        <List className="size-5 inline-block" />
                                    </TableHead>
                                    <TableHead className="min-w-[200px] sm:min-w-[300px]">
                                        <div className="flex items-center gap-2">Title</div>
                                    </TableHead>
                                    <TableHead className="min-w-[120px] hidden sm:table-cell">
                                        <div className="flex items-center gap-2">Created At</div>
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        <div className="flex items-center gap-2"><Clock className="size-5" /></div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentAlbum?.songs.map((song, index) => {
                                    const currentSongId = currentSong?._id === song._id
                                    return (
                                        <TableRow
                                            key={index}
                                            onClick={() => handlePlaySong(index)}
                                            className="transition-colors group cursor-pointer"
                                        >
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {currentSongId && isPlaying ? (
                                                        <Music className="size-5 text-purple-700" />
                                                    ) : (
                                                        <span className="group-hover:hidden text-sm">{index + 1}</span>
                                                    )}
                                                    {
                                                        !currentSongId && (
                                                            <Play className="hidden group-hover:block size-5 border border-gray-300 rounded-full p-1" fill="currentColor" />
                                                        )
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={song?.imageUrl}
                                                        alt={song?.title}
                                                        className="w-10 h-10 object-cover rounded-sm"
                                                        loading="lazy"
                                                    />
                                                    <span className="text-sm font-medium truncate">{song?.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm hidden sm:table-cell">
                                                {song?.createdAt.split("T")[0]}
                                            </TableCell>
                                            <TableCell className="text-sm">{secondsToMinutes(song?.duration)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}