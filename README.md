# SkillBridge Frontend – Learning & Tutoring Platform

A modern, responsive, and production-ready frontend built with **Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui**, and full integration with a Node.js + Prisma backend.

## 🚀 Live Demo

Frontend Live: https://your-frontend.vercel.app  
Backend API: https://your-backend.vercel.app

---

# 📌 Features

### 🌍 Public Pages

- Beautiful landing page with carousel hero
- Browse courses with real-time search & price filtering
- Dynamic tutor profile pages
- Login & Register authentication
- Professional, clean UI with responsive layout

### 🎓 Student Dashboard

- View & update profile
- Browse and book courses
- View all bookings with status badges
- **Pay for accepted bookings via Stripe**
- Enter classroom via secure link
- Cancel pending bookings
- Leave reviews on completed courses
- Personalized course recommendations

### 👨‍🏫 Tutor Dashboard

- Setup & manage tutor profile
- Add, edit, and delete courses
- Accept or reject student booking requests
- Mark sessions as completed
- View earnings breakdown by course
- Enter classroom sessions

### 🛠 Admin Dashboard

- Manage all users (ban/unban)
- Manage categories
- View and manage all bookings
- Platform-wide stats overview

### 💳 Stripe Payments

- Students pay for ACCEPTED bookings via **Stripe Payment Element**
- Secure client secret generated server-side via `createPaymentIntent`
- Billing details collected by the Stripe-hosted Payment Element
- Payment confirmation handled by `stripe.confirmPayment()` with `redirect: "if_required"`
- Backend payment verification on success via `confirmPayment` server action
- Test mode supported — use card `4242 4242 4242 4242`, any future date, any CVC

---

# 🧩 Tech Stack

### **Frontend**

- **Next.js 14+ (App Router & Server Actions)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form + Zod validation**
- **Sonner (toast notifications)**
- **Stripe.js + @stripe/react-stripe-js** — payment processing

### **Backend Integration**

- Full REST API connected to:
  - Authentication (JWT via cookie)
  - Tutor module
  - Courses
  - Bookings
  - Reviews
  - Payments (Stripe)
  - Admin panel

---

# 🔐 Environment Variables

Create a `.env` file in the `skillbridge-frontend/` directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> The backend must also have `STRIPE_SECRET_KEY` configured for payment intent creation to work.

---

# 💳 Stripe Payment Flow

```
Student clicks "Pay" on an ACCEPTED booking
        ↓
Server Action: createPaymentIntent(bookingId)
   → Backend creates Stripe PaymentIntent
   → Returns { clientSecret, amount, courseTitle }
        ↓
CheckoutPage (server component) renders CheckoutClient
        ↓
CheckoutClient initializes <Elements stripe={...} options={{ clientSecret }}>
        ↓
CheckoutForm renders <PaymentElement> (Stripe-hosted fields)
        ↓
stripe.confirmPayment() called on submit
        ↓
Server Action: confirmPayment(bookingId, paymentIntentId)
   → Backend verifies payment with Stripe
   → Updates booking paymentStatus to PAID
        ↓
Student redirected to dashboard — booking confirmed
```

---

# 📁 Folder Structure

```
src/
├── app/
│   ├── (CommonLayout)/
│   │   ├── page.tsx               # Landing page
│   │   ├── courses/
│   │   │   ├── page.tsx           # Course listing with search
│   │   │   └── [id]/page.tsx      # Course detail
│   │   ├── tutor/[tutorId]/       # Tutor profile
│   │   ├── profile/               # User profile
│   │   └── checkout/[bookingId]/  # Stripe checkout page
│   ├── (DashboardLayout)/
│   │   ├── @student/dashboard/    # Student dashboard (server-fetched)
│   │   ├── @tutor/dashboard/      # Tutor dashboard (server-fetched)
│   │   └── @admin/dashboard/      # Admin dashboard
│   ├── login/
│   └── register/
│
├── components/
│   ├── ui/                        # shadcn/ui primitives
│   ├── modules/
│   │   ├── home/                  # Hero, CategorySection, ReviewSection
│   │   ├── course/                # CourseDetails, CourseCard
│   │   ├── tutor/                 # TutorSection, TutorDashboard
│   │   ├── student/               # StudentDashboard
│   │   ├── auth/                  # LoginForm, RegisterForm
│   │   └── payment/               # CheckoutClient, CheckoutForm
│   └── shared/                    # Navbar, Footer
│
├── services/
│   ├── auth/                      # getUser, login, register
│   ├── course/                    # getAllCourse, getSingleCourse
│   ├── category/                  # getAllCategories
│   ├── tutor/                     # getAllPublicTutors, getSingleTutor
│   ├── reviews/                   # getAllReviews, createReview
│   ├── payment/                   # createPaymentIntent, confirmPayment
│   ├── profile/                   # getProfile, updateProfile
│   └── Dashboard/
│       ├── studentActions.ts      # Student-specific server actions
│       ├── tutorActions.ts        # Tutor-specific server actions
│       └── adminActions.ts        # Admin-specific server actions
```

---

# 🔐 Authentication

- JWT stored in **httpOnly cookie** (set by backend)
- `getUser()` server action reads cookie on each request
- Role-based parallel route rendering (`@student`, `@tutor`, `@admin`)
- Middleware-style redirect in server components:

```tsx
const user = await getUser();
if (!user) redirect("/login");
if (user.role !== "STUDENT") redirect("/dashboard");
```

---

# ⚡ Performance

- All dashboard pages are **server components** — data fetched before HTML is sent
- All independent fetches use `Promise.all()` — no sequential waterfalls
- `loading.tsx` files on every major route for instant skeleton feedback
- Course and review data cached with `next: { revalidate: 300 }`
- `TutorSection` rendered as a server component — zero client waterfall
- `next/image` used throughout with `unoptimized` for localhost/SVG sources

---

# 🛠 Getting Started

```bash
cd skillbridge-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Make sure the backend is running on `http://localhost:5000` before starting the frontend.
