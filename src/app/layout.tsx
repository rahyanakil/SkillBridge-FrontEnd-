import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SkillBridge — Find Expert Tutors Online",
    template: "%s | SkillBridge",
  },
  description:
    "Connect with expert tutors for personalized 1-on-1 learning. Browse courses, book sessions, and grow your skills with SkillBridge.",
  keywords: ["online tutoring", "find tutors", "courses", "SkillBridge", "learn online"],
  openGraph: {
    title: "SkillBridge — Find Expert Tutors Online",
    description: "Connect with expert tutors for personalized 1-on-1 learning.",
    type: "website",
    siteName: "SkillBridge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
