import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"
import FeaturedSongs from "./components/freaturedSongs"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import GridSelectionLayoutForSongs from "./components/gridSelectionLayoutForSongs"

export const HomePage = () => {

  const { isLoading, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, featuredSongs, madeForYouSongs, trendingSongs } = useMusicStore()

  useEffect(() => { fetchFeaturedSongs(); fetchMadeForYouSongs(); fetchTrendingSongs() }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

  console.log({ madeForYouSongs, featuredSongs, trendingSongs })
  return (
    <div className="p-3">
      <Topbar />

      <ScrollArea className="h-[calc(100vh-4rem)] overflow-auto">

        <div>
          <h1 className="text-2xl font-bold my-4 sm:text-3xl">Good Afternoon</h1>
          <FeaturedSongs />
        </div>

        <div className="space-y-4">
          <GridSelectionLayoutForSongs title="Made for you" songs={madeForYouSongs} isLoading={isLoading} />
          <GridSelectionLayoutForSongs title="Trending" songs={madeForYouSongs} isLoading={isLoading} />
        </div>
      </ScrollArea>

    </div>
  )
}
