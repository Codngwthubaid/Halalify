import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeletons"


const LeftSideBar = () => {

  const isLoading = true

  return (
    <div className="h-full flex flex-col gap-2 pr-2">
      {/* Section First */}
      <div className="rounded-lg p-4 bg-zinc-900">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={
              cn(
                buttonVariants(
                  {
                    variant: "ghost",
                    className: "w-full text-white justify-start hover:bg-zinc-800"
                  }
                )
              )
            }
          >
            <HomeIcon size={5} className="mx-1" />
            <span className="hidden md:inline text-base">Home</span>
          </Link>
        </div>

        <SignedIn>
          <div className="space-y-2">
            <Link
              to={"/"}
              className={
                cn(
                  buttonVariants(
                    {
                      variant: "ghost",
                      className: "w-full text-white justify-start hover:bg-zinc-800"
                    }
                  )
                )
              }
            >
              <MessageCircle size={10} className="mx-1" />
              <span className="hidden md:inline text-base">Message</span>
            </Link>
          </div>
        </SignedIn>
      </div>

      {/* Section Second */}
      <div>
        <div className="flex-1 rounded-lg p-4 bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex px-2 items-center text-white">
              <Library className="size-5 mr-2" />
              <span>Playlist</span>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-2">
              {isLoading ?
                (
                  <PlaylistSkeleton />
                ) :
                (
                  <div>Some Nasheeds</div>
              )
              }
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
