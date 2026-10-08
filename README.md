# AlgoGrowthHub

Full-stack web application for digital growth services, client bookings, lead management, digital resource sales, and affiliate referral tracking.

[![Live Website](https://img.shields.io/badge/Live-algogrowthhub.com-2ea44f?style=flat-square)](https://algogrowthhub.com)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47a248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## Overview

AlgoGrowthHub provides a client-facing website and an administrative portal for managing digital agency operations:

- **Client Acquisition:** Service catalog, before-and-after client results, creator rosters, and consultation booking forms.
- **Digital Products:** Downloadable resources (free and paid) with Razorpay payment processing and tokenized download URLs.
- **Lead and Booking Pipeline:** Captures incoming inquiries and consultation requests with stage tracking for administrators.
- **Affiliate Program:** Referral code generation, cookie-based attribution, conversion tracking, and commission calculation.
- **Content Management:** Administrative dashboard to update hero content, testimonials, team members, services, and SEO metadata without redeploying.

Live website: [https://algogrowthhub.com](https://algogrowthhub.com)

---

## Features

### Public Portal
- **Service Listings:** Catalog of agency services and deliverables with interactive detail views.
- **Client Results & Reviews:** Case studies showing verified metric changes and customer reviews.
- **Strategy Call Booking:** Intake form for scheduling 1-on-1 strategy sessions.
- **Digital Resource Library:** Free and paid guides, templates, and video assets.

### E-Commerce & Payments
- **Razorpay Checkout:** Client-side Razorpay modal with server-side signature verification.
- **Protected Downloads:** One-time expiring download tokens for paid digital assets.
- **Order State Machine:** Tracks orders from creation through payment verification and fulfillment.

### Partner & Referral Tracking
- **Referral Links:** Parameter-based referral tracking (`/ref/:code`) stored via client cookies.
- **Partner Dashboard:** Affiliate portal showing clicks, conversions, and accrued commissions.

### Admin Dashboard & CMS
- **Overview Metrics:** Summary cards for revenue, leads, bookings, and active partners.
- **Lead Pipeline:** Administrative interface to review and update inbound lead statuses.
- **Content Management:** CMS controls for hero banners, FAQs, creator profiles, and team members.
- **Audit Logging:** Logs administrative mutations with actor details, timestamps, and IP addresses.

---

## Tech Stack

### Frontend
- **Framework:** React 19 with Vite 6
- **Language:** TypeScript 5.7
- **Routing:** React Router 7
- **HTTP Client:** Axios
- **Icons & Styling:** Lucide React, Tailwind CSS

### Backend
- **Runtime:** Node.js (ES Modules, Node 20+)
- **Framework:** Express 4.21
- **Language:** TypeScript 5.7
- **Validation:** Zod 3.24
- **Security:** Helmet, CORS, Cookie-Parser, Express-Rate-Limit
- **Authentication:** JSON Web Tokens (jsonwebtoken), Bcrypt.js

### Database & Storage
- **Database:** MongoDB with Mongoose 8.10 ODM
- **File Uploads:** Multer with local filesystem storage and Cloudinary support

---

## Architecture

```text
[ Client Browser ]
        │  HTTPS (React 19 / Vite)
        ▼
[ Express API Gateway ] (/api/v1)
   ├── Helmet (Security Headers)
   ├── CORS Guard
   ├── Rate Limiting (300 req / 15 min global; 20 req / 15 min auth)
   └── Cookie Parser
        │
   ├── [ Middlewares ]
   │      ├── JWT Authentication (Bearer Header)
   │      ├── Role Guard (SUPER_ADMIN, ADMIN, USER, PARTNER)
   │      └── Zod Request Validation
        │
   ├── [ Business Modules ]
   │      ├── Auth, Users, Site Settings
   │      ├── Services, Creators, Team, Client Results
   │      ├── Bookings, Leads, Resources
   │      ├── Orders, Payments, Referrals, Audit Logs
        │
        ├──▶ MongoDB (Mongoose 8 Schemas)
        ├──▶ Razorpay API (Payment Verification)
        └──▶ Storage (Local / Cloudinary)
```

---

## Project Structure

```text
AlgoGrowthHub/
├── client/                     # Frontend application (React 19 + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components and section layouts
│   │   ├── pages/              # Route pages (Home, Services, Bookings, Admin, Partner)
│   │   ├── services/           # Axios API client and route handlers
│   │   └── types/              # TypeScript interface definitions
│   └── package.json
│
├── server/                     # Backend REST API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # DB connection, environment variables, role constants
│   │   ├── middlewares/        # Auth, role check, rate limit, error handler, validation
│   │   ├── modules/            # Domain modules (auth, orders, bookings, leads, etc.)
│   │   ├── scripts/            # Database seed and automated scenario runners
│   │   ├── utils/              # JWT helpers, response formatters, AppError
│   │   ├── app.ts              # Express application assembly
│   │   └── server.ts           # HTTP server bootstrap
│   ├── tests/                  # API integration test suite (Vitest + Supertest)
│   └── package.json
│
└── BACKEND_API_DOCUMENTATION.md# Detailed endpoint specifications
```

---

## API Overview

All backend routes are mounted under the `/api/v1` prefix. Detailed request schemas, status codes, and error payloads are documented in [`BACKEND_API_DOCUMENTATION.md`](./BACKEND_API_DOCUMENTATION.md).

| Route Prefix | Access | Description |
| :--- | :--- | :--- |
| `GET /api/health` | Public | Service health check |
| `/api/v1/auth` | Public / Auth | User registration, login, token refresh, and logout |
| `/api/v1/settings` | Public | Public CMS settings (hero, about, footer, SEO) |
| `/api/v1/services` | Public | Service catalog and deliverables |
| `/api/v1/client-results` | Public | Before/after client showcases and reviews |
| `/api/v1/resources` | Public | Free and premium digital resource downloads |
| `/api/v1/bookings` | Public | Consultation call booking requests |
| `/api/v1/leads` | Public | Lead capture intake form |
| `/api/v1/payments` | Public / Auth | Razorpay order creation and signature verification |
| `/api/v1/referrals` | Public | Referral link validation and tracking |
| `/api/v1/partner` | Partner | Affiliate partner dashboard data and commissions |
| `/api/v1/admin/*` | Admin | Administrative CRUD for users, CMS, leads, orders, audit logs |

---

## Authentication & Security

- **Tokens:** Dual-token JWT system.
  - Access Token: Short-lived (default `15m`), passed in the `Authorization: Bearer <token>` header.
  - Refresh Token: Long-lived (default `7d`), stored in an `HttpOnly`, `SameSite` cookie.
- **Passwords:** Hashed with `bcryptjs` using 12 salt rounds before persisting to MongoDB.
- **Authorization:** Role-based access control supporting `SUPER_ADMIN`, `ADMIN`, `USER`, and `PARTNER`.
- **Validation:** All incoming request bodies and query parameters are validated against Zod schemas.
- **Rate Limiting:** Express-rate-limit configured with a global limit of 300 requests per 15 minutes, and 20 requests per 15 minutes on authentication routes.
- **Headers:** Helmet middleware configured to set standard security headers.

---

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)
- MongoDB instance (local or MongoDB Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/gy60540-netizen/AlgoGrowthHub.git
cd AlgoGrowthHub
```

### 2. Configure Backend
```bash
cd server
npm install

# Copy example environment configuration
cp .env.example .env
```

Open `server/.env` and update the values as needed:
```ini
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/algogrowthhub
CORS_ORIGIN=http://localhost:5173

JWT_ACCESS_SECRET=your_access_token_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

SUPER_ADMIN_NAME="Super Admin"
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=your_secure_password

PAYMENT_PROVIDER=mock
STORAGE_PROVIDER=local
```

### 3. Seed Database
```bash
# Populates default CMS settings, initial services, and super admin account
npm run seed
```

### 4. Run Backend
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 5. Configure & Run Frontend
In a separate terminal window:
```bash
cd ../client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Testing

Backend test suites use Vitest and Supertest:

```bash
cd server

# Run integration tests
npm test

# Run end-to-end scenario runner
npm run test:e2e
```

---

## Related Documentation

- [`BACKEND_API_DOCUMENTATION.md`](./BACKEND_API_DOCUMENTATION.md) — Endpoint specifications, payload examples, and error codes.
- [`PRD_AlgoGrowthHub_Merged_Final.md`](./PRD_AlgoGrowthHub_Merged_Final.md) — Product requirements and business specifications.
- [`PRD_AlgoGrowthHub_Referral_Tracking_System.md`](./PRD_AlgoGrowthHub_Referral_Tracking_System.md) — Referral engine and attribution architecture.

---

## Author

**Gaurav**  
GitHub: [@gy60540-netizen](https://github.com/gy60540-netizen)  
Website: [https://algogrowthhub.com](https://algogrowthhub.com)
