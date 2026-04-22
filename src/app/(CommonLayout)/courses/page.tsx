"use client";

import CourseCard from "@/components/modules/course/Course";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryId] = useState(initialCategory);

  const fetchCourses = useCallback(async (q: string, min: string, max: string, cat: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);
    if (cat) params.set("categoryId", cat);
    try {
      const res = await fetch(`${BASE_URL}/courses?${params.toString()}`);
      const result = await res.json();
      setCourses(Array.isArray(result?.data) ? result.data : []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchCourses(query, minPrice, maxPrice, categoryId), 400);
    return () => clearTimeout(timer);
  }, [query, minPrice, maxPrice, categoryId, fetchCourses]);

  const clearFilters = () => { setQuery(""); setMinPrice(""); setMaxPrice(""); };
  const hasFilters = query || minPrice || maxPrice;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 italic mb-2">
          Browse <span className="text-violet-600">Courses</span>
        </h1>
        {categoryId && (
          <p className="text-sm text-violet-600 font-bold mb-4">Filtered by category</p>
        )}

        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses by title or description..."
              className="pl-10 rounded-2xl h-12 border-slate-200"
            />
          </div>
          <Input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            type="number"
            className="rounded-2xl h-12 w-32 border-slate-200"
          />
          <Input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            type="number"
            className="rounded-2xl h-12 w-32 border-slate-200"
          />
          {(hasFilters || categoryId) && (
            <button
              onClick={() => { clearFilters(); window.history.replaceState({}, "", "/courses"); }}
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors px-2"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      ) : courses.length > 0 ? (
        <>
          <p className="text-sm text-slate-500 mb-4 font-medium">
            {courses.length} course{courses.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold italic uppercase tracking-widest">No courses found</p>
          {(hasFilters || categoryId) && (
            <button
              onClick={() => { clearFilters(); window.history.replaceState({}, "", "/courses"); }}
              className="mt-4 text-violet-600 font-bold text-sm hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
