import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";

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

  // 🛡️ Guard Clause: ইউজার না থাকলে কিছুই রেন্ডার হবে না (এরর প্রতিরোধ করবে)
  if (!user || !user.role) {
    return null;
  }

  return (
    <SidebarProvider>
      {/* ইউজার রোল অনুযায়ী সাইডবার */}
      <AppSidebar userRole={user.role} />

      <SidebarInset>
        {/* হেডার এবং নেভিগেশন এরিয়া */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}{" "}
                    Portal
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {/* রোল অনুযায়ী আলাদা আলাদা ভিউ (Parallel Routes) */}
            {user.role === "ADMIN" && admin}
            {user.role === "TUTOR" && tutor}
            {user.role === "STUDENT" && student}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
