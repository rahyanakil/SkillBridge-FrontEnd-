export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-2xl w-64 mb-4" />
      <div className="h-5 bg-slate-100 rounded-xl w-96 mb-12" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
