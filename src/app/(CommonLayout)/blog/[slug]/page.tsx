import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Calendar, User } from "lucide-react";

/* ── Shared posts data (single source of truth) ─────────────────── */
const posts = [
  {
    slug: "how-to-choose-the-right-online-tutor",
    category: "Learning Tips",
    title: "How to Choose the Right Online Tutor for Your Goals",
    excerpt:
      "Finding the perfect tutor can make or break your learning journey. Here's a practical guide to picking someone who matches your learning style, budget, and goals.",
    author: "Sarah Kim",
    date: "April 28, 2026",
    readTime: "5 min read",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `Finding the right tutor is one of the most important decisions you'll make in your learning journey. A great match can accelerate your progress dramatically, while a poor fit can leave you frustrated and stagnant.

## Define Your Goals First

Before you start browsing tutor profiles, spend 10 minutes writing down exactly what you want to achieve. "I want to learn Python" is too vague. "I want to build a personal finance web app using Python and Django within 3 months" gives a tutor something concrete to work with.

Clear goals help you:
- Filter tutors by relevant specialisation
- Assess whether a tutor's teaching style matches your objectives
- Measure progress during and after sessions

## Check for Relevant Experience, Not Just Credentials

A PhD in computer science doesn't automatically make someone a great coding tutor. Look for tutors who have done the specific thing you want to learn — built the kind of app, worked in the industry, or taught students with similar backgrounds.

On SkillBridge, every tutor profile includes their expertise field and years of experience. Read them carefully. A tutor who has worked as a full-stack developer for five years will teach web development very differently from an academic who studies it theoretically.

## Read Reviews Critically

Star ratings matter, but the written reviews reveal far more. Look for patterns: do multiple students mention that the tutor explains concepts clearly? Are there complaints about being unprepared or running over time? Pay particular attention to reviews from students who had similar starting points to yours.

## Book a Single Session First

Most students commit to a package of sessions before they've tested the relationship. Always book a single introductory session first. Treat it like a working interview — come with a specific problem or question, and pay attention to:

- How clearly the tutor explains unfamiliar concepts
- Whether they adapt when you don't understand something
- How comfortable you feel asking "stupid" questions
- Whether the session ends on time and covers what was promised

## Trust Your Gut

Technical competence is table stakes. What separates a good tutor from a great one is their ability to motivate you, challenge you at the right level, and make the hard work feel worthwhile. If you leave a session feeling energised and capable, that's your tutor.`,
  },
  {
    slug: "top-tech-skills-to-learn-in-2026",
    category: "Technology",
    title: "Top 5 Tech Skills to Learn in 2026 (And How to Get Started)",
    excerpt:
      "The tech landscape is evolving fast. From AI engineering to full-stack development, these are the skills employers are paying a premium for right now.",
    author: "James Okonkwo",
    date: "April 22, 2026",
    readTime: "7 min read",
    image:
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `The technology job market in 2026 is unlike anything we've seen before. AI has automated many entry-level tasks, raising the bar for what employers expect from new hires. But it's also created entirely new categories of high-paying roles. Here are the five skills with the strongest return on learning investment right now.

## 1. AI Engineering & Prompt Engineering

The explosion of large language models has created a new discipline: AI engineering. This isn't research — it's applied work. Companies need engineers who can integrate LLMs into products, fine-tune models for specific use cases, build reliable evaluation pipelines, and prevent hallucinations from reaching users.

**Where to start:** Learn the OpenAI and Anthropic APIs. Build a small project that chains together multiple LLM calls with tool use. Study RAG (Retrieval-Augmented Generation) patterns.

## 2. Full-Stack TypeScript Development

TypeScript has decisively won the web development language war. Every serious frontend framework (React, Next.js, SvelteKit) and most backend frameworks (Node, Bun, Deno) use it. Employers now expect TypeScript as a baseline, not a differentiator.

**Where to start:** If you know JavaScript, TypeScript is a two-week investment. Focus on type narrowing, generics, and how to type async functions. Then build a full project using Next.js App Router.

## 3. Data Engineering with Python

As AI workloads explode, companies are drowning in data they can't use. Data engineers who can build reliable ETL pipelines, maintain data quality, and provision infrastructure for ML teams are extremely well compensated.

**Where to start:** Learn Pandas and SQL deeply. Then explore dbt (data build tool) and Apache Airflow for orchestration. A working data pipeline project on GitHub is worth more than any certification.

## 4. Cybersecurity

Every system that goes online needs securing. The cybersecurity talent shortage is acute and growing. Roles range from penetration testing to security engineering to compliance — all well-compensated and recession-resistant.

**Where to start:** The TryHackMe and HackTheBox platforms offer hands-on labs. Pursue the CompTIA Security+ certification as a baseline credential. Then specialise.

## 5. Cloud Architecture (AWS / Azure / GCP)

Cloud skills remain in high demand because organisations continue migrating on-premise systems and need architects who understand distributed systems, cost optimisation, and reliability engineering.

**Where to start:** Pick one cloud provider and get the associate-level certification. Then build something real — a personal project with a database, a serverless API, and proper IAM roles teaches you more than any course.`,
  },
  {
    slug: "why-live-tutoring-beats-recorded-courses",
    category: "Education",
    title: "Why Live 1-on-1 Tutoring Beats Recorded Courses Every Time",
    excerpt:
      "Pre-recorded courses have their place, but live sessions deliver something no video can — real-time feedback, accountability, and genuine conversation.",
    author: "Priya Mehta",
    date: "April 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `Online courses have democratised access to education in remarkable ways. For under $30, you can watch world-class instructors explain complex topics in polished, well-edited videos. And yet, research consistently shows that completion rates for MOOCs hover around 3–5%. Most people who start a recorded course never finish it.

## The Passive Learning Problem

Watching a video feels productive. You're absorbing information, nodding along, thinking "yes, I understand this." But understanding something when someone explains it clearly is very different from being able to do it yourself.

This is what researchers call the "illusion of knowing" — a systematic bias where passive exposure to information creates a false sense of mastery. Recorded courses optimise for this feeling. They're professionally produced, logically sequenced, and designed to feel easy to follow.

## What Live Sessions Force You to Do

A live 1-on-1 session with a tutor eliminates the comfort of passive consumption. You have to:

**Articulate your thinking.** When a tutor asks "so what would happen if we changed this variable?", you can't skip ahead or rewind. You have to think, formulate a response, and express it. This is active retrieval — the single most effective technique for learning retention.

**Confront gaps immediately.** In a recorded course, you can convince yourself you understood a confusing section by watching it twice. A tutor who asks "can you explain that back to me?" cannot be deceived. Gaps surface immediately and get addressed before they compound.

**Stay accountable.** You booked the session. Someone is waiting. Cancelling means disappointing another person and wasting money. The social contract of a scheduled session is one of the most powerful motivational forces available.

## The Right Tool for the Right Job

Recorded courses excel for reference material — things you need to look up occasionally, like syntax or API documentation. They're also good for broad survey courses where you want exposure to a topic before committing to mastering it.

But for the skills you actually need to use at work or in your projects? A skilled 1-on-1 tutor who can meet you where you are, challenge you at the right level, and give you real-time feedback will get you there in a fraction of the time.`,
  },
  {
    slug: "how-tutors-build-successful-profiles",
    category: "For Tutors",
    title: "How to Build a SkillBridge Profile That Attracts Students",
    excerpt:
      "Your tutor profile is your storefront. Learn how to write a compelling bio, set the right price, and earn your first five-star review.",
    author: "Marcus Chen",
    date: "April 8, 2026",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `Your SkillBridge profile is working for you 24 hours a day. While you sleep, students are reading your bio, scanning your reviews, and deciding whether to book a session. Getting your profile right isn't just about looking professional — it directly determines how many students find you and whether they trust you enough to pay for your time.

## Write a Bio That Speaks to Students, Not Colleagues

The most common mistake tutors make is writing a bio that reads like a CV summary. "Experienced software engineer with 7 years in enterprise Java development and a Master's degree from the University of Southampton" is impressive, but it doesn't answer the question on every student's mind: "Can this person help me specifically?"

Reframe your bio around the student's outcome. Instead of "I have 7 years of experience in Java", try "I've helped over 40 students go from zero to writing production-ready Java code, most within 8–10 sessions." Every sentence should answer the implicit question: "What does this mean for me as a student?"

## Set a Price That Signals Value

Counterintuitively, very low prices often reduce bookings. When students see a tutor charging £8/hour, they wonder what's wrong. Pricing communicates quality. Research what tutors in your subject charge on the platform and price in the upper-middle of that range. You can always offer a discounted first session to remove the risk of an initial booking.

## Get Your First Three Reviews Strategically

Social proof is everything at the beginning. Before you open your profile publicly, reach out to former colleagues, students you've informally mentored, or anyone you've helped learn something. Offer them a free session in exchange for an honest review. Three genuine 5-star reviews with specific praise will convert new students far better than an empty review section.

## Respond to Every Booking Quickly

Response time is visible to students. Tutors who respond to booking requests within an hour get significantly more repeat business. Set up notifications on your phone and treat a booking request like a professional email — respond within the hour, confirm the session details, and ask one focused question about what the student wants to achieve.`,
  },
  {
    slug: "study-habits-that-actually-work",
    category: "Learning Tips",
    title: "7 Study Habits That Actually Work (Backed by Research)",
    excerpt:
      "Forget cramming. Science-backed strategies like spaced repetition and active recall can help you learn faster and retain more — with less stress.",
    author: "Anika Rahman",
    date: "April 1, 2026",
    readTime: "8 min read",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `Most people study the way they were taught in school: read the material, highlight the important bits, read it again before the exam. Decades of cognitive science research have shown that this approach is almost perfectly designed to minimise long-term retention. Here are seven techniques that actually work.

## 1. Active Recall

Close the book and try to recall what you just read from memory. Don't re-read the page — struggle to reconstruct it. This retrieval practice, even when imperfect, strengthens memory traces far more than passive re-reading.

**How to use it:** After reading a chapter, write down everything you remember without looking at the text. Then check what you missed and note the gaps.

## 2. Spaced Repetition

Cramming works for tomorrow's exam and fails within a week. Spaced repetition schedules review sessions at increasing intervals — review after 1 day, then 3 days, then 1 week, then 2 weeks. This matches the natural forgetting curve and builds genuine long-term retention.

**How to use it:** Use Anki for flashcard-based subjects (languages, medical terms, code syntax). For conceptual subjects, schedule brief review sessions in your calendar.

## 3. The Feynman Technique

Take a concept you're trying to learn and explain it in simple language as if you were teaching a ten-year-old. Where you struggle to simplify, you've found the gaps in your understanding. Go back to the source, fill the gap, and try again.

## 4. Interleaved Practice

Most people practise one skill until they feel they've got it, then move on. Interleaved practice mixes different types of problems within a single session. Though it feels harder, it produces dramatically better long-term retention and transfer.

## 5. Elaborative Interrogation

Ask yourself "why" and "how" as you read. "Why does this function return a boolean here?" "How does this connect to what I learned yesterday?" Connecting new information to existing knowledge dramatically increases retention.

## 6. Concrete Examples

Every abstract concept becomes easier to remember when you tie it to a specific, vivid example. When learning a new programming concept, immediately write a tiny example program. When learning a business concept, find a real company that illustrates it.

## 7. Sleep and Exercise

These aren't soft advice — they're cognitive interventions. Memory consolidation happens during sleep; a night of poor sleep after a learning session can erase up to 40% of what you retained. Exercise increases BDNF (brain-derived neurotrophic factor), which directly supports memory formation and learning speed.`,
  },
  {
    slug: "freelancing-with-online-skills",
    category: "Career",
    title: "From Student to Freelancer: Monetising Skills You Learn Online",
    excerpt:
      "Online courses and tutoring sessions are just the start. Here's how to package your new skills into freelance projects and your first client contract.",
    author: "Lena Torres",
    date: "March 25, 2026",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600",
    content: `Most people who learn skills online do so to get a job. But there's a faster, more flexible path to income that most learners overlook: freelancing. You don't need to be an expert. You just need to be slightly more capable than the clients who need your help.

## The Minimum Viable Skill Level

The biggest mental block for new freelancers is waiting until they feel "ready." The honest truth is that you'll never feel ready. You need enough skill to deliver value to a specific client with a specific problem — not to be the best in the world.

A web developer who has built three portfolio projects can absolutely charge for simple business websites. A data analyst who can write clean SQL and build dashboards in Tableau can find clients among small businesses drowning in spreadsheets.

## Find Your First Client in Your Network

Don't start on Fiverr or Upwork. Start with the people who already know you. Post in a relevant LinkedIn group, tell former colleagues what you're now doing, reach out to local businesses you know personally. Your first client doesn't need to be a glamorous Fortune 500 company — they need to be someone who has a problem you can solve and is willing to pay for the solution.

## Package Your Work Productively

Hourly billing creates adversarial incentives: you want more hours, clients want fewer. Package your work into fixed-price deliverables instead. "A 5-page website with a contact form, mobile-optimised, delivered within 10 working days — £600" is far more attractive to a small business than "£40/hour, estimated 15–20 hours."

## Build a Portfolio That Converts

Three strong case studies beat 20 mediocre ones. Each case study should explain: what was the client's problem, what did you build, and what was the measurable outcome. "Increased a client's conversion rate by 34% through a landing page rebuild" is a portfolio entry that wins contracts. Screenshots of generic websites are not.

## Reinvest in Learning Continuously

The freelancers who build sustainable practices treat learning as a business expense, not an indulgence. Set aside 10% of your freelance income for courses, tutoring sessions, and tools that keep your skills current. The market for last year's skills degrades quickly — stay ahead by investing consistently in what's next.`,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Learning Tips": "bg-violet-100 text-violet-600",
  "Technology":    "bg-indigo-100 text-indigo-600",
  "Education":     "bg-blue-100 text-blue-600",
  "For Tutors":    "bg-amber-100 text-amber-600",
  "Career":        "bg-emerald-100 text-emerald-600",
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  /* Parse markdown-style content into sections */
  const sections = post.content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-black text-slate-900 dark:text-slate-100 mt-8 mb-3">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("**") && block.includes(":**")) {
      const [label, ...rest] = block.split(":**");
      return (
        <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
          <strong className="text-slate-900 dark:text-slate-100">{label.replace("**", "")}:</strong>
          {rest.join(":").replace(/\*\*/g, "")}
        </p>
      );
    }
    return (
      <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-4">
        {block}
      </p>
    );
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero image */}
      <div className="relative w-full" style={{ height: 380 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight max-w-2xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium border-l-4 border-violet-400 pl-4">
            {post.excerpt}
          </p>

          {/* Body */}
          <article className="space-y-1">
            {sections}
          </article>

          {/* Author card */}
          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">{post.author}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">SkillBridge contributor · {post.category}</p>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-5">More from our blog</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-28 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black text-violet-600 dark:text-violet-400 mb-1">{r.category}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
                        {r.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
