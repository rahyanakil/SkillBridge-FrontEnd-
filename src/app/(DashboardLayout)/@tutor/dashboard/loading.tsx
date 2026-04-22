export default function TutorDashboardLoading() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-48 bg-slate-100 rounded-xl" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 w-36 bg-slate-200 rounded-2xl" />
          <div className="h-12 w-36 bg-emerald-100 rounded-2xl" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[2.5rem] bg-white p-8 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-10 w-20 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 rounded-[3rem] bg-white p-8 shadow-sm space-y-4">
          <div className="h-6 w-40 bg-slate-200 rounded-xl" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-[2rem] bg-slate-100" />
          ))}
        </div>
        <div className="rounded-[3rem] bg-emerald-100 h-72" />
      </div>
    </div>
  );
}
