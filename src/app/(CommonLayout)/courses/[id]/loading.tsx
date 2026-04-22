export default function CourseLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-8">
      <div className="space-y-3">
        <div className="h-4 w-32 bg-slate-200 rounded-lg" />
        <div className="h-10 w-3/4 bg-slate-200 rounded-2xl" />
        <div className="h-5 w-1/2 bg-slate-100 rounded-xl" />
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 rounded-[2rem] bg-slate-200" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-slate-100 rounded-lg" style={{ width: `${90 - i * 10}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white shadow-lg p-6 space-y-4 h-fit">
          <div className="h-8 w-24 bg-slate-200 rounded-xl" />
          <div className="h-12 w-full bg-violet-100 rounded-2xl" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-slate-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
