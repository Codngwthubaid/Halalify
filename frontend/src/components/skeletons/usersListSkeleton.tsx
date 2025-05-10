import { Skeleton } from "../ui/skeleton";

export default function UsersListSkeleton() {
    return (
        <div className="flex flex-wrap gap-4 justify-start items-start my-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-x-2 justify-center items-center "
                >
                    <Skeleton className="h-[50px] w-[50px] rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-[140px]" />
                        <Skeleton className="h-2 w-[50px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}