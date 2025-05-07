import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Album, Music } from "lucide-react"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"

export default function DataDetails() {

    const { fetchAlbums, fetchSongs } = useMusicStore()

    useEffect(() => {
        fetchSongs()
        fetchAlbums()
        return () => {
            fetchAlbums()
            fetchSongs()
        }
    }, [fetchAlbums, fetchSongs])

    return (
        <Tabs defaultValue="songs">
            <TabsList className="bg-zinc-800/50">
                <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700 cursor-pointer">
                    <Music className="size-4" />
                    Songs
                </TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700 cursor-pointer">
                    <Album className="size-4" />
                    Albums
                </TabsTrigger>
            </TabsList>
            <TabsContent value="songs">

            </TabsContent>
            <TabsContent value="albums">Change your password here.</TabsContent>
        </Tabs>

    )
}   