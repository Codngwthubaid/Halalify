import LoginSuggestion from "@/components/LoginSuggestion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { Users } from "lucide-react"
import { useEffect } from "react"

export default function FriendsActivity() {

    const { fetchUsers, users, isLoading, error } = useChatStore()
    const { user } = useUser()
    console.log(users)

    useEffect(() => { if (user) fetchUsers() }, [fetchUsers, user])

    return (
        <div className="h-full flex flex-col items-center p-6 text-center space-y-4 rounded-md bg-zince800/50 backdrop-blur-md shadow-md">
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
                            <img
                                src={user.imageUrl}
                                alt={user.name}
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}