# AlgoGrowthHub — Referral Tracking System PRD

**Version:** 1.0  
**Product:** AlgoGrowthHub  
**Stack:** MERN + TypeScript  
**Scope:** Existing AlgoGrowthHub website + existing Admin/CMS + Resources + Orders + Payments

## 1. Executive Summary

AlgoGrowthHub will add a lightweight, Admin-controlled Referral Tracking System.

The goal is simple:

> Admin creates a referral link for a person such as Aman, gives the link to Aman, and the system automatically tracks how many visitors came through that link and how many verified purchases were generated.

Example:

`https://www.algogrowthhub.com/?ref=AMAN`

Admin can see:

- total referral partners
- total clicks
- unique visitors
- resource views
- purchases
- revenue generated
- conversion rate
- date-wise performance
- resource-wise performance

This is **not a full public affiliate marketplace in V1**.

V1 has:
- no public affiliate registration
- no affiliate login
- no affiliate dashboard
- no commission/payout system
- no public referral management

Everything is controlled from the **Admin Dashboard**.

The architecture must remain extensible so commission/payout functionality can be added later without redesigning the database or order flow.

---

## 2. Existing AlgoGrowthHub Context

This feature extends the existing AlgoGrowthHub product.

The existing system contains:

- public landing page
- Resources
- free/premium resources
- PDF, ZIP and MP4 resource support
- Buy Now/payment flow
- server-side payment verification
- protected premium downloads
- Admin/CMS
- Orders
- Bookings
- Leads
- Creators
- Expert Team
- Client Results
- Media
- Site Settings

The referral system must integrate with these existing systems rather than creating duplicates.

The existing light/soft visual theme, typography, spacing, cards and responsive behavior must remain consistent.

---

# 3. Product Goal

The Admin creates a unique referral identity and link.

Example:

```text
Name: Aman
Code: AMAN

Generated Link:
https://www.algogrowthhub.com/?ref=AMAN
```

After the link is shared:

```text
Aman Referral Link
        ↓
Visitor clicks
        ↓
AlgoGrowthHub opens
        ↓
Referral is recorded
        ↓
Visitor browses
        ↓
Visitor may purchase
        ↓
Verified order is associated with Aman
        ↓
Admin sees analytics
```

---

# 4. Non-Goals for V1

Do NOT implement initially:

- public affiliate signup
- affiliate login
- affiliate dashboard
- commission calculation UI
- payout processing
- bank account collection
- tax/KYC collection
- affiliate marketplace
- affiliate chat
- affiliate messaging
- multi-level referrals
- MLM functionality
- public affiliate leaderboard

These can be future modules.

---

# 5. Roles

## SUPER_ADMIN
Full referral access:
- create/edit referrals
- enable/disable/archive
- generate links
- view analytics
- view clicks
- view purchases
- view revenue
- view resource performance

## ADMIN
Can:
- create/manage referrals
- view analytics
- view referral-linked orders

Cannot modify system security or elevate privileges.

## EDITOR
Default: no referral management.

Optional permission:
`referrals.view`

---

# 6. Admin Navigation

Add Referrals under Business:

```text
Admin
├── Dashboard
├── Content
│   ├── Hero
│   ├── About
│   ├── Services
│   ├── Why Choose Us
│   ├── Creators
│   ├── Expert Team
│   ├── Client Results
│   └── Resources
├── Business
│   ├── Leads
│   ├── Bookings
│   ├── Orders
│   └── Referrals       ← NEW
├── Media
└── System
    ├── Site Settings
    ├── Users
    └── Roles / Permissions
```

---

# 7. Referral Overview

Route:

`/admin/referrals`

Page title:

**Referral Tracking**

Primary action:

**+ Create Referral**

Summary cards:

```text
Total Referrals
Active Referrals
Total Clicks
Unique Visitors
Total Purchases
Revenue Generated
```

Referral table:

| Name | Code | Status | Clicks | Unique Visitors | Purchases | Revenue | Conversion | Created | Actions |
|---|---|---|---:|---:|---:|---:|---:|---|---|
| Aman | AMAN | Active | 1,248 | 986 | 47 | ₹23,500 | 4.77% | 07 Sep 2026 | View / Edit / Disable |

