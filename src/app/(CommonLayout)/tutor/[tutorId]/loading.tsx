export default function TutorProfileLoading() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 animate-pulse">
      <div className="flex gap-8 items-start mb-12">
        <div className="h-28 w-28 rounded-3xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-8 bg-slate-200 rounded-xl w-64" />
          <div className="h-5 bg-slate-100 rounded-xl w-40" />
          <div className="h-5 bg-slate-100 rounded-xl w-32" />
        </div>
      </div>
      <div className="space-y-4 mb-12">
        <div className="h-5 bg-slate-100 rounded-xl w-full" />
        <div className="h-5 bg-slate-100 rounded-xl w-5/6" />
        <div className="h-5 bg-slate-100 rounded-xl w-4/6" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
