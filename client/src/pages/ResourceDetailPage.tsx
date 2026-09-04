import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Download, ShoppingBag, Sparkles } from 'lucide-react';
import { getResources, defaultResources } from '../services/api';
import { Resource } from '../types';
import { CheckoutModal } from '../components/common/CheckoutModal';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [downloadToken, setDownloadToken] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getResources().then((list) => {
      const found = list.find((r) => r.slug === slug) || list.find((r) => r.type === 'premium') || defaultResources[1];
      setResource(found);
    });
  }, [slug]);

  if (!resource) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p>Loading resource specifications...</p>
      </div>
    );
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `AlgoGrowthHub Premium Resource: ${resource.title}\n` +
      `Verification Token: ${downloadToken || 'TOKEN_OFFICIAL_VERIFIED'}\n` +
      `Access Granted. Transaction Authenticated.\n\n` +
      `Thank you for securing your copy. Follow the implementation blueprints to accelerate your organic growth.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resource.slug || 'premium-resource'}-unlocked.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Link
            to="/resources"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginBottom: '1.5rem',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Resources</span>
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              alignItems: 'flex-start',
            }}
            className="resource-detail-grid"
          >
            {/* Left: Content Details */}
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(31, 5, 229, 0.1)',
                    color: 'var(--color-primary)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '+0.05em',
                  }}
                >
                  {resource.type === 'premium' ? 'Premium Kit' : 'Free Playbook'}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  Format: Interactive PDF + Notion Template
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                {resource.title}
              </h1>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                {resource.description}
              </p>

              {/* Visual Cover / Preview */}
              {resource.thumbnail && (
                <div
                  className="media-container"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    maxHeight: '380px',
                    marginBottom: '2.5rem',
                    boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)',
                    border: '1px solid rgba(226, 232, 240, 0.6)',
                  }}
                >
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* What's Included */}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                What's Inside This Strategic Kit
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {[
                  "Complete 90-Day Step-by-Step Execution Framework",
                  "15+ High-Retention Video Hook Templates with Psychological Breakdowns",
                  "Proprietary Algorithm Distribution Checklist (Instagram, LinkedIn, YouTube)",
                  "Notion Editorial Calendar & Daily Content Workflow Blueprint",
                  "Lifetime Updates & Exclusive Access to Future Add-ons"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ fontSize: '1rem', color: 'var(--color-text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Checkout Box (Invoizmo Soft Shadow Style) */}
            <div
              style={{
                position: 'sticky',
                top: '100px',
                backgroundColor: '#FFFFFF',
                padding: '2.25rem',
                borderRadius: '24px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.1), 0 8px 16px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.65rem', fontWeight: 900, color: '#0F172A' }}>
                  {resource.currency === 'INR' || !resource.currency ? '₹' : '$'}{resource.price || 499}
                </span>
                <span style={{ fontSize: '1.05rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  {resource.currency === 'INR' || !resource.currency ? '₹1,999' : '$49'}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                  75% OFF
                </span>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                Instant digital download upon successful checkout. Secured with 256-bit server-side encryption.
              </p>

              {purchased ? (
                <div>
                  <div
                    style={{
                      backgroundColor: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      color: '#065F46',
                      padding: '1rem',
                      borderRadius: '14px',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <ShieldCheck size={22} color="#10B981" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Payment Verified!</div>
                      <div style={{ fontSize: '0.8rem' }}>Access token generated successfully.</div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Download size={18} />
                    <span>Download Complete Kit</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    boxShadow: '0 8px 25px rgba(31, 5, 229, 0.35)',
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Unlock Now ({resource.currency === 'INR' || !resource.currency ? '₹' : '$'}{resource.price || 499})</span>
                </button>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} color="#10B981" />
                  100% Satisfaction Guarantee • UPI & Cards Accepted
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        resource={resource}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(order, token, _url) => {
          setPurchased(true);
          setDownloadToken(token);
        }}
      />

      <style>{`
        @media (min-width: 992px) {
          .resource-detail-grid {
            grid-template-columns: 1.35fr 0.85fr !important;
          }
        }
      `}</style>
    </main>
  );
};
