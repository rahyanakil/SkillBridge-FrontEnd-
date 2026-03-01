/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getAllCategories } from "@/services/categoryActions";
import { getAllCategories } from "@/services/category/CategoryAction";
import CategoryCard from "./CategoryCard";

export default async function CategorySection() {
  const categories = await getAllCategories();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic leading-tight">
              Popular{" "}
              <span className="text-violet-600 underline decoration-violet-100 underline-offset-8">
                Disciplines
              </span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-md text-sm md:text-right">
            Browse through our diverse range of categories to find the perfect
            course tailored to your goals.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories?.length > 0 ? (
            categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-slate-400 font-bold italic">
                No categories found in backend.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
