import FeaturedSkeleton from "@/components/skeletons/FeaturedSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"

export default function FeaturedSongs() {

    const { isLoading, error } = useMusicStore()

    if (true) return <FeaturedSkeleton />
    if (error) return <div className="text-red-500">{error}</div>
    return (
        <div>featured Songs</div>
    )
}