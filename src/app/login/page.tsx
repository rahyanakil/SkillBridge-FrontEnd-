import { LoginForm } from "@/components/modules/auth/login/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex justify-center items-center">
        <Suspense fallback={<div>Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
