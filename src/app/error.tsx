"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-3xl bg-red-50 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
