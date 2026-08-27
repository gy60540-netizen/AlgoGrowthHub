import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { env } from '../src/config/env.js';
import { User } from '../src/modules/users/model.js';
import { ROLES, CONTENT_STATUS } from '../src/config/constants.js';
import { Resource } from '../src/modules/resources/model.js';

let superAdminToken = '';
let testFreeResourceId = '';
let testPremiumResourceId = '';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(env.MONGO_URI);
  }

  // Ensure super admin user exists
  await User.deleteOne({ email: 'testadmin@algogrowthhub.com' });
  await User.create({
    name: 'Test Super Admin',
    email: 'testadmin@algogrowthhub.com',
    password: 'Password@123',
    role: ROLES.SUPER_ADMIN,
    isActive: true,
  });

  // Login to get token
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'testadmin@algogrowthhub.com',
    password: 'Password@123',
  });
  superAdminToken = res.body.data.accessToken;

  // Create test free and premium resources
  await Resource.deleteMany({ slug: { $in: ['test-free-guide', 'test-premium-kit'] } });

  const freeResource = await Resource.create({
    title: 'Test Free Guide',
    slug: 'test-free-guide',
    description: 'Free testing resource',
    thumbnail: 'https://example.com/thumb.jpg',
    fileKey: 'uploads/test_free.pdf',
    fileName: 'test_free.pdf',
    type: 'free',
    fileFormat: 'pdf',
    price: 0,
    isPublished: true,
    status: CONTENT_STATUS.PUBLISHED,
  });
  testFreeResourceId = freeResource.id;

  const premiumResource = await Resource.create({
    title: 'Test Premium Kit',
    slug: 'test-premium-kit',
    description: 'Premium testing resource',
    thumbnail: 'https://example.com/thumb.jpg',
    fileKey: 'uploads/test_premium.zip',
    fileName: 'test_premium.zip',
    type: 'premium',
    fileFormat: 'zip',
    price: 999,
    isPublished: true,
    status: CONTENT_STATUS.PUBLISHED,
  });
  testPremiumResourceId = premiumResource.id;
});

afterAll(async () => {
  await User.deleteOne({ email: 'testadmin@algogrowthhub.com' });
  await Resource.deleteMany({ slug: { $in: ['test-free-guide', 'test-premium-kit'] } });
  await mongoose.disconnect();
});

describe('1. System Health & Infrastructure', () => {
  it('GET /api/health should return ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.agency).toBe('AlgoGrowthHub');
  });
});

describe('2. Authentication & Authorization', () => {
  it('POST /api/v1/auth/login with valid credentials succeeds', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'testadmin@algogrowthhub.com',
      password: 'Password@123',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.email).toBe('testadmin@algogrowthhub.com');
  });

  it('POST /api/v1/auth/login with wrong password returns 401', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'testadmin@algogrowthhub.com',
      password: 'WrongPassword!',
    });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('AUTHENTICATION_ERROR');
  });

  it('GET /api/v1/auth/me with Bearer token returns profile', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${superAdminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('testadmin@algogrowthhub.com');
    expect(res.body.data.role).toBe(ROLES.SUPER_ADMIN);
  });
});

describe('3. Public Endpoints', () => {
  it('GET /api/v1/site-settings returns default settings', async () => {
    const res = await request(app).get('/api/v1/site-settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.agencyName).toBe('AlgoGrowthHub');
  });

  it('GET /api/v1/services returns published services list', async () => {
    const res = await request(app).get('/api/v1/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/creators returns published creators', async () => {
    const res = await request(app).get('/api/v1/creators');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/v1/expert-team returns published team members', async () => {
    const res = await request(app).get('/api/v1/expert-team');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('4. Resource Downloads & Payment Flow', () => {
  it('GET /api/v1/resources/:id/download for Free resource returns download access immediately', async () => {
    const res = await request(app).get(`/api/v1/resources/${testFreeResourceId}/download`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.fileName).toBe('test_free.pdf');
  });

  it('GET /api/v1/resources/:id/download for Premium resource without token returns 403 Forbidden', async () => {
    const res = await request(app).get(`/api/v1/resources/${testPremiumResourceId}/download`);
    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('RESOURCE_ACCESS_DENIED');
  });

  it('POST /api/v1/payments/checkout initiates order for premium resource', async () => {
    const res = await request(app).post('/api/v1/payments/checkout').send({
      resourceId: testPremiumResourceId,
      userEmail: 'buyer@example.com',
      userName: 'John Buyer',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderId).toBeDefined();
    expect(res.body.data.amount).toBe(999);

    const orderId = res.body.data.orderId;

    // Verify payment
    const verifyRes = await request(app).post('/api/v1/payments/verify').send({
      orderId,
      paymentId: 'pay_test_12345',
      signature: 'mock_sig_12345',
    });
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.data.downloadToken).toBeDefined();

    // Now download premium resource using the verified token
    const token = verifyRes.body.data.downloadToken;
    const downloadRes = await request(app).get(
      `/api/v1/resources/${testPremiumResourceId}/download?token=${token}`
    );
    expect(downloadRes.status).toBe(200);
    expect(downloadRes.body.data.fileName).toBe('test_premium.zip');
  });
});

describe('5. Call Session Bookings & Leads', () => {
  it('POST /api/v1/bookings submits strategy session request', async () => {
    const res = await request(app).post('/api/v1/bookings').send({
      name: 'Sarah Connor',
      email: 'sarah@skynetgrowth.com',
      phone: '+91 9988776655',
      company: 'Skynet Media',
      service: 'Instagram & Reels Growth',
      preferredDate: '2026-09-01',
      preferredTime: '15:00',
      message: 'Looking to scale our reels engagement.',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('PENDING');
  });

  it('POST /api/v1/leads submits lead capture form', async () => {
    const res = await request(app).post('/api/v1/leads').send({
      name: 'David Miller',
      email: 'david@millergrowth.com',
      phone: '+91 9123456780',
      company: 'Miller Agency',
      service: 'Social Media Management',
      budgetRange: '₹50,000 - ₹1,00,000 / month',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('NEW');
  });
});

describe('6. Admin CMS & Dashboard', () => {
  it('GET /api/v1/admin/dashboard returns summary stats', async () => {
    const res = await request(app)
      .get('/api/v1/admin/dashboard')
      .set('Authorization', `Bearer ${superAdminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.summary).toBeDefined();
    expect(res.body.data.summary.totalLeads).toBeGreaterThanOrEqual(1);
    expect(res.body.data.summary.upcomingBookings).toBeGreaterThanOrEqual(1);
  });
});
