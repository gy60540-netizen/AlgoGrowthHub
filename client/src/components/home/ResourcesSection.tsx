import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Resource } from '../../types';

interface ResourcesSectionProps {
  resources: Resource[];
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Duplicate for seamless infinite loop
  const marqueeList = resources.length > 0 ? [...resources, ...resources, ...resources, ...resources] : [];

  const handleFreeDownload = (resource: Resource) => {
    const id = resource._id || resource.slug;
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(id);
      setTimeout(() => setDownloadSuccess(null), 3000);
      
      const element = document.createElement("a");
      const file = new Blob([`AlgoGrowthHub Resource: ${resource.title}\nThank you for downloading our exclusive growth playbook!`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${resource.slug || 'growth-playbook'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <section id="resources" className="section-soft section-padding" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <BookOpen size={14} />
            <span>RESOURCES</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.85rem' }}>
            Free & Premium Growth Guides
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem' }}>
            Practical checklists, editing templates, and guides to help you improve your social media presence.
          </p>
        </div>
      </div>

      {/* Infinite Seamless Circular Motion Marquee Track */}
      <div
        className="resources-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '0.5rem 0 2rem 0',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div
          className="resources-marquee-track"
          style={{
            display: 'flex',
            gap: '1.75rem',
            width: 'max-content',
            animation: 'scrollResourcesLeft 36s linear infinite',
          }}
        >
          {marqueeList.map((res, idx) => {
            const resId = `${res._id || res.slug || 'res'}-${idx}`;
            const isFree = res.type === 'free';

            return (
              <div
                key={resId}
                className="hub-card resource-marquee-card"
                style={{
                  width: '320px',
                  minWidth: '320px',
                  backgroundColor: 'var(--color-white)',
                  padding: '1.25rem',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Thumbnail Container */}
                <div
                  className="media-container"
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    borderRadius: '14px',
                    marginBottom: '1.25rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={res.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={res.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '+0.06em',
                      backgroundColor: isFree ? '#10B981' : '#1F05E5',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                  >
                    {isFree ? 'FREE' : `PREMIUM • ₹${res.price || 499}`}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.4,
                    marginBottom: '0.5rem',
                    minHeight: '44px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {res.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {res.description}
                </p>

                {/* Action Button */}
                <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border)' }}>
                  {isFree ? (
                    <button
                      onClick={() => handleFreeDownload(res)}
                      disabled={downloadingId === (res._id || res.slug)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: '100%',
                        color: '#059669',
                        borderColor: '#A7F3D0',
                        backgroundColor: '#ECFDF5',
                        borderRadius: '10px',
                      }}
                    >
                      {downloadSuccess === (res._id || res.slug) ? (
                        <>
                          <Check size={16} />
                          <span>Downloaded!</span>
                        </>
                      ) : downloadingId === (res._id || res.slug) ? (
                        <span>Preparing file...</span>
                      ) : (
                        <>
                          <Download size={15} />
                          <span>Download Free →</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      to={`/resources/${res.slug || 'premium-guide'}`}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', borderRadius: '10px' }}
                    >
                      <ShoppingBag size={15} />
                      <span>Buy Now (₹{res.price || 499}) →</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered "See More" Button placed below the circular motion track */}
      <div className="container" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link to="/resources" className="btn btn-primary" style={{ padding: '0.85rem 2.25rem' }}>
          <span>See More</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        @keyframes scrollResourcesLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .resources-marquee-track:hover {
          animation-play-state: paused;
        }

        .resource-marquee-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px -8px rgba(31, 5, 229, 0.14) !important;
          border-color: rgba(31, 5, 229, 0.3) !important;
        }
      `}</style>
    </section>
  );
};
