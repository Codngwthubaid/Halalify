import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"

export default function FeaturedSongs() {

    const { isLoading, error, featuredSongs } = useMusicStore()
    console.log("featuredSongs", featuredSongs)
    if (isLoading) return <FeaturedSkeleton />
    if (error) return <div className="text-red-500">{error}</div>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {featuredSongs.map((song) => (
                <div key={song._id} className="flex items-center rounded-md bg-zinc-800/50 p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img src={song?.imageUrl} alt={song?.title} className="w-16 h-16 rounded-md mr-4" />
                    <h2 className="text-lg font-semibold">{song.title}</h2>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
            ))}
        </div>
    )
}