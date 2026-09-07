export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER',
  PARTNER: 'PARTNER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  SITE_SETTINGS_VIEW: 'site_settings.view',
  SITE_SETTINGS_MANAGE: 'site_settings.manage',

  SERVICES_VIEW: 'services.view',
  SERVICES_MANAGE: 'services.manage',

  CREATORS_VIEW: 'creators.view',
  CREATORS_MANAGE: 'creators.manage',

  EXPERT_TEAM_VIEW: 'expert_team.view',
  EXPERT_TEAM_MANAGE: 'expert_team.manage',

  CLIENT_RESULTS_VIEW: 'client_results.view',
  CLIENT_RESULTS_MANAGE: 'client_results.manage',

  RESOURCES_VIEW: 'resources.view',
  RESOURCES_MANAGE: 'resources.manage',

  ORDERS_VIEW: 'orders.view',
  ORDERS_MANAGE: 'orders.manage',

  PAYMENTS_VIEW: 'payments.view',
  PAYMENTS_MANAGE: 'payments.manage',

  BOOKINGS_VIEW: 'bookings.view',
  BOOKINGS_MANAGE: 'bookings.manage',

  LEADS_VIEW: 'leads.view',
  LEADS_MANAGE: 'leads.manage',

  MEDIA_VIEW: 'media.view',
  MEDIA_MANAGE: 'media.manage',

  USERS_VIEW: 'users.view',
  USERS_MANAGE: 'users.manage',

  ROLES_VIEW: 'roles.view',
  ROLES_MANAGE: 'roles.manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  ADMIN: Object.values(PERMISSIONS),
  USER: [],
  PARTNER: [],
};

export const CONTENT_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type ContentStatus = (typeof CONTENT_STATUS)[keyof typeof CONTENT_STATUS];

export const ORDER_STATUS = {
  CREATED: 'CREATED',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FULFILLED: 'FULFILLED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_STATUS = {
  INITIATED: 'INITIATED',
  PENDING: 'PENDING',
  AUTHORIZED: 'AUTHORIZED',
  CAPTURED: 'CAPTURED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const LEAD_STATUS = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  PROPOSAL_SENT: 'PROPOSAL_SENT',
  WON: 'WON',
  LOST: 'LOST',
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];

export const RESOURCE_TYPE = {
  FREE: 'free',
  PREMIUM: 'premium',
} as const;

export const RESOURCE_FILE_FORMAT = {
  PDF: 'pdf',
  ZIP: 'zip',
  MP4: 'mp4',
} as const;
