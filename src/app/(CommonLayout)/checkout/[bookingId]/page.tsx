import { CheckoutClient } from "@/components/modules/payment/CheckoutClient";
import { getUser } from "@/services/auth";
import { confirmPayment, createPaymentIntent } from "@/services/payment";
import { redirect } from "next/navigation";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const user = await getUser();
  if (!user) redirect("/login");
  if ((user as any).role !== "STUDENT") redirect("/dashboard");

  const result = await createPaymentIntent(bookingId);

  if (!result.success || !result.data?.clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md text-center space-y-4 p-8 bg-white rounded-3xl shadow-lg">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-black">
            !
          </div>
          <h2 className="text-2xl font-black text-gray-900">Cannot Checkout</h2>
          <p className="text-gray-500">
            {result.message ?? "This booking cannot be paid right now. It may already be paid or cancelled."}
          </p>
          <a
            href="/dashboard"
            className="inline-block mt-4 px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const { clientSecret, amount, courseTitle } = result.data;

  return (
    <CheckoutClient
      clientSecret={clientSecret}
      bookingId={bookingId}
      amount={amount}
      courseTitle={courseTitle}
      confirmPayment={confirmPayment}
    />
  );
}
