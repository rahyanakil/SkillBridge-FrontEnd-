/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // LoginForm.tsx এ পরিবর্তন করুন:
  const redirectPath = searchParams.get("redirect") || "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);
      if (res.success) {
        toast.success(res.message || "Welcome back!");
        router.push(redirectPath);
        router.refresh();
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] bg-white/90 backdrop-blur-xl overflow-hidden relative">
        {/* Top Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-violet-600 via-indigo-500 to-purple-600" />

        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-violet-100 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-violet-600" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter text-gray-900">
            Welcome Back
          </CardTitle>
          <p className="text-gray-500 font-medium text-sm">
            Enter your credentials to access your account
          </p>
        </CardHeader>

        <CardContent className="px-8">
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup className="space-y-5">
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                      Email Address
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@example.com"
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-100 transition-all border-2"
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

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center ml-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Password
                      </FieldLabel>
                      <Link
                        href="#"
                        className="text-xs font-bold text-violet-600 hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-violet-100 transition-all border-2"
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

        <CardFooter className="flex flex-col px-8 pb-10 gap-6">
          <Button
            type="submit"
            form="login-form"
            disabled={form.formState.isSubmitting}
            className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-bold shadow-xl shadow-violet-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-violet-600 font-bold hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { loginUser } from "@/services/auth";

// // 1. Define validation schema
// const formSchema = z.object({
//   email: z.string().email({ message: "Please provide a valid email" }),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormValues = z.infer<typeof formSchema>;

// export const LoginForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // 2. Get the redirect path (e.g., "/dashboard") from the URL
//   // If no redirect param exists, it defaults to "/dashboard"
//   const redirectPath = searchParams.get("redirect") || "/dashboard";

//   // 3. Initialize the form
//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // 4. Handle Submit
//   const onSubmit = async (values: LoginFormValues) => {
//     try {
//       const res = await loginUser(values);

//       if (res.success) {
//         toast.success(res.message || "Logged in successfully!");

//         // 🚀 Redirect to the intended path
//         router.push(redirectPath);

//         // Force a refresh so Server Components (like DashboardLayout)
//         // fetch the fresh user session immediately
//         router.refresh();
//       } else {
//         toast.error(res.message || "Invalid credentials");
//       }
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An error occurred";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Please Login</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {/* Note: form.handleSubmit(onSubmit) is crucial here */}
//         <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             {/* Email Field */}
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="email">Email</FieldLabel>
//                   <Input
//                     {...field}
//                     id="email"
//                     type="email"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="name@example.com"
//                     autoComplete="email"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError
//                       errors={[{ message: fieldState.error?.message }]}
//                     />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Password Field */}
//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <Input
//                     {...field}
//                     id="password"
//                     type="password"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="*********"
//                     autoComplete="current-password"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError
//                       errors={[{ message: fieldState.error?.message }]}
//                     />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="vertical" className="w-full">
//           {/* Linked to the form ID above */}
//           <Button
//             type="submit"
//             form="login-form"
//             className="w-full"
//             disabled={form.formState.isSubmitting}
//           >
//             {form.formState.isSubmitting ? "Logging in..." : "Login"}
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   );
// };
// // "use client";

// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Controller, useForm } from "react-hook-form";
// // import * as z from "zod";

// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// // } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import { loginUser } from "@/services/auth";
// // import { useRouter } from "next/navigation";
// // import { toast } from "sonner";

// // const formSchema = z.object({
// //   email: z.email({ message: "Please Provide a valid email" }),
// //   password: z.string().min(6, "Password must be at least 6 characters"),
// // });

// // export function LoginForm() {
// //   const router = useRouter();
// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       email: "",
// //       password: "",
// //     },
// //   });

// //   async function onSubmit(data: z.infer<typeof formSchema>) {
// //     // console.log(data);

// //     try {
// //       const res = await loginUser(data);
// //       // console.log(res);
// //       if (res.success) {
// //         toast.success(res.message || "Logged in successfully!");
// //         router.push("/");
// //       } else {
// //         // ব্যাকএন্ড যদি success: false পাঠায়
// //         toast.error(res.message || "Login failed");
// //       }
// //     } catch (error: unknown) {
// //       const errorMessage =
// //         error instanceof Error ? error.message : "An error occurred";
// //       toast.error(errorMessage);
// //     }
// //   }

// //   return (
// //     <Card className="w-full sm:max-w-md">
// //       <CardHeader>
// //         <CardTitle>Please Login</CardTitle>
// //         {/* <CardDescription>
// //           Help us improve by reporting bugs you encounter.
// //         </CardDescription> */}
// //       </CardHeader>
// //       <CardContent>
// //         <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
// //           <FieldGroup>
// //             <Controller
// //               name="email"
// //               control={form.control}
// //               render={({ field, fieldState }) => (
// //                 <Field data-invalid={fieldState.invalid}>
// //                   <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
// //                   <Input
// //                     {...field}
// //                     id="form-rhf-demo-title"
// //                     aria-invalid={fieldState.invalid}
// //                     placeholder="Please Enter Your Email"
// //                     autoComplete="off"
// //                   />
// //                   {fieldState.invalid && (
// //                     <FieldError errors={[fieldState.error]} />
// //                   )}
// //                 </Field>
// //               )}
// //             />
// //             <Controller
// //               name="password"
// //               control={form.control}
// //               render={({ field, fieldState }) => (
// //                 <Field data-invalid={fieldState.invalid}>
// //                   <FieldLabel htmlFor="form-rhf-demo-title">
// //                     Password
// //                   </FieldLabel>
// //                   <Input
// //                     {...field}
// //                     id="form-rhf-demo-title"
// //                     aria-invalid={fieldState.invalid}
// //                     placeholder="*********"
// //                     autoComplete="off"
// //                   />
// //                   {fieldState.invalid && (
// //                     <FieldError errors={[fieldState.error]} />
// //                   )}
// //                 </Field>
// //               )}
// //             />
// //           </FieldGroup>
// //         </form>
// //       </CardContent>
// //       <CardFooter>
// //         <Field orientation="vertical">
// //           <Button type="submit" form="form-rhf-demo">
// //             Login
// //           </Button>
// //         </Field>
// //       </CardFooter>
// //     </Card>
// //   );
// // }
