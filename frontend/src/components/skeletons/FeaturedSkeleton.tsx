import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 justify-evenly items-center my-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-x-2 justify-center items-center "
        >
          <Skeleton className="h-[60px] w-[100px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[70px]" />
            <Skeleton className="h-2 w-[50px]" />
          </div>
        </div>
      ))}
    </div>
  );
}