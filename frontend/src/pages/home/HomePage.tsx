import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"
import FeaturedSongs from "./components/freaturedSongs"
import MadeForYouSongs from "./components/madeForYouSongs"
import TrendingSongs from "./components/trendingSongs"

export const HomePage = () => {

  const { isLoading, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, featuredSongs, madeForYouSongs, trendingSongs } = useMusicStore()

  // useEffect(() => { fetchFeaturedSongs(); fetchMadeForYouSongs(); fetchTrendingSongs() }, [isLoading, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

  console.log({ madeForYouSongs, featuredSongs, trendingSongs })
  return (
    <div className="p-3">
      <Topbar />

      <FeaturedSongs />

      <MadeForYouSongs />

      <TrendingSongs />

    </div>
  )
}
