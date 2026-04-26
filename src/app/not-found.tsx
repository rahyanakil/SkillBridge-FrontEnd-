import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-3xl bg-violet-50 flex items-center justify-center mx-auto mb-8">
          <SearchX className="w-10 h-10 text-violet-500" />
        </div>
        <h1 className="text-8xl font-black text-slate-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          Page not found
        </h2>
        <p className="text-slate-500 font-medium mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