Actions:
- View Analytics
- Copy Link
- Edit
- Disable
- Archive

Use confirmation dialogs for destructive actions.

---

# 8. Create Referral

Route:

`/admin/referrals/new`

Fields:

### Required
- Name
- Referral Code
- Status

### Optional
- Email
- Phone/WhatsApp
- Notes
- Internal label

Example:

```text
Create Referral

Name
[Aman]

Referral Code
[AMAN]

Status
[Active]

Notes
[Instagram creator]

[Generate Referral]
```

After creation:

```text
Referral Created Successfully

Aman

Referral Link:
https://www.algogrowthhub.com/?ref=AMAN

[Copy Link]
[Generate Resource Link]
```

---

# 9. Referral Code Rules

Codes must:
- be unique
- be case-insensitive
- contain safe characters
- support letters/numbers
- optionally support hyphens/underscores
- have a reasonable maximum length

Examples:

```text
AMAN
AMAN01
AMAN-01
AGH-AMAN
```

Do not allow unsafe input, spaces or duplicates.

Normalize codes to uppercase internally.

---

# 10. Referral Link Types

## General

`https://www.algogrowthhub.com/?ref=AMAN`

Tracks users entering the website through Aman.

## Resource-specific

`https://www.algogrowthhub.com/resources/instagram-growth-guide?ref=AMAN`

Admin can select:

```text
Referral: Aman
Resource: Instagram Growth Guide
[Generate Link]
```

The resulting URL is copyable.

---

# 11. Public Website Behavior

The public website must look the same.

When URL contains:

`?ref=AMAN`

frontend:

```text
Read ref
 ↓
Validate referral
 ↓
Track click/session
 ↓
Store attribution
 ↓
Continue normal browsing
```

No tracking page or disruptive popup.

If tracking fails, the public website continues normally.

---

# 12. Attribution

Recommended V1 attribution window:

**30 days**

Recommended model:

**Last valid referral click wins.**

Example:

```text
Day 1
User clicks AMAN

↓
Attribution = AMAN

Day 3
User visits directly

↓
Purchases

↓
Order attributed to AMAN
```

If the user later clicks another valid referral link, the latest valid referral replaces the previous one.

---

# 13. Click Tracking

Track:

- referral ID
- referral code
- timestamp
- anonymous visitor/session ID
- landing path
- resource ID when applicable
- UTM source
- UTM medium
- UTM campaign
- device category
- referrer where safely available

Avoid unnecessary personal data.

Do not treat IP address alone as a unique visitor identity.

---

# 14. Unique Visitors

Clicks and unique visitors are different.

Example:

```text
Same visitor clicks Aman link 5 times

Clicks = 5
Unique Visitors = 1
```

Use a first-party anonymous visitor/session identifier.

Do not claim exact human identity.

---

# 15. Resource Views

When a referral-attributed visitor opens a resource, record:

- referral
- resource
- timestamp
- anonymous visitor/session

This enables resource-wise analytics.

---

# 16. Purchase Attribution

Existing premium flow:

```text
Premium Resource
 ↓
Buy Now
 ↓
Checkout
 ↓
Payment
 ↓
Server-side verification
 ↓
Purchase recorded
 ↓
Protected access
 ↓
Download
```

Referral integration:

```text
Checkout
 ↓
Referral attribution available
 ↓
Order created with referralId
 ↓
Payment verified
 ↓
Order = PAID
 ↓
Referral analytics updated
```

**Never trust frontend payment success as proof of payment.**

Only verified backend payment/webhook results can count as a confirmed purchase.

---

# 17. Order Model Extension

Extend the existing Order model:

```ts
referralId?: ObjectId;
referralCode?: string;
```

Optional attribution snapshot:

```ts
referralSnapshot?: {
  code: string;
  name: string;
}
```

Recommended:

```text
Order
├── userId
├── resourceId
├── amount
├── currency
├── provider
├── providerOrderId
├── providerPaymentId
├── status
├── referralId
├── referralCode
├── createdAt
└── updatedAt
```

Orders remain the source of truth for purchases.

---

# 18. Referral Model

