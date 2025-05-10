import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/usersList";

export default function ChatPage() {

    const { user } = useUser()
    const { fetchMessage, fetchUsers, isSelectedUser, messages } = useChatStore()

    useEffect(() => { if (user) fetchUsers() }, [user, fetchUsers])
    useEffect(() => { if (isSelectedUser) fetchMessage(isSelectedUser._id) }, [isSelectedUser, fetchMessage])

    return (
        <main className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
            <Topbar />
            <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
                <UsersList />
            </div>
        </main>
    )
}