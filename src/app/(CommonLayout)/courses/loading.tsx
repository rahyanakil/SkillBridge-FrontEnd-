export default function CoursesLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 rounded-xl mb-8" />
      <div className="flex gap-4 mb-8">
        <div className="h-12 flex-1 bg-slate-100 rounded-2xl" />
        <div className="h-12 w-32 bg-slate-100 rounded-2xl" />
        <div className="h-12 w-32 bg-slate-100 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-[2rem] bg-white shadow-sm overflow-hidden">
            <div className="h-40 bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 bg-slate-100 rounded-lg" />
              <div className="h-5 bg-slate-200 rounded-lg" />
              <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-slate-100 rounded" />
                <div className="h-5 w-12 bg-violet-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
