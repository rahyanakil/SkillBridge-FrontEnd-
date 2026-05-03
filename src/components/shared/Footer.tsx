import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">

        {/* Top: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-border/50">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-violet-500/25 group-hover:rotate-12 transition-transform">
                SB
              </div>
              <span className="text-2xl font-black text-foreground italic tracking-tight">
                Skill<span className="text-violet-600 dark:text-violet-400">Bridge</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
              Empowering learners worldwide with expert-led courses. Join our
              community and bridge the gap between your potential and success.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-muted p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black text-foreground mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-muted-foreground mb-6 font-medium">
                Get the latest course updates and career tips.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="rounded-2xl border-none bg-background h-12 px-6 focus-visible:ring-violet-500 shadow-sm"
                />
                <Button className="rounded-2xl bg-violet-600 hover:bg-violet-700 h-12 px-6 font-bold transition-all flex items-center gap-2">
                  Join <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-violet-200 dark:bg-violet-800/30 rounded-full blur-3xl group-hover:bg-violet-300 dark:group-hover:bg-violet-700/40 transition-colors" />
          </div>
        </div>

        {/* Middle: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          <div className="space-y-6">
            <h4 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">
              Platform
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              {[
                { href: "/courses", label: "Browse Courses" },
                { href: "#",        label: "Become a Tutor" },
                { href: "#",        label: "Pricing Plans" },
                { href: "#",        label: "SkillBridge Business" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              {[
                { href: "/about-us",  label: "About Us" },
                { href: "/blog",      label: "Blog" },
                { href: "/register",  label: "Become a Tutor" },
                { href: "/contact",   label: "Contact" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
              {[
                { href: "/contact", label: "Help Center" },
                { href: "/terms",   label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "#",        label: "Cookie Settings" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Mail,   text: "hello@skillbridge.com" },
                { icon: Phone,  text: "+880 1234 567 890" },
                { icon: MapPin, text: "Dhaka, Bangladesh" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                  <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-muted-foreground">
            © {currentYear} SkillBridge Inc. All rights reserved.
          </p>
          <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            Designed with ❤️ for Learners
          </p>
        </div>
      </div>
    </footer>
  );
}
