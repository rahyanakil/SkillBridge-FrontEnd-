import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-30 rounded-xl" />
        <Skeleton className="h-30 rounded-xl" />
        <Skeleton className="h-30 rounded-xl" />
      </div>
      <Skeleton className="h-75 w-full rounded-xl" />
    </div>
  );
}
