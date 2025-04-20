import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gradientColors } from "@/constants/index";
import { Button } from "@/components/ui/button";
import { Calendar1, Clock, List, Play, TouchpadIcon } from "lucide-react";
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
    console.log(currentAlbum)

    const [currentGradient, setCurrentGradient] = useState(() => {
        const randomIndex = Math.floor(Math.random() * gradientColors.length);
        return gradientColors[randomIndex];
    });

    useEffect(() => { if (albumId) fetchAlbumById(albumId); }, [fetchAlbumById, albumId]);

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
                        <Button className="size-16 bg-purple-700 hover:bg-purple-800 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out my-3">
                            <Play className="mr-2 size-6 ml-2 text-black/80" fill="currentColor" />
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
                                        <div className="flex items-center gap-2">
                                            Title <TouchpadIcon className="size-5" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="min-w-[120px] hidden sm:table-cell">
                                        <div className="flex items-center gap-2">
                                            Created At <Calendar1 className="size-5" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="min-w-[100px]">
                                        <div className="flex items-center gap-2">
                                            Duration <Clock className="size-5" />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentAlbum?.songs.map((song, index) => (
                                    <TableRow
                                        key={index}
                                        className="transition-colors group cursor-pointer"
                                    >
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="group-hover:hidden text-sm">{index + 1}</span>
                                                <Play className="hidden group-hover:block size-5 border border-gray-300 rounded-full p-1" fill="currentColor" />
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
                                        <TableCell className="text-sm">{song?.duration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}