```ts
{
  _id: ObjectId,
  name: string,
  code: string,
  status: "ACTIVE" | "DISABLED" | "ARCHIVED",
  email?: string,
  phone?: string,
  notes?: string,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

Indexes:

```text
code UNIQUE
status
createdAt
```

---

# 19. Referral Click Model

```ts
{
  _id: ObjectId,
  referralId: ObjectId,
  referralCode: string,
  visitorId?: string,
  sessionId?: string,
  landingPath?: string,
  resourceId?: ObjectId,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string,
  deviceType?: "mobile" | "tablet" | "desktop" | "unknown",
  referrer?: string,
  createdAt: Date
}
```

Indexes:

```text
referralId + createdAt
visitorId + createdAt
resourceId + createdAt
```

---

# 20. Analytics Event Model

Recommended scalable event structure:

```ts
{
  eventType: "RESOURCE_VIEW",
  referralId?: ObjectId,
  resourceId: ObjectId,
  visitorId?: string,
  sessionId?: string,
  createdAt: Date
}
```

Keep the first version simple; use aggregation pipelines and indexes.

---

# 21. Analytics Calculations

```text
Total Referrals
= count referrals

Total Clicks
= count valid referral click events

Unique Visitors
= distinct anonymous visitor IDs

Purchases
= verified PAID orders containing referral attribution

Revenue
= sum of verified PAID order amounts

Conversion Rate
= purchases / unique visitors × 100
```

Refunded orders must be handled according to the revenue rule below.

---

# 22. Referral Detail Page

Route:

`/admin/referrals/:id`

Display:

```text
Aman
AMAN
Active

Referral Link:
https://www.algogrowthhub.com/?ref=AMAN

[Copy Link] [Disable]
```

Metrics:

```text
Total Clicks
Unique Visitors
Resource Views
Purchases
Revenue
Conversion Rate
```

Date filters:

```text
Today
7 Days
30 Days
This Month
Custom Range
All Time
```

---

# 23. Date-Wise Analytics

Display:

- clicks
- purchases
- revenue

Example:

| Date | Clicks | Purchases | Revenue |
|---|---:|---:|---:|
| 07 Sep | 120 | 4 | ₹1,996 |
| 06 Sep | 84 | 3 | ₹1,497 |
| 05 Sep | 102 | 5 | ₹2,495 |

Charts must be responsive.

---

# 24. Resource-Wise Analytics

Example:

| Resource | Clicks | Views | Sales | Revenue |
|---|---:|---:|---:|---:|
| Instagram Growth Guide | 420 | 310 | 18 | ₹8,982 |
| Reels Masterclass | 312 | 205 | 15 | ₹7,485 |
| Creator Toolkit | 198 | 142 | 14 | ₹7,033 |

This tells Admin which resources perform best for each referral.

---

# 25. Link Management

Admin can:

- copy general referral link
- generate resource-specific link
- copy resource link
- disable referral
- re-enable referral
- archive referral

Disabled behavior:

```text
Old link clicked
 ↓
Referral disabled
 ↓
Do not attribute new traffic
 ↓
Website continues normally
```

Do not break the website because a referral is disabled.

---

# 26. Backend API

Base:

`/api/v1`

Admin:

```http
POST   /admin/referrals
GET    /admin/referrals
GET    /admin/referrals/:id
PATCH  /admin/referrals/:id
DELETE /admin/referrals/:id

GET    /admin/referrals/:id/analytics
GET    /admin/referrals/:id/clicks
GET    /admin/referrals/:id/orders
GET    /admin/referrals/:id/resources
```

Public/internal tracking:

```http
GET  /referrals/validate/:code
POST /referrals/track
```

The implementation may use page-load integration instead of exposing unnecessary endpoints.

---

# 27. Validation

Use Zod.

Schemas:

```text
createReferralSchema
updateReferralSchema
referralCodeSchema
analyticsQuerySchema
```

Validate server-side:
- name
- code
- status
- dates
- pagination
- resource ID
- filters

---

# 28. API Response Contract

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid referral code"
  }
}
```

Never expose stack traces, secrets or internal details.

---

# 29. Error Codes

Referral-specific:

```text
REFERRAL_NOT_FOUND
REFERRAL_CODE_EXISTS
REFERRAL_DISABLED
INVALID_REFERRAL_CODE
REFERRAL_TRACKING_ERROR
REFERRAL_ANALYTICS_ERROR
```

