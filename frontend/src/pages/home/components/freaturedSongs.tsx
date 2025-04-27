import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"
import PlayButton from "./playButton"

export default function FeaturedSongs() {
    const { isLoading, error, featuredSongs } = useMusicStore()
    console.log("featuredSongs", featuredSongs)
    if (isLoading) return <FeaturedSkeleton />
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {featuredSongs.map((song) => (
                <div
                    key={song._id}
                    className="group relative flex items-center rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                    <img
                        src={song?.imageUrl}
                        alt={song?.title}
                        className="w-12 h-12 rounded-md mr-4 object-cover"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-base font-semibold">{song.title}</h2>
                        <p className="text-sm text-gray-600">{song.artist}</p>
                    </div>
                    <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayButton song={song} />
                    </div>
                </div>
            ))}
        </div>
    )
}