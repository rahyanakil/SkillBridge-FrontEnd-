"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export function StudentOnlyModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-100 rounded-[2rem] p-8 text-center border-none shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-900 leading-tight">
            Access Denied!
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-medium pt-2">
            Please login as a{" "}
            <span className="text-violet-600 font-bold underline italic text-lg uppercase tracking-tight">
              Student
            </span>{" "}
            to book this session.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            className="rounded-xl bg-violet-600 font-bold h-12 hover:bg-violet-700 shadow-lg shadow-violet-100"
            asChild
          >
            <Link href="/login">Go to Login</Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="font-bold text-gray-400"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
