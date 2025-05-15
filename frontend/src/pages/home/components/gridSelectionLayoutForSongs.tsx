import GridSelectionLayoutSkeletonForSongs from "@/components/skeletons/gridSelectionLayoutSkeletonForSongs";
import { Songs } from "@/types";
import PlayButton from "./playButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

type GridSelectionLayoutProps = {
    title: string;
    songs: Songs[];
    isLoading: boolean;
};

export default function GridSelectionLayoutForSongs({ title, isLoading, songs = [] }: GridSelectionLayoutProps) {

    const { togglePlay, currentSong, setCurrentSong } = usePlayerStore()

    if (isLoading) return <GridSelectionLayoutSkeletonForSongs />;
    const songsArray = Array.isArray(songs) ? songs : [];

    const handlePlay = (song: Songs) => {
        const isCurrentSong = currentSong?._id === song._id
        if (isCurrentSong) togglePlay()
        else setCurrentSong(song)
    }

    return (
        <div className='mt-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {songsArray.length === 0 ? (
                    <p className='text-zinc-400'>No songs available</p>
                ) : (
                    songsArray.map((song) => (
                        <div
                            key={song._id}
                            className='bg-zinc-800/40 p-2 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
                            onClick={() => handlePlay(song)}
                        >
                            <div className='relative mb-4'>
                                <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    />
                                </div>
                                <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <PlayButton song={song} />
                                </div>
                            </div>
                            <h3 className='font-medium mb-2 truncate'>{song.title}</h3>
                            <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}