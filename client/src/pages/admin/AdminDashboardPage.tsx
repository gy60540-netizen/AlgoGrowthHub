import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Layers, 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  LogOut, 
  Save, 
  Check, 
  RefreshCw,
  Mail,
  Phone,
  Clock,
  Plus,
  Trash2,
  X,
  Sparkles,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ExternalLink,
  MessageSquare,
  Star,
  CreditCard,
  DollarSign,
  Loader2,
  Upload
} from 'lucide-react';
import { 
  getSiteSettings, 
  getServices, 
  getCreators, 
  getExpertTeam, 
  getClientResults, 
  getResources,
  getAdminBookings,
  updateBookingStatus,
  getAdminLeads,
  updateAdminLeadStatus,
  deleteAdminLead,
  updateAdminService,
  updateAdminSiteSettings,
  uploadMedia,
  createAdminResource,
  deleteAdminResource,
  createAdminCreator,
  deleteAdminCreator,
  createAdminTeamMember,
  deleteAdminTeamMember,
  createAdminClientResult,
  deleteAdminClientResult,
  getAdminOrders,
  refundAdminOrder,
  defaultSiteSettings,
  defaultServices,
  defaultCreators,
  defaultTeam,
  defaultClientResults,
  defaultResources
} from '../../services/api';
import { ImageUploadField } from '../../components/common/ImageUploadField';
import { 
  SiteSettings, 
  Service, 
  Creator, 
  ExpertTeamMember, 
  ClientResult, 
  Resource,
  Lead
} from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'creators' | 'team' | 'clients' | 'resources' | 'bookings' | 'creator-apps' | 'orders'>('hero');
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [creators, setCreators] = useState<Creator[]>(defaultCreators);
  const [team, setTeam] = useState<ExpertTeamMember[]>(defaultTeam);
  const [clientResults, setClientResults] = useState<ClientResult[]>(defaultClientResults);
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [bookings, setBookings] = useState<any[]>([]);
  const [creatorApplications, setCreatorApplications] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modals State
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form states
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'free' as 'free' | 'premium',
    price: 499,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    fileName: 'growth-playbook.pdf',
    fileKey: 'uploads/resources/growth-playbook.pdf',
    fileFormat: 'pdf' as 'pdf' | 'zip' | 'mp4',
    isFeatured: true
  });

  const [resourceFileUploading, setResourceFileUploading] = useState(false);
  const [resourceFileUploadSuccess, setResourceFileUploadSuccess] = useState(false);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);

  const handleResourceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResourceFileUploading(true);
    setResourceFileUploadSuccess(false);
    const res = await uploadMedia(file);
    setResourceFileUploading(false);

    if (res.success && res.url) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      const format = ext === 'zip' ? 'zip' : ext === 'mp4' ? 'mp4' : 'pdf';
      setNewResource(prev => ({
        ...prev,
        fileKey: res.url!,
        fileName: file.name,
        fileFormat: format as any,
      }));
      setResourceFileUploadSuccess(true);
      setTimeout(() => setResourceFileUploadSuccess(false), 3000);
    } else {
      alert(res.message || 'Resource file upload failed');
    }
  };

  const [newCreator, setNewCreator] = useState({
    name: '',
    niche: 'Fintech & Wealth',
    followerCount: '150K+',
    instagramUsername: '',
    instagramUrl: '',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    bio: 'Scaling high-engagement video funnels and algorithm dominance.',
    isFeatured: true
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    role: 'Growth Strategist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    instagramUrl: 'https://instagram.com/algogrowthhub',
    linkedinUrl: 'https://linkedin.com/company/algogrowthhub',
    isFeatured: true
  });

  const [newClientResult, setNewClientResult] = useState({
    clientName: '',
    beforeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    isFeatured: true
  });

  const fetchLiveBookings = async () => {
    setLoadingBookings(true);
    const list = await getAdminBookings();
    setBookings(list);
    setLoadingBookings(false);
  };

  const fetchLiveCreators = async () => {
    const list = await getCreators();
    setCreators(list);
  };

  const fetchLiveTeam = async () => {
    const list = await getExpertTeam();
    setTeam(list);
  };

  const fetchLiveClients = async () => {
    const list = await getClientResults();
    setClientResults(list);
  };

  const fetchLiveResources = async () => {
    const list = await getResources();
    setResources(list);
  };

  const fetchLiveApplications = async () => {
    setLoadingApps(true);
    const list = await getAdminLeads();
    setCreatorApplications(list);
    setLoadingApps(false);
  };

  const fetchLiveOrders = async () => {
    setLoadingOrders(true);
    const res = await getAdminOrders();
    if (res.success) {
      setOrders(res.data);
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    Promise.allSettled([
      getSiteSettings().then(setSiteSettings),
      getServices().then(setServices),
      fetchLiveCreators(),
      fetchLiveTeam(),
      fetchLiveClients(),
      fetchLiveResources(),
      fetchLiveBookings(),
      fetchLiveApplications(),
      fetchLiveOrders(),
    ]);
  }, [navigate]);

  const handleRefundOrder = async (orderId: string) => {
    const reason = window.prompt('Enter reason for refund:');
    if (!reason) return;

    const res = await refundAdminOrder(orderId, reason);
    if (res.success) {
      alert('Refund processed successfully!');
      fetchLiveOrders();
    } else {
      alert(res.message || 'Failed to process refund');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'hero') {
        const res = await updateAdminSiteSettings(siteSettings);
        if (res.success) {
          setSaveSuccess(true);
        } else {
          alert(res.message || 'Failed to save settings');
        }
      } else if (activeTab === 'services') {
        const updatePromises = services.map((svc) => {
          const id = svc._id || svc.id;
          if (!id) return Promise.resolve(true);
          return updateAdminService(id, {
            title: svc.title,
            shortDescription: svc.shortDescription,
            image: svc.image,
            ctaLabel: svc.ctaLabel,
            isPublished: svc.isPublished !== false,
          });
        });
        await Promise.all(updatePromises);
        setSaveSuccess(true);
      } else {
        setSaveSuccess(true);
      }
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const success = await updateBookingStatus(id, newStatus);
    if (success) {
      setBookings(prev => prev.map(b => (b._id === id || b.id === id) ? { ...b, status: newStatus } : b));
    }
  };

  const handleLeadStatusUpdate = async (id: string, newStatus: string) => {
    const success = await updateAdminLeadStatus(id, newStatus);
    if (success) {
      setCreatorApplications(prev => prev.map(a => (a._id === id || a.id === id) ? { ...a, status: newStatus as any } : a));
    }
  };

  const handleDeleteLead = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Delete this creator application?')) {
      await deleteAdminLead(id);
      setCreatorApplications(prev => prev.filter(a => a._id !== id && a.id !== id));
    }
  };

  const handleQuickAddCreatorFromApp = (app: Lead) => {
    const cleanHandle = (app.socialLink || app.instagram || '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '').replace(/^@/, '');
    setNewCreator({
      name: app.name,
      niche: app.service || 'Creator Partner',
      followerCount: app.followerCount || '50K+',
      instagramUsername: cleanHandle || app.name.toLowerCase().replace(/\s+/g, '.'),
      instagramUrl: app.socialLink?.includes('http') ? app.socialLink : `https://instagram.com/${cleanHandle}`,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: `Creator partner (${app.platform || 'Instagram'}) with ${app.followerCount || 'active audience'}.`,
      isFeatured: true
    });
    setIsCreatorModalOpen(true);
  };

  // Creator Actions
  const handleCreateCreatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    const formattedUsername = newCreator.instagramUsername.replace(/^@/, '').trim();
    const formattedUrl = newCreator.instagramUrl || `https://instagram.com/${formattedUsername}`;

    const res = await createAdminCreator({
      name: newCreator.name,
      niche: newCreator.niche,
      followerCount: newCreator.followerCount,
      instagramUsername: formattedUsername,
      instagramUrl: formattedUrl,
      profileImage: newCreator.profileImage,
      bio: newCreator.bio,
      isFeatured: newCreator.isFeatured,
      isPublished: true,
      order: creators.length + 1
    });

    setModalLoading(false);
    if (res.success) {
      setIsCreatorModalOpen(false);
      setNewCreator({
        name: '',
        niche: 'Fintech & Wealth',
        followerCount: '150K+',
        instagramUsername: '',
        instagramUrl: '',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
        bio: 'Scaling high-engagement video funnels and algorithm dominance.',
        isFeatured: true
      });
      fetchLiveCreators();
    } else {
      setModalError(res.message || 'Failed to create creator');
    }
  };

  const handleDeleteCreator = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Delete this creator from community?')) {
      await deleteAdminCreator(id);
      setCreators(prev => prev.filter(c => c._id !== id && c.id !== id));
    }
  };

  // Team Member Actions
  const handleCreateTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    const res = await createAdminTeamMember({
      name: newTeamMember.name,
      role: newTeamMember.role,
      image: newTeamMember.image,
      instagramUrl: newTeamMember.instagramUrl || undefined,
      linkedinUrl: newTeamMember.linkedinUrl || undefined,
      isFeatured: newTeamMember.isFeatured,
      isPublished: true,
      order: team.length + 1
    });

    setModalLoading(false);
    if (res.success) {
      setIsTeamModalOpen(false);
      setNewTeamMember({
        name: '',
        role: 'Growth Strategist',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
        instagramUrl: 'https://instagram.com/algogrowthhub',
        linkedinUrl: 'https://linkedin.com/company/algogrowthhub',
        isFeatured: true
      });
      fetchLiveTeam();
    } else {
      setModalError(res.message || 'Failed to create team member');
    }
  };

  const handleDeleteTeamMember = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Delete this expert team member?')) {
      await deleteAdminTeamMember(id);
      setTeam(prev => prev.filter(m => m._id !== id && m.id !== id));
    }
  };

  // Client Results Actions
  const handleCreateClientResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    const res = await createAdminClientResult({
      clientName: newClientResult.clientName,
      beforeImage: newClientResult.beforeImage,
      afterImage: newClientResult.afterImage,
      rating: Number(newClientResult.rating),
      isFeatured: newClientResult.isFeatured,
      isPublished: true,
      order: clientResults.length + 1
    });

    setModalLoading(false);
    if (res.success) {
      setIsClientModalOpen(false);
      setNewClientResult({
        clientName: '',
        beforeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        rating: 5,
        isFeatured: true
      });
      fetchLiveClients();
    } else {
      setModalError(res.message || 'Failed to create client result');
    }
  };

  const handleDeleteClientResult = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Delete this before/after client showcase?')) {
      await deleteAdminClientResult(id);
      setClientResults(prev => prev.filter(c => c._id !== id && c.id !== id));
    }
  };

  // Resource Actions
  const handleCreateResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError('');

    const payload = {
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      price: newResource.type === 'premium' ? Number(newResource.price) : 0,
      currency: 'INR',
      thumbnail: newResource.thumbnail,
      fileName: newResource.fileName,
      fileKey: newResource.fileKey,
      fileFormat: newResource.fileFormat,
      isFeatured: newResource.isFeatured,
      isPublished: true,
      order: resources.length + 1
    };

    const res = await createAdminResource(payload);
    setModalLoading(false);

    if (res.success) {
      setIsResourceModalOpen(false);
      setNewResource({
        title: '',
        description: '',
        type: 'free',
        price: 499,
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        fileName: 'growth-playbook.pdf',
        fileKey: 'uploads/resources/growth-playbook.pdf',
        fileFormat: 'pdf',
        isFeatured: true
      });
      fetchLiveResources();
    } else {
      setModalError(res.message || 'Failed to create resource');
    }
  };

  const handleDeleteResourceClick = async (id?: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this resource?')) {
      await deleteAdminResource(id);
      setResources(prev => prev.filter(r => r._id !== id && r.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || 'PENDING').toUpperCase();
    if (s === 'CONFIRMED') {
      return { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
    }
    if (s === 'COMPLETED') {
      return { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' };
    }
    if (s === 'CANCELLED') {
      return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' };
    }
    return { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-soft)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '270px',
          backgroundColor: 'var(--color-bg-dark)',
          color: 'var(--color-text-light)',
          padding: '2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '36px', width: 'auto', filter: 'brightness(1.3)' }} />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { id: 'hero', label: 'Hero & About', icon: <Settings size={18} /> },
            { id: 'services', label: 'Power Services (9)', icon: <Layers size={18} /> },
            { id: 'creators', label: `Creator Network (${creators.length})`, icon: <Users size={18} /> },
            { id: 'creator-apps', label: `Creator Applications (${creatorApplications.length})`, icon: <Sparkles size={18} /> },
            { id: 'team', label: `Expert Team (${team.length})`, icon: <Users size={18} /> },
            { id: 'clients', label: `Client Results (${clientResults.length})`, icon: <Award size={18} /> },
            { id: 'resources', label: `Resources & Kits (${resources.length})`, icon: <BookOpen size={18} /> },
            { id: 'bookings', label: `Strategy Bookings (${bookings.length})`, icon: <Calendar size={18} /> },
            { id: 'orders', label: `Orders & Revenue (${orders.length})`, icon: <CreditCard size={18} /> },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setModalError('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-light-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-bg-dark-border)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#F87171',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--color-text-primary)' }}>
              {activeTab === 'hero' && 'Hero & About CMS Settings'}
              {activeTab === 'services' && 'Manage Power Services (3x3 Grid)'}
              {activeTab === 'creators' && `Creator Community — Instagram ONLY (${creators.length})`}
              {activeTab === 'creator-apps' && `Creator Applications & Roster Inquiries (${creatorApplications.length})`}
              {activeTab === 'team' && `Expert Team Members — Insta + LinkedIn (${team.length})`}
              {activeTab === 'clients' && `Client Before & After Showcase (${clientResults.length})`}
              {activeTab === 'resources' && `Digital Resources, Playbooks & Growth Kits (${resources.length})`}
              {activeTab === 'bookings' && `Live Strategy Inquiries & Consultation Bookings (${bookings.length})`}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              All modifications preserve strict PRD aspect ratios, verified links, and geometry.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {activeTab === 'creator-apps' && (
              <button 
                onClick={fetchLiveApplications} 
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.75rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <RefreshCw size={15} />
                <span>Refresh Applications</span>
              </button>
            )}
            {activeTab === 'creators' && (
              <button 
                onClick={() => { setIsCreatorModalOpen(true); setModalError(''); }} 
                className="btn btn-primary btn-sm"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Plus size={16} />
                <span>Add Creator</span>
              </button>
            )}

            {activeTab === 'team' && (
              <button 
                onClick={() => { setIsTeamModalOpen(true); setModalError(''); }} 
                className="btn btn-primary btn-sm"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Plus size={16} />
                <span>Add Team Member</span>
              </button>
            )}

            {activeTab === 'clients' && (
              <button 
                onClick={() => { setIsClientModalOpen(true); setModalError(''); }} 
                className="btn btn-primary btn-sm"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Plus size={16} />
                <span>Add Client Showcase</span>
              </button>
            )}

            {activeTab === 'resources' && (
              <button 
                onClick={() => { setIsResourceModalOpen(true); setModalError(''); }} 
                className="btn btn-primary btn-sm"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Plus size={16} />
                <span>Add New Resource</span>
              </button>
            )}

            {activeTab === 'bookings' && (
              <button 
                onClick={fetchLiveBookings} 
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <RefreshCw size={15} className={loadingBookings ? 'animate-spin' : ''} />
                <span>Refresh Bookings</span>
              </button>
            )}

            <button 
              onClick={handleSave} 
              disabled={saving} 
              className="btn btn-primary btn-sm" 
              style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving to DB...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check size={16} />
                  <span>Changes Saved Live!</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save CMS Updates</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: Hero & About */}
        {activeTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Section 01: Hero Configuration</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hero Main Headline</label>
                  <input
                    type="text"
                    value={siteSettings.hero?.heading || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hero: { ...siteSettings.hero, heading: e.target.value } })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Hero Subtext Description</label>
                  <textarea
                    rows={3}
                    value={siteSettings.hero?.description || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hero: { ...siteSettings.hero, description: e.target.value } })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <ImageUploadField
                  label="Hero Background Image"
                  value={siteSettings.hero?.heroImage || '/hero-bg.jpg'}
                  onChange={(url) => setSiteSettings({ ...siteSettings, hero: { ...siteSettings.hero, heroImage: url } })}
                  aspectRatio="16/9"
                  helperText="Recommended: 1920x1080 high-res background"
                />
              </div>
            </div>

            <div className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Section 02: About Configuration</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>About Main Heading</label>
                  <input
                    type="text"
                    value={siteSettings.about?.heading || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, about: { ...siteSettings.about, heading: e.target.value } })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Metric Counter Value</label>
                  <input
                    type="text"
                    value={siteSettings.about?.metricValue || '500+'}
                    onChange={(e) => setSiteSettings({ ...siteSettings, about: { ...siteSettings.about, metricValue: e.target.value } })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Services (With Live Image Editor & Preview) */}
        {activeTab === 'services' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {services.map((svc, i) => {
              const svcId = svc._id || svc.id;
              return (
                <div key={svcId || i} className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                      SERVICE 0{i + 1}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      PUBLISHED
                    </span>
                  </div>

                  {/* Image Preview, File Uploader & URL Editor */}
                  <ImageUploadField
                    label="Service Cover Image:"
                    value={svc.image || ''}
                    onChange={(url) => {
                      const copy = [...services];
                      copy[i].image = url;
                      setServices(copy);
                    }}
                    aspectRatio="16/10"
                    helperText="Aspect ratio 16:10 for perfect grid geometry"
                  />

                  {/* Title */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                      Service Title:
                    </label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[i].title = e.target.value;
                        setServices(copy);
                      }}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontWeight: 700, fontSize: '0.95rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
                    />
                  </div>

                  {/* Short Description */}
                  <div style={{ marginBottom: '1.25rem', flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                      Grid Short Description:
                    </label>
                    <textarea
                      rows={3}
                      value={svc.shortDescription}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[i].shortDescription = e.target.value;
                        setServices(copy);
                      }}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', lineHeight: 1.4 }}
                    />
                  </div>

                  {/* Action Save Button */}
                  <button
                    type="button"
                    onClick={async () => {
                      if (svcId) {
                        await updateAdminService(svcId, {
                          title: svc.title,
                          shortDescription: svc.shortDescription,
                          image: svc.image,
                        });
                        alert(`Service 0${i + 1} (${svc.title}) updated live in database!`);
                      } else {
                        handleSave();
                      }
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Update Service Image & Text
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Creators (With Add Modal & Delete) */}
        {activeTab === 'creators' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {creators.map((c, i) => {
              const cId = c._id || c.id;
              return (
                <div key={cId || i} className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <img src={c.profileImage} alt={c.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleDeleteCreator(cId)}
                      title="Delete Creator"
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                    {c.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#E1306C', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <Instagram size={14} />
                    <span>@{c.instagramUsername}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                    {c.bio}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                    <span style={{ color: 'var(--color-primary)' }}>{c.niche}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{c.followerCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Team (With Add Modal & Delete) */}
        {activeTab === 'team' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {team.map((m, i) => {
              const mId = m._id || m.id;
              return (
                <div key={mId || i} className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <img src={m.image} alt={m.name} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleDeleteTeamMember(mId)}
                      title="Delete Team Member"
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                    {m.name}
                  </h3>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                    {m.role}
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.75rem' }}>
                    {m.instagramUrl && <Instagram size={15} color="#E1306C" />}
                    {m.linkedinUrl && <Linkedin size={15} color="#0A66C2" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 5: Client Results (With Add Modal & Delete) */}
        {activeTab === 'clients' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {clientResults.map((item, i) => {
              const clId = item._id || item.id;
              return (
                <div key={clId || i} className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                      {item.clientName}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleDeleteClientResult(clId)}
                      title="Delete Client Result"
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>BEFORE</span>
                      <img src={item.beforeImage} alt="Before" style={{ height: '85px', width: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10B981', display: 'block', marginBottom: '0.2rem' }}>AFTER</span>
                      <img src={item.afterImage} alt="After" style={{ height: '85px', width: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontSize: '0.85rem', fontWeight: 700 }}>
                    {[...Array(item.rating || 5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#F59E0B" />
                    ))}
                    <span style={{ color: 'var(--color-text-primary)', marginLeft: '0.35rem' }}>{item.rating || 5}.0 Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 6: Resources (With Add Modal & Delete) */}
        {activeTab === 'resources' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {resources.map((r, i) => {
              const rId = r._id || r.id;
              const isFree = r.type === 'free';
              return (
                <div key={rId || i} className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isFree ? '#ECFDF5' : '#FEF3C7',
                        color: isFree ? '#059669' : '#B45309',
                      }}
                    >
                      {isFree ? 'FREE RESOURCE' : `PREMIUM • ₹${r.price || 499}`}
                    </span>

                    {rId && (
                      <button
                        type="button"
                        onClick={() => handleDeleteResourceClick(rId)}
                        title="Delete Resource"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '0.25rem',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div
                    className="media-container"
                    style={{
                      aspectRatio: '16/10',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={r.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                      alt={r.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    {r.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {r.description || 'No description provided.'}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <span>Slug: /{r.slug}</span>
                    <span>Format: PDF / ZIP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 7: Strategy Bookings (LIVE MONGODB DATA) */}
        {activeTab === 'bookings' && (
          <div className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Live Client Consultation Inquiries
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Real-time consultation requests synced directly from the database.
                </p>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                {bookings.length} Total Requests
              </span>
            </div>

            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--color-text-muted)' }}>
                <Calendar size={42} style={{ opacity: 0.4, marginBottom: '1rem' }} />
                <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>No strategy calls booked yet.</p>
                <p style={{ fontSize: '0.88rem' }}>When a visitor submits the "Book a Call Session" form, it will appear here instantly.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-soft)' }}>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Client</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Contact</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Requested Service</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Preferred Schedule</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Notes / Message</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const bId = b._id || b.id;
                      const badge = getStatusBadge(b.status);
                      return (
                        <tr key={bId} style={{ borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>
                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                              {b.name}
                            </div>
                            {b.company && (
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                                {b.company}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                              <Mail size={13} color="#64748B" />
                              <a href={`mailto:${b.email}`} style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                                {b.email}
                              </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                              <Phone size={13} color="#64748B" />
                              <a href={`tel:${b.phone}`} style={{ color: 'var(--color-text-secondary)' }}>
                                {b.phone}
                              </a>
                            </div>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {b.service}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <Calendar size={14} color="#0284C7" />
                              <span>{b.preferredDate}</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                              <Clock size={12} />
                              <span>{b.preferredTime} ({b.timezone || 'IST'})</span>
                            </div>
                          </td>

                          <td style={{ padding: '1rem 0.75rem', maxWidth: '220px' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                              {b.message || '—'}
                            </p>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <select
                              value={(b.status || 'PENDING').toUpperCase()}
                              onChange={(e) => handleStatusUpdate(bId, e.target.value)}
                              style={{
                                padding: '0.35rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                backgroundColor: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.border}`,
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 8: Creator Applications (LIVE MONGODB DATA) */}
        {activeTab === 'creator-apps' && (
          <div className="hub-card" style={{ backgroundColor: 'var(--color-white)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Live Creator Roster Applications
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Creators who submitted the "Join Us as a Creator" application on the website.
                </p>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
                {creatorApplications.length} Total Applications
              </span>
            </div>

            {creatorApplications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--color-text-muted)' }}>
                <Sparkles size={42} style={{ opacity: 0.4, marginBottom: '1rem', color: 'var(--color-primary)' }} />
                <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>No creator applications yet.</p>
                <p style={{ fontSize: '0.88rem' }}>When creators apply via the "Join Us as a Creator" section, their details appear here in real-time.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-soft)' }}>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Creator</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Contact</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Platform & Link</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Followers</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800 }}>Status</th>
                      <th style={{ padding: '1rem 0.75rem', fontWeight: 800, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creatorApplications.map((app) => {
                      const appId = app._id || app.id || '';
                      const platform = app.platform || 'Instagram';
                      const cleanPhone = (app.phone || '').replace(/[^0-9]/g, '');
                      const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}`;
                      const cleanLink = app.socialLink || app.instagram || '';
                      const fullUrl = cleanLink.startsWith('http') 
                        ? cleanLink 
                        : platform === 'Instagram' 
                          ? `https://instagram.com/${cleanLink.replace(/^@/, '')}`
                          : platform === 'YouTube'
                            ? `https://youtube.com/${cleanLink.startsWith('@') ? cleanLink : '@' + cleanLink}`
                            : platform === 'Telegram'
                              ? `https://t.me/${cleanLink.replace(/^@/, '')}`
                              : `https://linkedin.com/in/${cleanLink}`;

                      return (
                        <tr key={appId} style={{ borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>
                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                              {app.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                              Applied: {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                              <Mail size={13} color="#64748B" />
                              <a href={`mailto:${app.email}`} style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
                                {app.email}
                              </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                              <Phone size={13} color="#64748B" />
                              <a href={`tel:${app.phone}`} style={{ color: 'var(--color-text-secondary)' }}>
                                {app.phone}
                              </a>
                              <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                title="Chat on WhatsApp"
                                style={{
                                  backgroundColor: '#DCFCE7',
                                  color: '#15803D',
                                  padding: '0.1rem 0.4rem',
                                  borderRadius: '4px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                }}
                              >
                                WhatsApp
                              </a>
                            </div>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                              {platform === 'Instagram' && <Instagram size={15} color="#E11D48" />}
                              {platform === 'YouTube' && <Youtube size={15} color="#DC2626" />}
                              {platform === 'Telegram' && <Send size={15} color="#0284C7" />}
                              {platform === 'LinkedIn' && <Linkedin size={15} color="#0A66C2" />}
                              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{platform}</span>
                            </div>
                            <a 
                              href={fullUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '0.25rem', 
                                color: 'var(--color-primary)', 
                                fontSize: '0.82rem', 
                                fontWeight: 600,
                                wordBreak: 'break-all',
                              }}
                            >
                              <span>{cleanLink || 'View Profile'}</span>
                              <ExternalLink size={12} />
                            </a>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <span 
                              style={{ 
                                fontWeight: 700, 
                                color: '#1E293B',
                                backgroundColor: '#F1F5F9',
                                padding: '0.25rem 0.55rem',
                                borderRadius: '6px',
                                fontSize: '0.82rem',
                              }}
                            >
                              {app.followerCount || '10K - 50K'}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 0.75rem' }}>
                            <select
                              value={app.status || 'NEW'}
                              onChange={(e) => handleLeadStatusUpdate(appId, e.target.value)}
                              style={{
                                padding: '0.35rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                backgroundColor: app.status === 'WON' ? '#ECFDF5' : app.status === 'QUALIFIED' ? '#EFF6FF' : '#FEF3C7',
                                color: app.status === 'WON' ? '#065F46' : app.status === 'QUALIFIED' ? '#1E40AF' : '#92400E',
                                border: '1px solid var(--color-border)',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUALIFIED">QUALIFIED</option>
                              <option value="WON">WON (ACCEPTED)</option>
                              <option value="LOST">LOST (REJECTED)</option>
                            </select>
                          </td>

                          <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleQuickAddCreatorFromApp(app)}
                                title="Add to Live Creator Roster"
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                              >
                                <Plus size={13} />
                                <span>Add to Roster</span>
                              </button>

                              <button
                                onClick={() => handleDeleteLead(appId)}
                                title="Delete Application"
                                style={{
                                  backgroundColor: '#FEE2E2',
                                  color: '#DC2626',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.5rem',
                                  cursor: 'pointer',
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: Orders & Revenue Management */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                  Orders & Revenue Stream
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  Real-time transaction tracking, payment gateway verifications, and digital resource fulfillment.
                </p>
              </div>

              <button 
                onClick={fetchLiveOrders}
                disabled={loadingOrders}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <RefreshCw size={14} className={loadingOrders ? 'spin' : ''} />
                <span>{loadingOrders ? 'Refreshing...' : 'Refresh Orders'}</span>
              </button>
            </div>

            {/* Revenue & Transaction KPI Cards (Invoizmo Soft Floating Style) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              {/* KPI 1: Total Revenue */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Total Revenue
                  </span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                    <DollarSign size={20} />
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 900, color: '#0F172A' }}>
                  ₹{orders.filter(o => o.status === 'PAID' || o.status === 'FULFILLED').reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '0.35rem' }}>
                  ⚡ Live Verified Inflow
                </div>
              </div>

              {/* KPI 2: Paid Orders */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Paid Transactions
                  </span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F05E5' }}>
                    <CreditCard size={20} />
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 900, color: '#0F172A' }}>
                  {orders.filter(o => o.status === 'PAID' || o.status === 'FULFILLED').length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, marginTop: '0.35rem' }}>
                  Successful Checkouts
                </div>
              </div>

              {/* KPI 3: Total Orders Created */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Total Inquiries
                  </span>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                    <Layers size={20} />
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 900, color: '#0F172A' }}>
                  {orders.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, marginTop: '0.35rem' }}>
                  All Initiated Checkouts
                </div>
              </div>
            </div>

            {/* Orders Table Container */}
            {loadingOrders ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                <p>Loading real-time orders and payments stream...</p>
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)' }}>
                <CreditCard size={48} color="#94A3B8" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                  No Orders Recorded Yet
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                  When visitors purchase digital playbooks or kits through the checkout modal, transactions will appear here in real time.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>Customer</th>
                      <th style={{ padding: '1rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>Amount</th>
                      <th style={{ padding: '1rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>Gateway</th>
                      <th style={{ padding: '1rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '1rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any, idx: number) => {
                      const orderId = order._id || order.id || `ord_${idx}`;
                      const isPaid = order.status === 'PAID' || order.status === 'FULFILLED';
                      const isRefunded = order.status === 'REFUNDED';
                      
                      return (
                        <tr key={orderId} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ fontWeight: 800, color: '#0F172A' }}>
                              {order.userName || 'Valued Customer'}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                              {order.userEmail}
                            </div>
                            {order.userPhone && (
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                📞 {order.userPhone}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '1rem 1rem' }}>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.05rem', color: '#0F172A' }}>
                              ₹{order.amount || 499}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1rem' }}>
                            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#475569' }}>
                              {order.provider || 'Razorpay / Mock'}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '9999px',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                backgroundColor: isPaid ? '#ECFDF5' : isRefunded ? '#FEF2F2' : '#FEF3C7',
                                color: isPaid ? '#059669' : isRefunded ? '#DC2626' : '#D97706',
                              }}
                            >
                              {order.status || 'PENDING'}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1rem', fontSize: '0.82rem', color: '#64748B' }}>
                            {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                          </td>

                          <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                            {isPaid && (
                              <button
                                onClick={() => handleRefundOrder(orderId)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#DC2626', borderColor: '#FECACA' }}
                              >
                                Refund
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Modal 1: Add New Creator (Instagram ONLY) */}
        {isCreatorModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1.5rem' }}>
            <div className="hub-card" style={{ width: '100%', maxWidth: '540px', backgroundColor: 'var(--color-white)', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Instagram size={22} color="#E1306C" />
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>Add Creator to Network</h2>
                </div>
                <button onClick={() => setIsCreatorModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              {modalError && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>{modalError}</div>}

              <form onSubmit={handleCreateCreatorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Creator Full Name *</label>
                  <input type="text" required placeholder="e.g. Aarav Singhania" value={newCreator.name} onChange={e => setNewCreator({ ...newCreator, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Content Niche *</label>
                    <input type="text" required placeholder="e.g. Fintech & Investing" value={newCreator.niche} onChange={e => setNewCreator({ ...newCreator, niche: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Follower Count *</label>
                    <input type="text" required placeholder="e.g. 240K+" value={newCreator.followerCount} onChange={e => setNewCreator({ ...newCreator, followerCount: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Instagram Handle (Without @) *</label>
                  <input type="text" required placeholder="e.g. aarav.invests" value={newCreator.instagramUsername} onChange={e => setNewCreator({ ...newCreator, instagramUsername: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <ImageUploadField
                  label="Profile Image (1:1 Ratio) *"
                  value={newCreator.profileImage}
                  onChange={(url) => setNewCreator({ ...newCreator, profileImage: url })}
                  aspectRatio="1/1"
                  helperText="Recommended: Square headshot photo"
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Short Bio / Niche Statement *</label>
                  <textarea rows={2} required placeholder="Explosive financial literacy reels reaching 5M+ monthly viewers." value={newCreator.bio} onChange={e => setNewCreator({ ...newCreator, bio: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsCreatorModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" disabled={modalLoading} className="btn btn-primary btn-sm">{modalLoading ? 'Adding...' : 'Add Creator Live'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 2: Add New Team Member (Insta + LinkedIn) */}
        {isTeamModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1.5rem' }}>
            <div className="hub-card" style={{ width: '100%', maxWidth: '540px', backgroundColor: 'var(--color-white)', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>Add Expert Team Member</h2>
                <button onClick={() => setIsTeamModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              {modalError && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>{modalError}</div>}

              <form onSubmit={handleCreateTeamSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Member Name *</label>
                  <input type="text" required placeholder="e.g. Vikramaditya Rathore" value={newTeamMember.name} onChange={e => setNewTeamMember({ ...newTeamMember, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Designation / Role *</label>
                  <input type="text" required placeholder="e.g. Head of Paid Performance & Viral Growth" value={newTeamMember.role} onChange={e => setNewTeamMember({ ...newTeamMember, role: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <ImageUploadField
                  label="Photo Image (4:5 Aspect Ratio) *"
                  value={newTeamMember.image}
                  onChange={(url) => setNewTeamMember({ ...newTeamMember, image: url })}
                  aspectRatio="4/5"
                  helperText="Recommended: 4:5 portrait headshot"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Instagram Profile URL</label>
                    <input type="url" placeholder="https://instagram.com/user" value={newTeamMember.instagramUrl} onChange={e => setNewTeamMember({ ...newTeamMember, instagramUrl: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>LinkedIn Profile URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/user" value={newTeamMember.linkedinUrl} onChange={e => setNewTeamMember({ ...newTeamMember, linkedinUrl: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsTeamModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" disabled={modalLoading} className="btn btn-primary btn-sm">{modalLoading ? 'Adding...' : 'Add Team Member'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 3: Add New Client Result */}
        {isClientModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1.5rem' }}>
            <div className="hub-card" style={{ width: '100%', maxWidth: '540px', backgroundColor: 'var(--color-white)', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800 }}>Add Client Case Study</h2>
                <button onClick={() => setIsClientModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              {modalError && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>{modalError}</div>}

              <form onSubmit={handleCreateClientResultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Client / Brand Name *</label>
                  <input type="text" required placeholder="e.g. GrowthX E-Commerce" value={newClientResult.clientName} onChange={e => setNewClientResult({ ...newClientResult, clientName: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <ImageUploadField
                  label="Before Screenshot *"
                  value={newClientResult.beforeImage}
                  onChange={(url) => setNewClientResult({ ...newClientResult, beforeImage: url })}
                  aspectRatio="16/9"
                />

                <ImageUploadField
                  label="After Screenshot *"
                  value={newClientResult.afterImage}
                  onChange={(url) => setNewClientResult({ ...newClientResult, afterImage: url })}
                  aspectRatio="16/9"
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Client Rating (1 to 5 Stars)</label>
                  <select value={newClientResult.rating} onChange={e => setNewClientResult({ ...newClientResult, rating: Number(e.target.value) })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-white)' }}>
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3.0 Stars)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsClientModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" disabled={modalLoading} className="btn btn-primary btn-sm">{modalLoading ? 'Adding...' : 'Add Client Result'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 4: Add New Resource */}
        {isResourceModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1.5rem' }}>
            <div className="hub-card" style={{ width: '100%', maxWidth: '560px', backgroundColor: 'var(--color-white)', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} color="var(--color-primary)" />
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>Add New Digital Resource</h2>
                </div>
                <button onClick={() => setIsResourceModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              {modalError && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{modalError}</div>}

              <form onSubmit={handleCreateResourceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Resource Title *</label>
                  <input type="text" required placeholder="e.g. 2026 Viral Reel Hooks & Audio Pacing Sheet" value={newResource.title} onChange={e => setNewResource({ ...newResource, title: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Description / What's Inside *</label>
                  <textarea rows={3} required placeholder="Describe what templates, formulas, or checklists are included in this playbook..." value={newResource.description} onChange={e => setNewResource({ ...newResource, description: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Resource Type *</label>
                    <select value={newResource.type} onChange={e => setNewResource({ ...newResource, type: e.target.value as 'free' | 'premium' })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-white)' }}>
                      <option value="free">FREE (Instant Download)</option>
                      <option value="premium">PREMIUM (Paid Checkout)</option>
                    </select>
                  </div>

                  {newResource.type === 'premium' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Price (₹ INR) *</label>
                      <input type="number" min={1} required value={newResource.price} onChange={e => setNewResource({ ...newResource, price: Number(e.target.value) })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                    </div>
                  )}
                </div>

                <ImageUploadField
                  label="Thumbnail / Cover Image *"
                  value={newResource.thumbnail}
                  onChange={(url) => setNewResource({ ...newResource, thumbnail: url })}
                  aspectRatio="16/10"
                  helperText="Recommended: 16:10 preview mockup image"
                />

                {/* Resource Deliverable File or Link */}
                <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                    Resource Deliverable (What the Customer Actually Gets) *
                  </label>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                    Upload your actual PDF, ZIP, or Video file, OR paste a Google Drive / Notion / Dropbox link:
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button
                      type="button"
                      disabled={resourceFileUploading}
                      onClick={() => resourceFileInputRef.current?.click()}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
                    >
                      {resourceFileUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      <span>{resourceFileUploading ? 'Uploading File...' : 'Upload PDF/ZIP/Video'}</span>
                    </button>
                    <input
                      type="file"
                      ref={resourceFileInputRef}
                      onChange={handleResourceFileChange}
                      accept=".pdf,.zip,.mp4,application/pdf,application/zip,video/mp4"
                      style={{ display: 'none' }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Or paste Google Drive, Notion, or Download URL (https://...)"
                      value={newResource.fileKey}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewResource(prev => ({
                          ...prev,
                          fileKey: val,
                          fileName: prev.fileName || (val.includes('notion') ? 'Notion Template' : val.includes('drive') ? 'Google Drive Access' : 'Digital Playbook'),
                        }));
                      }}
                      style={{ flex: 1, padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                    />
                  </div>
                  {resourceFileUploadSuccess && (
                    <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                      <Check size={13} /> Deliverable file uploaded and ready!
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>File Name / Display Name *</label>
                    <input type="text" required placeholder="e.g. viral-hooks.pdf" value={newResource.fileName} onChange={e => setNewResource({ ...newResource, fileName: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>File Format *</label>
                    <select value={newResource.fileFormat} onChange={e => setNewResource({ ...newResource, fileFormat: e.target.value as any })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'var(--color-white)' }}>
                      <option value="pdf">PDF Document</option>
                      <option value="zip">ZIP Archive (Templates)</option>
                      <option value="mp4">MP4 Video Masterclass</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsResourceModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" disabled={modalLoading} className="btn btn-primary btn-sm" style={{ padding: '0.65rem 1.4rem' }}>{modalLoading ? 'Publishing...' : 'Publish Resource Live'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
