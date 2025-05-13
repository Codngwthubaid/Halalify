import { useChatStore } from "@/stores/useChatStore"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export default function ChatHeader() {

    const { onlineUsers, isSelectedUser } = useChatStore()
    if (!isSelectedUser) return null

    return (
        <div className='p-4 border-b border-zinc-800'>
            <div className='flex items-center gap-3'>
                <Avatar>
                    <AvatarImage src={isSelectedUser?.imageUrl} className="size-8 md:size-10 rounded-full" />
                    <AvatarFallback>{isSelectedUser?.fullName[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='font-medium'>{isSelectedUser?.fullName}</h2>
                    <p className='text-sm text-zinc-400'>
                        {onlineUsers.has(isSelectedUser?.clerkId) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
        </div>
    )
}