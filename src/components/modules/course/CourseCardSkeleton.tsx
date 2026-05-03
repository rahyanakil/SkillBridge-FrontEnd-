export default function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-44 bg-slate-200" />

      <div className="p-5 space-y-3">
        {/* Category badge */}
        <div className="h-5 w-24 bg-slate-200 rounded-full" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-100 rounded-lg w-full" />
          <div className="h-3 bg-slate-100 rounded-lg w-5/6" />
        </div>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-16 bg-slate-200 rounded-lg" />
          <div className="h-4 w-20 bg-slate-100 rounded-lg" />
        </div>

        {/* Tutor row */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
          <div className="w-6 h-6 rounded-full bg-slate-200" />
          <div className="h-3 w-24 bg-slate-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
