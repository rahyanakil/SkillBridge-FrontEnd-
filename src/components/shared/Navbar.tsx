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
// getUser এর সাথে UserLogOut ইম্পোর্ট করুন
import { getUser, UserLogOut } from "@/services/auth";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Strict interface
interface User {
  name: string;
  role: string;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Our Courses" },
  { href: "/tutors", label: "Tutors" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) =>
    pathname === path ? "text-primary font-semibold" : "text-muted-foreground";

  useEffect(() => {
    const getCurrentUser = async () => {
      const userdata = await getUser();
      setUser(userdata);
    };
    getCurrentUser();
  }, []);

  // handleLogout ফাংশনটি async করুন
  const handleLogout = async () => {
    try {
      // ১. আপনার সার্ভার অ্যাকশন কল করে কুকি মুছুন
      await UserLogOut();

      // ২. লোকাল স্টোরেজ থেকে ডেটা মুছুন
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // ৩. স্টেট আপডেট করুন যাতে UI সাথে সাথে পরিবর্তন হয়
      setUser(null);

      // ৪. রিফ্রেশ এবং হোমপেজে রিডাইরেক্ট
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="container  mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl text-violet-600 font-bold">
          SkillBridge
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`hover:text-primary transition ${isActive(item.href)}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          {/* Conditional Auth UI */}
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <Link href="/login">
              <Button variant="secondary" className="rounded-full px-6">
                Log In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          {user && <UserMenu user={user} onLogout={handleLogout} />}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    className={`text-lg py-1 ${isActive(item.href)}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
                {!user && (
                  <Link href="/login" className="mt-4">
                    <Button variant="secondary" className="w-full rounded-full">
                      Log In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function UserMenu({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full">
          {user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/${user.role.toLowerCase()}`}>Dashboard</Link>
          {/* <Link href={`/dashboard}`}>Dashboard</Link> */}
        </DropdownMenuItem>
        {/* Pointer cursor যোগ করা হয়েছে ভালো UX এর জন্য */}
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
