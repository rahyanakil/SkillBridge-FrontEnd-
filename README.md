# SkillBridge Frontend

Modern tutoring platform UI built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Connects to the SkillBridge Express + Prisma backend.

---

## Live URLs

| Service  | URL                                              |
| -------- | ------------------------------------------------ |
| Frontend | https://skillbridge-frontend-ruby.vercel.app     |
| Backend  | https://skillbridge-tutor-backend.vercel.app     |

---

## Admin Credentials

| Field    | Value             |
| -------- | ----------------- |
| Email    | admin@gmail.com   |
| Password | StrongPassword123 |

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
| Groq SDK                | ^1.1.2    | AI Tutor (Llama 3.3)           |
| Embla Carousel          | ^8.6.0    | Hero & content carousels       |
| jwt-decode              | ^4.0.0    | Decode auth token client-side  |

---

## Features

### Public Pages
- Landing page with animated hero carousel
- Course listing with search, price filter, and client-side pagination
- Individual course detail pages with reviews
- Public tutor profile pages
- Login and registration with **Google OAuth** and **GitHub OAuth**

### Student Dashboard
- View and edit profile (avatar, name, email, password)
- Browse and book courses
- View bookings with live status badges
- Pay for accepted bookings via Stripe
- Enter classroom via secure Jitsi Meet link
- Cancel pending bookings
- Leave reviews on completed courses
- Personalised course recommendations

### Tutor Dashboard
- Create and manage tutor profile (bio, expertise, hourly rate)
- Add, edit, and delete courses
- Accept, reject, or complete student bookings
- View all incoming booking requests
- View earnings by month and by course

### Admin Dashboard
- Ban and unban platform users
- Create, update, and delete categories
- View and manage all platform bookings
- Platform-wide statistics (users, revenue, ratings)

### AI Tutor Chatbot
- Floating widget visible on all public pages
- Powered by **Groq Llama 3.3-70b** (free tier)
- Authenticated users get full chat — guests see a sign-in prompt
- 5-second send cooldown to prevent API abuse
- Typing indicator and smooth slide-up animation

---

## Environment Variables

Create a `.env` file in `skillbridge-frontend/`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

For **production on Vercel** set `NEXT_PUBLIC_BASE_URL` to:
```
https://skillbridge-tutor-backend.vercel.app/api/v1
```

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

## OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID** (Web application type)
3. Add **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/google` (local dev)
   - `https://skillbridge-frontend-ruby.vercel.app/api/auth/google` (production)
4. Copy the **Client ID** → `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
5. Copy the **Client Secret** → `GOOGLE_CLIENT_SECRET`

### GitHub OAuth
1. Go to [GitHub → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Create a **New OAuth App**
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/github`
3. Copy the **Client ID** → `NEXT_PUBLIC_GITHUB_CLIENT_ID`
4. Generate a **Client Secret** → `GITHUB_CLIENT_SECRET`

> For production, create a separate GitHub OAuth App with callback URL set to `https://skillbridge-frontend-ruby.vercel.app/api/auth/github`

---

## Folder Structure

```
skillbridge-frontend/
├── src/
│   ├── app/
│   │   ├── (CommonLayout)/
│   │   │   ├── page.tsx                  # Landing page
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx              # Course listing with search & pagination
│   │   │   │   └── [id]/page.tsx         # Course detail
│   │   │   ├── tutor/[tutorId]/          # Public tutor profile
│   │   │   ├── profile/                  # View & edit user profile
│   │   │   └── checkout/[bookingId]/     # Stripe checkout
│   │   ├── (DashboardLayout)/
│   │   │   ├── @student/dashboard/       # Student dashboard
│   │   │   ├── @tutor/dashboard/         # Tutor dashboard
│   │   │   └── @admin/dashboard/         # Admin dashboard
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── google/route.ts       # Google OAuth callback handler
│   │   │       └── github/route.ts       # GitHub OAuth callback handler
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui primitives
│   │   ├── modules/
│   │   │   ├── home/                     # Hero, CategorySection, ReviewSection, FAQ
│   │   │   ├── course/                   # CourseCard, CourseDetails, AISearchBox
│   │   │   ├── tutor/                    # TutorSection, AnimatedTutorGrid
│   │   │   ├── student/                  # StudentDashboard
│   │   │   ├── auth/                     # LoginForm, RegisterForm
│   │   │   └── payment/                  # CheckoutClient, CheckoutForm
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       ├── AIChatbot.tsx             # Floating AI Tutor widget
│   │       └── NotificationBell.tsx
│   │
│   └── services/                         # Next.js server actions ("use server")
│       ├── auth/                         # getUser, login, register, logout
│       ├── course/                       # getAllCourse, getSingleCourse
│       ├── tutor/                        # getAllPublicTutors, getSingleTutor
│       ├── booking/                      # createBooking, cancelBooking
│       ├── reviews/                      # getAllReviews, createReview
│       ├── payment/                      # createPaymentIntent, confirmPayment
│       ├── profile/                      # getProfile, updateProfile, uploadAvatar
│       ├── notification/                 # getNotifications, markRead
│       ├── ai.service.ts                 # AI Tutor via Groq
│       └── Dashboard/
│           ├── studentActions.ts
│           ├── tutorActions.ts
│           └── adminActions.ts
```

---

## Authentication

- JWT is stored in an **httpOnly cookie** set by the backend
- `getUser()` server action decodes the cookie on every server render
- Role-based parallel routes (`@student`, `@tutor`, `@admin`) render the correct dashboard without client-side checks
- **Google & GitHub OAuth** handled via Next.js Route Handlers in `app/api/auth/`

---

## Stripe Payment Flow

```
Student clicks "Pay" on an ACCEPTED booking
        ↓
createPaymentIntent(bookingId) → Backend creates Stripe PaymentIntent
        ↓
CheckoutPage renders <Elements> with clientSecret
        ↓
<PaymentElement> collects card details
        ↓
stripe.confirmPayment() submits to Stripe
        ↓
confirmPayment(bookingId, paymentIntentId) → Backend verifies & marks PAID
```

**Test card:** `4242 4242 4242 4242` · any future date · any CVC

---

## Deployment (Vercel)

1. Push to GitHub — Vercel auto-deploys on push
2. Set all environment variables in **Vercel → Settings → Environment Variables**
3. Ensure `NEXT_PUBLIC_BASE_URL` points to the production backend: `https://skillbridge-tutor-backend.vercel.app/api/v1`
4. Redeploy after updating any environment variable

---

## License

MIT — for educational use.
