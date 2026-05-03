"use client";

import CourseCard from "@/components/modules/course/Course";
import CourseCardSkeleton from "@/components/modules/course/CourseCardSkeleton";
import AISearchBox from "@/components/modules/course/AISearchBox";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 8;

type SortKey = "newest" | "price_asc" | "price_desc" | "rating";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

function sortCourses(courses: any[], sort: SortKey) {
  const arr = [...courses];
  if (sort === "price_asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "rating") return arr.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
  return arr; // newest = server order
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
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
      setAllCourses(Array.isArray(result?.data) ? result.data : []);
    } catch {
      setAllCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses(query, minPrice, maxPrice, categoryId);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, minPrice, maxPrice, categoryId, fetchCourses]);

  // Reset page when sort changes
  useEffect(() => { setPage(1); }, [sort]);

  const clearFilters = () => {
    setQuery(""); setMinPrice(""); setMaxPrice(""); setSort("newest");
    window.history.replaceState({}, "", "/courses");
  };

  const sorted = sortCourses(allCourses, sort);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = query || minPrice || maxPrice || categoryId;

  return (
    <div className="container mx-auto py-12 px-4 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 italic mb-1">
          Browse <span className="text-violet-600">Courses</span>
        </h1>
        <p className="text-slate-500 text-sm mb-5">Discover expert-led courses across technology, design, and business.</p>

        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* AI-powered search */}
          <AISearchBox
            value={query}
            onChange={(v) => { setQuery(v); setPage(1); }}
            placeholder="Search courses... (AI suggestions enabled)"
          />

          {/* Min / Max price */}
          <Input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min $"
            type="number"
            className="rounded-2xl h-11 w-28 border-slate-200"
            suppressHydrationWarning
          />
          <Input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max $"
            type="number"
            className="rounded-2xl h-11 w-28 border-slate-200"
            suppressHydrationWarning
          />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 px-3 rounded-2xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors px-2"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <CourseCardSkeleton key={i} />)}
        </div>
      ) : sorted.length > 0 ? (
        <>
          <p className="text-sm text-slate-500 mb-4 font-medium">
            Showing {paginated.length} of {sorted.length} course{sorted.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginated.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:border-violet-400 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-xl border text-sm font-bold transition-colors ${
                    page === n
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "border-slate-200 text-slate-600 hover:border-violet-400 hover:text-violet-600"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:border-violet-400 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold italic uppercase tracking-widest">No courses found</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
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
