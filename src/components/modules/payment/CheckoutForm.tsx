"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CheckCircle2, Loader2, Lock, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

interface CheckoutFormProps {
  bookingId: string;
  amount: number;
  courseTitle: string;
  onConfirm: (bookingId: string, paymentIntentId: string) => Promise<{ success: boolean; message?: string }>;
  onSuccess: () => void;
}

export function CheckoutForm({ bookingId, amount, courseTitle, onConfirm, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Validate elements before submitting
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Validation failed");
      setLoading(false);
      return;
    }

    // Confirm the payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Record the payment on our backend
      const result = await onConfirm(bookingId, paymentIntent.id);
      if (!result.success) {
        setError(result.message ?? "Could not record payment. Contact support.");
        setLoading(false);
        return;
      }
      setSucceeded(true);
      toast.success("Payment successful! Your booking is now confirmed.");
      onSuccess();
    }

    setLoading(false);
  };

  if (succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Payment Successful!</h3>
        <p className="text-gray-500 max-w-xs">
          Your booking for <span className="font-bold text-violet-700">{courseTitle}</span> is confirmed. Check your dashboard for details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card fields from Stripe */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed text-white font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-violet-200"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>Secured by Stripe · 256-bit SSL encryption</span>
      </div>

      {/* Test mode hint */}
      <p className="text-center text-xs text-gray-300 font-mono">
        Test card: 4242 4242 4242 4242 · Any future date · Any CVC
      </p>
    </form>
  );
}
