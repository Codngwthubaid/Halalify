import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Upload, Loader } from "lucide-react"
import { useRef, useState } from "react"
import { NewAlbum } from "@/types"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"

export default function AddAlbumDialog() {

    const [openDialogBoxForAlbum, setOpenDialogBoxForAlbum] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [newAlbum, setNewAlbum] = useState<NewAlbum>({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
    })

    const imgRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append("title", newAlbum.title)
            formData.append("artist", newAlbum.artist)
            formData.append("releaseYear", newAlbum.releaseYear.toString())
            if (imageFile) {
                formData.append("imageFile", imageFile)
            }

            await axiosInstance.post("/admin/albums", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            toast.success("Album added successfully")

            setNewAlbum({
                title: "",
                artist: "",
                releaseYear: new Date().getFullYear(),
            })
            setImageFile(null)

        } catch (error: any) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to add album")
        } finally {
            setIsLoading(false)
            setOpenDialogBoxForAlbum(false)
        }
    }

    const isFormInComplete =
        !newAlbum.title.trim() ||
        !newAlbum.artist.trim() ||
        !newAlbum.releaseYear ||
        !imageFile

    return (
        <Dialog open={openDialogBoxForAlbum} onOpenChange={setOpenDialogBoxForAlbum}>
            <DialogTrigger className="bg-purple-500 hover:bg-purple-600 flex items-center p-2 rounded-lg cursor-pointer">
                <Plus /> Add New
            </DialogTrigger>
            <DialogContent>
                <ScrollArea className="h-[400px] w-full rounded-md px-4">
                    <DialogHeader>
                        <DialogTitle>Add New Album</DialogTitle>
                        <DialogDescription>Add a new album in your music library</DialogDescription>
                    </DialogHeader>

                    <input
                        type="file"
                        accept="image/*"
                        ref={imgRef}
                        className="hidden"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />

                    <div
                        className="flex items-center justify-center h-32 border-2 border-dashed border-zinc-800 rounded-md cursor-pointer mt-4"
                        onClick={() => imgRef.current?.click()}
                    >
                        <div className="text-center">
                            {
                                imageFile ? (
                                    <div className="space-y-2">
                                        <div className=" text-sm text-purple-500">Image Selected</div>
                                        <div className="text-xs text-shadow-zinc-200">{imageFile.name.slice(0, 15)}</div>
                                    </div>
                                ) : (
                                    <div className="flex items-center flex-col justify-center gap-3">
                                        <div className="text-sm text-purple-500">
                                            <Upload />
                                        </div>
                                        <div className="text-xs text-shadow-zinc-200">
                                            <Button className="w-full cursor-pointer">Upload Cover</Button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-y-1 my-3">
                        <Label htmlFor="title" className="text-base">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={newAlbum.title}
                            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col items-start gap-y-1 my-3">
                        <Label htmlFor="artist" className="text-base">Artist</Label>
                        <Input
                            id="artist"
                            type="text"
                            value={newAlbum.artist}
                            onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col items-start gap-y-1 my-3">
                        <Label htmlFor="releaseYear" className="text-base">Release Year</Label>
                        <Input
                            id="releaseYear"
                            type="number"
                            value={newAlbum.releaseYear}
                            onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) || new Date().getFullYear() })}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant={"destructive"}
                            onClick={() => setOpenDialogBoxForAlbum(false)}
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
                                    "Add Album"
                                )
                            }
                        </Button>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
