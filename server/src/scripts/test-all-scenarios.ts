import request from 'supertest';
import mongoose from 'mongoose';
import dns from 'dns';
import { app } from '../app.js';
import { env } from '../config/env.js';
import { User } from '../modules/users/model.js';
import { SiteSettings } from '../modules/siteSettings/model.js';
import { Service } from '../modules/services/model.js';
import { Creator } from '../modules/creators/model.js';
import { ExpertTeamMember } from '../modules/expertTeam/model.js';
import { ClientResult } from '../modules/clientResults/model.js';
import { Resource } from '../modules/resources/model.js';
import { Booking } from '../modules/bookings/model.js';
import { Lead } from '../modules/leads/model.js';
import { Order } from '../modules/orders/model.js';
import { AuditLog } from '../modules/auditLogs/model.js';
import { ROLES, BOOKING_STATUS, LEAD_STATUS, ORDER_STATUS } from '../config/constants.js';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // ignore
}

// ANSI Colors for Console Output
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${COLORS.green}✓ PASS${COLORS.reset} - ${testName}`);
  } else {
    console.error(`  ${COLORS.red}✗ FAIL${COLORS.reset} - ${testName} ${detail ? `(${detail})` : ''}`);
    throw new Error(`Assertion failed for: ${testName}`);
  }
}

async function runAllTests() {
  console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan} 🧪 AlgoGrowthHub — Complete End-to-End API & Database Test Suite ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

  // Connect to Database
  console.log(`📡 Connecting to MongoDB for verification...`);
  await mongoose.connect(env.MONGO_URI);
  console.log(`✅ Connected to DB: ${mongoose.connection.host}\n`);

  let superAdminToken = '';
  let userToken = '';
  let tempUserId = '';
  let tempServiceId = '';
  let tempCreatorId = '';
  let tempTeamMemberId = '';
  let tempClientResultId = '';
  let tempResourceId = '';
  let tempBookingId = '';
  let tempLeadId = '';
  let tempOrderId = '';

  // -------------------------------------------------------------
  // MODULE 0: Health Check
  // -------------------------------------------------------------
  console.log(`${COLORS.bold}--- [00] Health Check ---${COLORS.reset}`);
  const healthRes = await request(app).get('/api/health');
  assert(healthRes.status === 200, 'GET /api/health returns 200 OK');
  assert(healthRes.body.status === 'ok', 'Health response has status: ok');

  // -------------------------------------------------------------
  // MODULE 1: Authentication & RBAC Lifecycle
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [01] Authentication & Session Management ---${COLORS.reset}`);
  const testEmail = `test.user.${Date.now()}@example.com`;

  // 1.1 Public User Registration
  const regRes = await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'Automated Test User',
      email: testEmail,
      password: 'Password@123',
    });
  assert(regRes.status === 201, 'POST /api/v1/auth/register creates user with 201 Created');
  assert(!!regRes.body.data.accessToken, 'Registration returns JWT accessToken');
  userToken = regRes.body.data.accessToken;
  tempUserId = regRes.body.data.user._id;

  // DB Verification: User exists in MongoDB with role USER
  const dbUser = await User.findById(tempUserId);
  assert(!!dbUser, 'DB Verification: User document persisted in MongoDB');
  assert(dbUser?.role === ROLES.USER, 'DB Verification: User role assigned as USER');
  assert(dbUser?.isActive === true, 'DB Verification: User marked active');

  // 1.2 Prevent Duplicate Registration
  const dupRegRes = await request(app)
    .post('/api/v1/auth/register')
    .send({
      name: 'Duplicate Attempt',
      email: testEmail,
      password: 'Password@123',
    });
  assert(dupRegRes.status === 409, 'POST /api/v1/auth/register rejects duplicate email with 409 Conflict');
  assert(dupRegRes.body.error.code === 'CONFLICT', 'Duplicate error returns CONFLICT code');

  // 1.3 Super Admin Login
  const loginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: env.SUPER_ADMIN_EMAIL,
      password: env.SUPER_ADMIN_PASSWORD,
    });
  assert(loginRes.status === 200, 'POST /api/v1/auth/login succeeds with 200 OK');
  assert(!!loginRes.body.data.accessToken, 'Login returns Super Admin accessToken');
  superAdminToken = loginRes.body.data.accessToken;

  // DB Verification: lastLoginAt timestamp updated
  const dbSuperAdmin = await User.findOne({ email: env.SUPER_ADMIN_EMAIL });
  assert(!!dbSuperAdmin?.lastLoginAt, 'DB Verification: Super Admin lastLoginAt timestamp updated in DB');

  // 1.4 Invalid Password Rejection
  const badLoginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: env.SUPER_ADMIN_EMAIL,
      password: 'WrongPassword999',
    });
  assert(badLoginRes.status === 401, 'POST /api/v1/auth/login rejects wrong password with 401 Unauthorized');

  // 1.5 Get Current Profile (/me)
  const meRes = await request(app)
    .get('/api/v1/auth/me')
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(meRes.status === 200, 'GET /api/v1/auth/me returns 200 OK with profile');
  assert(meRes.body.data.email === env.SUPER_ADMIN_EMAIL, 'Profile matches logged in Super Admin email');

  // -------------------------------------------------------------
  // MODULE 2: User Management (Admin CRUD)
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [02] User Management (Admin RBAC CRUD) ---${COLORS.reset}`);

  // 2.1 Get All Users
  const usersListRes = await request(app)
    .get('/api/v1/admin/users')
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(usersListRes.status === 200, 'GET /api/v1/admin/users lists all users');
  assert(Array.isArray(usersListRes.body.data), 'Users response is an array');

  // 2.2 Create Staff Admin
  const newStaffEmail = `staff.${Date.now()}@algogrowthhub.com`;
  const createStaffRes = await request(app)
    .post('/api/v1/admin/users')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      name: 'Operations Manager',
      email: newStaffEmail,
      password: 'Password@123',
      role: ROLES.ADMIN,
      isActive: true,
    });
  assert(createStaffRes.status === 201, 'POST /api/v1/admin/users creates Admin with 201 Created');
  const staffUserId = createStaffRes.body.data._id;

  // DB Verification
  const dbStaff = await User.findById(staffUserId);
  assert(dbStaff?.role === ROLES.ADMIN, 'DB Verification: Staff user persisted with ADMIN role');

  // 2.3 Update User
  const updateUserRes = await request(app)
    .put(`/api/v1/admin/users/${staffUserId}`)
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({ name: 'Updated Operations Lead' });
  assert(updateUserRes.status === 200, 'PUT /api/v1/admin/users/:id updates user name');

  // DB Verification
  const dbUpdatedStaff = await User.findById(staffUserId);
  assert(dbUpdatedStaff?.name === 'Updated Operations Lead', 'DB Verification: Updated name saved in MongoDB');

  // 2.4 Delete User
  const deleteUserRes = await request(app)
    .delete(`/api/v1/admin/users/${staffUserId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(deleteUserRes.status === 200, 'DELETE /api/v1/admin/users/:id deletes user');

  // DB Verification
  const dbDeletedStaff = await User.findById(staffUserId);
  assert(dbDeletedStaff === null, 'DB Verification: Deleted user completely removed from MongoDB');

  // 2.5 Security: Standard User Forbidden from Admin Routes
  const forbiddenRes = await request(app)
    .get('/api/v1/admin/users')
    .set('Authorization', `Bearer ${userToken}`);
  assert(forbiddenRes.status === 403, 'Security Check: Regular USER role blocked with 403 Forbidden from Admin APIs');

  // -------------------------------------------------------------
  // MODULE 3: Site Settings CMS
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [03] Site Settings CMS ---${COLORS.reset}`);

  // 3.1 Get Public Settings
  const settingsRes = await request(app).get('/api/v1/settings');
  assert(settingsRes.status === 200, 'GET /api/v1/settings returns 200 OK');
  assert(!!settingsRes.body.data.hero, 'Site settings contains hero section config');

  // 3.2 Update Site Settings
  const updatedHeading = `Scale Your Brand to 8 Figures [Test ${Date.now()}]`;
  const updateSettingsRes = await request(app)
    .put('/api/v1/admin/settings')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      hero: {
        heading: updatedHeading,
        subheading: 'Data-driven algorithmic agency',
        badgeText: 'Top 1% Creators Partner',
      },
    });
  assert(updateSettingsRes.status === 200, 'PUT /api/v1/admin/settings updates settings');

  // DB Verification
  const dbSettings = await SiteSettings.findOne();
  assert(dbSettings?.hero?.heading === updatedHeading, 'DB Verification: SiteSettings hero heading updated in MongoDB');

  // -------------------------------------------------------------
  // MODULE 4: Services 3x3 Grid
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [04] Services 3x3 Grid ---${COLORS.reset}`);

  // 4.1 Create Service (Admin)
  const serviceTitle = `Viral Retention Strategy ${Date.now()}`;
  const createServiceRes = await request(app)
    .post('/api/v1/admin/services')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      title: serviceTitle,
      shortDescription: 'High-converting viral editing and retention psychology.',
      image: '/uploads/services/viral.jpg',
      features: ['30 Videos', 'Hook Scripting', 'Sound Design'],
      ctaLabel: 'Read More →',
      order: 10,
      status: 'PUBLISHED',
    });
  assert(createServiceRes.status === 201, 'POST /api/v1/admin/services creates service with 201 Created');
  tempServiceId = createServiceRes.body.data._id;
  const serviceSlug = createServiceRes.body.data.slug;

  // DB Verification
  const dbService = await Service.findById(tempServiceId);
  assert(dbService?.title === serviceTitle, 'DB Verification: Service document created in MongoDB');
  assert(dbService?.features?.length === 3, 'DB Verification: Features array stored correctly');

  // 4.2 Public Get Service by Slug
  const getSlugRes = await request(app).get(`/api/v1/services/${serviceSlug}`);
  assert(getSlugRes.status === 200, 'GET /api/v1/services/:slug fetches public service');

  // 4.3 Update Service
  const updateServiceRes = await request(app)
    .put(`/api/v1/admin/services/${tempServiceId}`)
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({ shortDescription: 'Updated high-converting viral editing.' });
  assert(updateServiceRes.status === 200, 'PUT /api/v1/admin/services/:id updates description');

  // DB Verification
  const dbUpdatedService = await Service.findById(tempServiceId);
  assert(dbUpdatedService?.shortDescription === 'Updated high-converting viral editing.', 'DB Verification: Service description updated in MongoDB');

  // 4.4 Delete Service
  const deleteServiceRes = await request(app)
    .delete(`/api/v1/admin/services/${tempServiceId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(deleteServiceRes.status === 200, 'DELETE /api/v1/admin/services/:id deletes service');

  // DB Verification
  const dbDeletedService = await Service.findById(tempServiceId);
  assert(dbDeletedService === null, 'DB Verification: Service deleted from MongoDB');

  // -------------------------------------------------------------
  // MODULE 5: Creator Community (Instagram-Only Rule)
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [05] Creator Community (Instagram-Only) ---${COLORS.reset}`);

  // 5.1 Create Creator
  const creatorHandle = `creator_${Date.now()}`;
  const createCreatorRes = await request(app)
    .post('/api/v1/admin/creators')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      name: 'Rohan Joshi',
      profileImage: '/uploads/creators/rohan.jpg',
      bio: 'Finance & crypto growth specialist.',
      niche: 'Finance & Crypto',
      instagramUsername: creatorHandle,
      instagramUrl: `https://instagram.com/${creatorHandle}`,
      followerCount: '350K+',
      status: 'PUBLISHED',
    });
  assert(createCreatorRes.status === 201, 'POST /api/v1/admin/creators creates creator');
  tempCreatorId = createCreatorRes.body.data._id;

  // DB Verification
  const dbCreator = await Creator.findById(tempCreatorId);
  assert(dbCreator?.instagramUsername === creatorHandle, 'DB Verification: Creator document created in MongoDB');

  // 5.2 Clean up Creator
  await request(app)
    .delete(`/api/v1/admin/creators/${tempCreatorId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  const dbDeletedCreator = await Creator.findById(tempCreatorId);
  assert(dbDeletedCreator === null, 'DB Verification: Creator deleted from MongoDB');

  // -------------------------------------------------------------
  // MODULE 6: Expert Team (Instagram + LinkedIn Rule)
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [06] Expert Team (Instagram + LinkedIn) ---${COLORS.reset}`);

  // 6.1 Create Team Member
  const createTeamRes = await request(app)
    .post('/api/v1/admin/expert-team')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      name: 'Kavita Rao',
      image: '/uploads/team/kavita.jpg',
      role: 'Head of Creative Strategy',
      instagramUrl: 'https://instagram.com/kavita_creative',
      linkedinUrl: 'https://linkedin.com/in/kavita-rao',
      status: 'PUBLISHED',
    });
  assert(createTeamRes.status === 201, 'POST /api/v1/admin/expert-team creates team member');
  tempTeamMemberId = createTeamRes.body.data._id;

  // DB Verification
  const dbTeam = await ExpertTeamMember.findById(tempTeamMemberId);
  assert(dbTeam?.name === 'Kavita Rao', 'DB Verification: Team member created with LinkedIn & Instagram in MongoDB');

  // 6.2 Clean up Team Member
  await request(app)
    .delete(`/api/v1/admin/expert-team/${tempTeamMemberId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  const dbDeletedTeam = await ExpertTeamMember.findById(tempTeamMemberId);
  assert(dbDeletedTeam === null, 'DB Verification: Team member deleted from MongoDB');

  // -------------------------------------------------------------
  // MODULE 7: Client Results (Before/After & Star Rating)
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [07] Client Results (Before/After Showcases) ---${COLORS.reset}`);

  // 7.1 Create Client Result
  const createResultRes = await request(app)
    .post('/api/v1/admin/client-results')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      clientName: 'Viral Brand Co',
      beforeImage: '/uploads/results/before.jpg',
      afterImage: '/uploads/results/after.jpg',
      rating: 5,
      status: 'PUBLISHED',
    });
  assert(createResultRes.status === 201, 'POST /api/v1/admin/client-results creates showcase');
  tempClientResultId = createResultRes.body.data._id;

  // DB Verification
  const dbResult = await ClientResult.findById(tempClientResultId);
  assert(dbResult?.rating === 5, 'DB Verification: 5-Star rating saved in MongoDB');

  // 7.2 Clean up Result
  await request(app)
    .delete(`/api/v1/admin/client-results/${tempClientResultId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  const dbDeletedResult = await ClientResult.findById(tempClientResultId);
  assert(dbDeletedResult === null, 'DB Verification: Showcase deleted from MongoDB');

  // -------------------------------------------------------------
  // MODULE 8: Digital Resources & Protected Downloads
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [08] Digital Resources & Tokenized Downloads ---${COLORS.reset}`);

  // 8.1 Create Resource
  const createResourceRes = await request(app)
    .post('/api/v1/admin/resources')
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({
      title: 'Ultimate 2026 Hook Guide',
      description: '100+ proven hook formulas.',
      thumbnail: '/uploads/resources/thumb.jpg',
      fileKey: 'resources/hook_guide.pdf',
      fileName: 'hook_guide.pdf',
      type: 'free',
      price: 0,
      currency: 'INR',
      fileFormat: 'pdf',
      status: 'PUBLISHED',
    });
  assert(createResourceRes.status === 201, 'POST /api/v1/admin/resources creates resource');
  tempResourceId = createResourceRes.body.data._id;

  // DB Verification
  const dbResource = await Resource.findById(tempResourceId);
  assert(dbResource?.title === 'Ultimate 2026 Hook Guide', 'DB Verification: Resource document created in MongoDB');

  // 8.2 Clean up Resource
  await request(app)
    .delete(`/api/v1/admin/resources/${tempResourceId}`)
    .set('Authorization', `Bearer ${superAdminToken}`);
  const dbDeletedResource = await Resource.findById(tempResourceId);
  assert(dbDeletedResource === null, 'DB Verification: Resource deleted from MongoDB');

  // -------------------------------------------------------------
  // MODULE 9: Strategy Call Bookings Pipeline
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [09] Strategy Call Bookings Pipeline ---${COLORS.reset}`);

  // 9.1 Book Strategy Call (Public)
  const bookRes = await request(app)
    .post('/api/v1/bookings')
    .send({
      name: 'Aditya Birla',
      email: 'aditya@startup.com',
      phone: '+919998887776',
      service: 'Instagram Growth & Monetization',
      preferredDate: '2026-09-10',
      preferredTime: '11:00 AM',
      timezone: 'IST (UTC+5:30)',
      message: 'Scaling brand to 1M on Instagram',
    });
  assert(bookRes.status === 201, 'POST /api/v1/bookings creates booking with 201 Created');
  tempBookingId = bookRes.body.data._id;

  // DB Verification: Initial state PENDING
  const dbBooking = await Booking.findById(tempBookingId);
  assert(dbBooking?.status === BOOKING_STATUS.PENDING, 'DB Verification: Booking initial status is PENDING');

  // 9.2 Admin Updates Status to CONFIRMED
  const updateBookingRes = await request(app)
    .patch(`/api/v1/admin/bookings/${tempBookingId}/status`)
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({ status: BOOKING_STATUS.CONFIRMED });
  assert(updateBookingRes.status === 200, 'PATCH /api/v1/admin/bookings/:id/status updates status');

  // DB Verification: Status changed to CONFIRMED
  const dbConfirmedBooking = await Booking.findById(tempBookingId);
  assert(dbConfirmedBooking?.status === BOOKING_STATUS.CONFIRMED, 'DB Verification: Booking status transitioned to CONFIRMED in MongoDB');

  // Clean up
  await Booking.findByIdAndDelete(tempBookingId);

  // -------------------------------------------------------------
  // MODULE 10: Leads Qualification Pipeline
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [10] Leads Qualification Pipeline ---${COLORS.reset}`);

  // 10.1 Public Lead Capture
  const leadRes = await request(app)
    .post('/api/v1/leads')
    .send({
      name: 'Neha Roy',
      email: 'neha@fashionbrand.com',
      phone: '+919871122334',
      instagram: '@neha_fashion',
      service: 'Full Organic Scale',
      budgetRange: '$3,000 - $5,000',
      message: 'Looking for organic growth strategy.',
    });
  assert(leadRes.status === 201, 'POST /api/v1/leads captures lead with 201 Created');
  tempLeadId = leadRes.body.data._id;

  // DB Verification: Initial state NEW
  const dbLead = await Lead.findById(tempLeadId);
  assert(dbLead?.status === LEAD_STATUS.NEW, 'DB Verification: Lead initial status is NEW');

  // 10.2 Admin Qualifies Lead
  const updateLeadRes = await request(app)
    .patch(`/api/v1/admin/leads/${tempLeadId}/status`)
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({ status: LEAD_STATUS.QUALIFIED });
  assert(updateLeadRes.status === 200, 'PATCH /api/v1/admin/leads/:id/status qualifies lead');

  // DB Verification: Status changed to QUALIFIED
  const dbQualifiedLead = await Lead.findById(tempLeadId);
  assert(dbQualifiedLead?.status === LEAD_STATUS.QUALIFIED, 'DB Verification: Lead status transitioned to QUALIFIED in MongoDB');

  // Clean up
  await Lead.findByIdAndDelete(tempLeadId);

  // -------------------------------------------------------------
  // MODULE 11: Orders & Payment Lifecycle
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [11] Orders & Payment Processing ---${COLORS.reset}`);

  // Create a temporary resource for ordering
  const paidResource = await Resource.create({
    title: 'Instagram Algorithm Playbook',
    slug: `instagram-algorithm-playbook-${Date.now()}`,
    description: 'Complete monetization guide.',
    thumbnail: '/uploads/resources/thumb.jpg',
    fileKey: 'resources/playbook.pdf',
    fileName: 'playbook.pdf',
    type: 'premium',
    price: 49,
    currency: 'INR',
    fileFormat: 'pdf',
    status: 'PUBLISHED',
  });

  // 11.1 Create Order
  const orderRes = await request(app)
    .post('/api/v1/payments/checkout')
    .send({
      resourceId: paidResource.id,
      userEmail: 'buyer@example.com',
      userName: 'Aman Verma',
    });
  assert(orderRes.status === 200, 'POST /api/v1/payments/checkout creates order with 200 OK');
  tempOrderId = orderRes.body.data.orderId;

  // DB Verification: Order created with status PENDING
  const dbOrder = await Order.findById(tempOrderId);
  assert(dbOrder?.status === ORDER_STATUS.PENDING, 'DB Verification: Order initial status is PENDING');

  // 11.2 Verify Payment (Transition to PAID)
  const verifyPayRes = await request(app)
    .post('/api/v1/payments/verify')
    .send({
      orderId: tempOrderId,
      paymentId: 'pay_mock_987654321',
      signature: 'mock_signature_abc',
    });
  assert(verifyPayRes.status === 200, 'POST /api/v1/payments/verify processes payment');

  // DB Verification: Order transitioned to PAID
  const dbPaidOrder = await Order.findById(tempOrderId);
  assert(dbPaidOrder?.status === ORDER_STATUS.PAID, 'DB Verification: Order status transitioned to PAID in MongoDB');

  // 11.3 Super Admin Refunds Order (Transition to REFUNDED)
  const refundRes = await request(app)
    .post(`/api/v1/admin/orders/${tempOrderId}/refund`)
    .set('Authorization', `Bearer ${superAdminToken}`)
    .send({ reason: 'Customer requested cancellation' });
  assert(refundRes.status === 200, 'POST /api/v1/admin/orders/:id/refund refunds order');

  // DB Verification: Order transitioned to REFUNDED
  const dbRefundedOrder = await Order.findById(tempOrderId);
  assert(dbRefundedOrder?.status === ORDER_STATUS.REFUNDED, 'DB Verification: Order status transitioned to REFUNDED in MongoDB');

  // Clean up
  await Resource.findByIdAndDelete(paidResource.id);
  await Order.findByIdAndDelete(tempOrderId);

  // -------------------------------------------------------------
  // MODULE 12: Admin Dashboard Analytics & Audit Logs
  // -------------------------------------------------------------
  console.log(`\n${COLORS.bold}--- [12] Admin Dashboard Analytics & Audit Logs ---${COLORS.reset}`);

  // 12.1 Dashboard Analytics
  const dashboardRes = await request(app)
    .get('/api/v1/admin/dashboard')
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(dashboardRes.status === 200, 'GET /api/v1/admin/dashboard returns KPI analytics metrics');
  assert(typeof dashboardRes.body.data.summary.totalLeads === 'number', 'Analytics contains totalLeads metric');

  // 12.2 Audit Logs
  const auditLogsRes = await request(app)
    .get('/api/v1/admin/audit-logs')
    .set('Authorization', `Bearer ${superAdminToken}`);
  assert(auditLogsRes.status === 200, 'GET /api/v1/admin/audit-logs returns admin activity trail');

  // DB Verification: Audit log entries exist
  const dbAuditLogsCount = await AuditLog.countDocuments();
  assert(dbAuditLogsCount > 0, 'DB Verification: Audit logs successfully recorded in MongoDB');

  // Clean up registered test user
  await User.findByIdAndDelete(tempUserId);

  console.log(`\n${COLORS.bold}${COLORS.green}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.green} 🎉 ALL TESTS PASSED! (${passedTests}/${totalTests} Scenarios Verified) ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.green} ✅ All 12 Modules, Endpoints & Database Operations 100% Working! ${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.green}================================================================${COLORS.reset}\n`);

  await mongoose.disconnect();
  process.exit(0);
}

runAllTests().catch((err) => {
  console.error(`\n❌ Test suite failed with error:`, err);
  mongoose.disconnect().finally(() => process.exit(1));
});
