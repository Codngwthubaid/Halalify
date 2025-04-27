import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Songs } from "@/types";
import { Pause, Play } from "lucide-react";

export default function PlayButton({ song }: { song: Songs }) {

    const { togglePlay, currentSong, isPlaying, setCurrentSong } = usePlayerStore()
    const isCurrentSong = currentSong?._id === song._id

    const handlePlay = () => {
        if (isCurrentSong) togglePlay()
        else setCurrentSong(song)
    }


    return (
        isPlaying && isCurrentSong ? (
            <Button className="bg-purple-500 hover:bg-purple-600 cursor-pointer" onClick={handlePlay}>
                <Pause size={16} fill="currentColor"/>
            </Button>
        ) : (
            <Button className="bg-purple-500 hover:bg-purple-600 cursor-pointer" onClick={handlePlay}>
                <Play size={16} fill="currentColor"/>
            </Button>
        )
    );
}