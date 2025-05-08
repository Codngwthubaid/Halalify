import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "./components/DashboardStats";
import Header from "./components/Header";
import { Album, Music } from "lucide-react";
import AlbumsTabContent from "./components/AlbumsTabContent";
import SongsTabContent from "./components/SongsTabContent";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AdminPage() {

    const { isAdmin, isLoading } = useAuthStore()
    const { fetchAlbums, fetchStats, fetchSongs } = useMusicStore()

    if (!isAdmin && !isLoading) return <div>Unauthorized, You are not an admin</div>

    useEffect(() => {
        fetchAlbums()
        fetchStats()
        fetchSongs()
    }, [fetchAlbums, fetchStats, fetchSongs])

    return (
        <div
            className='min-h-screen  text-zinc-100 p-8'>
            <Header />
            <DashboardStats />

            <Tabs defaultValue='songs' className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700 cursor-pointer'>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700 cursor-pointer'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value='albums'>
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}