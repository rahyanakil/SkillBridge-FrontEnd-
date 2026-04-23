import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin, tutor, student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const role = user.role as "ADMIN" | "STUDENT" | "TUTOR";

  const roleColors: Record<string, string> = {
    ADMIN: "from-rose-500 to-orange-500",
    TUTOR: "from-emerald-500 to-teal-500",
    STUDENT: "from-violet-500 to-indigo-500",
  };

  return (
    <SidebarProvider>
      <AppSidebar userRole={role} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 sticky top-0 z-40">
          <SidebarTrigger className="text-slate-500 hover:text-violet-600 transition-colors" />
          <div className="h-5 w-px bg-slate-200 mx-1" />
          <div className={`flex items-center gap-2 bg-gradient-to-r ${roleColors[role]} px-3 py-1 rounded-full`}>
            <span className="text-white text-[10px] font-black uppercase tracking-widest">{role} Portal</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium hidden md:block">Live</span>
          </div>
        </header>
        <main className="flex-1 bg-slate-50/50 min-h-[calc(100vh-4rem)]">
          {role === "ADMIN" && admin}
          {role === "TUTOR" && tutor}
          {role === "STUDENT" && student}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
