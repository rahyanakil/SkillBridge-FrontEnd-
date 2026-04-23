/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BookOpen, CreditCard, GraduationCap, LayoutDashboard,
  LogOut, Plus, Settings, Star, Users, Video, Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar";
import { UserLogOut } from "@/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const navData = {
  ADMIN: [
    { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
    { title: "Manage Users", url: "/dashboard?tab=users", icon: Users },
    { title: "All Courses", url: "/courses", icon: BookOpen },
    { title: "Settings", url: "/profile/edit", icon: Settings },
  ],
  TUTOR: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Create Course", url: "/dashboard?tab=create", icon: Plus },
    { title: "My Courses", url: "/courses", icon: BookOpen },
    { title: "Live Sessions", url: "/dashboard?tab=sessions", icon: Video },
    { title: "Edit Profile", url: "/profile/edit", icon: Settings },
  ],
  STUDENT: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Browse Courses", url: "/courses", icon: BookOpen },
    { title: "My Sessions", url: "/dashboard?tab=sessions", icon: GraduationCap },
    { title: "Payments", url: "/dashboard?tab=payments", icon: CreditCard },
    { title: "Reviews", url: "/dashboard?tab=reviews", icon: Star },
    { title: "Edit Profile", url: "/profile/edit", icon: Settings },
  ],
};

const roleGradients: Record<string, string> = {
  ADMIN: "from-rose-500 to-orange-500",
  TUTOR: "from-emerald-500 to-teal-600",
  STUDENT: "from-violet-600 to-indigo-600",
};

const roleAccent: Record<string, string> = {
  ADMIN: "bg-rose-50 text-rose-700 border-rose-100",
  TUTOR: "bg-emerald-50 text-emerald-700 border-emerald-100",
  STUDENT: "bg-violet-50 text-violet-700 border-violet-100",
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "STUDENT" | "TUTOR";
  user?: any;
}

export function AppSidebar({ userRole, user, ...props }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = navData[userRole] || navData.STUDENT;
  const gradient = roleGradients[userRole];
  const accent = roleAccent[userRole];

  const handleLogout = async () => {
    await UserLogOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-100" {...props}>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-3">
                <div className={`flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="font-black text-slate-900 tracking-tight">SkillBridge</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border w-fit mt-0.5 ${accent}`}>
                    {userRole}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/dashboard" && !item.url.includes("?") && pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`rounded-xl transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${gradient} text-white shadow-md font-black hover:opacity-90`
                      : "text-slate-600 hover:bg-slate-100 font-semibold"
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3 py-2.5">
                    <item.icon className={`size-4 ${isActive ? "text-white" : ""}`} />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-slate-100">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="rounded-xl hover:bg-slate-100 transition-colors">
              <Link href="/profile" className="flex items-center gap-3 py-2">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-black text-white shadow-sm shrink-0`}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-black text-slate-800">{user?.name || "My Profile"}</span>
                  <span className="text-[10px] text-slate-400 truncate">{user?.email}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="rounded-xl w-full text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors font-bold"
            >
              <LogOut className="size-4" />
              <span className="text-xs font-black uppercase tracking-widest">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
