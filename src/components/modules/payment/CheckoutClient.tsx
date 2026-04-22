"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BookOpen, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";

// Initialise Stripe once (outside render to avoid re-creating on each render)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutClientProps {
  clientSecret: string;
  bookingId: string;
  amount: number;
  courseTitle: string;
  confirmPayment: (bookingId: string, paymentIntentId: string) => Promise<{ success: boolean; message?: string }>;
}

export function CheckoutClient({
  clientSecret,
  bookingId,
  amount,
  courseTitle,
  confirmPayment,
}: CheckoutClientProps) {
  const router = useRouter();

  const elementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#7c3aed",
        colorBackground: "#ffffff",
        colorText: "#1f2937",
        colorDanger: "#ef4444",
        fontFamily: "inherit",
        borderRadius: "12px",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4">
      <div className="max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 mb-2">
            <CreditCard className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Secure Checkout</h1>
          <p className="text-gray-500">Complete your booking payment below</p>
        </div>

        {/* Order summary card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-violet-50 text-violet-700 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Course</p>
              <p className="font-bold text-gray-900 truncate">{courseTitle}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total</p>
              <p className="text-2xl font-black text-violet-700">${amount.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold text-gray-700">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Processing fee</span>
            <span className="font-bold text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-base font-black mt-3 pt-3 border-t border-gray-100">
            <span className="text-gray-900">Due today</span>
            <span className="text-violet-700">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6">
          <h2 className="font-black text-gray-800 text-lg mb-5 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-violet-600" />
            Payment Details
          </h2>

          <Elements stripe={stripePromise} options={elementsOptions}>
            <CheckoutForm
              bookingId={bookingId}
              amount={amount}
              courseTitle={courseTitle}
              onConfirm={confirmPayment}
              onSuccess={() => setTimeout(() => router.push("/dashboard"), 2500)}
            />
          </Elements>
        </div>

        {/* Cancel link */}
        <p className="text-center text-sm text-gray-400">
          Changed your mind?{" "}
          <button
            onClick={() => router.back()}
            className="text-violet-600 font-bold hover:underline"
          >
            Go back
          </button>
        </p>

      </div>
    </div>
  );
}
