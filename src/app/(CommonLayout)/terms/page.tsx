import Link from "next/link";

const LAST_UPDATED = "1 May 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the SkillBridge platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.

These terms apply to all users of the platform, including students, tutors, and administrators.`,
  },
  {
    title: "2. User Accounts",
    body: `You must register for an account to access most features of SkillBridge. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.

You must provide accurate and complete information when creating your account. SkillBridge reserves the right to suspend or terminate accounts that contain false information or violate these terms.`,
  },
  {
    title: "3. Tutor Responsibilities",
    body: `Tutors on SkillBridge must provide accurate information about their qualifications, expertise, and experience. Tutors agree to honour accepted bookings and to conduct sessions professionally and respectfully.

SkillBridge reserves the right to remove any tutor profile that contains misleading information or receives repeated negative feedback from students.`,
  },
  {
    title: "4. Student Responsibilities",
    body: `Students agree to attend booked sessions on time and to treat tutors with respect. Repeated no-shows or abusive behaviour may result in account suspension.

Students are responsible for ensuring that their learning goals are clearly communicated to their tutor at the start of each engagement.`,
  },
  {
    title: "5. Payments and Refunds",
    body: `All payments are processed securely through Stripe. By completing a booking, students agree to pay the displayed fee. SkillBridge facilitates the payment on behalf of the tutor.

Refund eligibility depends on the booking status. Pending bookings that have not yet been accepted by a tutor may be cancelled and refunded. Once a session is completed, refunds are at the discretion of SkillBridge based on the circumstances.`,
  },
  {
    title: "6. Prohibited Conduct",
    body: `Users must not use SkillBridge for any unlawful purpose or in any way that violates these terms. Prohibited conduct includes:

- Posting false, misleading, or fraudulent information
- Harassing, threatening, or abusing other users
- Circumventing the platform to transact with tutors or students directly
- Attempting to gain unauthorised access to any part of the platform`,
  },
  {
    title: "7. Intellectual Property",
    body: `All content on the SkillBridge platform, including text, graphics, logos, and software, is the property of SkillBridge or its licensors and is protected by applicable intellectual property laws.

Session content and materials shared between tutors and students remain the intellectual property of the originating party and may not be redistributed without consent.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `SkillBridge provides the platform as a marketplace to connect students and tutors. We are not responsible for the quality, accuracy, or outcomes of sessions conducted between users.

To the maximum extent permitted by law, SkillBridge shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.`,
  },
  {
    title: "9. Changes to Terms",
    body: `We may update these Terms of Service from time to time. We will notify you of material changes via email or a prominent notice on the platform. Continued use of SkillBridge after such notice constitutes your acceptance of the revised terms.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            Legal
          </div>
          <h1 className="text-4xl font-black text-slate-900 italic mb-2">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-8">
            <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-violet-300 pl-4 bg-violet-50 py-3 rounded-r-xl">
              Please read these Terms of Service carefully before using SkillBridge. These terms govern your use of our platform and constitute a legal agreement between you and SkillBridge.
            </p>

            {sections.map((s) => (
              <div key={s.title} className="space-y-3">
                <h2 className="text-lg font-black text-slate-900">{s.title}</h2>
                {s.body.split("\n\n").map((para, i) =>
                  para.startsWith("- ") ? (
                    <ul key={i} className="list-none space-y-1 pl-2">
                      {para.split("\n").map((li) => (
                        <li key={li} className="flex items-start gap-2 text-slate-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                          {li.replace("- ", "")}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  )
                )}
              </div>
            ))}

            <div className="border-t border-slate-200 pt-8">
              <p className="text-slate-500 text-sm">
                Questions about these terms? Contact us at{" "}
                <a href="mailto:legal@skillbridge.com" className="text-violet-600 font-semibold hover:underline">
                  legal@skillbridge.com
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
