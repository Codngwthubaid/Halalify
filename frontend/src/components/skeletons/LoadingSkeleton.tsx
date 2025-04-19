import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[160px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[160px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[160px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-4 w-[160px]" />
            </div>
        </div>
    )
}