import LoginSuggestion from "@/components/LoginSuggestion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { Music, Users } from "lucide-react"
import { useEffect, useState } from "react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function FriendsActivity() {

    const [isPlaying, setIsPlaying] = useState(true)
    const { fetchUsers, users, isLoading, error } = useChatStore()
    const { user } = useUser()
    console.log(users)

    useEffect(() => { if (user) fetchUsers() }, [fetchUsers, user])

    return (
        <div className="h-full flex flex-col p-6 text-center space-y-4 rounded-md bg-zince800/50 backdrop-blur-md shadow-md">
            <div className="p-4 flex items-center justify-between group border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Users className="size-6 text-purple-500" />
                    <h3 className="text-base font-normal text-white">What's your friends listening to</h3>
                </div>
            </div>

            {!user && <LoginSuggestion />}

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {users.map((user) => (
                        <div key={user._id} className="flex items-center gap-2">
                            <div className="realative">
                                <Avatar className="size-10">
                                    <AvatarImage src={user.imageUrl} alt={user.name} />
                                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                                </Avatar>
                                <div
                                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 `}
                                    aria-hidden='true'
                                />
                            </div>

                            <div className='flex-1 min-w-0'>
                                <div className='flex items-center gap-2'>
                                    <span className='font-medium text-sm text-white'>{user.fullName}</span>
                                    {isPlaying && <Music className='size-3.5 text-purple-400 shrink-0' />}
                                </div>

                                {isPlaying ? (
                                    <div className='flex flex-col items-start justify-start'>
                                        <div className='mt-1 text-sm text-white font-medium truncate'>
                                            {/* {activity.replace("Playing ", "").split(" by ")[0]} */}
                                            Mota bhai
                                        </div>
                                        <div className='text-xs text-zinc-400 truncate'>
                                            {/* {activity.split(" by ")[1]} */}
                                            by ubaid
                                        </div>
                                    </div>
                                ) : (
                                    <div className='mt-1 text-xs text-zinc-400'>Idle</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}