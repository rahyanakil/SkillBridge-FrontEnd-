import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

const posts = [
  {
    slug: "how-to-choose-the-right-online-tutor",
    category: "Learning Tips",
    title: "How to Choose the Right Online Tutor for Your Goals",
    excerpt: "Finding the perfect tutor can make or break your learning journey. Here's a practical guide to picking someone who matches your learning style, budget, and goals.",
    author: "Sarah Kim",
    date: "April 28, 2026",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    slug: "top-tech-skills-to-learn-in-2026",
    category: "Technology",
    title: "Top 5 Tech Skills to Learn in 2026 (And How to Get Started)",
    excerpt: "The tech landscape is evolving fast. From AI engineering to full-stack development, these are the skills employers are paying a premium for right now.",
    author: "James Okonkwo",
    date: "April 22, 2026",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    slug: "why-live-tutoring-beats-recorded-courses",
    category: "Education",
    title: "Why Live 1-on-1 Tutoring Beats Recorded Courses Every Time",
    excerpt: "Pre-recorded courses have their place, but live sessions deliver something no video can — real-time feedback, accountability, and genuine conversation.",
    author: "Priya Mehta",
    date: "April 15, 2026",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    slug: "how-tutors-build-successful-profiles",
    category: "For Tutors",
    title: "How to Build a SkillBridge Profile That Attracts Students",
    excerpt: "Your tutor profile is your storefront. Learn how to write a compelling bio, set the right price, and earn your first five-star review.",
    author: "Marcus Chen",
    date: "April 8, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    slug: "study-habits-that-actually-work",
    category: "Learning Tips",
    title: "7 Study Habits That Actually Work (Backed by Research)",
    excerpt: "Forget cramming. Science-backed strategies like spaced repetition and active recall can help you learn faster and retain more — with less stress.",
    author: "Anika Rahman",
    date: "April 1, 2026",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    slug: "freelancing-with-online-skills",
    category: "Career",
    title: "From Student to Freelancer: Monetising Skills You Learn Online",
    excerpt: "Online courses and tutoring sessions are just the start. Here's how to package your new skills into freelance projects and your first client contract.",
    author: "Lena Torres",
    date: "March 25, 2026",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Learning Tips": "bg-violet-100 text-violet-600",
  "Technology":    "bg-indigo-100 text-indigo-600",
  "Education":     "bg-blue-100 text-blue-600",
  "For Tutors":    "bg-amber-100 text-amber-600",
  "Career":        "bg-emerald-100 text-emerald-600",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div aria-hidden className="absolute -top-20 -left-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" /> SkillBridge Blog
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic mb-3">
            Learn Smarter, <span className="text-violet-600">Grow Faster</span>
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Tips, guides, and insights for students and tutors navigating the world of online learning.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">

          {/* Featured post */}
          <div className="mb-12">
            <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
              <div className="p-8 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${CATEGORY_COLORS[featured.category] ?? "bg-slate-100 text-slate-600"}`}>{featured.category}</span>
                  <span className="text-slate-400 text-xs">Featured</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-violet-600 transition-colors">{featured.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>{featured.author} · {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>{post.category}</span>
                  </div>
                  <h3 className="text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-violet-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
