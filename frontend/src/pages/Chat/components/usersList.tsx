import UsersListSkeleton from "@/components/skeletons/usersListSkeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/stores/useChatStore"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"


export default function UsersList() {

    const { users, isLoading, setIsSelectedUser, isSelectedUser, onlineUsers } = useChatStore(
        (state) => ({
            users: state.users,
            isLoading: state.isLoading,
            setIsSelectedUser: state.setIsSelectedUser,
            isSelectedUser: state.isSelectedUser,
            onlineUsers: new Set(state.onlineUsers), // create a new Set so React sees changes
        })
    );


    return (
        <div className='border-r border-zinc-800'>
            <div className='flex flex-col h-full'>
                <ScrollArea className='h-[calc(100vh-80px)]'>
                    <div className='space-y-2 p-4'>
                        {isLoading ?
                            (
                                <UsersListSkeleton />
                            )
                            :
                            (
                                <>
                                    {Array.isArray(users) && users.map((user) => {
                                        console.log("Checking online:", {
                                            userId: user.clerkId,
                                            isOnline: onlineUsers.has(user.clerkId),
                                            onlineUsers: Array.from(onlineUsers),
                                        });
                                        return (
                                            <div
                                                key={user.clerkId}
                                                onClick={() => setIsSelectedUser(user)}
                                                className={
                                                    `flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors 
                                                ${isSelectedUser?.clerkId === user.clerkId ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`
                                                }
                                            >
                                                <div className='relative'>
                                                    <Avatar className='size-8 md:size-10'>
                                                        <AvatarImage src={user.imageUrl} className="size-8 md:size-10 rounded-full" />
                                                        <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                                                    </Avatar>

                                                    <div
                                                        className={
                                                            `absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
                                                        ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`
                                                        }
                                                    />
                                                </div>

                                                <div className='flex-1 min-w-0 lg:block hidden'>
                                                    <span className='font-medium truncate'>{user.fullName}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </>
                            )
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}   