"use client";

import { SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

const Student_Nav = [
  {
    title: "Student DashBoard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
];
const Tutor_Nav = [
  {
    title: "Tutor DashBoard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
];
const Admin_Nav = [
  {
    title: "Admin DashBoard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "STUDENT" | "TUTOR";
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  let navItem = null;
  if (userRole === "ADMIN") {
    navItem = Admin_Nav;
  } else if (userRole === "TUTOR") {
    navItem = Tutor_Nav;
  } else {
    navItem = Student_Nav;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={navItem!} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
