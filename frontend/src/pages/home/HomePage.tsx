import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"
import FeaturedSongs from "./components/freaturedSongs"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import GridSelectionLayoutForSongs from "./components/gridSelectionLayoutForSongs"
import { usePlayerStore } from "@/stores/usePlayerStore"

export default function HomePage() {

  const { isLoading, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, madeForYouSongs, trendingSongs, featuredSongs } = useMusicStore()
  const { initQueue } = usePlayerStore()

  useEffect(() => { fetchFeaturedSongs(); fetchMadeForYouSongs(); fetchTrendingSongs() }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])
  useEffect(() => {
    if (madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0) {
      const allSongs = [...madeForYouSongs, ...trendingSongs, ...featuredSongs]
      initQueue(allSongs)
    }
  }, [initQueue, madeForYouSongs, trendingSongs, FeaturedSongs])

  return (
    <div className="p-3">
      <Topbar />

      <ScrollArea className="h-[calc(100vh-150px)] overflow-auto hideScollbar">
        <div>
          <h1 className="text-2xl font-bold my-4 sm:text-3xl">Good Afternoon</h1>
          <FeaturedSongs />
        </div>

        <div className="space-y-4">
          <GridSelectionLayoutForSongs title="Made for you" songs={madeForYouSongs} isLoading={isLoading} />
          <GridSelectionLayoutForSongs title="Trending" songs={trendingSongs} isLoading={isLoading} />
        </div>
      </ScrollArea>

    </div>
  )
}
