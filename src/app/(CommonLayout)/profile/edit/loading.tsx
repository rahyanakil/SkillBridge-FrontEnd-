export default function ProfileEditLoading() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-2xl w-48 mb-10" />
      <div className="flex gap-6 items-center mb-10">
        <div className="h-24 w-24 rounded-3xl bg-slate-200 shrink-0" />
        <div className="space-y-3 flex-1">
          <div className="h-5 bg-slate-100 rounded-xl w-40" />
          <div className="h-4 bg-slate-100 rounded-xl w-28" />
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-200 rounded-lg w-24" />
            <div className="h-12 bg-slate-100 rounded-2xl w-full" />
          </div>
        ))}
        <div className="h-12 bg-violet-100 rounded-2xl w-full mt-4" />
      </div>
    </div>
  );
}
