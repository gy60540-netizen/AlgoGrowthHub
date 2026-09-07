import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MousePointer,
  Users,
  Eye,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { getPartnerDashboard, getPartnerLeads } from '../../services/api';
import { PartnerDashboardData, PartnerLead, PartnerLink } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const PartnerDashboardPage: React.FC = () => {
  const [data, setData] = useState<PartnerDashboardData | null>(null);
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [dashRes, leadsRes] = await Promise.allSettled([
        getPartnerDashboard(),
        getPartnerLeads(),
      ]);

      if (dashRes.status === 'fulfilled' && dashRes.value.success && dashRes.value.data) {
        setData(dashRes.value.data);
      }
      if (leadsRes.status === 'fulfilled' && leadsRes.value.success) {
        setLeads(leadsRes.value.data || []);
      }
    } catch (err) {
      console.error('Failed to load partner dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const handleCopy = (link: PartnerLink) => {
    const fullUrl = `${window.location.origin}${link.targetUrl}${link.targetUrl.includes('?') ? '&' : '?'}ref=${link.code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(link.code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <RefreshCw size={32} className="spin" color="var(--color-primary)" />
        <p style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>Loading your partner dashboard...</p>
      </div>
    );
  }

  const partner = data?.partner;
  const metrics = data?.metrics || {
    totalClicks: 0,
    uniqueVisitors: 0,
    resourceViews: 0,
    purchases: 0,
    revenueGenerated: 0,
    conversionRate: '0.00%',
  };
  const links = data?.links || [];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Top Navbar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.25rem', color: '#0F172A', letterSpacing: '-0.02em' }}>
                AlgoGrowth<span style={{ color: '#1F05E5' }}>Hub</span>
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  backgroundColor: '#EDE9FE',
                  color: '#6D28D9',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                🤝 Partner Portal
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right', display: 'none', md: 'block' } as any}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>
                {partner?.name || 'Valued Partner'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                {partner?.email}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                border: '1px solid #FEE2E2',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ paddingTop: '2.25rem' }}>
        {/* Welcome Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem 2.25rem',
            marginBottom: '2rem',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Welcome back, {partner?.name}!
              </h1>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                }}
              >
                ● ACTIVE
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: 0, maxWidth: '640px' }}>
              Track all traffic, clicks, and live purchases generated from your personal referral links. Every sale is cryptographically verified via Razorpay for 100% transparency.
            </p>
          </div>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1rem' }}
          >
            <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Live Stats'}</span>
          </button>
        </div>

        {/* 6 Key Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Card 1: Clicks */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Clicks</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F05E5' }}>
                <MousePointer size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              {metrics.totalClicks.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>Referral visits logged</div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Unique Visitors</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <Users size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              {metrics.uniqueVisitors.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700, marginTop: '0.2rem' }}>Individual devices</div>
          </div>

          {/* Card 3: Resource Views */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Resource Views</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
                <Eye size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              {metrics.resourceViews.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>Product pages viewed</div>
          </div>

          {/* Card 4: Verified Purchases */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Purchases</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <ShoppingBag size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              {metrics.purchases.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '0.2rem' }}>⚡ Verified orders</div>
          </div>

          {/* Card 5: Revenue Generated */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Revenue Generated</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <DollarSign size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              ₹{metrics.revenueGenerated.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: 700, marginTop: '0.2rem' }}>Direct gross volume</div>
          </div>

          {/* Card 6: Conversion Rate */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.35rem', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Conversion Rate</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6D28D9' }}>
                <TrendingUp size={16} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
              {metrics.conversionRate}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>Purchases / clicks</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'overview' ? '#1F05E5' : 'transparent',
              color: activeTab === 'overview' ? '#FFFFFF' : '#64748B',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            My Referral Links ({links.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: activeTab === 'leads' ? '#1F05E5' : 'transparent',
              color: activeTab === 'leads' ? '#FFFFFF' : '#64748B',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <ShieldCheck size={16} />
            <span>My Generated Leads & Orders ({leads.length})</span>
          </button>
        </div>

        {/* TAB 1: Assigned Referral Links */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Your Assigned Referral Links
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.88rem' }}>
                Copy any link below to share with your audience. Any visitor arriving with your code is credited to your account for 30 days.
              </p>
            </div>

            {links.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <Lock size={36} color="#94A3B8" style={{ margin: '0 auto 0.75rem auto' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>No links assigned yet</h3>
                <p style={{ color: '#64748B', fontSize: '0.88rem' }}>Please contact AlgoGrowthHub administrator to assign your referral resources.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {links.map((link) => {
                  const fullUrl = `${window.location.origin}${link.targetUrl}${link.targetUrl.includes('?') ? '&' : '?'}ref=${link.code}`;
                  const isCopied = copiedId === link.code;

                  return (
                    <div
                      key={link.code}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                              {link.resourceTitle || 'General Platform Link'}
                            </h3>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D28D9', backgroundColor: '#EDE9FE', padding: '0.15rem 0.5rem', borderRadius: '4px', marginTop: '0.35rem', display: 'inline-block' }}>
                              Code: {link.code}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: link.isActive ? '#059669' : '#DC2626', backgroundColor: link.isActive ? '#ECFDF5' : '#FEF2F2', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                            {link.isActive ? 'ACTIVE' : 'PAUSED'}
                          </span>
                        </div>

                        {/* Copyable Link Box */}
                        <div
                          style={{
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            padding: '0.65rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <span style={{ fontSize: '0.8rem', color: '#475569', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                            {fullUrl}
                          </span>
                          <button
                            onClick={() => handleCopy(link)}
                            title="Copy link"
                            style={{
                              backgroundColor: isCopied ? '#ECFDF5' : '#1F05E5',
                              color: isCopied ? '#059669' : '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              flexShrink: 0,
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Mini Link Performance Metrics */}
                      <div
                        style={{
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '0.85rem',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          textAlign: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Clicks</div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{link.clicksCount}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Sales</div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#059669' }}>{link.salesCount}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Revenue</div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>₹{link.revenueGenerated.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Transparent Verified Leads & Orders Table */}
        {activeTab === 'leads' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '1.75rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Attributed Leads & Purchases Stream
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                  Live verification log of all visitors who completed payments using your referral code.
                </p>
              </div>

              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.35rem 0.75rem', borderRadius: '9999px' }}>
                {leads.length} Verified Transactions
              </span>
            </div>

            {leads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748B' }}>
                <ShieldCheck size={44} color="#94A3B8" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.3rem' }}>
                  No Purchases Attributed Yet
                </h3>
                <p style={{ fontSize: '0.88rem', maxWidth: '460px', margin: '0 auto' }}>
                  When visitors click your referral links and purchase a digital guide or strategy session, their verified orders will instantly appear in this table.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Date & Time</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Customer</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Purchased Item / Service</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Amount</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#475569', fontSize: '0.76rem', textTransform: 'uppercase' }}>Ref Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => {
                      const dateStr = new Date(lead.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      });

                      return (
                        <tr key={lead._id} style={{ borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' }}>
                          <td style={{ padding: '1rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                            {dateStr}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 800, color: '#0F172A' }}>{lead.customerName}</div>
                            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{lead.customerEmail}</div>
                          </td>
                          <td style={{ padding: '1rem', fontWeight: 700, color: '#0F172A' }}>
                            {lead.itemTitle}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1rem', color: '#0F172A' }}>
                              ₹{lead.amount}
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                backgroundColor: '#ECFDF5',
                                color: '#059669',
                              }}
                            >
                              <CheckCircle2 size={13} />
                              <span>VERIFIED PAID</span>
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.78rem', backgroundColor: '#F1F5F9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                              {lead.referralCode}
                            </span>
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
      </main>
    </div>
  );
};
