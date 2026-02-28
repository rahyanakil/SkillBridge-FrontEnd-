"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser, UserLogOut } from "@/services/auth";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// User Interface
interface User {
  name: string;
  role: string; // "STUDENT", "TUTOR", or "ADMIN"
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Our Courses" },
  { href: "/tutors", label: "Tutors" },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) =>
    pathname === path ? "text-violet-600 font-bold" : "text-muted-foreground";

  useEffect(() => {
    const getCurrentUser = async () => {
      const userdata = await getUser();
      setUser(userdata);
    };
    getCurrentUser();
  }, [pathname]); // Pathname চেঞ্জ হলে ইউজার চেক করবে

  const handleLogout = async () => {
    try {
      await UserLogOut();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full border-b sticky top-0 z-50 backdrop-blur-md bg-white/80 transition-all">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl text-violet-600 font-black tracking-tighter"
        >
          <BookOpen className="w-8 h-8" />
          <span>SkillBridge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`text-sm transition-colors hover:text-violet-600 ${isActive(item.href)}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Conditional Auth UI */}
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="rounded-full px-6 text-gray-600 font-bold hover:text-violet-600"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full px-8 bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-100 font-bold transition-transform active:scale-95">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {user && <UserMenu user={user} onLogout={handleLogout} />}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border bg-gray-50/50"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 sm:w-87.5 rounded-l-[2rem]"
            >
              <div className="flex flex-col gap-6 mt-12 px-2">
                <Link
                  href="/"
                  className="text-3xl text-violet-600 font-black mb-4"
                >
                  SkillBridge
                </Link>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className={`block text-xl font-bold py-3 px-4 rounded-2xl transition-all ${
                        pathname === item.href
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                {!user && (
                  <div className="flex flex-col gap-3 mt-6">
                    <Link href="/login">
                      <Button className="w-full rounded-2xl bg-violet-600 py-7 text-lg font-bold shadow-xl shadow-violet-100">
                        Log In Now
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl py-7 text-lg font-bold border-2"
                      >
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

/**
 * ইউজার মেনু কম্পোনেন্ট - যা রোল অনুযায়ী ড্যাশবোর্ড কানেক্ট করে
 */
function UserMenu({ user, onLogout }: { user: User; onLogout: () => void }) {
  // রোল অনুযায়ী ডাইনামিক পাথ (student -> /dashboard/student)
  // const dashboardPath = `/dashboard/${user.role?.toLowerCase()}`;
  const dashboardPath = "/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full gap-2 border-violet-100 bg-violet-50/50 hover:bg-violet-100 transition-all px-4 py-6 shadow-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xs text-white font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold text-gray-900 text-sm">
              {user.name.split(" ")[0]}
            </span>
            <span className="text-[10px] text-violet-600 font-black uppercase tracking-tighter">
              {user.role}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-2 rounded-[1.5rem] shadow-2xl border-gray-100 bg-white/95 backdrop-blur-xl mt-2"
      >
        <DropdownMenuLabel className="px-3 py-4">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">
            Account Status
          </p>
          <p className="text-base font-black text-gray-900 truncate">
            {user.name}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100 mx-2" />

        <div className="p-1 space-y-1">
          {/* প্রোফাইল অপশন */}
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-violet-50 text-gray-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors">
                <UserIcon className="w-4 h-4 text-violet-600" />
              </div>
              <span className="font-bold">My Profile</span>
            </Link>
          </DropdownMenuItem>

          {/* ডাইনামিক ড্যাশবোর্ড লিঙ্ক (Student/Tutor/Admin) */}
          <DropdownMenuItem asChild>
            <Link
              href={dashboardPath}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-violet-50 text-gray-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors">
                <LayoutDashboard className="w-4 h-4 text-violet-600" />
              </div>
              <span className="font-bold capitalize">
                {user.role.toLowerCase()} Dashboard
              </span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-gray-100 mx-2" />

        <div className="p-1">
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600 font-bold transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            Logout Session
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
