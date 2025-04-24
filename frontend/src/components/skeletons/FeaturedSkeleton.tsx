import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedSkeleton() {
    return (
        <div className="flex gap-x-2 justify-center items-center">
            <Skeleton className="h-[100px] w-[150px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
