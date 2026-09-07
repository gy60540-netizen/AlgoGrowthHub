# 📘 AlgoGrowthHub — Complete Backend Architecture & API Documentation

> **Version:** `1.0.0`  
> **Environment:** Node.js (v20+ / v24+) • TypeScript • Express.js • MongoDB Atlas • Zod • JWT  
> **Base URL (Local):** `http://localhost:5000`  
> **API Prefix:** `/api/v1`  
> **Author:** DeepMind Antigravity Engineering

---

## 📑 Table of Contents
1. [Architecture & System Overview](#1-architecture--system-overview)
2. [Developer Quickstart & Onboarding](#2-developer-quickstart--onboarding)
3. [Environment Configuration & Secrets](#3-environment-configuration--secrets)
4. [Authentication & RBAC Model](#4-authentication--rbac-model)
5. [Business State Machines & Lifecycles](#5-business-state-machines--lifecycles)
6. [Global HTTP Status Codes & Error Catalog](#6-global-http-status-codes--error-catalog)
7. [Comprehensive API Endpoint Specifications](#7-comprehensive-api-endpoint-specifications)
   * [01. Authentication & Session Management](#01-authentication--session-management)
   * [02. User & Admin Management](#02-user--admin-management)
   * [03. Site Settings CMS](#03-site-settings-cms)
   * [04. Services (3x3 Mixed Grid)](#04-services-3x3-mixed-grid)
   * [05. Creator Community (Instagram-Only)](#05-creator-community-instagram-only)
   * [06. Expert Team (Instagram + LinkedIn)](#06-expert-team-instagram--linkedin)
   * [07. Client Results (Before/After Showcases)](#07-client-results-beforeafter-showcases)
   * [08. Digital Resources & Protected Downloads](#08-digital-resources--protected-downloads)
   * [09. Strategy Call Bookings (1-on-1 Sessions)](#09-strategy-call-bookings-1-on-1-sessions)
   * [10. Leads Qualification Pipeline](#10-leads-qualification-pipeline)
   * [11. Orders & Payment Processing](#11-orders--payment-processing)
   * [12. Admin Analytics Dashboard & Audit Logs](#12-admin-analytics-dashboard--audit-logs)
8. [Multi-Scenario Error Handling & Edge Cases](#8-multi-scenario-error-handling--edge-cases)
9. [Developer Roadmap: Where to Continue](#9-developer-roadmap-where-to-continue)

---

## 1. Architecture & System Overview

AlgoGrowthHub backend is architected using **Clean Modular Domain-Driven Design (DDD)**. Every domain module is fully self-contained with its own Schema validation, Model, Controller, Service, and Router.

```text
server/
├── src/
│   ├── config/             # Environment, Database bootstrap, RBAC Constants
│   ├── middlewares/        # Auth, Role Guard, Zod Validate, Rate Limiter, Error Handler
│   ├── modules/            # 12 Self-contained Business Modules
│   │   ├── auth/           # Login, Register, Refresh, Logout, /me
│   │   ├── users/          # RBAC User Management
│   │   ├── siteSettings/   # Hero, About, Why Us, Booking, Footer, SEO CMS
│   │   ├── services/       # 3x3 Service Cards & Deliverables
│   │   ├── creators/       # Instagram-only Creator Community
│   │   ├── expertTeam/     # Instagram + LinkedIn Team Roster
│   │   ├── clientResults/  # Before/After Metric Showcases & 1-5 Star Ratings
│   │   ├── resources/      # Free & Premium Downloads with Tokenized URLs
│   │   ├── bookings/       # 1-on-1 Strategy Call Schedule Pipeline
│   │   ├── leads/          # Lead Capture & Status Flow
│   │   ├── orders/         # Digital Resource Order State Machine
│   │   ├── payments/       # Mock / Razorpay / Stripe Gateway Verification
│   │   ├── media/          # Local/Cloudinary File Upload & Metadata
│   │   └── auditLogs/      # Comprehensive Admin Activity Audit Trail
│   ├── utils/              # JWT, Logger, Response Formatter, AppError
│   ├── scripts/            # Database Seeder (seed.ts)
│   ├── app.ts              # Express Server, Middleware Pipeline & Route Mappings
│   └── server.ts           # Server Entrypoint
└── tests/                  # Integration & Unit Test Suite
```

---

## 2. Developer Quickstart & Onboarding

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **Package Manager**: `npm`
* **MongoDB**: Atlas Cluster (or local MongoDB on port `27017`)

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Step 3: Seed Database with Initial PRD Data
Seeds default Super Admin, 9 services, 4 creators, 4 team members, 4 client results, and resources:
```bash
npm run seed
```

### Step 4: Run Development Server
```bash
npm run dev
```
* API Server will start at `http://localhost:5000`
* Health check: `http://localhost:5000/api/health`

### Step 5: Typecheck & Build
```bash
npm run build
```

---

## 3. Environment Configuration & Secrets

File: `server/.env`

| Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `NODE_ENV` | Environment mode | `development` \| `production` |
| `MONGO_URI` | MongoDB Atlas direct connection string | Direct 3-shard non-SRV connection string |
| `CORS_ORIGIN` | Allowed Frontend Client URL | `http://localhost:5173` |
| `JWT_ACCESS_SECRET` | Secret key for signing Access Tokens | 32+ character random hex string |
| `JWT_ACCESS_EXPIRES_IN` | Access token lifespan | `15m` (or `1d` for development) |
| `JWT_REFRESH_SECRET` | Secret key for signing Refresh Tokens | 32+ character random hex string |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifespan | `7d` |
| `SUPER_ADMIN_NAME` | Initial Super Admin name for seed | `"Super Admin"` |
| `SUPER_ADMIN_EMAIL` | Initial Super Admin email | `admin@algogrowthhub.com` |
| `SUPER_ADMIN_PASSWORD` | Initial Super Admin password | `Admin@123456` |
| `PAYMENT_PROVIDER` | Active payment processor | `mock` \| `razorpay` \| `stripe` |
| `STORAGE_PROVIDER` | Asset upload engine | `local` \| `cloudinary` |

> ⚠️ **Windows / ISP DNS Note:** When connecting to MongoDB Atlas on Windows in India (Airtel/Jio), local DNS often blocks `mongodb+srv://` SRV lookups (`querySrv ECONNREFUSED`). Always use the direct replica set connection string (`mongodb://...shard-00-00...:27017...`) in `MONGO_URI`.

---

## 4. Authentication & RBAC Model

### Roles Hierarchy
1. **`SUPER_ADMIN` (Platform Owner):**
   * Can create, edit, deactivate, or delete other `ADMIN` and `USER` accounts.
   * Can process order **Refunds** (`POST /api/v1/admin/orders/:id/refund`).
   * Can view system audit logs and sensitive analytics.
2. **`ADMIN` (Operations Manager):**
   * Manages CMS content: Services (3x3), Creators, Expert Team, Client Results, Digital Resources, Site Settings.
   * Manages Bookings & Leads pipelines.
   * Cannot create or delete `SUPER_ADMIN` accounts or process refunds.
3. **`USER` (Client / Customer):**
   * Standard public user who can register, login, place orders, book strategy calls, and access purchased downloads.

### Dual-Token Architecture
* **Access Token (15m/1d):** Transmitted via HTTP Request Header: `Authorization: Bearer <accessToken>`.
* **Refresh Token (7d):** Transmitted via secure `HttpOnly` cookie (`sameSite: 'lax'`). Used for silent token refresh via `POST /api/v1/auth/refresh`.

---

## 5. Business State Machines & Lifecycles

### A. Order State Machine
```text
  [ Client Checkout ] ──▶ CREATED
                             │
                             ▼
                          PENDING ──(Payment Failed)──▶ FAILED
                             │
                      (Payment Verified)
                             │
                             ▼
                           PAID ──(Auto/Manual Fulfillment)──▶ FULFILLED
                             │
                    (Super Admin Refund)
                             │
                             ▼
                          REFUNDED
```

### B. Strategy Call Booking Pipeline
```text
  [ User Books Call ] ──▶ PENDING
                             │
                     (Admin Confirms Date)
                             │
                             ▼
                         CONFIRMED ──(Call Conducted)──▶ COMPLETED
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
             CANCELLED                NO_SHOW
```

### C. Lead Qualification Pipeline
```text
  [ Lead Submits Form ] ──▶ NEW ──▶ CONTACTED ──▶ QUALIFIED ──▶ PROPOSAL_SENT ──▶ WON
                                                       │
                                                       └──▶ LOST
```

### D. Content Publication State (Services, Team, Creators, Results, Resources)
```text
  DRAFT ──▶ PUBLISHED ──▶ UNPUBLISHED ──▶ ARCHIVED
```

---

## 6. Global HTTP Status Codes & Error Catalog

All responses follow a standard envelope:

### ✅ Success Envelope (`200 OK` / `201 Created`):
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation description"
}
```

### ❌ Error Envelope:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "Human readable actionable message",
    "details": null
  }
}
```

### Status Codes Reference Table:

| HTTP Status | Code String | Meaning & When it occurs |
| :--- | :--- | :--- |
| **`200 OK`** | `SUCCESS` | Request processed successfully. |
| **`201 Created`** | `CREATED` | Resource (User, Service, Order, Creator) created successfully. |
| **`400 Bad Request`** | `VALIDATION_ERROR` | Request body or query parameters failed Zod schema validation. |
| **`401 Unauthorized`** | `AUTHENTICATION_ERROR` | Missing token, expired token, or invalid email/password. |
| **`403 Forbidden`** | `AUTHORIZATION_ERROR` | Authenticated user lacks required permissions or role. |
| **`404 Not Found`** | `NOT_FOUND` | Requested document ID or route does not exist. |
| **`409 Conflict`** | `CONFLICT` | Email already registered, or duplicate unique slug. |
| **`422 Unprocessable`**| `BUSINESS_RULE_VIOLATION`| Invalid state transition (e.g. refunding an unpaid order). |
| **`429 Too Many Req`** | `RATE_LIMIT_EXCEEDED` | Exceeded 20 auth requests / 15m or 100 general requests / 15m. |
| **`500 Internal Error`**| `INTERNAL_SERVER_ERROR`| Uncaught backend exception (logged in server console). |

---

## 7. Comprehensive API Endpoint Specifications

---

### 01. Authentication & Session Management

#### 1.1 Register New User (Public)
* **Method:** `POST`
* **Route:** `/api/v1/auth/register`
* **Auth:** Public
* **Rate Limit:** 20 requests / 15m

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "Password@123"
}
```

**Success Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "6a8ed0c32f86234889866a2a",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "role": "USER",
      "isActive": true,
      "createdAt": "2026-08-26T11:40:51.163Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  },
  "message": "User registered successfully"
}
```

**Error Scenario — Duplicate Email (`409 Conflict`):**
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "User with this email is already registered. Please login instead."
  }
}
```

---

#### 1.2 Login User / Admin
* **Method:** `POST`
* **Route:** `/api/v1/auth/login`
* **Auth:** Public
* **Rate Limit:** 20 requests / 15m

**Request Body:**
```json
{
  "email": "admin@algogrowthhub.com",
  "password": "Admin@123456"
}
```

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "6a8ec60c9d444f368a9a8ff4",
      "name": "Super Admin",
      "email": "admin@algogrowthhub.com",
      "role": "SUPER_ADMIN"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  },
  "message": "Login successful"
}
```

---

#### 1.3 Get Current Profile
* **Method:** `GET`
* **Route:** `/api/v1/auth/me`
* **Auth:** `Bearer <accessToken>`

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "6a8ec60c9d444f368a9a8ff4",
    "name": "Super Admin",
    "email": "admin@algogrowthhub.com",
    "role": "SUPER_ADMIN",
    "isActive": true
  },
  "message": "Current user profile fetched"
}
```

---

#### 1.4 Silent Token Refresh
* **Method:** `POST`
* **Route:** `/api/v1/auth/refresh`
* **Auth:** Auto-read from `HttpOnly` cookie or body `{ "refreshToken": "..." }`

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  },
  "message": "Token refreshed successfully"
}
```

---

#### 1.5 Logout
* **Method:** `POST`
* **Route:** `/api/v1/auth/logout`
* **Auth:** `Bearer <accessToken>`

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "data": null,
  "message": "Logged out successfully"
}
```

---

### 02. User & Admin Management

#### 2.1 Get All Users
* **Method:** `GET`
* **Route:** `/api/v1/admin/users`
* **Auth:** Super Admin / Admin (`Bearer <token>`)

#### 2.2 Create User / Staff Admin
* **Method:** `POST`
* **Route:** `/api/v1/admin/users`
* **Auth:** Super Admin only (`Bearer <token>`)

**Request Body:**
```json
{
  "name": "Staff Admin",
  "email": "staff@algogrowthhub.com",
  "password": "Password@123",
  "role": "ADMIN",
  "isActive": true
}
```

---

### 03. Site Settings CMS

#### 3.1 Get Public Site Settings
* **Method:** `GET`
* **Route:** `/api/v1/settings`
* **Auth:** Public

**Response Data Structure:**
Includes `agencyName`, `logo`, `theme` (preset, primaryColor, primaryHover, secondaryColor, accentColor, backgroundLight, backgroundSoft, backgroundDark, surfaceCard, textPrimary, textSecondary, borderRadius, mode), `hero`, `about`, `whyChooseUs`, `bookingSection`, `letsWorkWithUs`, `footer`, and `seoDefaults`.

#### 3.2 Update Site Settings & Dynamic Theme
* **Method:** `PUT`
* **Route:** `/api/v1/admin/settings`
* **Auth:** Admin / Super Admin

**Request Body Example:**
```json
{
  "theme": {
    "preset": "Obsidian Gold",
    "primaryColor": "#E5A93C",
    "primaryHover": "#C88D25",
    "secondaryColor": "#94A3B8",
    "accentColor": "#F59E0B",
    "backgroundDark": "#07080B",
    "surfaceCard": "#13161F",
    "textPrimary": "#F8FAFC",
    "borderRadius": "12px",
    "mode": "dark"
  },
  "hero": {
    "heading": "Transforming Business Through Strategic Social Growth",
    "description": "We scale brands and creators with data-driven social media management."
  }
}
```

---

### 04. Services (3x3 Mixed Grid)

#### 4.1 Get Published Services
* **Method:** `GET`
* **Route:** `/api/v1/services`
* **Auth:** Public

#### 4.2 Create Service
* **Method:** `POST`
* **Route:** `/api/v1/admin/services`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "title": "Algorithmic Retention Editing",
  "shortDescription": "Hook optimization and fast-paced retention cuts for viral video reach.",
  "icon": "TrendingUp",
  "pricing": {
    "startingAt": 599,
    "currency": "USD"
  },
  "deliverables": [
    "30 Short-Form Videos",
    "Sound Design",
    "A/B Hook Testing"
  ],
  "order": 1,
  "status": "PUBLISHED"
}
```

---

### 05. Creator Community (Instagram-Only)

> ⚠️ **PRD Hard Rule:** Creators must ONLY have `instagramUrl` / Instagram handles. No LinkedIn fields allowed.

#### 5.1 Get Published Creators
* **Method:** `GET`
* **Route:** `/api/v1/creators`
* **Auth:** Public

#### 5.2 Create Creator
* **Method:** `POST`
* **Route:** `/api/v1/admin/creators`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "name": "Dev Sharma",
  "handle": "dev_builds",
  "niche": "Tech & AI",
  "followerCount": 420000,
  "instagramUrl": "https://instagram.com/dev_builds",
  "status": "PUBLISHED"
}
```

---

### 06. Expert Team (Instagram + LinkedIn)

> ⚠️ **PRD Hard Rule:** Expert team members must support BOTH `instagramUrl` and `linkedinUrl`.

#### 6.1 Get Team Members
* **Method:** `GET`
* **Route:** `/api/v1/expert-team`
* **Auth:** Public

#### 6.2 Create Team Member
* **Method:** `POST`
* **Route:** `/api/v1/admin/expert-team`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "name": "Pooja Hegde",
  "role": "Head of Viral Content",
  "bio": "Over 500M+ organic views engineered across top creator accounts.",
  "instagramUrl": "https://instagram.com/pooja_viral",
  "linkedinUrl": "https://linkedin.com/in/pooja-hegde",
  "status": "PUBLISHED"
}
```

---

### 07. Client Results (Before/After Showcases)

> ⚠️ **PRD Hard Rule:** Must include Before Metric, After Metric, Growth Percentage, and 1–5 Star Rating.

#### 7.1 Get Client Results
* **Method:** `GET`
* **Route:** `/api/v1/client-results`
* **Auth:** Public

#### 7.2 Create Client Result
* **Method:** `POST`
* **Route:** `/api/v1/admin/client-results`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "clientName": "SaaS Launchpad",
  "description": "Engineered multi-channel organic reel funnels resulting in 2.4M reach.",
  "instagramUrl": "https://instagram.com/saaslaunchpad",
  "beforeImage": "/uploads/results/before1.png",
  "afterImage": "/uploads/results/after1.png",
  "rating": 5,
  "isFeatured": true,
  "status": "PUBLISHED"
}
```

---

### 08. Digital Resources & Protected Downloads

#### 8.1 List Digital Resources
* **Method:** `GET`
* **Route:** `/api/v1/resources`
* **Auth:** Public
* **Query Params:** `?type=free` \| `?type=premium`

#### 8.2 Tokenized Secure Download
* **Method:** `GET`
* **Route:** `/api/v1/resources/:id/download`
* **Auth:** Free resources = Public; Premium resources = Requires active paid order or `Bearer <accessToken>`.

#### 8.3 Create Digital Resource
* **Method:** `POST`
* **Route:** `/api/v1/admin/resources`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "title": "2026 Viral Hook Bible",
  "description": "50+ plug-and-play hook templates with 90%+ 3-second retention rates.",
  "type": "premium",
  "price": 49,
  "currency": "USD",
  "fileFormat": "pdf",
  "fileUrl": "/uploads/resources/hook_bible_2026.pdf",
  "status": "PUBLISHED"
}
```

---

### 09. Strategy Call Bookings (1-on-1 Sessions)

#### 9.1 Book Strategy Call
* **Method:** `POST`
* **Route:** `/api/v1/bookings`
* **Auth:** Public

**Request Body:**
```json
{
  "name": "Ananya Roy",
  "email": "ananya@creator.io",
  "phone": "+919876500000",
  "preferredDate": "2026-09-05T11:00:00.000Z",
  "topic": "Creator Monetization & Brand Deals",
  "monthlyBudget": "$3,000 - $5,000"
}
```

#### 9.2 Update Booking Status
* **Method:** `PATCH`
* **Route:** `/api/v1/admin/bookings/:id/status`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```
*(Status options: `"PENDING"`, `"CONFIRMED"`, `"COMPLETED"`, `"CANCELLED"`, `"NO_SHOW"`)*

---

### 10. Leads Qualification Pipeline

#### 10.1 Capture Lead
* **Method:** `POST`
* **Route:** `/api/v1/leads`
* **Auth:** Public

**Request Body:**
```json
{
  "name": "Karan Mehra",
  "email": "karan@creatorhub.com",
  "phone": "+919811122334",
  "brandOrChannel": "@karan_vlogs",
  "message": "Looking for end-to-end algorithmic growth and monetization strategy."
}
```

#### 10.2 Update Lead Status
* **Method:** `PATCH`
* **Route:** `/api/v1/admin/leads/:id/status`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "status": "QUALIFIED"
}
```
*(Status options: `"NEW"`, `"CONTACTED"`, `"QUALIFIED"`, `"PROPOSAL_SENT"`, `"WON"`, `"LOST"`)*

---

### 11. Orders & Payment Processing

#### 11.1 Create Order
* **Method:** `POST`
* **Route:** `/api/v1/orders`
* **Auth:** Public / Authenticated User

**Request Body:**
```json
{
  "resourceId": "6a8ec60c9d444f368a9a8ff4",
  "customerEmail": "customer@gmail.com",
  "customerName": "Rohan Gupta"
}
```

#### 11.2 Verify Payment (Razorpay / Stripe / Mock)
* **Method:** `POST`
* **Route:** `/api/v1/payments/verify`
* **Auth:** Public

**Request Body:**
```json
{
  "orderId": "6a8ec60c9d444f368a9a8ff4",
  "paymentId": "pay_mock_123456",
  "signature": "mock_signature"
}
```

#### 11.3 Booking Strategy Call Checkout (₹999)
* **Method:** `POST`
* **Route:** `/api/v1/payments/booking-checkout`
* **Auth:** Public

**Request Body:**
```json
{
  "name": "Rohan Gupta",
  "email": "rohan@example.com",
  "phone": "+919876543210",
  "company": "Agency XYZ",
  "service": "Creator Monetization",
  "preferredDate": "2026-09-15",
  "preferredTime": "11:00 AM",
  "timezone": "IST (UTC+5:30)",
  "message": "1-on-1 strategy call booking",
  "amount": 999
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "bookingId": "68be9c2f...",
    "orderId": "68be9c2f...",
    "providerOrderId": "order_mock_123456",
    "amount": 999,
    "currency": "INR",
    "provider": "razorpay",
    "keyId": "rzp_test_..."
  }
}
```

#### 11.4 Verify Strategy Call Booking Payment
* **Method:** `POST`
* **Route:** `/api/v1/payments/booking-verify`
* **Auth:** Public

**Request Body:**
```json
{
  "bookingId": "68be9c2f...",
  "paymentId": "pay_mock_123456",
  "signature": "mock_signature"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "_id": "68be9c2f...",
      "name": "Rohan Gupta",
      "email": "rohan@example.com",
      "amount": 999,
      "currency": "INR",
      "paymentStatus": "PAID",
      "status": "CONFIRMED"
    }
  }
}
```

#### 11.5 Refund Order
* **Method:** `POST`
* **Route:** `/api/v1/admin/orders/:id/refund`
* **Auth:** Super Admin only

---

### 12. Admin Analytics Dashboard & Audit Logs

#### 12.1 Analytics KPI Metrics
* **Method:** `GET`
* **Route:** `/api/v1/admin/dashboard`
* **Auth:** Admin / Super Admin

**Response Data Summary:**
* Total Revenue & Paid Orders count
* Total Active Leads & Conversion Rate
* Confirmed Strategy Call Bookings
* Published Services & Creator Roster statistics

#### 12.2 Activity Audit Logs
* **Method:** `GET`
* **Route:** `/api/v1/admin/audit-logs`
* **Auth:** Super Admin

**Response:**
Chronological event log containing `actorUserId`, `action`, `resourceType`, `ipAddress`, `userAgent`, `timestamp`.

---

### 13. Partner Referral Tracking & Isolated Partner Portal

#### 13.1 Create Partner Account (Admin Only)
* **Method:** `POST`
* **Route:** `/api/v1/admin/partners`
* **Auth:** Admin / Super Admin
* **Description:** Manually provisions a partner user account (password hashed with bcrypt 12 rounds) and initial resource referral link.

**Request Body:**
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "password": "AmanSecretPassword123",
  "phone": "+919876543210",
  "initialCode": "AMAN123",
  "resourceId": "6a8ec60c9d444f368a9a8ff4",
  "notes": "Instagram growth creator partner"
}
```

#### 13.2 List All Partners (Admin Only)
* **Method:** `GET`
* **Route:** `/api/v1/admin/partners`
* **Auth:** Admin / Super Admin
* **Response:** Array of partners with aggregated links, clicks, verified sales, and total revenue.

#### 13.3 Add Resource Referral Link to Partner (Admin Only)
* **Method:** `POST`
* **Route:** `/api/v1/admin/partners/:id/links`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "code": "AMAN456",
  "resourceId": "6a8ec60c9d444f368a9a8ff5"
}
```

#### 13.4 Enable / Disable Partner (Admin Only)
* **Method:** `PATCH`
* **Route:** `/api/v1/admin/partners/:id/status`
* **Auth:** Admin / Super Admin

**Request Body:**
```json
{
  "status": "DISABLED"
}
```

#### 13.5 Partner Self Dashboard (Partner Only)
* **Method:** `GET`
* **Route:** `/api/v1/partner/dashboard`
* **Auth:** Authenticated Partner (`PARTNER` role required, strictly scoped to `req.user.userId`)
* **Response:** Partner's own metrics (Total Clicks, Unique Visitors, Resource Views, Verified Purchases, Total Revenue, Conversion Rate) and assigned referral links.

#### 13.6 Partner Self Attributed Leads & Orders (Partner Only)
* **Method:** `GET`
* **Route:** `/api/v1/partner/leads`
* **Auth:** Authenticated Partner (`PARTNER` role required)
* **Response:** Live list of verified orders with masked customer privacy (`Rahul V****`, `r***@gmail.com`, item title, amount, and timestamp).

#### 13.7 Public Referral Click Tracking
* **Method:** `POST`
* **Route:** `/api/v1/referrals/track`
* **Auth:** Public
* **Request Body:**
```json
{
  "code": "AMAN123",
  "landingPath": "/resources/instagram-growth-guide",
  "visitorId": "vis_8f4a1c29"
}
```

---

## 8. Multi-Scenario Error Handling & Edge Cases

### Scenario A: Duplicate Registration Attempt
* **Trigger:** Calling `POST /api/v1/auth/register` with an already registered email address.
* **HTTP Response:** `409 Conflict`
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "User with this email is already registered. Please login instead."
  }
}
```

### Scenario B: Expired Access Token
* **Trigger:** Calling protected Admin API after token expiration.
* **HTTP Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid access token."
  }
}
```
* **Resolution:** Client calls `POST /api/v1/auth/refresh` to get a fresh token silently.

### Scenario C: Role Privilege Escalation Blocked
* **Trigger:** Standard user (`USER` role) calling Super Admin endpoint `/api/v1/admin/users`.
* **HTTP Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": {
    "code": "AUTHORIZATION_ERROR",
    "message": "Forbidden: You do not have permission to access this resource."
  }
}
```

### Scenario D: Missing / Malformed Body Validation Error
* **Trigger:** Calling `POST /api/v1/auth/register` with password shorter than 6 characters or missing email.
* **HTTP Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "body.password",
        "message": "Password must be at least 6 characters"
      }
    ]
  }
}
```

### Scenario E: Rate Limiting Block
* **Trigger:** More than 20 login/register requests in 15 minutes from the same IP.
* **HTTP Response:** `429 Too Many Requests`
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests from this IP, please try again after 15 minutes."
  }
}
```

### Scenario F: External Notification Webhook Failures (Discord / Slack / Telegram)
* **Architecture:** When lead capture or booking events are triggered, webhook dispatches are wrapped in non-blocking background workers (`try/catch`).
* **Behavior:** If Discord/Slack webhook is offline or returns `500/503`, the database record is **successfully saved (`201 Created`)** and an error log is generated without breaking the user experience.

---

## 10. Leads & Creator Applications Pipeline (`/api/v1/leads`)

### A. Submit Creator Application / Inbound Lead
* **Endpoint:** `POST /api/v1/leads`
* **Access:** Public (Rate Limited)
* **Request Body:**
```json
{
  "name": "Aryan Sharma",
  "email": "aryan@example.com",
  "phone": "+91 98765 43210",
  "platform": "Instagram",
  "socialLink": "https://instagram.com/aryan.growth",
  "followerCount": "50K - 150K",
  "leadType": "CREATOR_APPLICATION",
  "service": "Creator Collaboration (Instagram)",
  "message": "Platform: Instagram | Link: https://instagram.com/aryan.growth | Followers: 50K - 150K"
}
```
* **Success Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "_id": "66ce8f91a2b3c4d5e6f7a8b9",
    "name": "Aryan Sharma",
    "email": "aryan@example.com",
    "phone": "+91 98765 43210",
    "platform": "Instagram",
    "socialLink": "https://instagram.com/aryan.growth",
    "followerCount": "50K - 150K",
    "leadType": "CREATOR_APPLICATION",
    "status": "NEW",
    "createdAt": "2026-08-29T12:00:00.000Z"
  }
}
```

### B. Admin List All Leads / Creator Applications
* **Endpoint:** `GET /api/v1/admin/leads?status=NEW`
* **Access:** Protected (`Bearer JWT` + Super Admin / Admin)
* **Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "leads": [ ... ],
    "pagination": { "page": 1, "limit": 20, "total": 1, "pages": 1 }
  }
}
```

### C. Admin Update Application Status
* **Endpoint:** `PATCH /api/v1/admin/leads/:id/status`
* **Access:** Protected (`Bearer JWT` + Super Admin / Admin)
* **Request Body:**
```json
{
  "status": "QUALIFIED"
}
```
* **Status Enum Values:** `NEW`, `CONTACTED`, `QUALIFIED`, `PROPOSAL_SENT`, `WON`, `LOST`

---

## 13. Media & Deliverables Upload

### A. Upload Media & Resource Deliverables
* **Endpoints:** 
  * `POST /api/v1/admin/media/upload` (Primary)
  * `POST /api/v1/media/upload` (Public/Admin Alias)
* **Access:** Protected (`Bearer JWT` + Super Admin / Admin)
* **Content-Type:** `multipart/form-data`
* **Parameters:** `file` (Binary File: JPEG, PNG, WebP, AVIF, SVG, PDF, ZIP, MP4; Max size: 50MB)
* **Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": "66ce8f91a2b3c4d5e6f7a8b9",
    "url": "/uploads/file-1725712345-123456.pdf",
    "fileName": "file-1725712345-123456.pdf",
    "originalName": "viral-hooks.pdf",
    "mimeType": "application/pdf",
    "fileSize": 1048576
  }
}
```
* **Static File Access:** `GET /uploads/:filename`

---

## 14. Orders & Transactions Management

### A. List All Orders (Admin)
* **Endpoints:** 
  * `GET /api/v1/admin/orders` (Primary)
  * `GET /api/v1/orders` (Alias)
* **Access:** Protected (`Bearer JWT` + Super Admin / Admin)
* **Query Parameters:** `page`, `limit`, `status` (`CREATED`, `PENDING`, `PAID`, `FULFILLED`, `REFUNDED`, `FAILED`)
* **Success Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "_id": "6a9ec56e535348fc183b952e",
      "userName": "Raghunath Chauhan",
      "userEmail": "raghunath25122002@gmail.com",
      "userPhone": "9369348311",
      "amount": 1,
      "currency": "INR",
      "provider": "razorpay",
      "status": "PAID",
      "providerOrderId": "order_TZAsXT8DFvL011",
      "providerPaymentId": "pay_TZAsdZ0m5Ezsa6"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "pages": 1 }
}
```

### B. Refund Order (Super Admin)
* **Endpoints:**
  * `POST /api/v1/admin/orders/:id/refund`
  * `POST /api/v1/orders/:id/refund`
* **Access:** Protected (`Bearer JWT` + Super Admin)
* **Success Response (`200 OK`):** Status transitions to `REFUNDED`.

---
*AlgoGrowthHub Backend API Suite is verified, fully tested, and ready for production consumption.*


