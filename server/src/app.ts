import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { env } from './config/env.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requireAuth, requireRole } from './middlewares/auth.js';
import { ROLES } from './config/constants.js';
import { AppError } from './utils/AppError.js';

// Route imports
import { authRoutes } from './modules/auth/routes.js';
import { userRoutes } from './modules/users/routes.js';
import {
  publicSiteSettingsRoutes,
  adminSiteSettingsRoutes,
} from './modules/siteSettings/routes.js';
import { publicServiceRoutes, adminServiceRoutes } from './modules/services/routes.js';
import { publicCreatorRoutes, adminCreatorRoutes } from './modules/creators/routes.js';
import {
  publicExpertTeamRoutes,
  adminExpertTeamRoutes,
} from './modules/expertTeam/routes.js';
import {
  publicClientResultRoutes,
  adminClientResultRoutes,
} from './modules/clientResults/routes.js';
import {
  publicResourceRoutes,
  adminResourceRoutes,
} from './modules/resources/routes.js';
import { publicBookingRoutes, adminBookingRoutes } from './modules/bookings/routes.js';
import { publicLeadRoutes, adminLeadRoutes } from './modules/leads/routes.js';
import { paymentRoutes } from './modules/payments/routes.js';
import { orderRoutes } from './modules/orders/routes.js';
import { mediaRoutes } from './modules/media/routes.js';
import { auditLogRoutes } from './modules/auditLogs/routes.js';
import { AdminDashboardController } from './modules/admin/dashboardController.js';

export const app = express();

// Security and utility middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
const allowedOrigins = env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',').map((o) => o.trim()) : [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes('*') ||
      /\.vercel\.app$/.test(origin) ||
      /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
      /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
  app.use('/api', globalLimiter);
}

// Serve uploaded media statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    agency: 'AlgoGrowthHub',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes mounting
// Authentication
app.use('/api/v1/auth', authRoutes);

// Public Endpoints
app.use('/api/v1/settings', publicSiteSettingsRoutes);
app.use('/api/v1/site-settings', publicSiteSettingsRoutes);
app.use('/api/v1/services', publicServiceRoutes);
app.use('/api/v1/creators', publicCreatorRoutes);
app.use('/api/v1/expert-team', publicExpertTeamRoutes);
app.use('/api/v1/client-results', publicClientResultRoutes);
app.use('/api/v1/resources', publicResourceRoutes);
app.use('/api/v1/bookings', publicBookingRoutes);
app.use('/api/v1/leads', publicLeadRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Admin CMS Endpoints
app.use('/api/v1/admin/users', userRoutes);
app.use('/api/v1/admin/settings', adminSiteSettingsRoutes);
app.use('/api/v1/admin/site-settings', adminSiteSettingsRoutes);
app.use('/api/v1/admin/services', adminServiceRoutes);
app.use('/api/v1/admin/creators', adminCreatorRoutes);
app.use('/api/v1/admin/expert-team', adminExpertTeamRoutes);
app.use('/api/v1/admin/client-results', adminClientResultRoutes);
app.use('/api/v1/admin/resources', adminResourceRoutes);
app.use('/api/v1/admin/bookings', adminBookingRoutes);
app.use('/api/v1/admin/leads', adminLeadRoutes);
app.use('/api/v1/admin/orders', orderRoutes);
app.use('/api/v1/admin/media', mediaRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/admin/audit-logs', auditLogRoutes);

// Admin Dashboard stats
app.get(
  '/api/v1/admin/dashboard',
  requireAuth,
  requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  AdminDashboardController.getDashboardStats
);

// 404 Route Handler
app.use('*', (req, _res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl} on this server`, 404, 'NOT_FOUND'));
});

// Centralized Global Error Handler
app.use(errorHandler);
