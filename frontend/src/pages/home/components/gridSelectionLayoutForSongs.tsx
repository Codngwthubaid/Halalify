// import GridSelectionLayoutSkeletonForSongs from "@/components/skeletons/gridSelectionLayoutSkeletonForSongs";
// import { Button } from "@/components/ui/button";
// import { Songs } from "@/types";

// type GridSelectionLayoutProps = {
//     title: string;
//     songs: Songs[];
//     isLoading: boolean;
// };
// export default function GridSelectionLayoutForSongs({ title, isLoading, songs = [] }: GridSelectionLayoutProps) {
//     if (isLoading) return <GridSelectionLayoutSkeletonForSongs />;
//     console.log("songs", Array.isArray(songs) ? songs : []);

//     return (
//         <div className='mb-8'>
//             <div className='flex items-center justify-between mb-4'>
//                 <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
//                 <Button variant='link' className='text-sm text-zinc-400 hover:text-white cursor-pointer'>Show all</Button>
//             </div>

//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

//                 {songs.map((song) => (
//                     <div
//                         key={song._id}
//                         className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
//                     >
//                         <div className='relative mb-4'>
//                             <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
//                                 <img
//                                     src={song.imageUrl}
//                                     alt={song.title}
//                                     className='w-full h-full object-cover transition-transform duration-300 
// 									group-hover:scale-105'
//                                 />
//                             </div>
//                             {/* <PlayButton /> */}
//                         </div>
//                         <h3 className='font-medium mb-2 truncate'>{song.title}</h3>
//                         <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }





import GridSelectionLayoutSkeletonForSongs from "@/components/skeletons/gridSelectionLayoutSkeletonForSongs";
import { Button } from "@/components/ui/button";
import { Songs } from "@/types";

type GridSelectionLayoutProps = {
    title: string;
    songs: Songs[];
    isLoading: boolean;
};

export default function GridSelectionLayoutForSongs({ title, isLoading, songs = [] }: GridSelectionLayoutProps) {
    if (isLoading) return <GridSelectionLayoutSkeletonForSongs />;

    // Log songs for debugging
    console.log("songs", songs, "isArray:", Array.isArray(songs));

    // Ensure songs is an array
    const songsArray = Array.isArray(songs) ? songs : [];

    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
                <Button variant='link' className='text-sm text-zinc-400 hover:text-white cursor-pointer'>
                    Show all
                </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {songsArray.length === 0 ? (
                    <p className='text-zinc-400'>No songs available</p>
                ) : (
                    songsArray.map((song) => (
                        <div
                            key={song._id}
                            className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
                        >
                            <div className='relative mb-4'>
                                <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    />
                                </div>
                                {/* <PlayButton /> */}
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