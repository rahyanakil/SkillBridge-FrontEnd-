/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Edit3,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

interface StatCard {
  label: string;
  count: string;
  icon: ReactElement;
  bg: string;
  glow: string;
}

interface TutorProfile {
  bio?: string;
  expertise?: string;
  hourlyRate?: number;
  experience?: number;
}

interface ProfileViewProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string | null;
    isBanned: boolean;
    createdAt: string;
  };
  stats: StatCard[];
  activityTitle: string;
  tutorProfile: TutorProfile | null;
  joinedDate: string;
}

const ROLE_GRADIENT: Record<string, string> = {
  ADMIN: "from-rose-600 to-pink-600",
  TUTOR: "from-amber-500 to-orange-500",
  STUDENT: "from-violet-600 to-indigo-600",
};

const ROLE_BADGE: Record<string, string> = {
  ADMIN: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  TUTOR: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  STUDENT: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

const infoItems = (user: ProfileViewProps["user"], joinedDate: string) => [
  {
    icon: User,
    label: "Full Name",
    value: user.name,
    color: "text-violet-400",
  },
  { icon: Mail, label: "Email", value: user.email, color: "text-indigo-400" },
  {
    icon: ShieldCheck,
    label: "Role",
    value: user.role,
    color: "text-emerald-400",
  },
  {
    icon: Calendar,
    label: "Member Since",
    value: joinedDate,
    color: "text-amber-400",
  },
];

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  },
};

export default function ProfileView({
  user,
  stats,
  activityTitle,
  tutorProfile,
  joinedDate,
}: ProfileViewProps) {
  const gradient = ROLE_GRADIENT[user.role] ?? ROLE_GRADIENT.STUDENT;
  const badge = ROLE_BADGE[user.role] ?? ROLE_BADGE.STUDENT;

  const avatarSrc = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "") ?? ""}${user.avatar}`
    : null;

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background:
          "linear-gradient(160deg, #0d0d1a 0%, #111827 60%, #0d0d1a 100%)",
      }}
    >
      {/* ── HERO BANNER ── */}
      <div
        className={`h-56 w-full bg-linear-to-r ${gradient} relative overflow-hidden`}
      >
        {/* Mesh pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Blobs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none"
        />
        {/* Top right label */}
        <div className="absolute top-6 right-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${badge}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {user.role}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-5 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent pointer-events-none" />

              {/* Avatar */}
              <div className="relative inline-block mb-5">
                <div
                  className={`w-28 h-28 rounded-[1.5rem] bg-linear-to-r  ${gradient} flex items-center justify-center text-4xl font-black text-white shadow-2xl overflow-hidden ring-4 ring-white/10`}
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-4 border-[#111827] shadow-lg flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <h2 className="text-xl font-black text-white mb-1 tracking-tight">
                {user.name}
              </h2>
              <p className="text-white/40 font-medium text-sm mb-5">
                {user.email}
              </p>

              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black border ${badge}`}
              >
                {user.role}
              </span>

              <div className="grid grid-cols-2 gap-0 mt-7 pt-7 border-t border-white/10">
                <div className="text-center pr-4">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                    Status
                  </p>
                  <p
                    className={`text-sm font-black ${user.isBanned ? "text-rose-400" : "text-emerald-400"}`}
                  >
                    {user.isBanned ? "Suspended" : "Active"}
                  </p>
                </div>
                <div className="text-center pl-4 border-l border-white/10">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                    Joined
                  </p>
                  <p className="text-sm font-black text-white">{joinedDate}</p>
                </div>
              </div>
            </motion.div>

            {/* Tutor extra info */}
            <AnimatePresence>
              {user.role === "TUTOR" && tutorProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 space-y-5"
                >
                  <h3 className="font-black text-white text-base">
                    Tutor Details
                  </h3>

                  {tutorProfile.expertise && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          Expertise
                        </p>
                        <p className="text-sm font-bold text-white/80 mt-0.5">
                          {tutorProfile.expertise}
                        </p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.hourlyRate !== undefined && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          Hourly Rate
                        </p>
                        <p className="text-sm font-bold text-white/80 mt-0.5">
                          ${tutorProfile.hourlyRate}/hr
                        </p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.experience !== undefined && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          Experience
                        </p>
                        <p className="text-sm font-bold text-white/80 mt-0.5">
                          {tutorProfile.experience} years
                        </p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.bio && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
                        Bio
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {tutorProfile.bio}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <motion.div
              variants={stagger.container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {infoItems(user, joinedDate).map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={stagger.item}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-sm font-black text-white mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Activity stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div
                className={`absolute -top-10 -right-10 w-48 h-48 bg-linear-to-br ${gradient} rounded-full blur-3xl opacity-10 pointer-events-none`}
              />

              <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {activityTitle}
                  </h3>
                  <p className="text-white/30 text-xs font-medium mt-0.5">
                    Your platform overview
                  </p>
                </div>
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 text-xs font-black uppercase tracking-wider transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center text-white mb-4 shadow-lg relative z-10`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-black text-white tabular-nums relative z-10">
                      {stat.count}
                    </p>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1 relative z-10">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
