export default function AdminDashboardLoading() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-10 w-72 bg-slate-200 rounded-2xl" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[2.5rem] bg-white p-8 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-10 w-16 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-[3rem] bg-white p-8 shadow-sm space-y-4">
            <div className="h-6 w-40 bg-slate-200 rounded-xl" />
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-16 rounded-2xl bg-slate-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
