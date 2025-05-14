import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/usersList";
import Logo from "@/assets/Halalify.svg";
import ChatHeader from "./components/chatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import MessageInputBox from "./components/messageInputBox";

export const NoConversationPlaceholder = () => (
    <div className='flex flex-col items-center justify-center h-full space-y-6'>
        <img src={Logo} alt='Halalify' className='size-16 animate-bounce' />
        <div className='text-center'>
            <h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
            <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
        </div>
    </div>
);

export default function ChatPage() {

    const { user } = useUser()
    const { fetchMessage, fetchUsers, isSelectedUser, messages } = useChatStore()

    const clerkId = user?.id
    console.log("clerkId in ChatPage:", clerkId);


    useEffect(() => { if (user) fetchUsers() }, [user, fetchUsers])
    useEffect(() => { if (isSelectedUser) fetchMessage(isSelectedUser._id) }, [isSelectedUser, fetchMessage])
    useEffect(() => {
        fetchUsers();
        return () => { useChatStore.getState().disconnectSocket() };
    }, [fetchUsers]);

    const formatTime = (date: string) => { return new Date(date).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }

    return (
        <main className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
            <Topbar />
            <div className='grid lg:grid-cols-[225px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
                <UsersList />

                <div className="flex flex-col h-full">
                    {isSelectedUser ? (
                        <>
                            <ChatHeader />
                            <ScrollArea className='h-[calc(100vh-300px)]'>
                                <div className='p-4 space-y-4'>
                                    {Array.isArray(messages) && messages.map((message, index) => (
                                        <div key={index} className={`flex items-center gap-2 ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}>
                                            <Avatar className='size-8 md:size-10'>
                                                <AvatarImage
                                                    src={message.senderId === user?.id ? user.imageUrl : isSelectedUser?.imageUrl}
                                                    className="size-8 md:size-10 rounded-full" />
                                                <AvatarFallback>{isSelectedUser?.fullName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}
												`}
                                            >
                                                <p className='text-sm'>{message.content}</p>
                                                <span className='text-xs text-zinc-300 mt-1 block'>
                                                    {formatTime(message.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="border-t border-zinc-700">
                                <MessageInputBox />
                            </div>
                        </>
                    ) : (
                        <NoConversationPlaceholder />
                    )}
                </div>
            </div>
        </main>
    )
}


