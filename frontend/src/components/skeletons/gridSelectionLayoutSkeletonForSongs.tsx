import { Skeleton } from "../ui/skeleton";

export default function GridSelectionLayoutSkeletonForSongs() {
    return (
        <div className="flex flex-wrap gap-4 justify-evenly items-center my-5">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-2 justify-start items-center "
                >
                    <Skeleton className="h-[150px] w-[150px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-2 w-[130px]" />
                        <Skeleton className="h-2 w-[100px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}