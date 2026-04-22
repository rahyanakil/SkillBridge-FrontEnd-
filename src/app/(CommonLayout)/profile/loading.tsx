export default function ProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 rounded-xl" />
          <div className="h-4 w-32 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[2rem] bg-white p-6 shadow-sm space-y-3">
            <div className="h-4 w-24 bg-slate-100 rounded" />
            <div className="h-8 w-full bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
