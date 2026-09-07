import axios from 'axios';
import { 
  SiteSettings, 
  Service, 
  Creator, 
  ExpertTeamMember, 
  ClientResult, 
  Resource,
  BookingPayload,
  CreatorApplicationPayload,
  Lead,
  Partner,
  PartnerDashboardData,
  PartnerLead,
  CreatePartnerPayload
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://algogrowthhub.onrender.com/api/v1' : '/api/v1');

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback Defaults
export const defaultSiteSettings: SiteSettings = {
  agencyName: "AlgoGrowthHub",
  logo: "/logo.png",
  tagline: "High-Impact Social Growth & Video Ecosystem",
  contactEmail: "algowinner01official@gmail.com",
  contactPhone: "+91 9369348311",
  contactAddress: "Mumbai & Bangalore, India",
  socialLinks: [
    { platform: "Instagram", url: "https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0" },
    { platform: "YouTube", url: "https://youtube.com/@algogrowthhub" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/algogrowthhub" },
    { platform: "Telegram", url: "https://t.me/algowinner01" }
  ],

  hero: {
    badgeText: "Real Growth. Real Numbers.",
    headline: "We Turn Social Attention Into Real Growth.",
    subheadline: "We plan, create, and manage social media strategies that help brands reach the right audience, build a stronger presence, and grow.",
    description: "We plan, create, and manage social media strategies that help brands reach the right audience, build a stronger presence, and grow.",
    ctaText1: "Get Started →",
    ctaLink1: "/book-session",
    ctaText2: "Explore Services",
    ctaLink2: "#services",
    heroImage: "/hero-bg.jpg",
    floatingStats: [
      { label: "Audience Growth", value: "+480%" },
      { label: "Followers", value: "380.5K" },
      { label: "Content Reach", value: "12.4M+" }
    ]
  },
  about: {
    sectionLabel: "WHO WE ARE",
    heading: "We Help Brands Grow Where People Spend Their Time.",
    description: "AlgoGrowthHub helps businesses and creators build a stronger presence on social media. We handle strategy, content, campaigns, and performance so you can focus on your business.",
    features: [
      "Clear direction before we create.",
      "Content made for your audience and your goals.",
      "We track what works and improve what doesn't.",
      "We keep testing, learning, and improving."
    ],
    metricLabel: "Active Partnerships",
    metricValue: "50+",
    ctaLabel: "Learn More About Us",
    ctaUrl: "/about",
    images: [
      "/about-team.png",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  whyChooseUs: {
    sectionLabel: "WHY CHOOSE US",
    heading: "Your Success, Our Priority",
    description: "We focus on clear communication, useful ideas, consistent work, and measurable progress.",
    primaryImage: "/why-choose-us.png",
    platformCards: [
      { platform: "Instagram", metric: "Clear Strategy", label: "We start with your goals and build a plan around them.", enabled: true, order: 1 },
      { platform: "LinkedIn", metric: "Quality Content", label: "Content that looks good, feels natural, and fits your audience.", enabled: true, order: 2 },
      { platform: "Telegram", metric: "Regular Reporting", label: "See what is working and where we can improve.", enabled: true, order: 3 },
      { platform: "Facebook", metric: "Long-Term Support", label: "We work with you beyond a single campaign.", enabled: true, order: 4 }
    ]
  },
  bookingSection: {
    sectionHeading: "Book A Call",
    description: "Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through.",
    image: "/booking-call.png",
    availableServices: [
      "Full Social Media Management",
      "Carousal Design",
      "Vedio Editing",
      "Web Devolopment",
      "Ai Agent Building",
      "Digital Assets"
    ]
  },
  letsWorkWithUs: {
    heading: "We Bring the Deals. You Bring the Influence.",
    description: "Join our creator community and get access to brand deals, paid collaborations, campaigns, and new opportunities.",
    ctaLabel: "Join Our Creator Community →",
    ctaUrl: "#work-with-us",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
  },
  footer: {
    aboutText: "AlgoGrowthHub is a dedicated social media agency helping ambitious brands and creators build an engaged audience and grow sustainably.",
    description: "AlgoGrowthHub is the premier social media growth agency and creator ecosystem helping visionary brands and creators command algorithmic attention.",
    email: "algowinner01official@gmail.com",
    mobile: "+91 9369348311",
    instagramUrl: "https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0",
    twitterUrl: "https://x.com/algowinner01",
    telegramUrl: "https://t.me/algowinner01",
    copyrightText: "© 2026 AlgoGrowthHub. All rights reserved.",
    socialLinks: [
      { platform: "Instagram", url: "https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0" },
      { platform: "YouTube", url: "https://youtube.com/@algogrowthhub" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/algogrowthhub" },
      { platform: "Telegram", url: "https://t.me/algowinner01" }
    ]
  }
};

export const defaultServices: Service[] = [
  {
    title: "Social Media Management",
    slug: "social-media-management",
    shortDescription: "Complete management of your channels, from scheduling and publishing to daily community engagement.",
    features: ["Posting schedule & calendar", "Community engagement & comments", "Channel health & updates"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 1,
    isPublished: true
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    shortDescription: "Engaging posts, graphics, and carousel designs crafted to capture interest and build trust.",
    features: ["Custom visual designs", "Clear and engaging copywriting", "Consistent brand look"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 2,
    isPublished: true
  },
  {
    title: "Reels & Short-Form Content",
    slug: "reels-short-form-content",
    shortDescription: "High-retention videos with clear hooks, sharp edits, and natural pacing for Instagram and YouTube.",
    features: ["Scriptwriting & concepts", "Video editing & sound design", "Topic & trend research"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 3,
    isPublished: true
  },
  {
    title: "Social Media Strategy",
    slug: "social-media-strategy",
    shortDescription: "Tailored roadmaps that define your target audience, positioning, and content direction.",
    features: ["Audience research", "Content pillars & themes", "Actionable growth plan"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 4,
    isPublished: true
  },
  {
    title: "Performance & Analytics",
    slug: "performance-analytics",
    shortDescription: "Clear tracking and reporting so you always know what drives engagement and conversions.",
    features: ["Monthly performance reports", "Key metrics & insights", "Recommendations for next steps"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 5,
    isPublished: true
  },
  {
    title: "Brand Campaigns",
    slug: "brand-campaigns",
    shortDescription: "Structured promotional campaigns and collaborations that expand your reach and drive actions.",
    features: ["Campaign planning", "Creative direction & roll-out", "Results & ROI review"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 6,
    isPublished: true
  },
  {
    title: "Creator Collaborations",
    slug: "creator-collaborations",
    shortDescription: "Connecting your brand with relevant creators for authentic partnerships and product spotlights.",
    features: ["Creator vetting & outreach", "Briefing & deliverables", "Tracking engagement"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 7,
    isPublished: true
  },
  {
    title: "Executive Personal Branding",
    slug: "personal-branding",
    shortDescription: "Helping founders and leaders share their perspective and build authority on LinkedIn and X.",
    features: ["Thought leadership posts", "Profile optimization", "Network engagement"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 8,
    isPublished: true
  },
  {
    title: "Community Management",
    slug: "community-management",
    shortDescription: "Active moderation and interaction that turns casual followers into loyal supporters.",
    features: ["Direct message handling", "Comment replies", "Community engagement initiatives"],
    ctaLabel: "View Details",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    order: 9,
    isPublished: true
  }
];

export const defaultCreators: Creator[] = [
  {
    name: "Rohan Sharma",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Finance & Tech Content Creator breaking down algorithmic trading and wealth building.",
    niche: "Fintech & Investing",
    instagramUsername: "rohan.invests",
    instagramUrl: "https://instagram.com/rohan.invests",
    followerCount: "245K",
    isFeatured: true,
    order: 1,
    isPublished: true
  },
  {
    name: "Ananya Deshmukh",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    bio: "Lifestyle, productivity, and mindful entrepreneurship storytelling.",
    niche: "Lifestyle & Growth",
    instagramUsername: "ananya.creates",
    instagramUrl: "https://instagram.com/ananya.creates",
    followerCount: "480K",
    isFeatured: true,
    order: 2,
    isPublished: true
  },
  {
    name: "Kabir Mehta",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Visual director & short-form video master creating viral aesthetics.",
    niche: "Creative Filmmaking",
    instagramUsername: "kabir.visuals",
    instagramUrl: "https://instagram.com/kabir.visuals",
    followerCount: "310K",
    isFeatured: true,
    order: 3,
    isPublished: true
  },
  {
    name: "Zara Qureshi",
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    bio: "AI tools educator & digital founder helping creators automate workflows.",
    niche: "AI & Productivity",
    instagramUsername: "zara.ai",
    instagramUrl: "https://instagram.com/zara.ai",
    followerCount: "620K",
    isFeatured: true,
    order: 4,
    isPublished: true
  }
];

export const defaultTeam: ExpertTeamMember[] = [
  {
    name: "Aarav Kapoor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    role: "Head of Growth Strategy",
    instagramUrl: "https://instagram.com/aarav.growth",
    linkedinUrl: "https://linkedin.com/in/aaravkapoor",
    isFeatured: true,
    order: 1,
    isPublished: true
  },
  {
    name: "Meera Singhania",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    role: "Creative Content Director",
    instagramUrl: "https://instagram.com/meera.directs",
    linkedinUrl: "https://linkedin.com/in/meerasinghania",
    isFeatured: true,
    order: 2,
    isPublished: true
  },
  {
    name: "Vikram Malhotra",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    role: "Senior Paid Ads Specialist",
    instagramUrl: "https://instagram.com/vikram.scale",
    linkedinUrl: "https://linkedin.com/in/vikrammalhotra",
    isFeatured: true,
    order: 3,
    isPublished: true
  },
  {
    name: "Pooja Hegde",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    role: "Creator Partnerships Lead",
    instagramUrl: "https://instagram.com/pooja.creators",
    linkedinUrl: "https://linkedin.com/in/poojahegde",
    isFeatured: true,
    order: 4,
    isPublished: true
  }
];

export const defaultClientResults: ClientResult[] = [
  {
    clientName: "NexGen Fintech",
    beforeImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    order: 1,
    isPublished: true
  },
  {
    clientName: "Aura Skincare",
    beforeImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    order: 2,
    isPublished: true
  },
  {
    clientName: "Elevate EdTech",
    beforeImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    order: 3,
    isPublished: true
  }
];

export const defaultResources: Resource[] = [
  {
    title: "The 2026 Short-Form Algorithm Master Playbook",
    slug: "2026-short-form-algorithm-playbook",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    type: "free",
    price: 0,
    currency: "INR",
    isFeatured: true,
    order: 1,
    isPublished: true
  },
  {
    title: "100 High-Hook Viral Video Scripts for Founders",
    slug: "100-high-hook-viral-video-scripts",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    type: "premium",
    price: 499,
    currency: "INR",
    isFeatured: true,
    order: 2,
    isPublished: true
  }
];

// API Call Functions
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await apiClient.get('/site-settings');
    return res.data?.data || defaultSiteSettings;
  } catch (err) {
    return defaultSiteSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const res = await apiClient.get('/services');
    return res.data?.data || defaultServices;
  } catch (err) {
    return defaultServices;
  }
}

export async function getCreators(): Promise<Creator[]> {
  try {
    const res = await apiClient.get('/creators');
    return res.data?.data || defaultCreators;
  } catch (err) {
    return defaultCreators;
  }
}

export async function getExpertTeam(): Promise<ExpertTeamMember[]> {
  try {
    const res = await apiClient.get('/expert-team');
    return res.data?.data || defaultTeam;
  } catch (err) {
    return defaultTeam;
  }
}

export async function getClientResults(): Promise<ClientResult[]> {
  try {
    const res = await apiClient.get('/client-results');
    return res.data?.data || defaultClientResults;
  } catch (err) {
    return defaultClientResults;
  }
}

export async function getResources(): Promise<Resource[]> {
  try {
    const res = await apiClient.get('/resources');
    return res.data?.data || defaultResources;
  } catch (err) {
    return defaultResources;
  }
}

export async function postBooking(payload: BookingPayload): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await apiClient.post('/bookings', payload);
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Submission failed' 
    };
  }
}

// Creator Application / Lead API
export async function postCreatorApplication(payload: CreatorApplicationPayload): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await apiClient.post('/leads', {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      platform: payload.platform,
      socialLink: payload.socialLink,
      instagram: payload.socialLink,
      followerCount: payload.followerCount || '',
      niche: payload.niche || '',
      service: `Creator Collaboration (${payload.platform})`,
      message: payload.message || `Platform: ${payload.platform} | Link: ${payload.socialLink} | Followers: ${payload.followerCount || 'N/A'}`,
      leadType: 'CREATOR_APPLICATION'
    });
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Application submission failed' 
    };
  }
}

export async function getAdminLeads(status?: string): Promise<Lead[]> {
  try {
    const url = status ? `/admin/leads?status=${status}` : '/admin/leads';
    const res = await apiClient.get(url);
    return res.data?.data?.leads || res.data?.data || [];
  } catch (err) {
    return [];
  }
}

export async function updateAdminLeadStatus(id: string, status: string): Promise<boolean> {
  try {
    await apiClient.patch(`/admin/leads/${id}/status`, { status });
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteAdminLead(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/leads/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

// Admin CMS APIs
export async function getAdminBookings(): Promise<any[]> {
  try {
    const res = await apiClient.get('/admin/bookings');
    return res.data?.data?.bookings || res.data?.data || [];
  } catch (err) {
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string): Promise<boolean> {
  try {
    await apiClient.patch(`/admin/bookings/${id}`, { status });
    return true;
  } catch (err) {
    return false;
  }
}

export async function createAdminResource(payload: any): Promise<{ success: boolean; data?: Resource; message?: string }> {
  try {
    const res = await apiClient.post('/admin/resources', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to create resource' 
    };
  }
}

export async function deleteAdminResource(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/resources/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

export async function createAdminCreator(payload: any): Promise<{ success: boolean; data?: Creator; message?: string }> {
  try {
    const res = await apiClient.post('/admin/creators', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to create creator' 
    };
  }
}

export async function updateAdminCreator(id: string, payload: any): Promise<{ success: boolean; data?: Creator; message?: string }> {
  try {
    const res = await apiClient.patch(`/admin/creators/${id}`, payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to update creator' 
    };
  }
}

export async function deleteAdminCreator(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/creators/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

export async function createAdminTeamMember(payload: any): Promise<{ success: boolean; data?: ExpertTeamMember; message?: string }> {
  try {
    const res = await apiClient.post('/admin/expert-team', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to create team member' 
    };
  }
}

export async function updateAdminTeamMember(id: string, payload: any): Promise<{ success: boolean; data?: ExpertTeamMember; message?: string }> {
  try {
    const res = await apiClient.patch(`/admin/expert-team/${id}`, payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to update team member' 
    };
  }
}

export async function deleteAdminTeamMember(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/expert-team/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

export async function createAdminClientResult(payload: any): Promise<{ success: boolean; data?: ClientResult; message?: string }> {
  try {
    const res = await apiClient.post('/admin/client-results', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to create client result' 
    };
  }
}

export async function updateAdminClientResult(id: string, payload: any): Promise<{ success: boolean; data?: ClientResult; message?: string }> {
  try {
    const res = await apiClient.patch(`/admin/client-results/${id}`, payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to update client result' 
    };
  }
}

export async function deleteAdminClientResult(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/admin/client-results/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateAdminService(id: string, payload: any): Promise<boolean> {
  try {
    await apiClient.patch(`/admin/services/${id}`, payload);
    return true;
  } catch (err) {
    return false;
  }
}

export function formatAssetUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const serverBase = import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1\/?$/, '')
      : (import.meta.env.PROD ? 'https://algogrowthhub.onrender.com' : 'http://localhost:5000');
    return `${serverBase}${cleanUrl}`;
  }
  return url;
}

export async function uploadMedia(file: File): Promise<{ success: boolean; url?: string; fileName?: string; fileSize?: number; message?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await apiClient.post('/admin/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const rawUrl = res.data?.data?.url || res.data?.url;
    const finalUrl = formatAssetUrl(rawUrl);
    return { 
      success: true, 
      url: finalUrl,
      fileName: res.data?.data?.fileName || file.name,
      fileSize: res.data?.data?.fileSize || file.size,
    };
  } catch (err: any) {
    // Fallback try on /media/upload
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const rawUrl = res.data?.data?.url || res.data?.url;
      return { 
        success: true, 
        url: formatAssetUrl(rawUrl),
        fileName: res.data?.data?.fileName || file.name,
        fileSize: res.data?.data?.fileSize || file.size,
      };
    } catch (fallbackErr: any) {
      return {
        success: false,
        message: fallbackErr.response?.data?.message || err.response?.data?.message || err.message || 'Image upload failed',
      };
    }
  }
}

export async function updateAdminSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; message?: string }> {
  try {
    // Format payload to strictly match schema if needed
    const payload: any = { ...settings };
    if (typeof payload.logo === 'string') {
      payload.logo = { url: payload.logo, altText: 'AlgoGrowthHub Logo' };
    }
    const res = await apiClient.put('/admin/settings', payload);
    return { success: true, message: res.data?.message || 'Settings saved successfully' };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || 'Failed to save settings',
    };
  }
}


/* ==========================================================================
   PAYMENT & ORDER LIFECYCLE SERVICES
   ========================================================================== */

export interface InitiateCheckoutPayload {
  resourceId: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  referralCode?: string;
}

export interface InitiateCheckoutResponse {
  orderId: string;
  providerOrderId: string;
  amount: number;
  currency: string;
  provider: string;
  keyId?: string;
  clientSecret?: string;
}

export interface VerifyPaymentPayload {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface VerifyPaymentResponse {
  order: any;
  downloadToken: string;
  downloadUrl: string;
}

export async function initiateCheckout(payload: InitiateCheckoutPayload): Promise<{ success: boolean; data?: InitiateCheckoutResponse; message?: string }> {
  try {
    const res = await apiClient.post('/payments/checkout', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Checkout initiation failed'
    };
  }
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<{ success: boolean; data?: VerifyPaymentResponse; message?: string }> {
  try {
    const res = await apiClient.post('/payments/verify', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Payment verification failed'
    };
  }
}

export interface InitiateBookingCheckoutResponse {
  bookingId: string;
  orderId: string;
  providerOrderId: string;
  amount: number;
  currency: string;
  provider: string;
  keyId: string;
}

export interface VerifyBookingPaymentPayload {
  bookingId: string;
  paymentId: string;
  signature: string;
}

export interface VerifyBookingPaymentResponse {
  booking: any;
}

export async function initiateBookingCheckout(payload: BookingPayload): Promise<{ success: boolean; data?: InitiateBookingCheckoutResponse; message?: string }> {
  try {
    const res = await apiClient.post('/payments/booking-checkout', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Booking checkout initiation failed'
    };
  }
}

export async function verifyBookingPayment(payload: VerifyBookingPaymentPayload): Promise<{ success: boolean; data?: VerifyBookingPaymentResponse; message?: string }> {
  try {
    const res = await apiClient.post('/payments/booking-verify', payload);
    return { success: true, data: res.data?.data || res.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Booking payment verification failed'
    };
  }
}

export async function getAdminOrders(): Promise<{ success: boolean; data: any[]; message?: string }> {
  try {
    // Try primary admin route /admin/orders
    let res;
    try {
      res = await apiClient.get('/admin/orders');
    } catch (adminErr: any) {
      if (adminErr.response?.status === 404) {
        res = await apiClient.get('/orders');
      } else {
        throw adminErr;
      }
    }
    const list = res.data?.data?.orders || res.data?.data || res.data?.orders || (Array.isArray(res.data) ? res.data : []);
    return { success: true, data: list };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      message: err.response?.data?.message || err.message || 'Failed to fetch orders'
    };
  }
}

export async function refundAdminOrder(orderId: string, reason?: string): Promise<{ success: boolean; message?: string }> {
  try {
    let res;
    try {
      res = await apiClient.post(`/admin/orders/${orderId}/refund`, { reason: reason || 'Customer requested refund' });
    } catch (adminErr: any) {
      if (adminErr.response?.status === 404) {
        res = await apiClient.post(`/orders/${orderId}/refund`, { reason: reason || 'Customer requested refund' });
      } else {
        throw adminErr;
      }
    }
    return { success: true, message: res.data?.message || 'Refund processed successfully' };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Refund processing failed'
    };
  }
}

// -------------------------------------------------------------
// PARTNER & REFERRAL APIS
// -------------------------------------------------------------

export async function getAdminPartners(): Promise<{
  success: boolean;
  data: {
    partners: Partner[];
    summary: {
      totalPartners: number;
      activePartners: number;
      totalLinks: number;
      totalClicks: number;
      totalSales: number;
      totalRevenue: number;
    };
  };
  message?: string;
}> {
  try {
    const res = await apiClient.get('/admin/partners');
    return { success: true, data: res.data?.data || { partners: [], summary: { totalPartners: 0, activePartners: 0, totalLinks: 0, totalClicks: 0, totalSales: 0, totalRevenue: 0 } } };
  } catch (err: any) {
    return {
      success: false,
      data: { partners: [], summary: { totalPartners: 0, activePartners: 0, totalLinks: 0, totalClicks: 0, totalSales: 0, totalRevenue: 0 } },
      message: err.response?.data?.message || err.message || 'Failed to fetch partners'
    };
  }
}

export async function createAdminPartner(payload: CreatePartnerPayload): Promise<{ success: boolean; data?: Partner; message?: string }> {
  try {
    const res = await apiClient.post('/admin/partners', payload);
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to create partner'
    };
  }
}

export async function addPartnerResourceLink(
  partnerId: string,
  resourceIdOrPayload?: string | { code?: string; resourceId?: string },
  code?: string
): Promise<{ success: boolean; data?: Partner; message?: string }> {
  try {
    let payloadBody: { code?: string; resourceId?: string } = {};
    if (typeof resourceIdOrPayload === 'object' && resourceIdOrPayload !== null) {
      payloadBody = resourceIdOrPayload;
    } else {
      payloadBody = { resourceId: resourceIdOrPayload || undefined, code: code || undefined };
    }
    const res = await apiClient.post(`/admin/partners/${partnerId}/links`, payloadBody);
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to add referral link'
    };
  }
}

export async function togglePartnerStatus(
  partnerId: string,
  status: 'ACTIVE' | 'DISABLED'
): Promise<{ success: boolean; data?: Partner; message?: string }> {
  try {
    const res = await apiClient.patch(`/admin/partners/${partnerId}/status`, { status });
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to update partner status'
    };
  }
}

export async function getPartnerDashboard(): Promise<{ success: boolean; data?: PartnerDashboardData; message?: string }> {
  try {
    const res = await apiClient.get('/partner/dashboard');
    return { success: true, data: res.data?.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to load partner dashboard'
    };
  }
}

export async function getPartnerLeads(): Promise<{ success: boolean; data: PartnerLead[]; message?: string }> {
  try {
    const res = await apiClient.get('/partner/leads');
    return { success: true, data: res.data?.data || [] };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Failed to load partner leads'
    };
  }
}

export async function trackReferralClick(payload: {
  code: string;
  landingPath?: string;
  resourceId?: string;
  visitorId?: string;
  referrer?: string;
}): Promise<{ success: boolean; data?: any }> {
  try {
    const res = await apiClient.post('/referrals/track', payload);
    return { success: true, data: res.data?.data };
  } catch (_err) {
    return { success: false };
  }
}

