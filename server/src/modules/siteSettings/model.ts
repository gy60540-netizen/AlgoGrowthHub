import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  agencyName: string;
  logo: {
    url: string;
    altText?: string;
  };
  theme?: {
    preset: string;
    primaryColor: string;
    primaryHover: string;
    secondaryColor: string;
    accentColor: string;
    backgroundLight: string;
    backgroundSoft: string;
    backgroundDark: string;
    surfaceCard: string;
    textPrimary: string;
    textSecondary: string;
    borderRadius: string;
    mode: 'light' | 'dark' | 'system';
  };
  hero: {
    heading: string;
    description: string;
    primaryCta: string;
    primaryCtaUrl: string;
    secondaryCta: string;
    secondaryCtaUrl: string;
    heroImage: string;
    floatingMetrics: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
  };
  about: {
    sectionLabel: string;
    heading: string;
    description: string;
    features: string[];
    metricLabel: string;
    metricValue: string;
    ctaLabel: string;
    ctaUrl: string;
    images: string[];
  };
  whyChooseUs: {
    sectionLabel: string;
    heading: string;
    description: string;
    primaryImage: string;
    secondaryImage?: string;
    platforms: Array<{
      platform: 'Facebook' | 'Telegram' | 'Instagram' | 'LinkedIn';
      metric: string;
      label: string;
      icon: string;
      enabled: boolean;
      order: number;
    }>;
  };
  bookingSection: {
    sectionHeading: string;
    description: string;
    image: string;
    availableServices: string[];
  };
  letsWorkWithUs: {
    heading: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
    image: string;
  };
  footer: {
    description: string;
    email: string;
    mobile: string;
    instagramUrl: string;
    twitterUrl: string;
    telegramUrl: string;
    copyrightText: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    ogImage?: string;
    keywords?: string[];
  };
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    agencyName: { type: String, default: 'AlgoGrowthHub' },
    logo: {
      url: { type: String, default: '/assets/logo.png' },
      altText: { type: String, default: 'AlgoGrowthHub Logo' },
    },
    theme: {
      preset: { type: String, default: 'Royal Blue' },
      primaryColor: { type: String, default: '#2563EB' },
      primaryHover: { type: String, default: '#1D4ED8' },
      secondaryColor: { type: String, default: '#38BDF8' },
      accentColor: { type: String, default: '#0284C7' },
      backgroundLight: { type: String, default: '#FFFFFF' },
      backgroundSoft: { type: String, default: '#F4F8FC' },
      backgroundDark: { type: String, default: '#090D16' },
      surfaceCard: { type: String, default: '#FFFFFF' },
      textPrimary: { type: String, default: '#0F172A' },
      textSecondary: { type: String, default: '#475569' },
      borderRadius: { type: String, default: '9999px' },
      mode: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
    },
    hero: {
      heading: { type: String, default: 'Elevate Your Brand With Social Media Excellence' },
      description: {
        type: String,
        default:
          'We Help Your Brand Stand Out And Thrive In The Digital Landscape. From Engaging Content Creation To Targeted Ad Campaigns, We Are Here To Drive Your Success.',
      },
      primaryCta: { type: String, default: 'Get Started Now' },
      primaryCtaUrl: { type: String, default: '/#booking' },
      secondaryCta: { type: String, default: 'Learn More' },
      secondaryCtaUrl: { type: String, default: '/#about' },
      heroImage: { type: String, default: '/assets/heroImg.png' },
      floatingMetrics: [
        {
          icon: { type: String, default: 'instagram' },
          value: { type: String, default: '10M+' },
          label: { type: String, default: 'Monthly Impressions' },
        },
        {
          icon: { type: String, default: 'trending-up' },
          value: { type: String, default: '350%' },
          label: { type: String, default: 'Average ROI' },
        },
      ],
    },
    about: {
      sectionLabel: { type: String, default: 'About AlgoGrowthHub' },
      heading: { type: String, default: 'Transforming Business Through Social Media' },
      description: {
        type: String,
        default:
          'We engineer social presence into predictable pipeline. Our tailored strategies fuse viral storytelling with technical audience acquisition.',
      },
      features: {
        type: [String],
        default: [
          'Algorithmic content optimization for multi-platform distribution',
          'Data-backed audience acquisition and engagement loops',
          'High-converting social funnel architecture and creator networks',
        ],
      },
      metricLabel: { type: String, default: 'Total Creator Reach' },
      metricValue: { type: String, default: '25M+' },
      ctaLabel: { type: String, default: 'Learn More' },
      ctaUrl: { type: String, default: '/about' },
      images: { type: [String], default: ['/assets/about-main.png'] },
    },
    whyChooseUs: {
      sectionLabel: { type: String, default: 'Why Choose Us' },
      heading: { type: String, default: 'Your Success, Our Priority' },
      description: {
        type: String,
        default:
          'We deliver transparent analytics and measurable revenue impact across the four most vital growth channels.',
      },
      primaryImage: { type: String, default: '/assets/why-choose-us.png' },
      secondaryImage: { type: String },
      platforms: [
        {
          platform: { type: String, enum: ['Facebook', 'Telegram', 'Instagram', 'LinkedIn'] },
          metric: { type: String, default: '500K+' },
          label: { type: String, default: 'Community Reach' },
          icon: { type: String, default: 'facebook' },
          enabled: { type: Boolean, default: true },
          order: { type: Number, default: 1 },
        },
        {
          platform: { type: String, enum: ['Facebook', 'Telegram', 'Instagram', 'LinkedIn'] },
          metric: { type: String, default: '120K+' },
          label: { type: String, default: 'Subscribers' },
          icon: { type: String, default: 'telegram' },
          enabled: { type: Boolean, default: true },
          order: { type: Number, default: 2 },
        },
        {
          platform: { type: String, enum: ['Facebook', 'Telegram', 'Instagram', 'LinkedIn'] },
          metric: { type: String, default: '2.5M+' },
          label: { type: String, default: 'Viral Views' },
          icon: { type: String, default: 'instagram' },
          enabled: { type: Boolean, default: true },
          order: { type: Number, default: 3 },
        },
        {
          platform: { type: String, enum: ['Facebook', 'Telegram', 'Instagram', 'LinkedIn'] },
          metric: { type: String, default: '85K+' },
          label: { type: String, default: 'B2B Connections' },
          icon: { type: String, default: 'linkedin' },
          enabled: { type: Boolean, default: true },
          order: { type: Number, default: 4 },
        },
      ],
    },
    bookingSection: {
      sectionHeading: { type: String, default: 'Book a 1-on-1 Growth Strategy Session' },
      description: {
        type: String,
        default:
          'Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through.',
      },
      image: { type: String, default: '/assets/booking-visual.png' },
      availableServices: {
        type: [String],
        default: [
          'Full Social Media Management',
          'Carousal Design',
          'Vedio Editing',
          'Web Devolopment',
          'Ai Agent Building',
          'Digital Assets',
        ],
      },
    },
    letsWorkWithUs: {
      heading: { type: String, default: "Ready to Scale? Let's Work Together." },
      description: {
        type: String,
        default:
          'Join over 150+ brands and creators dominating their digital space with AlgoGrowthHub.',
      },
      ctaLabel: { type: String, default: 'Book a Call Session →' },
      ctaUrl: { type: String, default: '/book-session' },
      image: { type: String, default: '/assets/cta-banner.png' },
    },
    footer: {
      description: {
        type: String,
        default:
          'AlgoGrowthHub is a premier digital growth agency specializing in high-performance social media architecture, creator community scaling, and revenue conversion.',
      },
      email: { type: String, default: 'algowinner01official@gmail.com' },
      mobile: { type: String, default: '+91 9369348311' },
      instagramUrl: { type: String, default: 'https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0' },
      twitterUrl: { type: String, default: 'https://x.com/algowinner01' },
      telegramUrl: { type: String, default: 'https://t.me/algowinner01' },
      copyrightText: { type: String, default: '© 2026 AlgoGrowthHub. All rights reserved.' },
    },
    seoDefaults: {
      title: { type: String, default: 'AlgoGrowthHub — Modern Social Media & Digital Growth Agency' },
      description: {
        type: String,
        default:
          'Transform your business through high-impact social media management, viral reels strategy, creator community partnerships, and data-driven marketing.',
      },
      ogImage: { type: String, default: '/assets/og-image.jpg' },
      keywords: {
        type: [String],
        default: ['social media agency', 'creator growth', 'instagram reels strategy', 'digital marketing'],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
