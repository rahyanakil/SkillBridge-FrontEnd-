export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="w-full max-w-md space-y-6 animate-pulse">
        <div className="h-8 bg-slate-100 rounded-2xl w-48 mx-auto" />
        <div className="bg-slate-50 rounded-3xl p-8 space-y-4">
          <div className="h-5 bg-slate-200 rounded-xl w-3/4" />
          <div className="h-5 bg-slate-200 rounded-xl w-1/2" />
          <div className="h-12 bg-slate-200 rounded-2xl w-full mt-4" />
          <div className="h-12 bg-slate-200 rounded-2xl w-full" />
          <div className="h-12 bg-violet-100 rounded-2xl w-full mt-2" />
        </div>
      </div>
    </div>
  );
}
