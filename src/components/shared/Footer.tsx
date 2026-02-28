"use client";

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
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* --- Top Section: Branding & Newsletter --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-slate-50">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-violet-200 group-hover:rotate-12 transition-transform">
                SB
              </div>
              <span className="text-2xl font-black text-slate-900 italic tracking-tight">
                Skill<span className="text-violet-600">Bridge</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
              Empowering learners worldwide with expert-led courses. Join our
              community and bridge the gap between your potential and success.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Get the latest course updates and career tips.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="rounded-2xl border-none bg-white h-12 px-6 focus-visible:ring-violet-500 shadow-sm"
                />
                <Button className="rounded-2xl bg-violet-600 hover:bg-slate-900 h-12 px-6 font-bold transition-all flex items-center gap-2">
                  Join <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-violet-100 rounded-full blur-3xl group-hover:bg-violet-200 transition-colors" />
          </div>
        </div>

        {/* --- Middle Section: Links --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          <div className="space-y-6">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">
              Platform
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-violet-600 transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  SkillBridge Business
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-600 transition-colors"
                >
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-violet-600">
                  <Mail className="w-4 h-4" />
                </div>
                hello@skillbridge.com
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-violet-600">
                  <Phone className="w-4 h-4" />
                </div>
                +880 1234 567 890
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-violet-600">
                  <MapPin className="w-4 h-4" />
                </div>
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400">
            © {currentYear} SkillBridge Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Designed with ❤️ for Learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
