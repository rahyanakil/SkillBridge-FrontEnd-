"use client";

import { ICourse } from "@/app/(CommonLayout)/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, BookOpenText, Star, User } from "lucide-react";
import Link from "next/link";

export default function CourseCard({ course }: { course: ICourse }) {
  const categoryInitial = course.category.name.charAt(0).toUpperCase();

  return (
    <Card className="group flex flex-col h-full bg-card hover:border-violet-200 dark:hover:border-violet-700 transition-all duration-300 border border-border rounded-3xl shadow-lg shadow-black/5 dark:shadow-none overflow-hidden">
      {/* 📘 Header Section */}
      <CardHeader className="p-6 pb-0">
        <div className="relative h-28 w-full bg-violet-50/50 dark:bg-violet-950/30 rounded-3xl flex items-center gap-4 px-5 border border-violet-100 dark:border-violet-900/50 overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-violet-100/50 rounded-full blur-2xl group-hover:bg-violet-200/50 transition-colors" />

          <div className="h-16 w-16 bg-background border-4 border-violet-100 dark:border-violet-900/50 rounded-3xl flex items-center justify-center shrink-0 shadow-sm z-10">
            <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">
              {categoryInitial}
            </span>
          </div>

          <div className="flex flex-col gap-1 flex-1 z-10">
            <div className="flex items-center text-xs text-violet-600 dark:text-violet-400 font-semibold tracking-wide gap-1">
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
          <h3 className="text-lg font-bold leading-snug text-foreground line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {course.title}
          </h3>
          <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors shrink-0 mt-1" />
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-end justify-between">
          <p className="text-2xl font-black text-foreground tracking-tight">
            ${course.price.toFixed(2)}
          </p>
          <div className="flex flex-col items-end gap-1">
            {(course.avgRating ?? 0) > 0 ? (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-foreground">{course.avgRating}</span>
                <span className="text-[10px] text-muted-foreground">({course.reviewCount})</span>
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground font-medium">No reviews yet</p>
            )}
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
            className="rounded-2xl bg-foreground hover:bg-violet-600 text-background hover:text-white px-6 h-12 font-bold transition-all duration-300 shadow-lg hover:shadow-violet-500/25 group/btn"
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
      <CardFooter className="px-6 py-4 bg-muted/30 border-t border-border flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-background flex items-center justify-center border border-border shrink-0 shadow-sm">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold text-foreground leading-none truncate">
            {course.tutor.user.name}
          </span>
          <span className="text-[10px] text-muted-foreground mt-1 font-medium italic truncate">
            {course.tutor.expertise}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
