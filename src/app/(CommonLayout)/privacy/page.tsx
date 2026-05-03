import Link from "next/link";

const LAST_UPDATED = "1 May 2026";

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly when you register for an account, book a session, or contact us. This includes your name, email address, role (student or tutor), profile information, and payment details processed securely via Stripe.

We also automatically collect certain technical data when you use our platform, including IP address, browser type, device information, and usage data such as pages viewed and features used. This data helps us improve platform performance and security.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to provide, operate, and improve the SkillBridge platform — including processing bookings, facilitating payments, sending session confirmations, and personalising your experience.

We may also use your data to send transactional and platform-related communications, such as booking confirmations, session reminders, and platform updates. We will never sell your personal data to third parties.`,
  },
  {
    title: "3. Sharing Your Information",
    body: `We share your data only as necessary to operate the platform. This includes sharing booking details with relevant tutors or students, processing payments through Stripe (our third-party payment processor), and complying with applicable legal obligations.

All third-party service providers we work with are contractually required to protect your data and use it only for the specific purpose it was shared.`,
  },
  {
    title: "4. Data Security",
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Passwords are hashed and never stored in plain text. Payment information is handled exclusively by Stripe and never stored on our servers.

While we take reasonable precautions, no internet transmission is 100% secure. We encourage you to use a strong, unique password for your SkillBridge account.`,
  },
  {
    title: "5. Cookies",
    body: `We use cookies to maintain your session, remember your preferences, and understand how you use our platform. You can control cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "6. Your Rights",
    body: `You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting us directly. You may also request a copy of the data we hold about you or withdraw consent for optional data uses.

To exercise any of these rights, please contact us at privacy@skillbridge.com.`,
  },
  {
    title: "7. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via a notice on the platform. Continued use of SkillBridge after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            Legal
          </div>
          <h1 className="text-4xl font-black text-slate-900 italic mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-8">
            <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-violet-300 pl-4 bg-violet-50 py-3 rounded-r-xl">
              SkillBridge (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use the SkillBridge platform.
            </p>

            {sections.map((s) => (
              <div key={s.title} className="space-y-3">
                <h2 className="text-lg font-black text-slate-900">{s.title}</h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            ))}

            <div className="border-t border-slate-200 pt-8">
              <p className="text-slate-500 text-sm">
                Questions? Contact us at{" "}
                <a href="mailto:privacy@skillbridge.com" className="text-violet-600 font-semibold hover:underline">
                  privacy@skillbridge.com
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className="text-violet-600 font-semibold hover:underline">
                  Contact page
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
