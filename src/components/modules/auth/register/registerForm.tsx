/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth";

// ১. ভ্যালিডেশন স্কিমা
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
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
  });

  // 🚀 React Compiler এর ওয়ার্নিং এড়াতে watch() এর বদলে useWatch ব্যবহার
  const selectedRole = useWatch({
    control: form.control,
    name: "role",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
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
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[3rem] bg-white/90 backdrop-blur-xl overflow-hidden relative">
        {/* টপ গ্রেডিয়েন্ট বর্ডার */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />

        <CardHeader className="pt-12 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 border border-indigo-100 shadow-sm">
            <UserPlus className="w-8 h-8 text-indigo-600" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter text-gray-900">
            Create Account
          </CardTitle>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Join SkillBridge and start your journey
          </p>
        </CardHeader>

        <CardContent className="px-8 lg:px-10">
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* 🎭 Role Selection (Optimized with useWatch) */}
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/50">
              <button
                type="button"
                onClick={() => form.setValue("role", "STUDENT")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedRole === "STUDENT"
                    ? "bg-white text-indigo-600 shadow-md scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                }`}
              >
                <GraduationCap className="w-5 h-5" /> Student
              </button>
              <button
                type="button"
                onClick={() => form.setValue("role", "TUTOR")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedRole === "TUTOR"
                    ? "bg-white text-indigo-600 shadow-md scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                }`}
              >
                <Presentation className="w-5 h-5" /> Tutor
              </button>
            </div>

            <FieldGroup className="space-y-4">
              {/* Full Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <Input
                        {...field}
                        placeholder="Your Full Name"
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all border-2 font-medium"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs font-bold mt-1 ml-1 text-red-500"
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all border-2 font-medium"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs font-bold mt-1 ml-1 text-red-500"
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Choose Password"
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all border-2 font-medium"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs font-bold mt-1 ml-1 text-red-500"
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col px-8 lg:px-10 pb-12 gap-6">
          <Button
            type="submit"
            form="register-form"
            disabled={form.formState.isSubmitting}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span className="flex items-center gap-2 uppercase tracking-wide">
                Get Started <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>

          <p className="text-center text-gray-500 text-sm font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-black hover:underline underline-offset-4"
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
