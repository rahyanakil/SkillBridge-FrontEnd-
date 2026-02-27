"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

// 1. Define validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 2. Get the redirect path (e.g., "/dashboard") from the URL
  // If no redirect param exists, it defaults to "/dashboard"
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  // 3. Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 4. Handle Submit
  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);

      if (res.success) {
        toast.success(res.message || "Logged in successfully!");

        // 🚀 Redirect to the intended path
        router.push(redirectPath);

        // Force a refresh so Server Components (like DashboardLayout)
        // fetch the fresh user session immediately
        router.refresh();
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Please Login</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Note: form.handleSubmit(onSubmit) is crucial here */}
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="*********"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical" className="w-full">
          {/* Linked to the form ID above */}
          <Button
            type="submit"
            form="login-form"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
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
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const formSchema = z.object({
//   email: z.email({ message: "Please Provide a valid email" }),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export function LoginForm() {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(data: z.infer<typeof formSchema>) {
//     // console.log(data);

//     try {
//       const res = await loginUser(data);
//       // console.log(res);
//       if (res.success) {
//         toast.success(res.message || "Logged in successfully!");
//         router.push("/");
//       } else {
//         // ব্যাকএন্ড যদি success: false পাঠায়
//         toast.error(res.message || "Login failed");
//       }
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An error occurred";
//       toast.error(errorMessage);
//     }
//   }

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Please Login</CardTitle>
//         {/* <CardDescription>
//           Help us improve by reporting bugs you encounter.
//         </CardDescription> */}
//       </CardHeader>
//       <CardContent>
//         <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-title"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Please Enter Your Email"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="form-rhf-demo-title">
//                     Password
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="form-rhf-demo-title"
//                     aria-invalid={fieldState.invalid}
//                     placeholder="*********"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="vertical">
//           <Button type="submit" form="form-rhf-demo">
//             Login
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   );
// }
