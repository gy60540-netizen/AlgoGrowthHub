import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Instagram } from 'lucide-react';
import { ClientResult } from '../../types';
import { formatAssetUrl } from '../../services/api';

interface ClientResultsSectionProps {
  clientResults: ClientResult[];
}

export const ClientResultsSection: React.FC<ClientResultsSectionProps> = ({ clientResults }) => {
  const displayClients = clientResults.length > 0 ? clientResults : [];
  // Quadruple items to make a seamless, infinite marquee loop
  const marqueeList = displayClients.length > 0 
    ? [...displayClients, ...displayClients, ...displayClients, ...displayClients] 
    : [];

  return (
    <section id="results" className="section-white section-padding" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '0.85rem' }}>
            <Award size={14} />
            <span>OUR CLIENTS</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.75rem' }}>
            Brands We’ve Worked With
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem' }}>
            A look at the brands and creators we’ve worked with across social media and content.
          </p>
        </div>
      </div>

      {/* Infinite Smooth Left-to-Right Marquee Slider */}
      <div
        className="clients-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '0.5rem 0 2.5rem 0',
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          className="clients-marquee-track"
          style={{
            display: 'flex',
            gap: '1.35rem',
            width: 'max-content',
            animation: 'scrollClientsLeftToRight 30s linear infinite',
          }}
        >
          {marqueeList.map((item, idx) => {
            const rawHandle = item.instagramUrl || item.clientHandle || item.clientName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9._]/g, '');
            const cleanHandle = rawHandle
              .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
              .replace(/\/$/, '')
              .replace(/^@/, '');
            const instagramUrl = rawHandle.startsWith('http')
              ? rawHandle
              : `https://instagram.com/${cleanHandle}`;

            const imageSrc = formatAssetUrl(item.afterImage || item.beforeImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.clientName)}&background=1F05E5&color=fff&size=400&bold=true`;

            const descriptionText = item.description || item.testimonial || item.metricsSummary || "Complete brand growth management, viral short-form content, and audience scaling.";

            return (
              <div
                key={`${item._id || item.clientName || 'client'}-${idx}`}
                className="invoizmo-client-card hub-card"
                style={{
                  width: '260px',
                  minWidth: '260px',
                  padding: '1rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.07), 0 3px 8px rgba(15, 23, 42, 0.02)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Photo / Brand Visual - Compact Height */}
                <div
                  className="media-container"
                  style={{
                    width: '100%',
                    height: '135px',
                    borderRadius: '14px',
                    marginBottom: '0.85rem',
                    overflow: 'hidden',
                    backgroundColor: '#F8FAFC',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={item.clientName}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.clientName)}&background=1F05E5&color=fff&size=400&bold=true`;
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                </div>

                {/* Name & Description (No Ratings per request) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '0.35rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={item.clientName}
                  >
                    {item.clientName}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: '#64748B',
                      lineHeight: 1.45,
                      marginBottom: '0.85rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '2.4em',
                    }}
                    title={descriptionText}
                  >
                    {descriptionText}
                  </p>

                  {/* Instagram Link & Icon */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(226, 232, 240, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.clientName} Instagram`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#E11D48',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram size={15} />
                      <span>@{cleanHandle || 'brand'}</span>
                    </a>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                      }}
                    >
                      Verified Client
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Bottom Action Button */}
      <div className="container" style={{ textAlign: 'center' }}>
        <Link to="/clients" className="btn btn-primary" style={{ padding: '0.85rem 2.25rem' }}>
          <span>Explore All Client Stories</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        @keyframes scrollClientsLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .clients-marquee-track:hover {
          animation-play-state: paused;
        }

        .invoizmo-client-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 38px -8px rgba(31, 5, 229, 0.12), 0 6px 14px rgba(15, 23, 42, 0.04) !important;
          border-color: rgba(31, 5, 229, 0.3) !important;
        }

        .invoizmo-client-card:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};
