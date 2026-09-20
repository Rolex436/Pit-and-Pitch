import { ListSkeleton, Skeleton } from "@/components/f1/states";

export default function Loading() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-24 w-full" />
      <ListSkeleton rows={6} />
      <ListSkeleton rows={5} />
    </div>
  );
}