Existing common error system remains in use.

---

# 30. Security

Admin referral APIs require authentication and authorization:

```text
Authentication
 ↓
Role Check
 ↓
Permission Check
 ↓
Referral Access
```

Suggested permissions:

```text
referrals.view
referrals.manage
referrals.analytics
```

Public tracking:
- rate limiting
- payload validation
- referral code validation
- basic bot/spam filtering
- no unnecessary sensitive data collection

---

# 31. Fraud / Abuse Protection

Basic V1 protections:

- server-side payment verification
- duplicate event protection where practical
- rate limits
- valid referral lookup
- disabled referral rejection
- unique order IDs
- payment webhook verification

Do not use aggressive fingerprinting.

---

# 32. Bot Handling

Basic suspicious-event detection may flag:

```text
VALID
SUSPECTED
```

Examples:
- extremely high request frequency
- malformed user agents
- repeated automated requests
- invalid referral codes

Do not automatically claim that every suspicious click is fraud.

---

# 33. Frontend Architecture

Add:

```text
src/
└── features/
    └── referrals/
        ├── api/
        ├── components/
        ├── hooks/
        ├── pages/
        ├── schemas/
        ├── types/
        └── utils/
```

Pages:

```text
ReferralListPage
CreateReferralPage
EditReferralPage
ReferralDetailsPage
```

Components:

```text
ReferralStatsCards
ReferralTable
CreateReferralForm
ReferralLinkBox
ReferralAnalyticsChart
ReferralResourceTable
ReferralDateFilter
DisableReferralDialog
```

---

# 34. Frontend State

Use existing project conventions:

- TanStack Query
- React Hook Form
- Zod
- Axios typed API client

Do not add another state library unnecessarily.

---

# 35. Public Referral Hook

Create:

```text
useReferralAttribution()
```

Responsibilities:

```text
read ?ref=
 ↓
normalize code
 ↓
validate code
 ↓
save attribution
 ↓
send tracking event
```

Tracking must not block rendering.

If tracking fails:

```text
Website continues normally.
```

---

# 36. Checkout Integration

When a visitor attributed to Aman reaches checkout:

```text
referralId = AMAN referral ObjectId
```

Carry it server-side into order creation.

Never allow the client to arbitrarily assign a referral to another person without server validation.

The backend must verify:
- referral exists
- referral is active
- attribution is valid
- attribution is within the 30-day window

---

# 37. Payment Integration

Existing payment architecture must be reused.

```text
Checkout
 ↓
Order Created
 ↓
Payment
 ↓
Webhook / Server Verification
 ↓
Order PAID
 ↓
Referral Purchase Count
```

If payment fails/cancels:

```text
Do not count as purchase.
```

If payment is refunded:

```text
Do not keep refunded amount in valid referral revenue.
```

---

# 38. Revenue Rule

Recommended V1:

**Verified paid revenue excluding refunded orders.**

Example:

```text
Aman sales:
10 × ₹499 = ₹4,990

One order refunded:
₹499

Valid referral revenue:
₹4,491
```

Avoid double counting webhook retries.

---

# 39. Admin Dashboard Summary

Main Admin Dashboard may show:

```text
Referral Performance

Active Referrals      24
Clicks             18,492
Purchases             624
Revenue          ₹3,42,500

[View Referrals →]
```

Detailed analytics remain at:

`Business → Referrals`

---

# 40. Search & Filters

Referral list:

- search by name
- search by code
- filter status
- date range
- sort clicks
- sort purchases
- sort revenue

Use server-side pagination.

---

# 41. Pagination

Referral list:

```text
20 / 50 / 100 per page
```

Click/event data must use server-side pagination.

Never load all events into the browser.

---

# 42. Optional CSV Export

Recommended V1.1:

```text
Name
Code
Clicks
Unique Visitors
Purchases
Revenue
Conversion
```

Generate exports server-side with authorization.

---

# 43. Admin UX

Follow existing AlgoGrowthHub Admin visual language:

- clean cards
- light background
- existing brand colors
- consistent typography
- responsive tables
- mobile-friendly filters
- loading skeletons
- empty states
- error states
- success toast
- confirmation dialogs

