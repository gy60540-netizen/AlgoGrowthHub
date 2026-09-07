import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../../types';
import { formatAssetUrl } from '../../services/api';

interface ServicesGridSectionProps {
  services: Service[];
}

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ services }) => {
  // Ensure we have 9 items for the 3x3 layout
  const displayServices = services.slice(0, 9);

  // Mixed pattern indices (0-indexed in a 3x3 grid of 9 cells):
  // Pattern:
  // Cell 0: IMAGE | Cell 1: TEXT  | Cell 2: IMAGE
  // Cell 3: TEXT  | Cell 4: IMAGE | Cell 5: TEXT
  // Cell 6: IMAGE | Cell 7: TEXT  | Cell 8: IMAGE

  const isImageCell = (index: number) => {
    return index === 0 || index === 2 || index === 4 || index === 6 || index === 8;
  };

  return (
    <section id="services" className="section-white section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.85rem' }}>
            Simple, Effective Social Media Services
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem' }}>
            We handle strategy, content creation, short-form video, analytics, and campaigns to help your brand grow.
          </p>
        </div>

        {/* Compact 3x3 Mixed Grid with Invoizmo-Style Soft Shadows */}
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto 2.75rem auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.35rem',
          }}
          className="services-mixed-grid"
        >
          {displayServices.map((service, index) => {
            const isImage = isImageCell(index);

            if (isImage) {
              // Image Block with Invoizmo-style soft diffuse shadow
              return (
                <div
                  key={service._id || service.slug || index}
                  className="invoizmo-service-card media-container"
                  style={{
                    height: '235px',
                    borderRadius: '24px',
                    boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.09), 0 4px 12px rgba(15, 23, 42, 0.03)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={formatAssetUrl(service.image) || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"}
                    alt={service.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80";
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.2) 55%, transparent 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '1.35rem',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-white)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        letterSpacing: '-0.015em',
                        lineHeight: 1.3,
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      {service.title}
                    </span>
                  </div>
                </div>
              );
            }

            // Compact Text Content Block with Invoizmo Soft Floating Card
            return (
              <div
                key={service._id || service.slug || index}
                className="invoizmo-service-card hub-card"
                style={{
                  height: '235px',
                  padding: '1.35rem',
                  borderRadius: '24px',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                      letterSpacing: '+0.08em',
                      marginBottom: '0.4rem',
                      backgroundColor: 'rgba(31, 5, 229, 0.06)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    0{index + 1} / SERVICE
                  </div>

                  <h3
                    style={{
                      fontSize: '1.08rem',
                      fontWeight: 800,
                      lineHeight: 1.3,
                      marginBottom: '0.4rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-secondary)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {service.shortDescription || service.title}
                  </p>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginTop: '0.5rem',
                  }}
                >
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/services" className="btn btn-primary" style={{ padding: '0.85rem 2.25rem' }}>
            <span>View All Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .invoizmo-service-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 48px -8px rgba(15, 23, 42, 0.12), 0 8px 18px rgba(15, 23, 42, 0.04) !important;
        }

        .invoizmo-service-card:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 992px) {
          .services-mixed-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-mixed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
