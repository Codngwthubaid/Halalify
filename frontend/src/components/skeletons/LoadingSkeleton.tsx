import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[160px]" />
                        <Skeleton className="h-4 w-[160px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
