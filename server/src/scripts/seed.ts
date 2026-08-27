import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { ROLES, CONTENT_STATUS } from '../config/constants.js';
import { User } from '../modules/users/model.js';
import { SiteSettings } from '../modules/siteSettings/model.js';
import { Service } from '../modules/services/model.js';
import { Creator } from '../modules/creators/model.js';
import { ExpertTeamMember } from '../modules/expertTeam/model.js';
import { ClientResult } from '../modules/clientResults/model.js';
import { Resource } from '../modules/resources/model.js';

async function seedDatabase() {
  console.log('🌱 Connecting to MongoDB for seeding...');
  await mongoose.connect(env.MONGO_URI);
  console.log('✅ Connected to MongoDB.');

  // 1. Seed Super Admin User
  const existingAdmin = await User.findOne({ email: env.SUPER_ADMIN_EMAIL.toLowerCase() });
  if (!existingAdmin) {
    await User.create({
      name: env.SUPER_ADMIN_NAME,
      email: env.SUPER_ADMIN_EMAIL,
      password: env.SUPER_ADMIN_PASSWORD,
      role: ROLES.SUPER_ADMIN,
      isActive: true,
    });
    console.log(`👤 Created Super Admin account: ${env.SUPER_ADMIN_EMAIL}`);
  } else {
    console.log(`ℹ️ Super Admin account already exists: ${env.SUPER_ADMIN_EMAIL}`);
  }

  // 2. Seed Site Settings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({});
    console.log('⚙️ Default SiteSettings created.');
  }

  // 3. Seed 9 Services for 3x3 Mixed Grid
  const servicesCount = await Service.countDocuments();
  if (servicesCount === 0) {
    const servicesData = [
      {
        title: 'Social Media Management',
        slug: 'social-media-management',
        shortDescription: 'Full-spectrum organic account management, posting schedules, and viral hooks engineered for high engagement.',
        longDescription: 'End-to-end management of your social presence. We handle daily content distribution, engagement loops, and community management.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
        features: ['Daily audience engagement', 'Content calendar curation', 'Cross-platform syndication'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 1,
      },
      {
        title: 'Content Strategy & Scripting',
        slug: 'content-strategy',
        shortDescription: 'Targeted content funnels, data-backed scripting, and high-retention frameworks crafted for your niche.',
        longDescription: 'We build proven content frameworks that attract your ideal audience and convert passive viewers into active brand advocates.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        features: ['Data-driven topic research', 'Hook & pacing optimization', 'Multi-format repurposing'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 2,
      },
      {
        title: 'Instagram & Reels Growth',
        slug: 'instagram-growth',
        shortDescription: 'Algorithmic short-form video optimization designed to generate millions of targeted views and followers.',
        longDescription: 'Our signature short-form acceleration program. We optimize editing rhythm, thumbnail psychology, and retention analytics.',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80',
        features: ['Cinematic color grading', 'Dynamic caption animations', 'Trending sound leverage'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 3,
      },
      {
        title: 'Reels / Short-Form Production',
        slug: 'reels-production',
        shortDescription: 'Turn raw footage into viral masterpieces with professional motion graphics, pacing, and sound design.',
        longDescription: 'Full video post-production pipeline delivering high-converting short-form assets for TikTok, Instagram Reels, and YouTube Shorts.',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
        features: ['High-energy jump cuts', 'Custom sound effects', '4K rendering & optimization'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 4,
      },
      {
        title: 'Brand Positioning & Identity',
        slug: 'brand-strategy',
        shortDescription: 'Establish unmistakable visual and ideological authority in your industry to command premium pricing.',
        longDescription: 'Transform your brand perception from a generic service into an aspirational market category leader.',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
        features: ['Visual design tokens', 'Tone-of-voice playbook', 'Competitive moat analysis'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 5,
      },
      {
        title: 'Creator & Influencer Marketing',
        slug: 'creator-marketing',
        shortDescription: 'Leverage our exclusive network of vetted creators for authentic endorsements and viral product launches.',
        longDescription: 'Connect directly with high-engagement niche creators to achieve rapid brand distribution and organic word-of-mouth.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
        features: ['Vetted creator roster', 'Contract & payout management', 'Direct attribution tracking'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 6,
      },
      {
        title: 'Community Scaling & Retention',
        slug: 'community-growth',
        shortDescription: 'Build passionate, self-sustaining communities on Telegram and Discord that drive recurring conversions.',
        longDescription: 'Cultivate deep loyalty by turning casual social followers into active participants in private brand communities.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        features: ['Automated onboarding bots', 'Exclusive member events', 'Moderation workflows'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 7,
      },
      {
        title: 'Social Analytics & Attribution',
        slug: 'social-media-analytics',
        shortDescription: 'Real-time dashboards measuring follower retention, click-through efficiency, and pipeline ROI.',
        longDescription: 'Transparent reporting tracking every rupee spent and every view generated down to bottom-line business metrics.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        features: ['Custom attribution dashboards', 'Cohort retention analysis', 'Monthly strategy reviews'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 8,
      },
      {
        title: 'Paid Performance Campaigns',
        slug: 'campaign-management',
        shortDescription: 'High-converting Meta & Google ad campaigns engineered to amplify your top-performing organic assets.',
        longDescription: 'Supercharge your organic growth with precision-targeted paid social ads that drive qualified leads and e-commerce purchases.',
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=80',
        features: ['High-converting UGC ads', 'Pixel & CAPI integration', 'ROAS-driven scaling'],
        ctaLabel: 'Read More →',
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
        order: 9,
      },
    ];
    await Service.insertMany(servicesData);
    console.log('📦 Seeded 9 Mixed Grid Services.');
  }

  // 4. Seed Creator Community (Instagram ONLY)
  const creatorsCount = await Creator.countDocuments();
  if (creatorsCount === 0) {
    const creatorsData = [
      {
        name: 'Aryan Mehta',
        profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
        bio: 'Tech & AI educator breaking down complex automation into bite-sized reels.',
        niche: 'AI & Tech Innovation',
        instagramUsername: 'aryan.builds',
        instagramUrl: 'https://instagram.com/aryan.builds',
        followerCount: '280K+',
        isFeatured: true,
        order: 1,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Priya Sharma',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        bio: 'Lifestyle & business growth creator helping female founders scale digital brands.',
        niche: 'E-commerce & Lifestyle',
        instagramUsername: 'priyagrowth',
        instagramUrl: 'https://instagram.com/priyagrowth',
        followerCount: '540K+',
        isFeatured: true,
        order: 2,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Rohit Varma',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
        bio: 'Fitness & longevity strategist delivering science-based physical training frameworks.',
        niche: 'Fitness & Longevity',
        instagramUsername: 'rohitvarma_fit',
        instagramUrl: 'https://instagram.com/rohitvarma_fit',
        followerCount: '190K+',
        isFeatured: true,
        order: 3,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Sneha Roy',
        profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        bio: 'Visual storyteller and motion designer sharing aesthetic video editing techniques.',
        niche: 'Video & Motion Design',
        instagramUsername: 'sneha_edits',
        instagramUrl: 'https://instagram.com/sneha_edits',
        followerCount: '370K+',
        isFeatured: true,
        order: 4,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
    ];
    await Creator.insertMany(creatorsData);
    console.log('🌟 Seeded 4 Instagram-only Creators.');
  }

  // 5. Seed Expert Team (Instagram + LinkedIn ONLY)
  const teamCount = await ExpertTeamMember.countDocuments();
  if (teamCount === 0) {
    const teamData = [
      {
        name: 'Alex Buckmaster',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
        role: 'Chief Growth Strategist',
        instagramUrl: 'https://instagram.com/alexbuckmaster',
        linkedinUrl: 'https://linkedin.com/in/alexbuckmaster',
        isFeatured: true,
        order: 1,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Sophia Patel',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
        role: 'Head of Content & Viral Loops',
        instagramUrl: 'https://instagram.com/sophiapatel',
        linkedinUrl: 'https://linkedin.com/in/sophiapatel',
        isFeatured: true,
        order: 2,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Marcus Vance',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
        role: 'Creative Production Director',
        instagramUrl: 'https://instagram.com/marcusvance',
        linkedinUrl: 'https://linkedin.com/in/marcusvance',
        isFeatured: true,
        order: 3,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        name: 'Elena Rostova',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
        role: 'Performance Marketing Lead',
        instagramUrl: 'https://instagram.com/elenarostova',
        linkedinUrl: 'https://linkedin.com/in/elenarostova',
        isFeatured: true,
        order: 4,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
    ];
    await ExpertTeamMember.insertMany(teamData);
    console.log('💼 Seeded 4 Expert Team Members.');
  }

  // 6. Seed Client Results (Before/After + Star Rating)
  const clientResultsCount = await ClientResult.countDocuments();
  if (clientResultsCount === 0) {
    const resultsData = [
      {
        clientName: 'Nexus Tech Solutions',
        beforeImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
        afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        rating: 5,
        isFeatured: true,
        order: 1,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        clientName: 'ZenFit Activewear',
        beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
        afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        rating: 5,
        isFeatured: true,
        order: 2,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        clientName: 'FinPulse Media',
        beforeImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
        afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        rating: 5,
        isFeatured: true,
        order: 3,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        clientName: 'Nova Botanicals',
        beforeImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        afterImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        rating: 5,
        isFeatured: true,
        order: 4,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
    ];
    await ClientResult.insertMany(resultsData);
    console.log('🏆 Seeded 4 Client Results Showcases.');
  }

  // 7. Seed Resources (Free vs Premium)
  const resourcesCount = await Resource.countDocuments();
  if (resourcesCount === 0) {
    const resourcesData = [
      {
        title: '2026 Viral Instagram Hooks & Scripting Bible',
        slug: '2026-viral-instagram-hooks',
        description: 'Over 150+ battle-tested hook formulas categorized by niche to skyrocket your short-form video watch time.',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        fileKey: 'resources/free_viral_hooks_2026.pdf',
        fileName: 'Viral_Hooks_Bible_AlgoGrowthHub.pdf',
        fileSize: 4200000,
        type: 'free',
        fileFormat: 'pdf',
        price: 0,
        currency: 'INR',
        isFeatured: true,
        order: 1,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        title: 'Social Media Agency Scaling Operating System',
        slug: 'agency-scaling-os',
        description: 'Complete Notion workspace, onboarding agreements, SOPs, and client reporting templates used by 7-figure agencies.',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        fileKey: 'resources/agency_scaling_os.zip',
        fileName: 'Agency_Scaling_OS_Complete.zip',
        fileSize: 18500000,
        type: 'premium',
        fileFormat: 'zip',
        price: 1499,
        currency: 'INR',
        isFeatured: true,
        order: 2,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        title: '90-Day High-Ticket Client Acquisition Playbook',
        slug: 'high-ticket-client-acquisition',
        description: 'Step-by-step outreach sequences, cold Loom audit scripts, and proposal frameworks that close ₹1L+ retainers.',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        fileKey: 'resources/client_acquisition_playbook.pdf',
        fileName: 'High_Ticket_Acquisition_Playbook.pdf',
        fileSize: 8900000,
        type: 'premium',
        fileFormat: 'pdf',
        price: 2999,
        currency: 'INR',
        isFeatured: true,
        order: 3,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
      {
        title: 'Masterclass: Viral Short-Form Video Editing Bootcamp',
        slug: 'viral-video-editing-bootcamp',
        description: '3+ hours of high-definition video walkthroughs on Adobe Premiere & After Effects pacing, SFX layering, and retention hacks.',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        fileKey: 'resources/video_editing_masterclass.mp4',
        fileName: 'Viral_Video_Masterclass_1080p.mp4',
        fileSize: 45000000,
        type: 'premium',
        fileFormat: 'mp4',
        price: 3499,
        currency: 'INR',
        isFeatured: true,
        order: 4,
        status: CONTENT_STATUS.PUBLISHED,
        isPublished: true,
      },
    ];
    await Resource.insertMany(resourcesData);
    console.log('📚 Seeded 4 Free and Premium Digital Resources.');
  }

  console.log('✨ All AlgoGrowthHub backend data seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
