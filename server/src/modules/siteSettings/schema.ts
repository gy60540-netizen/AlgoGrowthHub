import { z } from 'zod';

export const updateSiteSettingsSchema = z.object({
  body: z.object({
    agencyName: z.string().optional(),
    logo: z
      .object({
        url: z.string(),
        altText: z.string().optional(),
      })
      .optional(),
    hero: z
      .object({
        heading: z.string().optional(),
        description: z.string().optional(),
        primaryCta: z.string().optional(),
        primaryCtaUrl: z.string().optional(),
        secondaryCta: z.string().optional(),
        secondaryCtaUrl: z.string().optional(),
        heroImage: z.string().optional(),
        floatingMetrics: z
          .array(
            z.object({
              icon: z.string(),
              value: z.string(),
              label: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    about: z
      .object({
        sectionLabel: z.string().optional(),
        heading: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        metricLabel: z.string().optional(),
        metricValue: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaUrl: z.string().optional(),
        images: z.array(z.string()).optional(),
      })
      .optional(),
    whyChooseUs: z
      .object({
        sectionLabel: z.string().optional(),
        heading: z.string().optional(),
        description: z.string().optional(),
        primaryImage: z.string().optional(),
        secondaryImage: z.string().optional(),
        platforms: z
          .array(
            z.object({
              platform: z.enum(['Facebook', 'Telegram', 'Instagram', 'LinkedIn']),
              metric: z.string(),
              label: z.string(),
              icon: z.string(),
              enabled: z.boolean().default(true),
              order: z.number().default(1),
            })
          )
          .optional(),
      })
      .optional(),
    bookingSection: z
      .object({
        sectionHeading: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        availableServices: z.array(z.string()).optional(),
      })
      .optional(),
    letsWorkWithUs: z
      .object({
        heading: z.string().optional(),
        description: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaUrl: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    footer: z
      .object({
        description: z.string().optional(),
        email: z.string().email().optional(),
        mobile: z.string().optional(),
        instagramUrl: z.string().optional(),
        twitterUrl: z.string().optional(),
        telegramUrl: z.string().optional(),
        copyrightText: z.string().optional(),
      })
      .optional(),
    seoDefaults: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});
