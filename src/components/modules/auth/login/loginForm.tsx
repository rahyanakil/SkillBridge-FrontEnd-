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
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { loginUser } from "@/services/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof formSchema>;

const features = [
  { icon: GraduationCap, text: "Learn from 180+ expert tutors" },
  { icon: Users, text: "Join 2,400+ active learners worldwide" },
  { icon: Star, text: "4.9★ average satisfaction rating" },
];

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);

  // Show OAuth error as a toast on mount
  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (!oauthError) return;
    const detail = searchParams.get("detail");
    const messages: Record<string, string> = {
      google_denied: "Google sign-in was cancelled.",
      github_denied: "GitHub sign-in was cancelled.",
      google_not_configured: "Google OAuth credentials are not configured in Vercel.",
      github_not_configured: "GitHub OAuth credentials are not configured in Vercel.",
      base_url_missing: "NEXT_PUBLIC_BASE_URL is not set in Vercel environment variables.",
      google_token_failed: "Google token exchange failed. Check your Client Secret.",
      github_token_failed: "GitHub token exchange failed. Check your Client Secret.",
      google_no_email: "No email returned from Google.",
      github_no_email: "No email returned from GitHub.",
      backend_auth_failed: detail ? `Backend error: ${detail}` : "Backend auth failed. Check Vercel backend logs.",
      backend_invalid_json: "Backend returned invalid response.",
      server_error: detail ? `Server error: ${detail}` : "Unexpected server error.",
    };
    toast.error(messages[oauthError] ?? `Sign-in failed: ${oauthError}`);
  }, [searchParams]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);
      if (res.success) {
        toast.success(res.message || "Welcome back!");
        router.push(redirectPath);
        router.refresh();
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-violet-600 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute -bottom-32 -right-20 w-[32rem] h-[32rem] bg-indigo-500 rounded-full blur-3xl pointer-events-none"
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
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
          <span className="text-2xl font-black text-white tracking-tight">
            SkillBridge
          </span>
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
              Welcome back
            </div>
            <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">
              Continue your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300">
                learning journey
              </span>
            </h2>
            <p className="text-white/40 font-medium leading-relaxed text-base max-w-sm">
              Access your personalized courses, connect with expert tutors, and
              track your progress.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <f.icon className="w-5 h-5 text-violet-300" />
                </div>
                <span className="text-white/60 font-medium text-sm">
                  {f.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 border-t border-white/10 pt-8"
        >
          <p className="text-white/25 text-xs font-medium italic leading-relaxed">
            &ldquo;The more that you learn, the more places you&apos;ll
            go.&rdquo;
          </p>
          <p className="text-white/20 text-xs font-black mt-1">— Dr. Seuss</p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12 bg-[#fafafa] dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <BookOpen className="w-7 h-7 text-violet-600" />
            <span className="text-xl font-black text-violet-600">
              SkillBridge
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Sign in
            </h1>
            <p className="text-slate-400 font-medium text-sm">
              Enter your credentials to continue
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  form.setValue("email", "student@skillbridge.com");
                  form.setValue("password", "student123");
                }}
                className="flex flex-col items-start px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition-all text-left group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-500">
                  Student
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 truncate w-full">
                  student@skillbridge.com
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  form.setValue("email", "tutor@gmail.com");
                  form.setValue("password", "123456");
                }}
                className="flex flex-col items-start px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition-all text-left group"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-500">
                  Tutor
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 truncate w-full">
                  tutor@gmail.com
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                    <input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full pl-11 pr-4 h-[52px] rounded-2xl border-2 text-sm font-medium text-slate-800 placeholder-slate-300 bg-white focus:outline-none transition-all duration-200 ${
                        fieldState.error
                          ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100/70"
                      }`}
                    />
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 ml-1">
                      {fieldState.error.message}
                    </p>
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
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-12 h-[52px] rounded-2xl border-2 text-sm font-medium text-slate-800 placeholder-slate-300 bg-white focus:outline-none transition-all duration-200 ${
                        fieldState.error
                          ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                          : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100/70"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 hover:text-violet-600 uppercase tracking-wider transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {fieldState.error && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 ml-1">
                      {fieldState.error.message}
                    </p>
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
              className="w-full h-[52px] mt-1 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-violet-200 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* ── Social login ── */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative text-center">
              <span className="bg-[#fafafa] dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Google */}
            <button
              type="button"
              onClick={() => {
                const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
                if (!clientId) { toast.error("Google login is not configured."); return; }
                const redirectUri = encodeURIComponent(window.location.origin + "/api/auth/google");
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
              }}
              className="flex items-center justify-center gap-2.5 h-[46px] rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              {/* Google logo */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-bold text-slate-700">Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => {
                const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
                if (!clientId) { toast.error("GitHub login is not configured."); return; }
                const redirectUri = encodeURIComponent(window.location.origin + "/api/auth/github");
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${redirectUri}`;
              }}
              className="flex items-center justify-center gap-2.5 h-[46px] rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              {/* GitHub logo */}
              <svg
                className="w-4 h-4 text-slate-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="text-sm font-bold text-slate-700">GitHub</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative text-center">
              <span className="bg-[#fafafa] dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">
                New to SkillBridge?
              </span>
            </div>
          </div>

          <Link
            href="/register"
            className="block w-full h-[52px] rounded-2xl border-2 border-slate-200 text-slate-700 font-black text-sm hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all text-center leading-[52px]"
          >
            Create a free account →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
