import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useMusicStore } from "@/stores/useMusicStore"
import { Loader, Plus, Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NewFile, NewSong } from "@/types"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"



export default function AddSongDialog() {

    const { albums } = useMusicStore()
    const [isLoading, setIsLoading] = useState(false)
    const [songDialogBoxOpen, setSongDialogBoxOpen] = useState(false)

    const [newSong, setNewSong] = useState<NewSong>({
        title: "",
        artist: "",
        duration: 0,
        album: null
    })

    const [newFile, setNewFile] = useState<NewFile>({
        image: null,
        audio: null
    })

    const audioRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("title", newSong.title)
            formData.append("artist", newSong.artist)
            formData.append("duration", newSong.duration.toString())

            if (newSong.album && newSong.album !== "none") {
                formData.append("album", newSong.album)
            }
            formData.append("imageFile", newFile.image!)
            formData.append("audioFile", newFile.audio!)

            await axiosInstance.post("/admin/songs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setNewSong({
                title: "",
                artist: "",
                duration: 0,
                album: null
            })
            setNewFile({
                image: null,
                audio: null
            })
            toast.success("Song added successfully")

        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message + "Failed to add song")
        } finally {
            setIsLoading(false)
            setSongDialogBoxOpen(false)
        }
    }


    const isFormInComplete =
        !newSong.title.trim() ||
        !newSong.artist.trim() ||
        !newSong.duration ||
        !newFile.image ||
        !newFile.audio


    return (
        <Dialog open={songDialogBoxOpen} onOpenChange={setSongDialogBoxOpen}>
            <DialogTrigger className=" bg-purple-500 hover:bg-purple-600 flex items-center p-2 rounded-lg cursor-pointer">
                <Plus /> Add New
            </DialogTrigger>
            <DialogContent >
                <ScrollArea className="h-[500px] w-full rounded-md px-4">
                    <DialogHeader>
                        <DialogTitle>Add New Song</DialogTitle>
                        <DialogDescription>Add a new song in your music library </DialogDescription>
                    </DialogHeader>

                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={imageRef}
                            className="hidden"
                            onChange={(e) => setNewFile({ ...newFile, image: e.target.files![0] })}
                        />

                        <input
                            type="file"
                            accept="audio/*"
                            ref={audioRef}
                            className="hidden"
                            onChange={(e) => setNewFile({ ...newFile, audio: e.target.files![0] })}
                        />

                        <div
                            className="flex items-center justify-center h-32 border-2 border-dashed border-zinc-800 rounded-md cursor-pointer"
                            onClick={() => {
                                imageRef.current?.click()
                            }}
                        >
                            <div className="text-center">
                                {
                                    newFile.image ? (
                                        <div className="space-y-2">
                                            <div className=" text-sm text-purple-500">Image Selected</div>
                                            <div className="text-xs text-shadow-zinc-200">{newFile.image.name.slice(0, 15)}</div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center flex-col justify-center gap-3">
                                            <div className="text-sm text-purple-500">
                                                <Upload />
                                            </div>
                                            <div className="text-xs text-shadow-zinc-200">
                                                <Button className="w-full cursor-pointer">Upload Image</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-y-1 my-3 justify-center border-zinc-800 rounded-md cursor-pointer">
                            <Label htmlFor="audio" className="text-base">Audio</Label>
                            <div className="flex items-center gap-2 w-[100%]">
                                <Button
                                    className="w-full cursor-pointer"
                                    onClick={() => audioRef.current?.click()}
                                >
                                    {newFile.audio ? newFile.audio.name.slice(0, 15) : "Upload Audio"}
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-y-1 my-3 justify-center border-zinc-800 rounded-md cursor-pointer">
                            <Label htmlFor="title" className="text-base">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={newSong.title}
                                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-y-1 my-3 justify-center border-zinc-800 rounded-md cursor-pointer">
                            <Label htmlFor="artist" className="text-base">Artist</Label>
                            <Input
                                id="artist"
                                type="text"
                                value={newSong.artist}
                                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-y-1 my-3 justify-center border-zinc-800 rounded-md cursor-pointer">
                            <Label htmlFor="duration" className="text-base">Duration (seconds)</Label>
                            <Input
                                id="duration"
                                type="number"
                                value={newSong.duration}
                                onChange={(e) => setNewSong({ ...newSong, duration: parseInt(e.target.value) || 0 })}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-y-1 my-3 justify-center border-zinc-800 rounded-md cursor-pointer">
                            <Label htmlFor="album" className="text-base">Album</Label>
                            <Select
                                onValueChange={(e) => setNewSong({ ...newSong, album: e })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an album" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"none"}>None</SelectItem>
                                    {albums.map((album) => (
                                        <SelectItem key={album._id} value={album._id}>
                                            {album.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant={"destructive"}
                                onClick={() => setSongDialogBoxOpen(false)}
                                disabled={isLoading}
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isFormInComplete || isLoading}
                                className="cursor-pointer"
                            >
                                {
                                    isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader className="animate-spin" /> Adding
                                        </div>
                                    ) : (
                                        "Add Song"
                                    )
                                }
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    )
}