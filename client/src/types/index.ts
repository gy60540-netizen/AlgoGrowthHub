export interface HeroSettings {
  badge?: string;
  badgeText?: string;
  heading?: string;
  headline?: string;
  subheading?: string;
  subheadline?: string;
  description: string;
  ctaText1: string;
  ctaLink1: string;
  ctaText2: string;
  ctaLink2: string;
  heroImage: string;
  floatingStats: {
    label: string;
    value: string;
  }[];
}

export interface AboutSettings {
  sectionLabel: string;
  heading: string;
  description: string;
  features: string[];
  metricLabel: string;
  metricValue: string;
  ctaLabel: string;
  ctaUrl: string;
  images: string[];
}

export interface WhyChooseUsCard {
  platform: 'Facebook' | 'Telegram' | 'Instagram' | 'LinkedIn';
  metric: string;
  label: string;
  icon?: string;
  enabled: boolean;
  order: number;
}

export interface WhyChooseUsSettings {
  sectionLabel: string;
  heading: string;
  description: string;
  primaryImage: string;
  secondaryImage?: string;
  platformCards: WhyChooseUsCard[];
}

export interface BookingSectionSettings {
  sectionHeading: string;
  description: string;
  image: string;
  availableServices: string[];
}

export interface LetsWorkWithUsSettings {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: string;
}

export interface FooterSettings {
  aboutText?: string;
  copyrightText?: string;
  description?: string;
  email?: string;
  mobile?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface SiteSettings {
  agencyName: string;
  logo: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  hero: HeroSettings;
  about: AboutSettings;
  whyChooseUs: WhyChooseUsSettings;
  bookingSection: BookingSectionSettings;
  letsWorkWithUs: LetsWorkWithUsSettings;
  footer: FooterSettings;
}

export interface Service {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  features: string[];
  ctaLabel: string;
  ctaUrl?: string;
  image: string;
  icon?: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
}

export interface Creator {
  _id?: string;
  id?: string;
  name: string;
  profileImage: string;
  bio: string;
  niche: string;
  instagramUsername: string;
  instagramUrl: string;
  followerCount: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
}

export interface ExpertTeamMember {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  image: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  bio?: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
}

export interface ClientResult {
  _id?: string;
  id?: string;
  clientName: string;
  clientHandle?: string;
  platform?: string;
  beforeImage: string;
  afterImage: string;
  metricsSummary?: string;
  metricsValue?: string;
  growthPercentage?: string;
  testimonial?: string;
  rating: number;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
}

export interface Resource {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  thumbnail: string;
  fileKey?: string;
  fileName?: string;
  fileFormat?: 'pdf' | 'zip' | 'mp4';
  fileSize?: number;
  fileUrl?: string;
  downloadCount?: number;
  type: 'free' | 'premium';
  price?: number;
  currency?: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
  description?: string;
  createdAt?: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  timezone?: string;
  message?: string;
  amount?: number;
  referralCode?: string;
}

export interface Booking {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  timezone?: string;
  message?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  provider?: string;
  providerOrderId?: string;
  providerPaymentId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatorApplicationPayload {
  name: string;
  email: string;
  phone: string;
  platform: 'Instagram' | 'YouTube' | 'Telegram' | 'LinkedIn';
  socialLink: string;
  followerCount?: string;
  niche?: string;
  message?: string;
  leadType?: string;
}

export interface Lead {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  platform?: string;
  socialLink?: string;
  instagram?: string;
  followerCount?: string;
  company?: string;
  service?: string;
  budgetRange?: string;
  leadType?: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'WON' | 'LOST';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user' | 'partner' | 'PARTNER';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface PartnerLink {
  id?: string;
  _id?: string;
  code: string;
  resourceId?: string;
  resourceTitle?: string;
  targetUrl: string;
  fullUrl: string;
  clicksCount: number;
  viewsCount: number;
  salesCount: number;
  revenueGenerated: number;
  isActive: boolean;
  createdAt: string;
}

export interface Partner {
  _id: string;
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'DISABLED';
  notes?: string;
  linksCount: number;
  totalClicks: number;
  totalSales: number;
  totalRevenue: number;
  conversionRate: string;
  links: PartnerLink[];
  stats?: {
    totalClicks: number;
    uniqueVisitors: number;
    totalPurchases: number;
    totalRevenue: number;
  };
  createdAt: string;
}

export interface PartnerDashboardData {
  partner: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
  metrics: {
    totalClicks: number;
    uniqueVisitors: number;
    resourceViews: number;
    purchases: number;
    revenueGenerated: number;
    conversionRate: string;
  };
  links: PartnerLink[];
}

export interface PartnerLead {
  _id: string;
  customerName: string;
  customerEmail: string;
  itemTitle: string;
  amount: number;
  currency: string;
  status: string;
  paymentStatus: string;
  referralCode: string;
  createdAt: string;
}

export interface CreatePartnerPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  initialCode?: string;
  referralCode?: string;
  resourceId?: string;
  initialResourceId?: string;
  notes?: string;
}
