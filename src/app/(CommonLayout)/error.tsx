"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function CommonLayoutError({
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
    <div className="min-h-[60vh] flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-3xl bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-slate-500 font-medium mb-6 text-sm">
          {error.message || "Failed to load this page. Please try again."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-violet-600 text-white font-bold rounded-xl text-sm hover:bg-violet-700 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
