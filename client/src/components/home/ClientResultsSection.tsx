import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Instagram, Star } from 'lucide-react';
import { ClientResult } from '../../types';
import { formatAssetUrl } from '../../services/api';

interface ClientResultsSectionProps {
  clientResults: ClientResult[];
}

export const ClientResultsSection: React.FC<ClientResultsSectionProps> = ({ clientResults }) => {
  const displayClients = clientResults.length > 0 ? clientResults : [];

  return (
    <section id="results" className="section-white section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Award size={14} />
            <span>OUR CLIENTS</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.85rem' }}>
            Brands We’ve Worked With
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem' }}>
            A look at the brands and creators we’ve worked with across social media and content.
          </p>
        </div>

        {/* Client Cards Grid - Matching Expert Team Style */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.85rem',
            marginBottom: '3.5rem',
          }}
        >
          {displayClients.map((item, idx) => {
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
                key={item._id || item.clientName || idx}
                className="invoizmo-client-card hub-card"
                style={{
                  padding: '1.35rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 16px 38px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Photo / Brand Visual with Smooth Rounded Corners */}
                <div
                  className="media-container"
                  style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '18px',
                    marginBottom: '1.15rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
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
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>

                {/* Name & Description */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#0F172A',
                      }}
                    >
                      {item.clientName}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[...Array(item.rating || 5)].map((_, rIdx) => (
                        <Star key={rIdx} size={13} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: '#64748B',
                      lineHeight: 1.5,
                      marginBottom: '1.15rem',
                    }}
                  >
                    {descriptionText}
                  </p>

                  {/* Instagram Link & Icon */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.85rem',
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
                        gap: '0.4rem',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: '#E11D48',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <Instagram size={16} />
                      <span>@{cleanHandle || 'brand'}</span>
                    </a>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        padding: '0.15rem 0.5rem',
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

        {/* Centered Bottom Action Button */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/clients" className="btn btn-primary" style={{ padding: '0.85rem 2.25rem' }}>
            <span>Explore All Client Stories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .invoizmo-client-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px -8px rgba(31, 5, 229, 0.12), 0 8px 16px rgba(15, 23, 42, 0.04) !important;
          border-color: rgba(31, 5, 229, 0.25) !important;
        }
        .invoizmo-client-card:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
};