Do not create an unrelated affiliate product UI.

---

# 44. Empty States

No referrals:

```text
No referrals yet

Create your first referral link and start tracking visitors.

[+ Create Referral]
```

No clicks:

```text
No traffic recorded yet.

Share this referral link to start tracking.
```

No sales:

```text
No purchases attributed yet.
```

---

# 45. Loading States

Provide:
- skeleton cards
- table skeleton
- button loading state
- chart loading state

Prevent duplicate submissions.

---

# 46. Database Relationships

```text
Referral
   │
   ├── ReferralClicks
   ├── ResourceViews
   └── Orders
          │
          └── Resource
```

Relationships:

```text
Referral 1 ──── * Clicks
Referral 1 ──── * Orders
Referral 1 ──── * ResourceViews
Resource 1 ──── * Orders
```

---

# 47. Audit Logging

Log Admin actions:

```text
CREATE_REFERRAL
UPDATE_REFERRAL
DISABLE_REFERRAL
ENABLE_REFERRAL
ARCHIVE_REFERRAL
GENERATE_RESOURCE_LINK
```

Store:

```text
actorId
action
targetId
timestamp
metadata
```

Never store secrets.

---

# 48. Status Lifecycle

```text
ACTIVE
  ↓
DISABLED
  ↓
ACTIVE
```

or:

```text
ACTIVE
  ↓
ARCHIVED
```

Archived referrals cannot receive new attribution.

Invalid transitions must be rejected server-side.

---

# 49. Direct Purchases

If visitor arrives without a valid referral:

```text
referralId = null
```

Purchase remains a normal direct sale.

Admin can distinguish:

```text
Total Revenue
Referral Revenue
Direct/Other Revenue
```

---

# 50. Multi-Referral Example

User clicks:

```text
AMAN
```

Later clicks:

```text
RAHUL
```

Recommended last-valid-click rule:

```text
Attribution = RAHUL
```

A subsequent purchase within the attribution window belongs to RAHUL.

---

# 51. Example End-to-End Flow

```text
ADMIN
 ↓
Create "Aman"
 ↓
Code = AMAN
 ↓
Generate Link
 ↓
Give Link to Aman
 ↓
Aman Shares Link
 ↓
Visitor Opens Website
 ↓
Click Recorded
 ↓
Referral Attribution Saved
 ↓
Visitor Opens Resource
 ↓
Resource View Recorded
 ↓
Visitor Purchases
 ↓
Payment Verified
 ↓
Order = PAID
 ↓
Order.referralId = Aman
 ↓
Analytics Updated
 ↓
Admin Dashboard
```

---

# 52. Example Analytics

For Aman:

```text
AMAN
Active

Clicks             1,248
Unique Visitors      986
Resource Views       721
Purchases             47
Revenue            ₹23,500
Conversion           4.77%
```

Resource breakdown:

```text
Instagram Guide       420 clicks   18 sales   ₹8,982
Reels Masterclass     312 clicks   15 sales   ₹7,485
Creator Toolkit       198 clicks   14 sales   ₹7,033
```

---

# 53. Future Commission Support

V1 does not calculate commission.

Keep architecture extensible for:

```text
commissionEnabled
commissionType
commissionValue
```

Future flow:

```text
Verified Sale
 ↓
Commission
 ↓
Pending
 ↓
Approved
 ↓
Paid
```

Do not build payouts in V1.

---

# 54. Testing Strategy

## Unit Tests
- code normalization
- unique code validation
- attribution window
- referral status
- conversion calculation
- revenue calculation
- date filters
- refund handling

## Integration Tests

```text
Create referral
 ↓
Generate link
 ↓
Track click
 ↓
Create order
 ↓
Verify payment
 ↓
Attribute order
 ↓
Analytics
```

## Frontend Tests
- create form
- validation
- copy link
- disable referral
- analytics filters
- empty states
- errors

## E2E

```text
Admin Login
 ↓
Create Aman
 ↓
Copy referral link
 ↓
Open public site with ?ref=AMAN
 ↓
Open resource
 ↓
Complete test purchase
 ↓
Verify payment
 ↓
Open Admin Referrals
 ↓
Aman shows click + purchase + revenue
```

---

# 55. Acceptance Criteria

