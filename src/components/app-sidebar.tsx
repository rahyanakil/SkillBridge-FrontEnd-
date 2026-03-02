/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  SquareTerminal,
  User,
} from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// আপনার দেওয়া নেভিগেশন ডাটা
const navData = {
  ADMIN: [
    {
      title: "Admin Control",
      url: "/dashboard/admin",
      // icon: SquareTerminal,
      isActive: true,
      // items: [
      //   { title: "Dashboard Overview", url: "/dashboard/admin" },
      //   { title: "Manage Users", url: "/dashboard/admin/users" },
      //   { title: "Course Approvals", url: "/dashboard/admin/approvals" },
      //   { title: "Site Settings", url: "/dashboard/admin/settings" },
      // ],
    },
  ],
  TUTOR: [
    {
      title: "Instructor Panel",
      url: "/dashboard/tutor",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   { title: "My Profile", url: "/dashboard/tutor/profile" },
      //   { title: "Create New Course", url: "/dashboard/tutor/create-course" },
      //   { title: "My Courses", url: "/dashboard/tutor/my-courses" },
      //   { title: "Student Analytics", url: "/dashboard/tutor/analytics" },
      //   { title: "Withdrawals", url: "/dashboard/tutor/payments" },
      // ],
    },
  ],
  STUDENT: [
    {
      title: "Learning Zone",
      url: "/dashboard/student",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   { title: "My Classroom", url: "/dashboard/student/classroom" },
      //   { title: "Enrolled Courses", url: "/dashboard/student/enrolled" },
      //   { title: "Order History", url: "/dashboard/student/orders" },
      //   { title: "Help & Support", url: "/dashboard/student/support" },
      // ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "STUDENT" | "TUTOR";
  user?: any; // ইউজার অবজেক্ট পাস করার জন্য
}

export function AppSidebar({ userRole, user, ...props }: AppSidebarProps) {
  const router = useRouter();
  const navItems = navData[userRole] || navData.STUDENT;

  const handleLogout = async () => {
    await UserLogOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* হেডার সেকশন */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">LMS Platform</span>
                <span className="truncate text-xs text-muted-foreground">
                  {userRole} Portal
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* মেইন কন্টেন্ট (ডাইনামিক মেনু) */}
      <SidebarContent>
        <SidebarMenu className="p-2">
          {navItems.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {/* {item.icon && <item.icon className="size-4" />} */}
                    <span className="font-bold">{item.title}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {/* <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span className="text-xs font-medium">
                              {subItem.title}
                            </span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub> */}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* ফুটার সেকশন (Logout & User Profile) */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-2 text-muted-foreground">
              <User className="size-4" />
              <span className="truncate text-xs font-semibold">
                {user?.name || "User Profile"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span className="font-bold uppercase text-[10px] tracking-widest">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
