import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { Home, LibraryBigIcon, MessageCircleMoreIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function LeftSidebar() {
    return (
        <div className="h-full flex flex-col gap-2">

            <div className="bg-zinc-900 rounded-lg m-3 p-4">
                <div className="space-y-2">
                    <Link
                        to="/"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start hover:bg-zinc-800"
                        )}
                    >
                        <Home className="size-6 mr-2" />
                        <span className="hidden md:block">Home</span>
                    </Link>

                    <SignedIn>
                        <Link
                            to="/"
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-full justify-start hover:bg-zinc-800"
                            )}
                        >
                            <MessageCircleMoreIcon className="size-6 mr-2" />
                            <span className="hidden md:block">Message</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>

            <div className="flex-1 p-4 m-3 mt-0 rounded-lg bg-zinc-900">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LibraryBigIcon className="size-6 mr-2" />
                        <span className="hidden md:block">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[400px] my-5 w-full ">
                    Jokester began sneaking into the castle in the middle of the night and leaving
                    jokes all over the place: under the king's pillow, in his soup, even in the
                    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
                    then, one day, the people of the kingdom discovered that the jokes left by
                    Jokester were so funny that they couldn't help but laugh. And once they
                    started laughing, they couldn't stop.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto blanditiis quibusdam quidem, impedit cum officia facilis animi? Eligendi nemo beatae earum excepturi harum laborum commodi consequuntur reiciendis quidem nisi.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto blanditiis quibusdam quidem, impedit cum officia facilis animi? Eligendi nemo beatae earum excepturi harum laborum commodi consequuntur reiciendis quidem nisi.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto blanditiis quibusdam quidem, impedit cum officia facilis animi? Eligendi nemo beatae earum excepturi harum laborum commodi consequuntur reiciendis quidem nisi.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto blanditiis quibusdam quidem, impedit cum officia facilis animi? Eligendi nemo beatae earum excepturi harum laborum commodi consequuntur reiciendis quidem nisi.
                </ScrollArea>


            </div>
        </div>
    )
}