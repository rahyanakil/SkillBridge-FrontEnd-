/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Presentation,
  Shield,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { registerUser } from "@/services/auth";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "TUTOR"]),
});

type RegisterFormValues = z.infer<typeof formSchema>;

const perks = [
  { icon: BookOpen, text: "Access 100+ professional courses" },
  { icon: Zap, text: "Live 1-on-1 sessions with experts" },
  { icon: Shield, text: "Verified tutor profiles & safe payments" },
];

export const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", role: "STUDENT" },
  });

  const selectedRole = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const res = await registerUser(values);
      if (res.success) {
        toast.success("Account created! Please login.");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0d1117 0%, #1a1a3e 45%, #0d1b2a 100%)" }}
      >
        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.28, 0.1] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-indigo-600 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-24 -left-16 w-80 h-80 bg-violet-600 rounded-full blur-3xl pointer-events-none"
        />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">SkillBridge</span>
        </motion.div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 space-y-10"
        >
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              Start for free
            </div>
            <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">
              Start your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300">
                success story
              </span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed text-base max-w-sm">
              Join thousands of learners and tutors building real-world skills on the fastest-growing learning platform.
            </p>
          </div>

          <div className="space-y-4">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <p.icon className="w-5 h-5 text-indigo-300" />
                </div>
                <span className="text-white/60 font-medium text-sm">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 border-t border-white/10 pt-8"
        >
          <p className="text-white/25 text-xs font-medium italic leading-relaxed">
            &ldquo;An investment in knowledge pays the best interest.&rdquo;
          </p>
          <p className="text-white/20 text-xs font-black mt-1">— Benjamin Franklin</p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12 bg-[#fafafa]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <BookOpen className="w-7 h-7 text-indigo-600" />
            <span className="text-xl font-black text-indigo-600">SkillBridge</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create account</h1>
            <p className="text-slate-400 font-medium text-sm">Join as a Student or Expert Tutor</p>
          </div>

          {/* Role toggle */}
          <div className="relative grid grid-cols-2 bg-slate-100 rounded-2xl p-1.5 mb-6 gap-1">
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-md"
              animate={{ left: selectedRole === "STUDENT" ? "6px" : "calc(50% + 3px)", width: "calc(50% - 9px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => form.setValue("role", "STUDENT")}
              className={`relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-colors ${
                selectedRole === "STUDENT" ? "text-indigo-600" : "text-slate-400"
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => form.setValue("role", "TUTOR")}
              className={`relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-colors ${
                selectedRole === "TUTOR" ? "text-indigo-600" : "text-slate-400"
              }`}
            >
              <Presentation className="w-4 h-4" /> Tutor
            </button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                    <input
                      {...field}
                      placeholder="Full Name"
                      className={`w-full pl-11 pr-4 h-[52px] rounded-2xl border-2 text-sm font-medium text-slate-800 placeholder-slate-300 bg-white focus:outline-none transition-all duration-200 ${
                        fieldState.error
                          ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/70"
                      }`}
                    />
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 ml-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                    <input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      className={`w-full pl-11 pr-4 h-[52px] rounded-2xl border-2 text-sm font-medium text-slate-800 placeholder-slate-300 bg-white focus:outline-none transition-all duration-200 ${
                        fieldState.error
                          ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/70"
                      }`}
                    />
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 ml-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (min. 6 chars)"
                      className={`w-full pl-11 pr-12 h-[52px] rounded-2xl border-2 text-sm font-medium text-slate-800 placeholder-slate-300 bg-white focus:outline-none transition-all duration-200 ${
                        fieldState.error
                          ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/70"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 ml-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-[52px] mt-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-sm shadow-xl shadow-indigo-200 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Get Started Free <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* ── Social sign-up ── */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative text-center">
              <span className="bg-[#fafafa] dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
                if (!clientId) return;
                const redirectUri = encodeURIComponent(window.location.origin + "/api/auth/google");
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline`;
              }}
              disabled={!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              className="flex items-center justify-center gap-2.5 h-[46px] rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-bold text-slate-700">Google</span>
            </button>
            <button
              type="button"
              onClick={() => window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "YOUR_GITHUB_CLIENT_ID"}&scope=user:email&redirect_uri=${encodeURIComponent(window.location.origin + "/api/auth/github")}`}
              className="flex items-center justify-center gap-2.5 h-[46px] rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="text-sm font-bold text-slate-700">GitHub</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative text-center">
              <span className="bg-[#fafafa] dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">Already have an account?</span>
            </div>
          </div>

          <Link
            href="/login"
            className="block w-full h-[52px] rounded-2xl border-2 border-slate-200 text-slate-700 font-black text-sm hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-center leading-[52px]"
          >
            Sign in instead →
          </Link>

          <p className="text-center text-slate-400 text-xs font-medium mt-6 leading-relaxed">
            By creating an account you agree to our{" "}
            <span className="text-indigo-600 font-bold cursor-pointer">Terms of Service</span> &{" "}
            <span className="text-indigo-600 font-bold cursor-pointer">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