## Admin
- [ ] Create referral
- [ ] Unique code validation
- [ ] Copy referral link
- [ ] Generate resource-specific link
- [ ] Disable/re-enable referral
- [ ] Archive referral
- [ ] View analytics
- [ ] Filter analytics
- [ ] View resource performance
- [ ] View attributed orders

## Public
- [ ] `?ref=AMAN` detected
- [ ] normal website remains unchanged
- [ ] click tracked
- [ ] attribution stored
- [ ] tracking failure does not break website

## Orders
- [ ] referral carried to order
- [ ] only verified payments count
- [ ] failed payments do not count
- [ ] cancelled payments do not count
- [ ] refunds handled correctly

## Security
- [ ] Admin APIs protected
- [ ] permissions enforced
- [ ] tracking rate-limited
- [ ] invalid codes rejected
- [ ] no unnecessary sensitive data
- [ ] frontend payment success never trusted

---

# 56. Implementation Order

1. Inspect existing frontend.
2. Inspect existing backend.
3. Inspect Resource model.
4. Inspect Order model.
5. Inspect payment verification/webhooks.
6. Inspect Admin authentication/permissions.
7. Add Referral model.
8. Add Referral Click/Event model.
9. Extend Order with referral attribution.
10. Build referral service.
11. Build referral APIs.
12. Build referral attribution utility.
13. Add public tracking.
14. Integrate attribution with checkout.
15. Integrate verified payment flow.
16. Build Admin referral list.
17. Build Create/Edit/Disable/Archive.
18. Build analytics.
19. Build resource-wise analytics.
20. Add audit logs.
21. Add tests.
22. Run security checks.
23. Run performance checks.
24. Run E2E flow.
25. Deploy and verify production.

---

# 57. Technical Rules

- Use existing MERN + TypeScript architecture.
- Use MongoDB/Mongoose.
- Use existing Express API conventions.
- Use strict TypeScript.
- Use Zod.
- Use TanStack Query.
- Use React Hook Form.
- Use Axios typed API client.
- Reuse existing authentication/authorization.
- Reuse existing order/payment systems.
- Do not expose payment secrets.
- Do not expose premium resource URLs.
- Do not break existing resources.
- Do not unnecessarily change the public visual design.

---

# 58. Performance

For moderate traffic:
- indexed MongoDB aggregation is acceptable.

For higher traffic:
- introduce daily analytics aggregates.

Future:

```text
Referral Events
      ↓
Daily Aggregation
      ↓
Analytics Dashboard
```

Do not run expensive unindexed scans for every dashboard request.

---

# 59. Final Product Definition

AlgoGrowthHub Referral Tracking System is an **Admin-controlled referral attribution layer**.

The core experience:

```text
ADMIN
 ↓
Create Aman
 ↓
Generate Link
 ↓
Give Link to Aman
 ↓
Aman Shares Link
 ↓
Visitors Arrive
 ↓
System Tracks Traffic
 ↓
Visitors Browse Resources
 ↓
Verified Purchases
 ↓
Orders Store Referral Attribution
 ↓
Admin Dashboard Shows:

Clicks
Unique Visitors
Resource Views
Purchases
Revenue
Conversion Rate
```

The system must remain simple for Admin while being technically robust and future-proof.

The first version solves exactly one business problem:

> **“I give Aman a link. I want to know how much traffic and how many verified sales came through Aman.”**

---

# 60. Final Developer Instruction

Before coding:

1. Inspect the existing AlgoGrowthHub frontend.
2. Inspect the existing backend.
3. Inspect current MongoDB schemas.
4. Inspect Resources.
5. Inspect Orders.
6. Inspect payment provider implementation.
7. Inspect Admin authentication and permissions.
8. Reuse existing architecture wherever possible.
9. Do not create duplicate systems.
10. Implement referral tracking as an integrated module.

Final implementation:

```text
Existing AlgoGrowthHub
        +
Referral Module
        +
Click Tracking
        +
30-Day Attribution
        +
Order Attribution
        +
Verified Purchase Tracking
        +
Admin Analytics
```

The final implementation must be production-ready, secure, responsive, tested, maintainable and compatible with the existing AlgoGrowthHub application.

**End of PRD**
