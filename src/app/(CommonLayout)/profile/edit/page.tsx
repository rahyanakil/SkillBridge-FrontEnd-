/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Check,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  Pencil,
  Shield,
  Upload,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  getProfile,
  updateProfile,
  uploadAvatar,
} from "@/services/profile";

const toAvatarUrl = (avatar: string | null) =>
  !avatar
    ? null
    : avatar.startsWith("http")
      ? avatar
      : `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "") ?? ""}${avatar}`;

const inputCls = `w-full pl-11 pr-4 h-[52px] rounded-2xl border-2 border-white/10 bg-white/5 text-sm font-medium text-white placeholder-white/20 focus:outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200`;

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  },
};

export default function ProfileEditPage() {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<{ name: string; email: string }>();
  const passwordForm = useForm<{
    oldPassword: string;
    newPassword: string;
    confirm: string;
  }>();

  useEffect(() => {
    getProfile().then((user) => {
      if (user) {
        profileForm.setValue("name", user.name);
        profileForm.setValue("email", user.email);
        if (user.avatar) setCurrentAvatar(toAvatarUrl(user.avatar));
      }
    });
  }, []);

  const handleProfileSubmit = async (data: { name: string; email: string }) => {
    const result = await updateProfile(data);
    if (result?.success) {
      toast.success("Profile updated!");
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } else {
      toast.error(result?.message || "Update failed");
    }
  };

  const handlePasswordSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
    confirm: string;
  }) => {
    if (data.newPassword !== data.confirm)
      return toast.error("Passwords do not match");
    if (data.newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");
    const result = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    if (result?.success) {
      toast.success("Password changed!");
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 2500);
      passwordForm.reset();
    } else {
      toast.error(result?.message || "Password change failed");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024)
      return toast.error("Image must be under 2MB");
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.error("Select an image first");
    setUploading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    const result = await uploadAvatar(fd);
    setUploading(false);
    if (result?.success) {
      toast.success("Avatar updated!");
      const newUrl = toAvatarUrl(result.data?.avatar);
      setCurrentAvatar(newUrl);
      setAvatarPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } else {
      toast.error(result?.message || "Upload failed");
    }
  };

  const displayedAvatar = avatarPreview || currentAvatar;

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{
        background:
          "linear-gradient(160deg, #0d0d1a 0%, #111827 60%, #0d0d1a 100%)",
      }}
    >
      {/* Background decorative orb */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white italic tracking-tight">
              Edit{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">
                Profile
              </span>
            </h1>
          </div>
          <p className="text-white/30 font-medium text-sm pl-1">
            Update your personal information and settings
          </p>
        </motion.div>

        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {/* ── AVATAR SECTION ── */}
          <motion.div
            variants={stagger.item}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <Camera className="text-violet-400 w-5 h-5" />
              Profile Photo
            </h2>

            <div className="flex items-center gap-6">
              {/* Avatar preview */}
              <div
                onClick={() => fileRef.current?.click()}
                className="relative w-24 h-24 rounded-4xl bg-linear-to-br from-violet-600/30 to-indigo-600/30 border-2 border-dashed border-white/20 overflow-hidden flex items-center justify-center cursor-pointer hover:border-violet-500/60 transition-colors group shrink-0"
              >
                {displayedAvatar ? (
                  <img
                    src={displayedAvatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-white/30 group-hover:text-violet-400 transition-colors" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Choose Photo
                </button>

                {avatarPreview && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    type="button"
                    disabled={uploading}
                    onClick={handleAvatarUpload}
                    className="w-full h-11 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-violet-500/30 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Upload Now
                      </>
                    )}
                  </motion.button>
                )}

                <p className="text-[10px] text-white/20 font-medium">
                  JPG, PNG or WebP — max 2MB
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── PROFILE INFO ── */}
          <motion.div
            variants={stagger.item}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Basic Info
            </h2>

            <form
              onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.18em] mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                  <input
                    {...profileForm.register("name", { required: true })}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.18em] mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                  <input
                    {...profileForm.register("email", { required: true })}
                    type="email"
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="w-full h-13 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-violet-500/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              >
                {profileForm.formState.isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : profileSaved ? (
                  <>
                    <Check className="w-4 h-4" /> Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── CHANGE PASSWORD ── */}
          <motion.div
            variants={stagger.item}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
          >
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-rose-600/8 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-400" />
              Change Password
            </h2>

            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-4"
            >
              {[
                {
                  name: "oldPassword" as const,
                  label: "Current Password",
                  placeholder: "Enter current password",
                },
                {
                  name: "newPassword" as const,
                  label: "New Password",
                  placeholder: "At least 6 characters",
                },
                {
                  name: "confirm" as const,
                  label: "Confirm Password",
                  placeholder: "Repeat new password",
                },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.18em] mb-2">
                    {f.label}
                  </label>
                  <div className="relative group">
                    {f.name === "oldPassword" ? (
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-rose-400 transition-colors pointer-events-none" />
                    ) : (
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-rose-400 transition-colors pointer-events-none" />
                    )}
                    <input
                      {...passwordForm.register(f.name, { required: true })}
                      type="password"
                      placeholder={f.placeholder}
                      className={inputCls.replace(
                        "focus:border-violet-500/60 focus:ring-violet-500/10",
                        "focus:border-rose-500/60 focus:ring-rose-500/10",
                      )}
                    />
                  </div>
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="w-full h-13 rounded-2xl bg-linear-to-r from-slate-700 to-slate-800 border border-white/10 text-white font-black text-sm hover:from-rose-700 hover:to-rose-800 hover:border-rose-500/30 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              >
                {passwordForm.formState.isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : passwordSaved ? (
                  <>
                    <Check className="w-4 h-4" /> Password Updated!
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" /> Update Password
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
