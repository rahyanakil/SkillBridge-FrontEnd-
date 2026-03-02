/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Presentation,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "TUTOR"]),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", role: "STUDENT" },
  });

  const selectedRole = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // টিউটর হলে ডিফল্ট কিছু প্রোফাইল ডাটা পাঠানো (যাতে ল্যান্ডিং পেজে দেখা যায়)
      const res = await registerUser(values);
      if (res.success) {
        toast.success("Account created! Please login.");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 py-10">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[3rem] bg-white/90 backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-600 to-fuchsia-600" />

        <CardHeader className="pt-12 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 border border-indigo-100">
            <UserPlus className="w-8 h-8 text-indigo-600" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter">
            Create Account
          </CardTitle>
          <p className="text-gray-500 font-medium text-sm">
            Join as a Student or Expert Mentor
          </p>
        </CardHeader>

        <CardContent className="px-8">
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
              <button
                type="button"
                onClick={() => form.setValue("role", "STUDENT")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${selectedRole === "STUDENT" ? "bg-white text-indigo-600 shadow-md" : "text-gray-500"}`}
              >
                <GraduationCap className="w-5 h-5" /> Student
              </button>
              <button
                type="button"
                onClick={() => form.setValue("role", "TUTOR")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${selectedRole === "TUTOR" ? "bg-white text-indigo-600 shadow-md" : "text-gray-500"}`}
              >
                <Presentation className="w-5 h-5" /> Tutor
              </button>
            </div>

            <FieldGroup className="space-y-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        {...field}
                        placeholder="Full Name"
                        className="pl-12 h-14 rounded-2xl bg-gray-50/50 border-2"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className="pl-12 h-14 rounded-2xl bg-gray-50/50 border-2"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="pl-12 h-14 rounded-2xl bg-gray-50/50 border-2"
                      />
                    </div>
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col px-8 pb-12 gap-6">
          <Button
            type="submit"
            form="register-form"
            disabled={form.formState.isSubmitting}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Get Started"
            )}
          </Button>
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-black hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
