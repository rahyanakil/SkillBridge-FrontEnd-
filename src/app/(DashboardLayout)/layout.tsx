// import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const user = await getUser();

  // ইউজার না থাকলে লগইনে পাঠিয়ে দেওয়া ভালো
  if (!user) {
    redirect("/login");
  }

  // TypeScript কে নিশ্চিত করা যে role আছেই
  const role = user.role as "ADMIN" | "STUDENT" | "TUTOR";

  return (
    <SidebarProvider>
      <AppSidebar userRole={role} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border mx-2" />
          <h1 className="text-sm font-bold uppercase tracking-widest opacity-50">
            {role} Portal
          </h1>
        </header>

        <main className="flex-1 p-6">
          {role === "ADMIN" && admin}
          {role === "TUTOR" && tutor}
          {role === "STUDENT" && student}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
