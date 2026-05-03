/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/services/category/CategoryAction";
import { AnimatedSectionHeader } from "./AnimatedSectionHeader";
import CategoryCard from "./CategoryCard";

export default async function CategorySection() {
  const categories = await getAllCategories();

  return (
    <section className="py-28 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-violet-50 dark:bg-violet-900/20 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader
          badge="Browse Categories"
          headline="Popular"
          highlight="Disciplines"
          description="Browse through our diverse range of categories to find the perfect course tailored to your goals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
          {categories?.length > 0 ? (
            categories.map((category: any, index: number) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 opacity-40 italic text-slate-500 font-bold">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
