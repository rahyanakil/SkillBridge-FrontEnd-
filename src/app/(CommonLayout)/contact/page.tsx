"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

const contactInfo = [
  { icon: Mail,         label: "Email Us",      value: "hello@skillbridge.com",  sub: "We reply within 24 hours" },
  { icon: Phone,        label: "Call Us",       value: "+880 1234 567 890",      sub: "Mon–Fri, 9am–6pm BST" },
  { icon: MapPin,       label: "Our Office",    value: "Dhaka, Bangladesh",      sub: "Visit us by appointment" },
  { icon: MessageSquare,label: "Live Chat",     value: "Use the SB chatbot",     sub: "Available 24/7" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div aria-hidden className="absolute -top-20 -right-20 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" /> Get In Touch
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic mb-3">
            Contact <span className="text-violet-600">Us</span>
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Have a question or need help? Our team is here for you. Fill in the form and we&apos;ll get back to you shortly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14">

            {/* Contact info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Reach Out Directly</h2>
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{label}</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5">{value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <ArrowRight className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-slate-900 mb-2">Send a Message</h3>

                  {[
                    { id: "name",    label: "Full Name",       type: "text",  placeholder: "Your name" },
                    { id: "email",   label: "Email Address",   type: "email", placeholder: "name@example.com" },
                    { id: "subject", label: "Subject",         type: "text",  placeholder: "How can we help?" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={(form as any)[id]}
                        onChange={(e) => { setForm({ ...form, [id]: e.target.value }); setErrors({ ...errors, [id]: "" }); }}
                        placeholder={placeholder}
                        className={`w-full h-11 px-4 rounded-2xl border-2 text-sm text-slate-800 bg-white placeholder-slate-300 focus:outline-none transition-all ${errors[id] ? "border-rose-300 focus:border-rose-400" : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"}`}
                        suppressHydrationWarning
                      />
                      {errors[id] && <p className="text-xs text-rose-500 font-bold mt-1">{errors[id]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                      placeholder="Tell us more about your question..."
                      rows={5}
                      className={`w-full px-4 py-3 rounded-2xl border-2 text-sm text-slate-800 bg-white placeholder-slate-300 focus:outline-none resize-none transition-all ${errors.message ? "border-rose-300" : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"}`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 font-bold mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-200 disabled:opacity-60"
                  >
                    {loading ? "Sending…" : <><span>Send Message</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
