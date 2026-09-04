import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, AlertCircle, Instagram, Youtube, Send as TelegramIcon, Linkedin, TrendingUp, DollarSign, Users } from 'lucide-react';
import { LetsWorkWithUsSettings, CreatorApplicationPayload } from '../../types';
import { postCreatorApplication } from '../../services/api';

interface WorkWithUsSectionProps {
  settings?: LetsWorkWithUsSettings;
}

export const WorkWithUsSection: React.FC<WorkWithUsSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState<CreatorApplicationPayload>({
    name: '',
    email: '',
    phone: '',
    platform: 'Instagram',
    socialLink: '',
    followerCount: '10K - 50K',
    niche: 'Fintech & Tech',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await postCreatorApplication(formData);
      if (res.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          platform: 'Instagram',
          socialLink: '',
          followerCount: '10K - 50K',
          niche: 'Fintech & Tech',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Application submission error');
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram size={18} color="#E11D48" />;
      case 'YouTube':
        return <Youtube size={18} color="#DC2626" />;
      case 'Telegram':
        return <TelegramIcon size={18} color="#0284C7" />;
      case 'LinkedIn':
        return <Linkedin size={18} color="#0A66C2" />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <section id="work-with-us" className="section-soft section-padding">
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: '28px',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            padding: '3.5rem',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.1)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
          className="creator-apply-grid"
        >
          {/* Left Column: Form & Pitch */}
          <div className="creator-form-col" style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
            <div className="section-badge" style={{ marginBottom: '1rem' }}>
              <Sparkles size={14} />
              <span>FOR CREATORS</span>
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem', color: '#0F172A' }}>
             Turn Your Influence Into Real Opportunities.
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem' }}>
            Join our creator network to get considered for brand collaborations, paid campaigns, creative opportunities, and exclusive creator resources.
            </p>

            {status === 'success' && (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#065F46',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                }}
              >
                <CheckCircle2 size={24} color="#10B981" />
                <div>
                  <strong style={{ fontSize: '1rem' }}>Application Submitted Successfully!</strong>
                  <div style={{ fontSize: '0.88rem', marginTop: '0.2rem' }}>
                    Our talent management team will review your profile and contact you on WhatsApp/Email within 24 hours.
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#991B1B',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <AlertCircle size={20} color="#EF4444" />
                <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: '100%' }}>
              <div className="creator-form-row">
                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Creator Name / Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-bg-soft)',
                    }}
                  />
                </div>

                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aryan@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-bg-soft)',
                    }}
                  />
                </div>
              </div>

              <div className="creator-form-row">
                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-bg-soft)',
                    }}
                  />
                </div>

                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Primary Social Platform *
                  </label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        padding: '0.8rem 1rem 0.8rem 2.4rem',
                        borderRadius: '10px',
                        border: '1px solid var(--color-border)',
                        outline: 'none',
                        backgroundColor: 'var(--color-bg-soft)',
                        fontWeight: 600,
                      }}
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Telegram">Telegram</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </select>
                    <div style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      {getPlatformIcon(formData.platform)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="creator-form-row">
                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Social Profile Link / Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://instagram.com/username or @handle"
                    value={formData.socialLink}
                    onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-bg-soft)',
                    }}
                  />
                </div>

                <div style={{ minWidth: 0, width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Audience Size
                  </label>
                  <select
                    value={formData.followerCount}
                    onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-bg-soft)',
                    }}
                  >
                    <option value="< 10K">Under 10K</option>
                    <option value="10K - 50K">10K - 50K Followers</option>
                    <option value="50K - 150K">50K - 150K Followers</option>
                    <option value="150K - 500K">150K - 500K Followers</option>
                    <option value="500K+">500K+ Super Creator</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  padding: '1rem',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  marginTop: '0.5rem',
                  boxShadow: '0 8px 25px rgba(31, 5, 229, 0.35)',
                }}
              >
                <Send size={17} />
                <span>{loading ? 'Submitting Application...' : 'Apply to Join Creator Network →'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Perks & Creator Ecosystem Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', minWidth: 0, width: '100%', maxWidth: '100%' }}>
            {[
              {
                title: "Brand Collaborations",
                desc: "Get considered for relevant brand partnerships that match your audience, niche, and content style.",
                icon: <DollarSign size={20} />,
                bg: "#ECFDF5",
                color: "#059669"
              },
              {
                title: "Paid Campaigns",
                desc: "Discover paid campaigns where your content and audience can create real value.",
                icon: <TrendingUp size={20} />,
                bg: "#EFF6FF",
                color: "#2563EB"
              },
              {
                title: "Creator Network",
                desc: "Connect with a growing network of creators, opportunities, and collaboration",
                icon: <Users size={20} />,
                bg: "#FAF5FF",
                color: "#9333EA"
              },
              {
                title: "Creator Resources",
                desc: "Access useful tools, guides, templates, and resources to improve your content and workflow.",
                icon: <Sparkles size={20} />,
                bg: "#FFF7ED",
                color: "#EA580C"
              }
            ].map((perk, i) => (
              <div
                key={i}
                className="perk-card-box"
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: '1.35rem 1.5rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxSizing: 'border-box',
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.45rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: perk.bg,
                      color: perk.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {perk.icon}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                    {perk.title}
                  </h4>
                </div>
                <p className="perk-card-desc" style={{ fontSize: '0.88rem', lineHeight: 1.55, color: '#64748B', margin: 0, paddingLeft: '3.25rem' }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .creator-form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          width: 100%;
          min-width: 0;
        }

        @media (min-width: 992px) {
          .creator-apply-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }

        @media (max-width: 768px) {
          .creator-form-row {
            grid-template-columns: 1fr !important;
            gap: 0.9rem !important;
          }
          .creator-apply-grid {
            padding: 1.75rem 1.15rem !important;
            border-radius: 20px !important;
            gap: 2.25rem !important;
          }
          .perk-card-box {
            padding: 1.15rem 1rem !important;
          }
          .perk-card-desc {
            padding-left: 0 !important;
            margin-top: 0.35rem !important;
          }
        }
      `}</style>
    </section>
  );
};
