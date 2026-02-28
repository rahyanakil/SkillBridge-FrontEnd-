// "use client";

// import { ICourse } from "@/app/(CommonLayout)/page";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { ArrowUpRight, Layers, Star, User } from "lucide-react";
// import Link from "next/link";

// export default function CourseCard({ course }: { course: ICourse }) {
//   const categoryInitial = course.category.name.charAt(0).toUpperCase();

//   return (
//     <Card className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2">
//       {/* --- Top Visual Element --- */}
//       <div className="relative h-48 w-full overflow-hidden bg-slate-50">
//         {/* Decorative Gradient Background */}
//         <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 to-indigo-600/5 group-hover:scale-110 transition-transform duration-700" />

//         {/* Category Badge - Floating */}
//         <div className="absolute top-4 left-4 z-10">
//           <Badge className="bg-white/80 backdrop-blur-md text-violet-700 border-none shadow-sm px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
//             {course.category.name}
//           </Badge>
//         </div>

//         {/* Big Initial Overlay */}
//         <div className="flex items-center justify-center h-full">
//           <span className="text-8xl font-black text-violet-600/10 select-none group-hover:scale-125 transition-transform duration-700">
//             {categoryInitial}
//           </span>
//         </div>
//       </div>

//       {/* --- Main Content --- */}
//       <CardContent className="p-6 flex-1 flex flex-col -mt-10">
//         {/* Tutor Avatar & Info Overlay */}
//         <div className="flex items-center gap-3 mb-6 bg-white p-2 rounded-2xl shadow-sm w-fit pr-4 border border-slate-50">
//           <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
//             <User className="w-5 h-5" />
//           </div>
//           <div className="flex flex-col">
//             <span className="text-xs font-black text-slate-900 leading-none">
//               {course.tutor.user.name}
//             </span>
//             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
//               {course.tutor.expertise}
//             </span>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold leading-tight text-slate-900 mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
//           {course.title}
//         </h3>

//         <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">
//           {course.description}
//         </p>

//         {/* Stats Row */}
//         <div className="flex items-center gap-4 mt-auto pb-6 border-b border-slate-50">
//           <div className="flex items-center gap-1.5">
//             <Layers className="w-4 h-4 text-violet-500" />
//             <span className="text-xs font-bold text-slate-600">All Levels</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
//             <span className="text-xs font-bold text-slate-600">4.9</span>
//           </div>
//         </div>
//       </CardContent>

//       {/* --- Footer Area --- */}
//       <CardFooter className="p-6 pt-0 flex items-center justify-between gap-4">
//         <div>
//           <span className="block text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">
//             Price
//           </span>
//           <span className="text-2xl font-black text-slate-900">
//             ${course.price.toFixed(0)}
//           </span>
//         </div>

//         <Button
//           asChild
//           className="rounded-2xl bg-slate-900 hover:bg-violet-600 text-white px-6 h-12 font-bold transition-all duration-300 shadow-lg hover:shadow-violet-200 group/btn"
//         >
//           <Link
//             href={`/courses/${course.id}`}
//             className="flex items-center gap-2"
//           >
//             Details
//             <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
//           </Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import { ICourse } from "@/app/(CommonLayout)/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // বাটন ইম্পোর্ট নিশ্চিত করুন
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, BookOpenText, User } from "lucide-react";
import Link from "next/link";

export default function CourseCard({ course }: { course: ICourse }) {
  const categoryInitial = course.category.name.charAt(0).toUpperCase();

  return (
    <Card className="group flex flex-col h-full bg-white hover:border-violet-200 transition-all duration-300 border border-gray-100 rounded-3xl shadow-lg shadow-gray-100 hover:shadow-violet-50 overflow-hidden">
      {/* 📘 Header Section */}
      <CardHeader className="p-6 pb-0">
        <div className="relative h-28 w-full bg-violet-50/50 rounded-3xl flex items-center gap-4 px-5 border border-violet-100 overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-violet-100/50 rounded-full blur-2xl group-hover:bg-violet-200/50 transition-colors" />

          <div className="h-16 w-16 bg-white border-4 border-violet-100 rounded-3xl flex items-center justify-center shrink-0 shadow-sm z-10">
            <span className="text-3xl font-extrabold text-violet-600">
              {categoryInitial}
            </span>
          </div>

          <div className="flex flex-col gap-1 flex-1 z-10">
            <div className="flex items-center text-xs text-violet-600 font-semibold tracking-wide gap-1">
              <BookOpenText className="w-3.5 h-3.5" />
              COURSE
            </div>
            <Badge className="bg-violet-600 text-white font-medium px-3 py-1 text-xs hover:bg-violet-700 w-fit border-none">
              {course.category.name}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Content Area */}
      <CardContent className="p-6 flex-1 space-y-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-violet-700 transition-colors">
            {course.title}
          </h3>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-violet-600 transition-colors shrink-0 mt-1" />
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-end justify-between">
          <p className="text-2xl font-black text-gray-900 tracking-tight">
            ${course.price.toFixed(2)}
          </p>
          <div className="flex flex-col items-end">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
              Starting from
            </p>
            <p className="text-xs text-violet-600 font-medium">Limited Seats</p>
          </div>
        </div>

        {/* 🚀 Interactive Buttons Section */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* <Button
            variant="outline"
            className="rounded-xl border-violet-200 text-violet-600 hover:bg-violet-50 hover:text-violet-700 font-bold transition-all flex items-center gap-2 group/btn"
            asChild
          >
            <Link href={`/courses/${course.id}`}>
              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              View Details
            </Link>
          </Button> */}
          <Button
            asChild
            className="rounded-2xl bg-slate-900 hover:bg-violet-600 text-white px-6 h-12 font-bold transition-all duration-300 shadow-lg hover:shadow-violet-200 group/btn"
          >
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center gap-2"
            >
              Details
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* Footer Area */}
      <CardFooter className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border border-gray-200 shrink-0 shadow-sm">
          <User className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold text-gray-800 leading-none truncate">
            {course.tutor.user.name}
          </span>
          <span className="text-[10px] text-gray-500 mt-1 font-medium italic truncate">
            {course.tutor.expertise}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
