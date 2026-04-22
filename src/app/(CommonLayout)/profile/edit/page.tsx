"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changePassword, updateProfile, uploadAvatar } from "@/services/profile";
import { getProfile } from "@/services/profile";
import { Camera, KeyRound, Loader2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "") ?? "";

export default function ProfileEditPage() {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<{ name: string; email: string }>();
  const passwordForm = useForm<{ oldPassword: string; newPassword: string; confirm: string }>();

  useEffect(() => {
    getProfile().then((user) => {
      if (user) {
        profileForm.setValue("name", user.name);
        profileForm.setValue("email", user.email);
        if (user.avatar) setCurrentAvatar(`${BASE_URL}${user.avatar}`);
      }
    });
  }, []);

  const handleProfileSubmit = async (data: { name: string; email: string }) => {
    const result = await updateProfile(data);
    if (result?.success) toast.success("Profile updated!");
    else toast.error(result?.message || "Update failed");
  };

  const handlePasswordSubmit = async (data: { oldPassword: string; newPassword: string; confirm: string }) => {
    if (data.newPassword !== data.confirm) return toast.error("Passwords do not match");
    if (data.newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    const result = await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
    if (result?.success) { toast.success("Password changed!"); passwordForm.reset(); }
    else toast.error(result?.message || "Password change failed");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("Image must be under 2MB");
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
      const newUrl = `${BASE_URL}${result.data?.avatar}`;
      setCurrentAvatar(newUrl);
      setAvatarPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } else {
      toast.error(result?.message || "Upload failed");
    }
  };

  const displayedAvatar = avatarPreview || currentAvatar;

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-3xl font-black text-slate-900 italic mb-8">
        Edit <span className="text-violet-600">Profile</span>
      </h1>

      {/* Avatar upload */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-violet-100 mb-6">
        <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-violet-500" /> Profile Photo
        </h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-violet-100 overflow-hidden flex items-center justify-center text-2xl font-black text-violet-600 flex-shrink-0 border-2 border-violet-100">
            {displayedAvatar ? (
              <img src={displayedAvatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-xl w-full"
              onClick={() => fileRef.current?.click()}
            >
              Choose Image (max 2MB)
            </Button>
            {avatarPreview && (
              <Button
                type="button"
                disabled={uploading}
                className="rounded-xl bg-violet-600 hover:bg-violet-700 w-full"
                onClick={handleAvatarUpload}
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload Avatar"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile info */}
      <form
        onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
        className="bg-white rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-violet-100 mb-6 space-y-4"
      >
        <h2 className="font-black text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-500" /> Basic Info
        </h2>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1 block">Name</label>
          <Input {...profileForm.register("name", { required: true })} placeholder="Your full name" className="rounded-xl" />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1 block">Email</label>
          <Input {...profileForm.register("email", { required: true })} type="email" placeholder="your@email.com" className="rounded-xl" />
        </div>
        <Button
          disabled={profileForm.formState.isSubmitting}
          className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 h-12 font-black"
        >
          {profileForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </form>

      {/* Password */}
      <form
        onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
        className="bg-white rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-violet-100 space-y-4"
      >
        <h2 className="font-black text-slate-800 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-violet-500" /> Change Password
        </h2>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1 block">Current Password</label>
          <Input {...passwordForm.register("oldPassword", { required: true })} type="password" placeholder="••••••••" className="rounded-xl" />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1 block">New Password</label>
          <Input {...passwordForm.register("newPassword", { required: true })} type="password" placeholder="••••••••" className="rounded-xl" />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1 block">Confirm Password</label>
          <Input {...passwordForm.register("confirm", { required: true })} type="password" placeholder="••••••••" className="rounded-xl" />
        </div>
        <Button
          disabled={passwordForm.formState.isSubmitting}
          className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 h-12 font-black"
        >
          {passwordForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
