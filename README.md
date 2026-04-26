# SkillBridge Frontend

Modern tutoring platform UI built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Connects to the SkillBridge Express + Prisma backend.

---

## Live URLs

| Service  | URL                                                              |
| -------- | ---------------------------------------------------------------- |
| Frontend | https://skillbridge-frontend-ruby.vercel.app                    |
| Backend  | https://vercel.com/rahyanakils-projects/skillbridge-tutor-backend |

---

## Admin Credentials

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | admin@gmail.com        |
| Password | StrongPassword123      |

> Use these credentials to log in as admin and access the admin dashboard.

---

## Tech Stack

| Technology              | Version   | Purpose                        |
| ----------------------- | --------- | ------------------------------ |
| Next.js (App Router)    | 16.1.6    | Framework & server components  |
| React                   | 19.2.3    | UI library                     |
| TypeScript              | ^5        | Type safety                    |
| Tailwind CSS            | ^4        | Utility-first styling          |
| shadcn/ui               | ^3.8.5    | Accessible UI primitives       |
| Framer Motion           | ^12.34.3  | Animations                     |
| React Hook Form + Zod   | ^7 / ^4   | Form management & validation   |
| Sonner                  | ^2.0.7    | Toast notifications            |
| Stripe.js               | ^9.2.0    | Payment processing             |
| Embla Carousel          | ^8.6.0    | Hero & content carousels       |
| jwt-decode              | ^4.0.0    | Decode auth token client-side  |

---

## Features

### Public Pages
- Landing page with animated hero carousel
- Course listing with search and price filtering
- Individual course detail pages
- Public tutor profile pages
- Login and registration

### Student Dashboard
- View and edit profile (avatar, name, email)
- Browse and book courses
- View bookings with live status badges
- Pay for accepted bookings via Stripe
- Enter classroom via secure link
- Cancel pending bookings
- Leave reviews on completed courses

### Tutor Dashboard
- Create and manage tutor profile (bio, expertise, hourly rate)
- Add, edit, and delete courses
- Accept, reject, or complete student bookings
- View all incoming booking requests

### Admin Dashboard
- Ban and unban platform users
- Create, update, and delete categories
- View and manage all platform bookings

---

## Environment Variables

Create a `.env.local` file in `skillbridge-frontend/`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

The backend must have `STRIPE_SECRET_KEY` set for payment intents to work.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the backend is running on `http://localhost:5000` first.

### Available Scripts

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start Next.js dev server   |
| `npm run build` | Build for production       |
| `npm run start` | Start production server    |
| `npm run lint`  | Run ESLint                 |

---

## Folder Structure

```
skillbridge-frontend/
├── src/
│   ├── app/
│   │   ├── (CommonLayout)/
│   │   │   ├── page.tsx                  # Landing page
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx              # Course listing with search
│   │   │   │   └── [id]/page.tsx         # Course detail
│   │   │   ├── tutor/[tutorId]/          # Public tutor profile
│   │   │   ├── profile/                  # Edit user profile
│   │   │   └── checkout/[bookingId]/     # Stripe checkout
│   │   ├── (DashboardLayout)/
│   │   │   ├── @student/dashboard/       # Student dashboard (server component)
│   │   │   ├── @tutor/dashboard/         # Tutor dashboard (server component)
│   │   │   └── @admin/dashboard/         # Admin dashboard
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui primitives
│   │   ├── modules/
│   │   │   ├── home/                     # Hero, CategorySection, ReviewSection
│   │   │   ├── course/                   # CourseCard, CourseDetails
│   │   │   ├── tutor/                    # TutorSection, TutorDashboard
│   │   │   ├── student/                  # StudentDashboard
│   │   │   ├── auth/                     # LoginForm, RegisterForm
│   │   │   └── payment/                  # CheckoutClient, CheckoutForm
│   │   └── shared/                       # Navbar, Footer
│   │
│   └── services/                         # Next.js server actions ("use server")
│       ├── auth/                         # getUser, login, register
│       ├── course/                       # getAllCourse, getSingleCourse
│       ├── category/                     # getAllCategories
│       ├── tutor/                        # getAllPublicTutors, getSingleTutor
│       ├── reviews/                      # getAllReviews, createReview
│       ├── payment/                      # createPaymentIntent, confirmPayment
│       ├── profile/                      # getProfile, updateProfile
│       ├── booking/                      # createBooking, cancelBooking
│       ├── notification/                 # getNotifications
│       └── Dashboard/
│           ├── studentActions.ts         # Student server actions
│           ├── tutorActions.ts           # Tutor server actions
│           └── adminActions.ts           # Admin server actions
```

---

## Authentication

- JWT is stored in an **httpOnly cookie** set by the backend
- `getUser()` server action decodes the cookie on every server render
- Role-based parallel routes (`@student`, `@tutor`, `@admin`) render the correct dashboard without client-side checks
- Server components redirect unauthenticated or wrong-role requests:

```tsx
const user = await getUser();
if (!user) redirect("/login");
if (user.role !== "STUDENT") redirect("/dashboard");
```

---

## Stripe Payment Flow

```
Student clicks "Pay" on an ACCEPTED booking
        ↓
Server Action: createPaymentIntent(bookingId)
   → Backend creates Stripe PaymentIntent
   → Returns { clientSecret, amount, courseTitle }
        ↓
CheckoutPage renders <Elements stripe={...} options={{ clientSecret }}>
        ↓
CheckoutForm renders <PaymentElement> (Stripe-hosted fields)
        ↓
stripe.confirmPayment() called on form submit
        ↓
Server Action: confirmPayment(bookingId, paymentIntentId)
   → Backend verifies with Stripe
   → Updates booking paymentStatus to PAID
        ↓
Student redirected to dashboard — booking confirmed
```

**Test card:** `4242 4242 4242 4242` · any future date · any CVC

---

## Performance Notes

- All dashboard pages are **server components** — data fetched before HTML is sent to the client
- Independent data fetches use `Promise.all()` to avoid sequential waterfalls
- Course and review data uses `next: { revalidate: 300 }` for ISR caching
- `loading.tsx` files on every major route for instant skeleton feedback
- `next/image` used throughout for optimized image delivery

---

## Backend Connection

All API calls are Next.js **server actions** located in `src/services/`. They communicate with the backend using the `NEXT_PUBLIC_BASE_URL` env variable and attach the JWT from cookies automatically.

Route protection is handled via `src/proxy.ts` middleware using Next.js `middleware.ts`.

---

## License

MIT — for educational use.
