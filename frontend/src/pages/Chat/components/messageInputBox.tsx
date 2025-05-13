import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { Send } from "lucide-react"
import { useState } from "react"

export default function MessageInputBox() {

    const { user } = useUser()
    const { sendMessage, isSelectedUser } = useChatStore()
    const [newMessages, setNewMessages] = useState("")

    const handleSend = () => {
        if (!user || !isSelectedUser || !newMessages) return
        else sendMessage(user.id, isSelectedUser.clerkId, newMessages)
        setNewMessages("")
    }

    return (
        <div className="p-4 mt-auto border-zinc-800 border-t">
            <div className="flex items-center justify-center gap-x-2">
                <Input
                    value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)}
                    placeholder="Type a message"
                    className="rounded-md border-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} />
                <Button onClick={handleSend} disabled={!newMessages.trim()}>
                    <Send />
                </Button>
            </div>
        </div>
    )
}
