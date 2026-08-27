**# AlgoGrowthHub — Master Full-Stack Build PRD**

**\*\*Production-Grade Full-Stack Social Media Agency Website\*\***

\---

**## Table of Contents**

1\. [Source-of-Truth Hierarchy]\(#1-source-of-truth-hierarchy)

2\. [Brand]\(#2-brand)

3\. [Non-Negotiable Visual Reference Rule]\(#3-non-negotiable-visual-reference-rule)

4\. [Color/Theme Lock]\(#4-colortheme-lock)

5\. [Typography Lock]\(#5-typography-lock)

6\. [Homepage Final Section Order]\(#6-homepage-final-section-order)

7\. [Section 01 — Navbar + Hero]\(#7-section-01--navbar--hero)

8\. [Section 02 — About]\(#8-section-02--about--transforming-business-through-social-media)

9\. [Section 03 — Services Grid]\(#9-section-03--who-we-are-what-we-do--power-services)

10\. [Section 04 — Why Choose Us]\(#10-section-04--why-choose-us--your-success-our-priority)

11\. [Section 05 — Creator Community]\(#11-section-05--creator-community)

12\. [Section 06 — Expert Team]\(#12-section-06--meet-our-expert-team)

13\. [Creators vs Expert Team Distinction]\(#13-important-distinction--creators-vs-expert-team)

14\. [Section 07 — Client Results]\(#14-section-07--client-results--reviews)

15\. [Section 08 — Resources]\(#15-section-08--resources)

16\. [Free Resource Flow]\(#16-free-resource-flow)

17\. [Premium Resource Flow]\(#17-premium-resource-flow)

18\. [Payment System]\(#18-payment-system)

19\. [Section 09 — Book a Call Session]\(#19-section-09--book-a-call-session)

20\. [Section 10 — Let's Work With Us]\(#20-section-10--lets-work-with-us)

21\. [Section 11 — Footer]\(#21-section-11--footer)

22\. [Admin/CMS]\(#22-admin--cms)

23\. [Admin — Hero]\(#23-admin--hero)

24\. [Admin — About]\(#24-admin--about)

25\. [Admin — Services]\(#25-admin--services)

26\. [Admin — Why Choose Us]\(#26-admin--why-choose-us)

27\. [Admin — Creators]\(#27-admin--creators)

28\. [Admin — Expert Team]\(#28-admin--expert-team)

29\. [Admin — Client Results]\(#29-admin--client-results)

30\. [Admin — Resources]\(#30-admin--resources)

31\. [Admin — Booking]\(#31-admin--booking)

32\. [Admin — Footer]\(#32-admin--footer)

33\. [Media Management]\(#33-media-management)

34\. [Image Consistency Rule]\(#34-image-consistency-rule)

35\. [Backend Modules]\(#35-backend-modules)

36\. [Backend Module Structure]\(#36-backend-module-structure)

37\. [API Resources]\(#37-api-resources)

38\. [Data Models]\(#38-data-models)

39\. [Authentication & Authorization]\(#39-authentication--authorization)

40\. [Security]\(#40-security)

41\. [Frontend Stack]\(#41-frontend-stack)

42\. [Frontend Component Architecture]\(#42-frontend-component-architecture)

43\. [Routes]\(#43-routes)

44\. [Responsive Design]\(#44-responsive-design)

45\. [Carousel UX]\(#45-carousel-ux)

46\. [Animation]\(#46-animation)

47\. [SEO]\(#47-seo)

48\. [Accessibility]\(#48-accessibility)

49\. [Performance]\(#49-performance)

50\. [Admin Content vs Code-Controlled Layout]\(#50-admin-content-vs-code-controlled-layout)

51\. [Visual QA]\(#51-visual-qa)

52\. [Final Acceptance Checklist]\(#52-final-acceptance-checklist)

53\. [Implementation Order]\(#53-implementation-order)

54\. [Final Command]\(#54-final-command)

\---

**## 1. Source-of-Truth Hierarchy**

Follow these priorities:

\`\`\`text

1\. Supplied reference screenshots

2\. This master specification

3\. Existing MERN + TypeScript backend blueprint

4\. Existing API/security conventions

5\. Implementation details

\`\`\`

The reference screenshots control:

\- overall UI/UX

\- visual hierarchy

\- section order

\- section composition

\- grid structure

\- card arrangement

\- image proportions

\- spacing rhythm

\- background-color treatment

\- typography hierarchy

\- button styling

\- CTA placement

\- visual density

\- responsive behavior

This master prompt controls:

\- AlgoGrowthHub branding

\- requested section changes

\- Creator Community rules

\- Expert Team rules

\- Client Results

\- Resources

\- Booking

\- Admin/CMS

\- Media uploads

\- Payment flow

\- Footer

The backend blueprint controls:

\- authentication

\- authorization

\- MongoDB/Mongoose

\- validation

\- JWT

\- security middleware

\- environment handling

\- API conventions

\- error handling

\- logging

\- deployment architecture

DO NOT create a competing backend architecture.

\---

**## 2. Brand**

**### Agency Name**

**\*\*AlgoGrowthHub\*\***

**### Business**

Social Media / Digital Growth Agency

**### Main Business Pillars**

1\. Social Media Services

2\. Creator Community

3\. Expert Team

4\. Client Results

5\. Free + Premium Resources

6\. Strategy / Book a Call Session

**### Primary Conversion**

**\*\*Book a Call Session\*\***

\---

**## 3. Non-Negotiable Visual Reference Rule**

The supplied screenshots are not generic inspiration. They are the visual reference for the final implementation.

Preserve as closely as technically possible:

\- section ordering

\- section proportions

\- container width

\- spacing

\- card geometry

\- image placement

\- text/image relationships

\- background tones

\- white/off-white alternation

\- dark sections

\- typography hierarchy

\- button styling

\- borders

\- shadows

\- corner radii

\- visual density

\- responsive composition

DO NOT:

\- redesign the page

\- simplify complex sections

\- merge sections

\- remove sections

\- create a generic SaaS landing page

\- replace mixed grids with uniform cards

\- add unrelated gradients

\- add excessive glassmorphism

\- add random colors

\- add excessive 3D

\- add excessive animations

Use original AlgoGrowthHub branding, content and assets. Do NOT copy another site's logo, exact text, proprietary images, or branding.

\---

**## 4. Color/Theme Lock**

The exact visual color treatment of the supplied screenshots must be respected. The website uses different tonal sections.

Preserve:

\- clean white sections

\- slightly dim/off-white sections

\- dark sections

\- accent colors

\- CTA colors

\- border tones

\- text colors

\- card backgrounds

Do NOT flatten every section into one background color. Do NOT introduce a completely new palette.

Create centralized design tokens:

\`\`\`text

backgroundLight

backgroundSoft

backgroundDark

textPrimary

textSecondary

accent

border

cardBackground

shadow

\`\`\`

Tune the actual values against the supplied reference screenshots.

\---

**## 5. Typography Lock**

Typography must follow the reference's hierarchy.

Create centralized tokens for:

\`\`\`text

fontFamily

heroHeading

sectionHeading

cardHeading

bodyText

metadata

lineHeight

fontWeight

letterSpacing

\`\`\`

Maintain the same visual hierarchy between:

\- hero heading

\- section heading

\- card title

\- body

\- metadata

\- CTA text

Do not mix unrelated fonts.

\---

**## 6. Homepage Final Section Order**

The homepage must contain these sections in exactly this order:

\`\`\`text

01\. Navbar + Hero

02\. About / Transforming Business Through Social Media

03\. Who We Are, What We Do / Power Services

04\. Why Choose Us / Your Success, Our Priority

05\. Creator Community

06\. Meet Our Expert Team

07\. Client Results / Reviews

08\. Resources

09\. Book a Call Session

10\. Let's Work With Us

11\. Footer

\`\`\`

The new Expert Team section is intentionally added between Creator Community and Client Results. Do not reorder these sections.

\---

**## 7. Section 01 — Navbar + Hero**

**### Navbar**

Use a premium compact navigation.

Navigation items:

\`\`\`text

Home

About

Services

Work / Results

Creators

Our Team

Resources

Community

Book a Call Session

\`\`\`

**\*\*Desktop:\*\***

\- compact/sticky navbar

\- AlgoGrowthHub logo

\- clear active state

\- primary booking CTA

**\*\*Mobile:\*\***

\- logo

\- hamburger

\- compact Book a Call Session CTA

**### Hero**

Preserve the reference's hero structure:

\- large visual area

\- central/main image or composition

\- floating social icons

\- floating metric/analytics cards

\- layered visual elements

\- large heading

\- supporting description

\- primary CTA

\- secondary CTA

**#### Hero Image**

Hero image MUST be Admin/CMS uploadable.

Admin must be able to:

\- upload

\- replace

\- preview

\- remove

The layout/container must remain fixed. Admin image replacement must NOT change the hero composition.

**#### Hero CTA**

Primary: **\*\*Book a Call Session\*\***

Secondary: **\*\*Learn More\*\***

**#### CTA Behavior**

\`\`\`text

Book a Call Session → /book-session

Learn More → /about

\`\`\`

(or the About section anchor)

Hero heading and description must be CMS editable.

\---

**## 8. Section 02 — About / Transforming Business Through Social Media**

Preserve the reference's two-column composition.

\`\`\`text

IMAGE AREA | CONTENT AREA

\`\`\`

**\*\*Left:\*\***

\- image

\- image collage if reference uses multiple visual layers

\- fixed image placement

\- upload/replace support

**\*\*Right:\*\***

\- section label

\- heading

\- description

\- three feature points

\- metric

\- Learn More CTA

Suggested heading: **\*\*Transforming Business Through Social Media\*\***

The final content must be CMS-controlled. The image side must remain visually dominant and structurally similar to the reference.

\---

**## 9. Section 03 — Who We Are, What We Do / Power Services**

This is a highly important section. Preserve the reference's mixed 3×3 visual grid.

Required: **\*\*9 blocks total\*\***

Target pattern:

\`\`\`text

[ IMAGE ] [ TEXT ]  [ IMAGE ]

[ TEXT ]  [ IMAGE ] [ TEXT ]

[ IMAGE ] [ TEXT ]  [ IMAGE ]

\`\`\`

The final visual composition must follow the supplied screenshot. DO NOT make all 9 blocks identical.

**### Image Blocks**

Every image block must support:

\- Admin upload

\- Replace

\- Remove

\- Preview

\- Alt text

All service images must render inside fixed visual containers. If an uploaded source image has a different original aspect ratio, CSS must preserve the exact card/image geometry of the reference through controlled:

\- width

\- height

\- aspect ratio

\- object-fit

\- object-position

**### Text Blocks**

Each text block supports:

\- service title

\- short description

\- Read More CTA

\- route/URL

CTA: **\*\*Read More →\*\***

**### Services**

Suggested services:

1\. Social Media Management

2\. Content Strategy

3\. Instagram Growth

4\. Reels / Short-Form Content

5\. Brand Strategy

6\. Creator Marketing

7\. Community Growth

8\. Social Media Analytics

9\. Campaign Management

All services are CMS-driven.

Section CTA: **\*\*View All Services →\*\***

Routes:

\`\`\`text

/services

/services/\:slug

\`\`\`

\---

**## 10. Section 04 — Why Choose Us / Your Success, Our Priority**

Preserve the reference split layout.

**\*\*Left:\*\***

Section label: **\*\*Why Choose Us\*\***

Heading: **\*\*Your Success, Our Priority\*\***

Supporting content.

Only these four platform/result cards:

\`\`\`text

Facebook

Telegram

Instagram

LinkedIn

\`\`\`

Layout:

\`\`\`text

[ Facebook ] [ Telegram ]

[ Instagram ] [ LinkedIn ]

\`\`\`

No other platform cards.

Each platform card may contain:

\- platform name

\- icon

\- metric/value

\- supporting label

All values are CMS-controlled.

**\*\*Right:\*\***

Preserve the reference's image composition.

Provide Admin upload/replace support for:

\- primary image

\- optional secondary image if the reference composition requires it

Image containers must maintain fixed reference dimensions/aspect ratios.

\---

**## 11. Section 05 — Creator Community**

Preserve the visual structure of the reference's member/team-style cards while changing the business purpose to Creator Community.

**### HARD RULE**

Creators support **\*\*Instagram ONLY\*\***.

The Creator model must NOT contain:

\- YouTube

\- TikTok

\- Facebook

\- LinkedIn

\- X

\- website

\- any other creator social platform

**### Creator Fields**

\`\`\`text

id

name

profileImage

bio

niche

instagramUsername

instagramUrl

followerCount

isFeatured

order

isPublished

\`\`\`

**### Creator Card**

\`\`\`text

[Creator Image]

Creator Name

Niche

Follower Count

@InstagramUsername →

\`\`\`

The only external creator social CTA: **\*\*Instagram\*\***

Section CTA: **\*\*View All Creators →\*\***

Route: \`/creators\`

Creator image size must remain consistent across all cards. Admin controls all creator data.

\---

**## 12. Section 06 — Meet Our Expert Team**

This is a NEW dedicated section. Preserve the visual style of the member/team area in the reference screenshots.

Title: **\*\*Meet Our Expert Team\*\***

Subtitle can be CMS-controlled.

Use a consistent team-member card grid/row that visually follows the reference.

**### Card Structure**

Card must contain ONLY:

1\. Member image

2\. Member name

3\. What they do / designation

4\. Instagram link

5\. LinkedIn link

Example:

\`\`\`text

┌──────────────────────────┐

│                          │

│      TEAM IMAGE          │

│                          │

├──────────────────────────┤

│ Alex Buckmaster          │

│ Growth Strategist        │

│                          │

│ Instagram   LinkedIn    │

└──────────────────────────┘

\`\`\`

**### Team Member Fields**

\`\`\`text

id

name

image

role

instagramUrl

linkedinUrl

isFeatured

order

isPublished

\`\`\`

No other social platforms are required for Expert Team Members. Team members support:

\- Instagram

\- LinkedIn

ONLY.

**### Critical Image Size Rule**

Every Expert Team member image must visually render at the SAME:

\- width

\- height

\- aspect ratio

\- crop behavior

\- border radius

\- alignment

as the member images in the supplied reference screenshot.

This MUST remain true even when Admin uploads images with different original dimensions.

Implementation requirements:

\- fixed image container

\- fixed aspect ratio

\- responsive width

\- \`object-fit: cover\`

\- controlled \`object-position\`

\- consistent card geometry

Do not allow one team member image to become taller/shorter than another. Do not allow source-image dimensions to break the design.

**### Team Admin**

Admin must be able to:

\- upload image

\- replace image

\- preview image

\- change name

\- change role

\- set Instagram URL

\- set LinkedIn URL

\- mark featured

\- set order

\- publish/unpublish

No team member should upload their own data. Everything is Admin-controlled.

\---

**## 13. Important Distinction — Creators vs Expert Team**

These are two separate systems.

**### Creator Community**

Only:

\`\`\`text

Instagram

\`\`\`

**### Expert Team**

Only:

\`\`\`text

Instagram

LinkedIn

\`\`\`

Do not merge these data models. Do not reuse Creator fields for Team Members. Do not accidentally add LinkedIn to Creator profiles.

\---

**## 14. Section 07 — Client Results / Reviews**

This is a visual before/after showcase.

Each client card contains ONLY:

\- Client Name

\- Before Screenshot

\- After Screenshot

\- Rating

No:

\- profile image

\- company

\- designation

\- review paragraph

\- social links

\- client login

\- client upload

\- client submission

Everything is Admin-controlled.

**### Card Structure**

\`\`\`text

CLIENT NAME

BEFORE            AFTER

[IMAGE]           [IMAGE]

★★★★★

\`\`\`

Rating: 1–5 stars.

**### Admin Fields**

\`\`\`text

id

clientName

beforeImage

afterImage

rating

isFeatured

order

isPublished

\`\`\`

**### Homepage Carousel**

Show 4–5 featured clients.

**\*\*Desktop:\*\***

\- horizontal drag

\- mouse/trackpad

\- controlled horizontal scrolling

**\*\*Mobile:\*\***

\- finger swipe

\- right-to-left

\- snap-to-card

No aggressive autoplay.

After the featured clients: **\*\*See All Clients →\*\***

Route: \`/clients\`

**### All Clients Page**

Normal vertical scrolling.

Each client:

\`\`\`text

Client Name

Before Screenshot

After Screenshot

Rating

\`\`\`

No additional data.

\---

**## 15. Section 08 — Resources**

Remove the reference's Insights/Trends section. Replace it with: **\*\*Resources\*\***

Resources support:

\`\`\`text

FREE

PREMIUM

\`\`\`

**### Homepage Resource Card**

Only:

\- resource image

\- resource name

\- Free/Premium status

\- action

**\*\*Free:\*\***

\`\`\`text

[IMAGE]

Resource Name

FREE

[ Download → ]

\`\`\`

**\*\*Premium:\*\***

\`\`\`text

[IMAGE]

Resource Name

PREMIUM

₹Price

[ Buy Now → ]

\`\`\`

Do not clutter the homepage card.

**### Homepage Resource Carousel**

Show: **\*\*4–5 featured resources\*\***

Interaction:

\- desktop drag

\- trackpad

\- mobile touch swipe

\- right-to-left

\- snap-to-card

Then: **\*\*See More →\*\***

Route: \`/resources\`

\---

**## 16. Free Resource Flow**

\`\`\`text

Free Resource

↓

Download

↓

Backend-controlled access

↓

File Download

\`\`\`

Admin fields:

\`\`\`text

title

thumbnail

file

type = free

isFeatured

order

isPublished

\`\`\`

\---

**## 17. Premium Resource Flow**

\`\`\`text

Premium Resource

↓

Buy Now

↓

Resource Detail

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

\`\`\`

Never expose a public permanent premium-file URL. Never trust frontend payment success.

\---

**## 18. Payment System**

Use a provider abstraction compatible with:

\- Razorpay

\- Stripe

\- future providers

Required concepts:

\`\`\`text

Orders

Payments

Payment Verification

Webhook Verification

Purchase Ownership

Protected Downloads

\`\`\`

**### Order Model**

\`\`\`text

id

userId

resourceId

amount

currency

provider

providerOrderId

providerPaymentId

status

createdAt

updatedAt

\`\`\`

Statuses:

\`\`\`text

created

pending

paid

failed

cancelled

refunded

\`\`\`

\---

**## 19. Section 09 — Book a Call Session**

Preserve a reference-inspired two-column composition.

**\*\*LEFT:\*\***

\- heading

\- description

\- booking form

**\*\*RIGHT:\*\***

\- large image upload placement

Image is Admin-controlled.

**### Booking Form**

\`\`\`text

Name

Email

Phone / WhatsApp

Company / Brand

Service

Preferred Date

Preferred Time

Timezone

Message

\`\`\`

Primary CTA: **\*\*Book My Call\*\***

States:

\- idle

\- loading

\- success

\- validation error

\- server error

Route: \`/book-session\`

Hero CTA links here.

Architecture must support future:

\- Calendly

\- Cal.com

\- custom scheduler

without rebuilding the page.

Do not build a complex custom calendar in the initial release.

\---

**## 20. Section 10 — Let's Work With Us**

Two-column reference-style CTA.

**\*\*LEFT:\*\***

\- heading

\- description

\- CTA

**\*\*RIGHT:\*\***

\- large Admin-uploadable image

Heading: **\*\*Let's Work With Us\*\***

CTA: **\*\*Book a Call Session →\*\***

Route: \`/book-session\`

Admin controls:

\- heading

\- text

\- CTA

\- image

Layout remains fixed.

\---

**## 21. Section 11 — Footer**

Preserve the reference's dark footer treatment.

**\*\*REMOVE: Category List\*\***

Do not add category lists.

**### Footer Structure**

**\*\*Brand:\*\***

\- AlgoGrowthHub logo

\- description

**\*\*Quick Links:\*\***

\- Home

\- About

\- Services

\- Work / Results

\- Creators

\- Our Team

\- Resources

\- Community

\- Book a Call Session

**\*\*Contact Information (ONLY):\*\***

\- Email

\- Mobile Number

**\*\*Social Links (ONLY):\*\***

\- Instagram

\- Twitter/X

\- Telegram

No other footer social links.

All footer links and contact information are Admin-controlled.

\---

**## 22. Admin/CMS**

Create an authenticated Admin/CMS system.

Admin sections:

\`\`\`text

/admin

Dashboard

Site Settings

Hero

About

Services

Why Choose Us

Creators

Expert Team

Client Results

Resources

Bookings

Leads

Media

Users

\`\`\`

\---

**## 23. Admin — Hero**

Admin fields:

\`\`\`text

heading

description

primaryCta

primaryCtaUrl

secondaryCta

secondaryCtaUrl

heroImage

floatingMetrics[]

\`\`\`

\---

**## 24. Admin — About**

Admin fields:

\`\`\`text

sectionLabel

heading

description

features[]

metricLabel

metricValue

ctaLabel

ctaUrl

images[]

\`\`\`

Images are replaceable. Layout is not editable.

\---

**## 25. Admin — Services**

Fields:

\`\`\`text

title

slug

description

image

features[]

ctaLabel

order

isPublished

\`\`\`

Admin manages content. Code controls the 3x3 layout.

\---

**## 26. Admin — Why Choose Us**

Exactly four platform blocks:

\`\`\`text

Facebook

Telegram

Instagram

LinkedIn

\`\`\`

Each:

\`\`\`text

platform

metric

label

icon

enabled

order

\`\`\`

Images:

\`\`\`text

primaryImage

secondaryImage

\`\`\`

(if the reference composition requires the second image)

\---

**## 27. Admin — Creators**

Fields:

\`\`\`text

name

profileImage

bio

niche

instagramUsername

instagramUrl

followerCount

isFeatured

order

isPublished

\`\`\`

No non-Instagram creator fields.

\---

**## 28. Admin — Expert Team**

Fields:

\`\`\`text

name

image

role

instagramUrl

linkedinUrl

isFeatured

order

isPublished

\`\`\`

Image upload must maintain the fixed reference-style team image ratio.

\---

**## 29. Admin — Client Results**

Fields:

\`\`\`text

clientName

beforeImage

afterImage

rating

isFeatured

order

isPublished

\`\`\`

Only these business fields.

\---

**## 30. Admin — Resources**

Fields:

\`\`\`text

title

thumbnail

file

type [free|premium]

price

currency

isFeatured

order

isPublished

\`\`\`

Premium resources require a valid price.

\---

**## 31. Admin — Booking**

Fields:

\`\`\`text

sectionHeading

description

image

availableServices[]

bookingSettings

\`\`\`

\---

**## 32. Admin — Footer**

Fields:

\`\`\`text

description

email

mobile

instagramUrl

twitterUrl

telegramUrl

\`\`\`

Do not create category settings.

\---

**## 33. Media Management**

Do not store large binary files directly in MongoDB.

Use:

\- Cloudinary

\- S3-compatible object storage

\- equivalent production media provider

Store metadata:

\`\`\`text

url

storageKey/publicId

altText

width

height

mimeType

fileSize

createdAt

\`\`\`

Admin upload UI must support:

\- select

\- preview

\- upload

\- progress

\- replace

\- remove

\- validation

\- errors

Use media storage for:

\- hero

\- about

\- services

\- why choose us

\- creators

\- expert team

\- client before screenshots

\- client after screenshots

\- resources

\- booking image

\- Let's Work With Us image

\- logo

\---

**## 34. Image Consistency Rule**

This is a global requirement.

For every reference-driven image/card section: The UI container controls the visual dimensions.

Uploaded images must NOT change:

\- card width

\- card height

\- image aspect ratio

\- grid alignment

\- layout spacing

Use controlled image containers with:

\`\`\`text

width

height / aspect-ratio

object-fit: cover

object-position

overflow: hidden

border-radius

\`\`\`

This is especially mandatory for:

\- Creator cards

\- Expert Team cards

\- Client Before/After images

\- Service image blocks

All card images in the same collection must render at the same visual dimensions.

\---

**## 35. Backend Modules**

Extend the existing MERN + TypeScript blueprint with:

\`\`\`text

auth/

users/

siteSettings/

services/

creators/

expertTeam/

clientResults/

resources/

orders/

payments/

bookings/

leads/

media/

\`\`\`

Optional:

\`\`\`text

community/

\`\`\`

Only implement community-interaction features if explicitly required.

Do NOT add unnecessary:

\- chat

\- DMs

\- feed

\- likes

\- follows

\- notifications

unless separately requested.

\---

**## 36. Backend Module Structure**

Each domain follows:

\`\`\`text

module/

├── routes.ts

├── controller.ts

├── service.ts

├── model.ts

└── schema.ts

\`\`\`

Preserve the existing backend separation between:

\- routes

\- controllers

\- services

\- models

\- validation schemas

\---

**## 37. API Resources**

**### Public APIs**

\`\`\`text

GET  /api/site-settings

GET  /api/services

GET  /api/services/\:slug

GET  /api/creators

GET  /api/expert-team

GET  /api/client-results

GET  /api/client-results/featured

GET  /api/resources

GET  /api/resources/\:slug

POST /api/resources/\:id/download

POST /api/resources/\:id/checkout

POST /api/payments/verify

POST /api/payments/webhook

POST /api/bookings

POST /api/leads

\`\`\`

**### Admin APIs**

\`\`\`text

POST/PATCH/DELETE /api/admin/site-settings

POST/PATCH/DELETE /api/admin/services/\*

POST/PATCH/DELETE /api/admin/creators/\*

POST/PATCH/DELETE /api/admin/expert-team/\*

POST/PATCH/DELETE /api/admin/client-results/\*

POST/PATCH/DELETE /api/admin/resources/\*

POST/PATCH/DELETE /api/admin/media/\*

GET/PATCH /api/admin/bookings/\*

GET/PATCH /api/admin/leads/\*

GET/PATCH /api/admin/orders/\*

GET/PATCH /api/admin/users/\*

\`\`\`

Follow the existing backend blueprint's established API naming convention if it differs.

\---

**## 38. Data Models**

**### Creator**

\`\`\`text

id

name

profileImage

bio

niche

instagramUsername

instagramUrl

followerCount

isFeatured

order

isPublished

\`\`\`

**### ExpertTeamMember**

\`\`\`text

id

name

image

role

instagramUrl

linkedinUrl

isFeatured

order

isPublished

\`\`\`

**### ClientResult**

\`\`\`text

id

clientName

beforeImage

afterImage

rating

isFeatured

order

isPublished

createdAt

updatedAt

\`\`\`

**### Service**

\`\`\`text

id

title

slug

shortDescription

longDescription

image

features[]

ctaLabel

relatedResourceIds[]

relatedCaseStudyIds[]

order

isPublished

\`\`\`

**### Resource**

\`\`\`text

id

title

slug

thumbnail

fileKey

type[free|premium]

price

currency

isFeatured

order

isPublished

createdAt

updatedAt

\`\`\`

**### Order**

\`\`\`text

id

userId

resourceId

amount

currency

provider

providerOrderId

providerPaymentId

status

createdAt

updatedAt

\`\`\`

**### Booking**

\`\`\`text

id

name

email

phone

company

service

preferredDate

preferredTime

timezone

message

status

createdAt

\`\`\`

**### Lead**

\`\`\`text

id

name

email

phone

company

instagram

service

budgetRange

message

status

createdAt

\`\`\`

**### SiteSettings**

\`\`\`text

agencyName

logo

hero

about

whyChooseUs

bookingSection

letsWorkWithUs

footer

seoDefaults

\`\`\`

\---

**## 39. Authentication & Authorization**

Preserve the existing backend architecture.

Use:

\- JWT access token

\- HttpOnly refresh token

\- secure password hashing

\- role-based access control

Roles:

\`\`\`text

admin

editor

\`\`\`

Public routes do not require authentication.

Admin routes require authentication.

Premium resource access requires server-side purchase verification.

\---

**## 40. Security**

Keep the previous blueprint's security model:

\- Helmet

\- explicit CORS

\- rate limiting

\- Zod validation

\- centralized error handling

\- environment validation

\- secure cookies

\- ownership/access checks

\- structured logging

\- monitoring

\- secure password handling

\- payment webhook verification

\- upload validation

\- protected premium download authorization

Never trust frontend-provided:

\- payment status

\- role

\- purchase ownership

\- admin status

\- protected download permission

\---

**## 41. Frontend Stack**

Use:

\- React

\- TypeScript

\- Vite

\- React Router

\- TanStack Query

\- Axios

\- React Hook Form

\- Zod

Strict TypeScript. Avoid \`any\`.

\---

**## 42. Frontend Component Architecture**

\`\`\`text

frontend/src/

components/

├── layout/

│   ├── Navbar

│   ├── Footer

│   ├── Container

│   └── Section

│

├── ui/

│   ├── Button

│   ├── Card

│   ├── SectionHeader

│   ├── Badge

│   ├── Image

│   ├── StarRating

│   └── Carousel

│

├── agency/

│   ├── Hero

│   ├── AboutSection

│   ├── ServicesGrid

│   ├── WhyChooseUs

│   ├── CreatorCommunity

│   ├── ExpertTeam

│   ├── ClientResultsCarousel

│   ├── ResourcesCarousel

│   ├── BookingSection

│   └── LetsWorkWithUs

│

├── creators/

│   └── CreatorCard

│

├── team/

│   └── TeamMemberCard

│

├── clientResults/

│   └── ClientResultCard

│

├── resources/

│   ├── ResourceCard

│   └── PurchaseButton

│

└── forms/

    ├── BookingForm

    └── LeadForm

\`\`\`

\---

**## 43. Routes**

\`\`\`text

/

/about

/services

/services/\:slug

/work

/creators

/community

/team

/clients

/resources

/resources/\:slug

/book-session

/contact

\`\`\`

\---

**## 44. Responsive Design**

**\*\*Desktop:\*\***

\- preserve reference composition

\- preserve grid

\- preserve card geometry

**\*\*Tablet:\*\***

\- intelligently reduce columns where necessary

**\*\*Mobile:\*\***

\- preserve section order

\- preserve visual hierarchy

\- use controlled horizontal carousels

\- maintain fixed image aspect ratios

\- prevent horizontal page overflow

\- preserve CTA accessibility

Do not simply shrink desktop.

\---

**## 45. Carousel UX**

**### Client Results**

\- 4–5 featured cards

\- horizontal

\- right-to-left swipe/drag

\- desktop mouse/trackpad

\- mobile touch

\- snap-to-card

\- See All Clients after featured set

**### Resources**

\- 4–5 featured cards

\- same behavior

\- See More after featured set

**### Creators**

Use a horizontal card composition if required by the reference.

Do not create aggressive autoplay.

\---

**## 46. Animation**

Use restrained premium animation only:

\- fade-up

\- image reveal

\- small scale

\- hover elevation

\- CTA micro-interaction

No aggressive parallax. No constantly moving elements.

Respect:

\`\`\`text

prefers-reduced-motion

\`\`\`

\---

**## 47. SEO**

Implement:

\- page title

\- meta description

\- OG metadata

\- canonical

\- sitemap

\- robots.txt

\- semantic heading hierarchy

\- image alt text

\- structured data where appropriate

\---

**## 48. Accessibility**

Implement:

\- semantic HTML

\- keyboard support

\- focus states

\- labels

\- alt text

\- accessible carousel controls

\- contrast

\- reduced motion

\- screen-reader-friendly buttons

\---

**## 49. Performance**

Implement:

\- lazy-loaded images

\- responsive image sizes

\- WebP/AVIF where appropriate

\- optimized fonts

\- no layout shifts

\- minimal JS

\- route code splitting where useful

\- good Core Web Vitals

\---

**## 50. Admin Content vs Code-Controlled Layout**

**### ADMIN MAY CHANGE:**

\- text

\- images

\- links

\- metrics

\- service data

\- creator data

\- expert team data

\- client results

\- ratings

\- resources

\- resource price

\- contact information

\- social URLs

\- publish state

\- featured state

\- ordering

**### ADMIN MUST NOT alter:**

\- core section order

\- core grid geometry

\- visual dimensions

\- typography system

\- color system

\- responsive layout

\- card structure

This ensures the website stays visually faithful to the reference.

\---

**## 51. Visual QA**

After implementation, compare the result with all supplied screenshots.

For each section verify:

\- section height

\- section order

\- background color/tone

\- container width

\- image size

\- image crop

\- image placement

\- card count

\- card dimensions

\- spacing

\- typography

\- button position

\- border radius

\- shadows

\- mobile layout

\- desktop layout

**### Image Consistency Test**

Upload different source-image dimensions into the Admin panel.

Verify:

\- Creator cards remain equal size

\- Expert Team cards remain equal size

\- Service image blocks remain equal size

\- Before/After images remain consistent

\- reference-style composition does not break

If source image dimensions change the layout, the implementation is NOT complete.

\---

**## 52. Final Acceptance Checklist**

**### Hero**

\- [ ] Reference-faithful

\- [ ] Hero image upload

\- [ ] Book a Call Session

\- [ ] Learn More

**### About**

\- [ ] Image/content split

\- [ ] Multiple image placement if required

\- [ ] Feature points

\- [ ] Metric

\- [ ] Learn More

**### Services**

\- [ ] Exact 3×3 mixed grid

\- [ ] Image/text/image composition

\- [ ] Admin image upload

\- [ ] Read More

\- [ ] View All Services

**### Why Choose Us**

\- [ ] Facebook

\- [ ] Telegram

\- [ ] Instagram

\- [ ] LinkedIn

\- [ ] No extra platform cards

\- [ ] Admin image upload

**### Creator Community**

\- [ ] Instagram only

\- [ ] Creator cards

\- [ ] Admin controlled

\- [ ] View All Creators

**### Expert Team**

\- [ ] Dedicated section

\- [ ] Same reference-style card layout

\- [ ] Same image dimensions

\- [ ] Name

\- [ ] Role / What they do

\- [ ] Instagram

\- [ ] LinkedIn

\- [ ] Admin upload/edit

**### Client Results**

\- [ ] Client Name

\- [ ] Before image

\- [ ] After image

\- [ ] Rating

\- [ ] 4–5 homepage cards

\- [ ] Right-to-left swipe

\- [ ] See All Clients

\- [ ] Full vertical page

**### Resources**

\- [ ] Free

\- [ ] Premium

\- [ ] Image

\- [ ] Name

\- [ ] Download

\- [ ] Buy Now

\- [ ] 4–5 homepage cards

\- [ ] Right-to-left swipe

\- [ ] See More

\- [ ] Protected premium files

\- [ ] Server-side payment verification

**### Booking**

\- [ ] Book a Call Session

\- [ ] Left-side form

\- [ ] Right-side image upload

\- [ ] Hero CTA points to booking

**### Let's Work With Us**

\- [ ] Content left

\- [ ] Image right

\- [ ] Admin image

\- [ ] Book a Call Session CTA

**### Footer**

\- [ ] Dark reference treatment

\- [ ] No Category List

\- [ ] Email

\- [ ] Mobile

\- [ ] Instagram

\- [ ] Twitter/X

\- [ ] Telegram

\---

**## 53. Implementation Order**

Follow this exact order:

1\. Analyze all supplied screenshots.

2\. Lock design tokens.

3\. Build global container/grid.

4\. Build navbar.

5\. Build hero.

6\. Build About.

7\. Build Services 3×3 grid.

8\. Build Why Choose Us.

9\. Build Creator Community.

10\. Build Expert Team.

11\. Build Client Results carousel.

12\. Build Resources carousel.

13\. Build Book a Call Session.

14\. Build Let's Work With Us.

15\. Build Footer.

16\. Build secondary pages.

17\. Build backend modules.

18\. Build media upload system.

19\. Build Admin/CMS.

20\. Build payment abstraction.

21\. Build protected downloads.

22\. Connect typed API layer.

23\. Test responsive layouts.

24\. Run visual QA.

25\. Run accessibility/SEO/performance/security checks.

26\. Fix every mismatch before completion.

\---

**## 54. Final Command**

Do not start coding blindly.

First create an implementation map from the screenshots.

Then create:

\- UI component map

\- CMS data map

\- backend module map

\- API map

\- media map

\- payment map

\- booking map

Then implement.

The final result must be:

**\*\*AlgoGrowthHub + reference-faithful UI/UX + fixed image geometry + Admin-controlled content + Instagram-only Creator Community + Instagram/LinkedIn Expert Team + Before/After Client Results + Free/Premium Resources + secure Buy Now flow + Book a Call Session + production-grade MERN backend.\*\***

Do not simplify the requested design.

Do not remove any section.

Do not invent another theme.

Do not change the background-color treatment.

Do not allow uploaded images to alter fixed card/image dimensions.

Do not add unsupported social platforms to Creator profiles.

Do not add unnecessary features.

The visual result must remain faithful to the supplied screenshots while the functionality is customized specifically for **\*\*AlgoGrowthHub\*\***.

---

# 55. ADMIN SYSTEM — COMPLETE FLOW

The Admin system is a protected CMS/business-management application and must be implemented as a first-class part of the product.

## Admin Entry

```text
/admin/login
```

Flow:

```text
Admin
  ↓
/admin/login
  ↓
Email + Password
  ↓
Backend Authentication
  ↓
Password Verification
  ↓
Access Token + HttpOnly Refresh Token
  ↓
Role / Permission Check
  ↓
/admin/dashboard
```

Unauthenticated users must never access protected admin pages or admin APIs.

## Required Auth Endpoints

```text
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Do not expose password hashes, refresh-token values, secrets, or private configuration in API responses.

---

# 56. ADMIN ROLES AND PERMISSIONS

Authentication is not authorization.

Use:

```text
Authentication
      ↓
Role Check
      ↓
Permission Check
      ↓
Resource Access
```

## Roles

```text
SUPER_ADMIN
ADMIN
EDITOR
```

### SUPER_ADMIN

Full access to:

- all content
- all media
- all users
- all roles
- all permissions
- orders
- payments
- site settings
- bookings
- leads
- resources
- services
- creators
- expert team
- client results

### ADMIN

Can manage:

- services
- creators
- expert team
- client results
- resources
- bookings
- leads
- media
- general content

Cannot modify:

- SUPER_ADMIN accounts
- platform secrets
- core security configuration

### EDITOR

Can manage:

- services
- creators
- expert team
- client results
- resources
- basic site content

Cannot manage:

- users
- roles
- permissions
- payment configuration
- security configuration
- platform secrets

## Permissions

Use explicit permission identifiers such as:

```text
site_settings.view
site_settings.manage

services.view
services.manage

creators.view
creators.manage

expert_team.view
expert_team.manage

client_results.view
client_results.manage

resources.view
resources.manage

orders.view
orders.manage

payments.view
payments.manage

bookings.view
bookings.manage

leads.view
leads.manage

media.view
media.manage

users.view
users.manage

roles.view
roles.manage
```

Permissions must be enforced server-side. Hiding buttons in the frontend is not security.

---

# 57. ADMIN DASHBOARD

Route:

```text
/admin/dashboard
```

Dashboard should show:

- Total Leads
- New Leads
- Upcoming Bookings
- Creators
- Expert Team Members
- Published Resources
- Premium Orders
- Client Results

Optional recent activity:

- Recent Leads
- Recent Bookings
- Recent Orders
- Recently Published Content

Do not expose payment secrets or other sensitive configuration.

---

# 58. ADMIN NAVIGATION

Admin navigation should contain:

```text
Dashboard

Content
├── Site Settings
├── Hero
├── About
├── Services
├── Why Choose Us
├── Creators
├── Expert Team
├── Client Results
├── Resources

Business
├── Leads
├── Bookings
├── Orders

Media
└── Media Library

System
├── Users
└── Roles / Permissions
```

Only show navigation entries allowed by the current user's permissions.

---

# 59. ADMIN CRUD WORKFLOW

Every CMS resource follows:

```text
Admin
 ↓
List
 ↓
Create / Edit
 ↓
Validate
 ↓
Preview
 ↓
Save
 ↓
Publish / Unpublish
```

Required operations:

```text
Create
Read
Update
Delete / Archive
```

Prefer archive/soft-delete for business content when appropriate instead of immediate destructive deletion.

---

# 60. CONTENT STATUS LIFECYCLES

CMS content uses controlled states:

```text
DRAFT
  ↓
PUBLISHED
  ↓
UNPUBLISHED
  ↓
ARCHIVED
```

Allowed examples:

```text
DRAFT → PUBLISHED
PUBLISHED → UNPUBLISHED
UNPUBLISHED → PUBLISHED
UNPUBLISHED → ARCHIVED
```

Invalid transitions must be rejected server-side.

Apply this lifecycle to:

- Services
- Creators
- Expert Team
- Client Results
- Resources
- other CMS-driven published content

Only `PUBLISHED` items should appear publicly.

---

# 61. RESOURCE STATUS, ACCESS TYPE, AND FILE TYPE

These are separate concepts.

## Lifecycle

```text
DRAFT → PUBLISHED → UNPUBLISHED → ARCHIVED
```

## Access Type

```text
FREE
PREMIUM
```

## Resource File Type

```text
PDF
ZIP
MP4
```

All valid combinations:

```text
FREE + PDF
FREE + ZIP
FREE + MP4

PREMIUM + PDF
PREMIUM + ZIP
PREMIUM + MP4
```

### File validation

Selected `resourceType` must match the uploaded file:

```text
PDF → application/pdf
ZIP → application/zip
MP4 → video/mp4
```

Reject mismatched file types.

Also validate extension, MIME type, file size, storage response, and upload source.

---

# 62. ORDER LIFECYCLE

Order states:

```text
CREATED
  ↓
PENDING
  ↓
PAID
  ↓
FULFILLED
```

Failure:

```text
PENDING → FAILED
```

Cancellation:

```text
CREATED → CANCELLED
PENDING → CANCELLED
```

Refund:

```text
PAID → REFUNDED
```

Invalid transitions such as these must be rejected:

```text
REFUNDED → PAID
FAILED → FULFILLED
CANCELLED → FULFILLED
```

Transitions are validated server-side.

---

# 63. PAYMENT LIFECYCLE

Where provider state needs to be tracked independently:

```text
INITIATED
  ↓
PENDING
  ↓
AUTHORIZED
  ↓
CAPTURED
```

Failure:

```text
PENDING → FAILED
```

Refund:

```text
CAPTURED → REFUNDED
```

Payment webhooks must be idempotent. Duplicate successful webhooks must not create duplicate purchases or orders.

---

# 64. BOOKING LIFECYCLE

```text
PENDING
  ↓
CONFIRMED
  ↓
COMPLETED
```

Allowed alternative paths:

```text
PENDING → CANCELLED
CONFIRMED → CANCELLED
CONFIRMED → NO_SHOW
```

Do not allow arbitrary status values from the client.

---

# 65. LEAD LIFECYCLE

Recommended lifecycle:

```text
NEW
  ↓
CONTACTED
  ↓
QUALIFIED
  ↓
PROPOSAL_SENT
  ↓
WON
```

Alternative path:

```text
NEW
  ↓
CONTACTED
  ↓
LOST
```

Lead status transitions are Admin-controlled and backend-validated.

---

# 66. MEDIA LIFECYCLE

Media upload states:

```text
UPLOADING
  ↓
PROCESSING
  ↓
READY
```

Failure:

```text
UPLOADING → FAILED
PROCESSING → FAILED
```

Deletion:

```text
READY → DELETED
```

Do not physically delete a media asset that is still referenced by active content unless the reference/replacement workflow has completed.

---

# 67. CENTRALIZED ERROR HANDLING

All backend application errors must pass through one centralized error handler.

Required machine-readable codes:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
NOT_FOUND
CONFLICT
RATE_LIMITED
INVALID_FILE
UPLOAD_ERROR
STORAGE_ERROR
DATABASE_ERROR
PAYMENT_ERROR
PAYMENT_VERIFICATION_FAILED
RESOURCE_ACCESS_DENIED
BOOKING_ERROR
LEAD_ERROR
INTERNAL_SERVER_ERROR
```

Standard error response:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Safe human-readable message"
  }
}
```

Validation errors may additionally include:

```json
{
  "fields": {
    "email": ["Invalid email"],
    "price": ["Must be greater than zero"]
  }
}
```

Never expose in production:

- stack traces
- database internals
- filesystem paths
- environment variables
- JWT secrets
- storage credentials
- payment credentials

Development logs may contain diagnostic details.

---

# 68. FRONTEND ERROR STATES

Every API-driven screen must support:

```text
Loading
Success
Empty
Error
Retry
```

Every form must support:

```text
Idle
Submitting
Success
Validation Error
Server Error
Retry
```

No silent API failures.

---

# 69. ADMIN AUDIT LOG

Create an audit trail for sensitive Admin actions.

Track:

```text
actorUserId
action
resourceType
resourceId
timestamp
requestIdentifier / safe metadata
```

Examples:

```text
SERVICE_CREATED
SERVICE_PUBLISHED
CREATOR_UPDATED
TEAM_MEMBER_DELETED
RESOURCE_PRICE_CHANGED
RESOURCE_PUBLISHED
ORDER_REFUNDED
USER_ROLE_CHANGED
```

Never log:

- passwords
- access tokens
- refresh tokens
- payment secrets
- storage credentials

---

# 70. ADMIN ACCOUNT MANAGEMENT

SUPER_ADMIN can:

- create admin users
- disable users
- change roles
- initiate secure password reset
- revoke sessions where supported

ADMIN and EDITOR cannot elevate their own privileges.

A user cannot grant themselves permissions they do not already possess.

---

# 71. ADMIN SESSION SECURITY

Implement:

- secure HttpOnly cookies
- token expiration
- refresh-token rotation where supported
- logout invalidation
- rate limiting on login
- protection against repeated failed login attempts

Do not store long-lived sensitive authentication tokens in localStorage.

---

# 72. FILE UPLOAD SECURITY

All Admin uploads must validate:

- MIME type
- extension
- file size
- resource-type compatibility

Allowed image formats:

```text
JPEG
PNG
WebP
AVIF
```

Allowed resource types:

```text
PDF
ZIP
MP4
```

Reject executable or unexpected file types.

---

# 73. TESTING STRATEGY

Testing is mandatory.

## Backend Unit Tests

Test:

- utilities
- validation schemas
- permission logic
- status-transition logic
- ownership checks
- payment calculations
- resource-access rules

## Backend Integration Tests

Test:

- authentication APIs
- authorization
- service CRUD
- creator CRUD
- expert-team CRUD
- client-result CRUD
- resource CRUD
- lead submission
- booking submission
- order creation
- payment verification
- webhook handling
- protected downloads

## Frontend Tests

Test:

- route guards
- forms
- validation
- loading states
- error states
- empty states
- carousel interactions
- premium resource UI
- Admin permission-aware UI

## End-to-End Tests

Minimum flows:

### Admin Login

```text
Login
→ Dashboard
→ Logout
```

### Service

```text
Admin Login
→ Create Service
→ Publish
→ Public Website
→ Service visible
```

### Creator

```text
Admin
→ Create Creator
→ Instagram-only
→ Publish
→ Public Creator page
```

### Expert Team

```text
Admin
→ Create Team Member
→ Upload image
→ Add Instagram
→ Add LinkedIn
→ Publish
→ Public Team section
```

### Client Result

```text
Admin
→ Create result
→ Upload Before
→ Upload After
→ Rating
→ Featured
→ Homepage carousel
```

### Free Resource

```text
Admin
→ Create FREE PDF/ZIP/MP4
→ Publish
→ Download
```

### Premium Resource

```text
Admin
→ Create PREMIUM resource
→ Set price
→ Publish
→ User clicks Buy Now
→ Payment
→ Verify
→ Order PAID
→ Protected download
```

### Booking

```text
Visitor
→ Book Session
→ Submit
→ Booking PENDING
→ Admin confirms
```

### Lead

```text
Visitor
→ Contact
→ Submit
→ Lead NEW
→ Admin contacts
→ CONTACTED
```

---

# 74. MINIMUM SECURITY TESTS

Automated tests must verify:

```text
Unauthenticated user cannot access Admin APIs.

EDITOR cannot perform SUPER_ADMIN-only actions.

Invalid JWT is rejected.

Expired access token follows refresh flow or forces login.

Wrong password is rejected.

Login attempts are rate-limited.

Premium resource cannot download before purchase.

Fake frontend payment success is rejected.

Invalid payment webhook is rejected.

Duplicate webhook is idempotent.

Incorrect resource MIME type is rejected.

Unauthorized users cannot modify protected resources.

Creator cannot contain unsupported social-platform fields.

Admin-only endpoints require correct role/permission.
```

---

# 75. API CONTRACT TESTING

All APIs must use the project's standard response shapes.

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
    "code": "ERROR_CODE",
    "message": "Message"
  }
}
```

Tests must validate both HTTP status codes and response schemas.

---

# 76. DATABASE TESTING

Use a dedicated test environment/database.

Never run automated tests against production MongoDB.

Test:

- model validation
- unique constraints where required
- status transitions
- references
- pagination
- filtering
- archive/soft-delete behavior

---

# 77. DEPLOYMENT ARCHITECTURE

Use:

```text
Frontend → Vercel
Backend → Render / Railway
Database → MongoDB Atlas
Media → Cloudinary / S3-compatible storage
Payments → Razorpay / Stripe
```

Use separate:

```text
development
staging
production
```

---

# 78. PRODUCTION DEPLOYMENT REQUIREMENTS

Production must use:

- HTTPS
- production environment variables
- production CORS allowlist
- production MongoDB Atlas database
- production media storage
- payment credentials
- verified webhook endpoints
- secure cookies
- monitoring
- structured logs

Never expose server-only secrets in frontend builds.

---

# 79. HEALTH AND READINESS

Required endpoints:

```text
GET /health
GET /ready
```

## /health

Return HTTP 200 when the process is alive.

Do not require a database call for the basic liveness check.

## /ready

Return HTTP 200 only when required dependencies are ready.

Return HTTP 503 when critical dependencies are unavailable.

---

# 80. CI/CD

Recommended production pipeline:

```text
Git Push
 ↓
Install dependencies
 ↓
Lint
 ↓
Typecheck
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Build
 ↓
Deploy
```

Do not deploy on:

- typecheck failure
- build failure
- critical test failure

---

# 81. DATABASE AND DATA SAFETY

Handle schema changes deliberately.

Before destructive changes:

- backup data
- test in staging
- document migration
- verify production compatibility

Never casually delete production collections or critical fields.

---

# 82. BACKUP AND RECOVERY

Use MongoDB Atlas backup capabilities.

Required planning for:

- database backups
- media redundancy
- order/payment records
- leads/bookings
- recovery procedure
- secret recovery

Document:

```text
Backup Frequency
Retention
Restore Procedure
Responsible Role
```

Local developer copies are not the primary production backup.

---

# 83. PRODUCTION OBSERVABILITY

Monitor:

- API errors
- database errors
- payment failures
- webhook failures
- upload failures
- authentication failures
- booking failures
- lead failures

Logs must not contain:

- passwords
- JWT secrets
- refresh tokens
- payment credentials
- storage credentials

---

# 84. ADMIN CRUD ACCEPTANCE

Every Admin-managed resource must support where applicable:

```text
List
Search / Filter
Create
View
Edit
Publish
Unpublish
Archive / Delete
Featured / Order controls
Validation
Loading state
Success state
Error state
```

---

# 85. STATUS TRANSITION ACCEPTANCE

Every business status must be:

1. explicitly defined
2. backend validated
3. transition-safe
4. visible in the Admin UI
5. covered by tests

Never accept arbitrary status strings from clients.

Use enums/unions plus backend validation.

---

# 86. FINAL ADMIN FLOW

The completed Admin system must provide:

```text
/admin/login
      ↓
Authenticated Admin
      ↓
/admin/dashboard
      ↓
┌─────────────────────────────┐
│ Dashboard                   │
│ Site Settings               │
│ Hero                        │
│ About                       │
│ Services                   │
│ Why Choose Us               │
│ Creators                    │
│ Expert Team                 │
│ Client Results              │
│ Resources                   │
│ Leads                       │
│ Bookings                    │
│ Orders                      │
│ Media Library               │
│ Users                       │
│ Roles / Permissions         │
└─────────────────────────────┘
```

Admin changes must update the public website through the backend/API without source-code changes.

---

# 87. FINAL BACKEND COMPLETION CHECKLIST

- [ ] MongoDB Atlas connected
- [ ] Mongoose models complete
- [ ] Zod validation complete
- [ ] Admin login complete
- [ ] JWT access/refresh flow complete
- [ ] role checks complete
- [ ] permission checks complete
- [ ] protected Admin routes complete
- [ ] centralized error handler complete
- [ ] standard API response contract complete
- [ ] status lifecycles complete
- [ ] status-transition validation complete
- [ ] media upload validation complete
- [ ] resource file-type validation complete
- [ ] free resource download complete
- [ ] premium purchase architecture complete
- [ ] payment verification complete
- [ ] webhook verification complete
- [ ] protected premium downloads complete
- [ ] booking flow complete
- [ ] lead flow complete
- [ ] Admin CRUD complete
- [ ] audit logging complete
- [ ] tests complete
- [ ] health endpoint complete
- [ ] readiness endpoint complete
- [ ] deployment configuration complete
- [ ] staging/production separation complete
- [ ] backup/recovery plan complete
- [ ] monitoring complete

---

# 88. FINAL ADMIN ACCEPTANCE CHECKLIST

Admin must be able to:

```text
LOGIN
 ↓
DASHBOARD
 ↓
MANAGE
 ├── Site Settings
 ├── Hero
 ├── About
 ├── Services
 ├── Why Choose Us
 ├── Creators
 ├── Expert Team
 ├── Client Results
 ├── Resources
 ├── Bookings
 ├── Leads
 ├── Orders
 ├── Media
 └── Users / Roles
```

The Admin system is complete only when authorized users can manage all requested business content and operations without touching source code.

---

# 89. FINAL IMPLEMENTATION RULE

Do not treat Admin/CMS as an afterthought.

Build this as one coherent production system:

```text
Public Website
+
React Frontend
+
Express API
+
MongoDB Atlas
+
Media Storage
+
Payment Layer
+
Admin/CMS
+
Authentication
+
Authorization
+
Testing
+
Deployment
+
Monitoring
```

The existing backend blueprint remains the backend architecture source of truth.

This add-on completes the previously under-specified areas:

- Admin Auth
- Admin Flow
- Roles
- Permissions
- CRUD
- Status Lifecycles
- Error Handling
- Audit Logging
- Testing Strategy
- Deployment
- CI/CD
- Health/Readiness
- Backup/Recovery
- Production Observability
- Data Safety

Do not remove any existing AlgoGrowthHub functionality while implementing these requirements.
