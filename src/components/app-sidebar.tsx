/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Star,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "STUDENT" | "TUTOR";
  user?: any;
}

export function AppSidebar({ userRole, user, ...props }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = navData[userRole] || navData.STUDENT;

  const handleLogout = async () => {
    await UserLogOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">SkillBridge</span>
                <span className="truncate text-xs text-muted-foreground">{userRole} Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={isActive ? "bg-violet-50 text-violet-700 font-bold" : ""}
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start gap-2">
              <Link href="/profile" className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-black text-violet-600">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="truncate text-xs font-semibold">{user?.name || "My Profile"}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span className="font-bold uppercase text-[10px] tracking-widest">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
