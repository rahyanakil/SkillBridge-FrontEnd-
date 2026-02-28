import { RegisterForm } from "@/components/modules/auth/register/registerForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex justify-center items-center">
        <Suspense fallback={<div>Loading Register form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
