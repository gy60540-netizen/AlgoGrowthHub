import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, TrendingUp } from 'lucide-react';
import { ClientResult } from '../../types';
import { StarRating } from '../ui/StarRating';

interface ClientResultsSectionProps {
  clientResults: ClientResult[];
}

export const ClientResultsSection: React.FC<ClientResultsSectionProps> = ({ clientResults }) => {
  // Duplicate for seamless infinite circular loop
  const marqueeList = clientResults.length > 0 ? [...clientResults, ...clientResults, ...clientResults, ...clientResults] : [];

  return (
    <section id="results" className="section-white section-padding" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Award size={14} />
            <span>CLIENT RESULTS</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.85rem' }}>
            Real Results for Real Brands
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', fontSize: '1.05rem' }}>
            See how we have helped brands and creators increase engagement and reach a bigger audience.
          </p>
        </div>
      </div>

      {/* Infinite Seamless Circular Motion Track (Moving Left to Right) */}
      <div
        className="results-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '0.5rem 0 2rem 0',
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          className="results-marquee-track"
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            animation: 'scrollResultsLeftToRight 34s linear infinite',
          }}
        >
          {marqueeList.map((item, idx) => (
            <div
              key={`${item._id || 'res'}-${idx}`}
              className="hub-card result-marquee-card"
              style={{
                width: '280px',
                minWidth: '280px',
                backgroundColor: 'var(--color-bg-soft)',
                borderRadius: '18px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.06)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
            >
              {/* Client Name & Verified Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item.clientName}
                </h3>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#ECFDF5',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <TrendingUp size={11} /> Lift
                </span>
              </div>

              {/* Side-by-Side Compact Before & After Screenshots */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.65rem',
                  marginBottom: '0.85rem',
                }}
              >
                {/* BEFORE Photo */}
                <div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '+0.05em',
                      marginBottom: '0.25rem',
                      textAlign: 'center',
                    }}
                  >
                    BEFORE
                  </div>
                  <div
                    className="media-container"
                    style={{
                      width: '100%',
                      height: '125px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.beforeImage || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"}
                      alt={`${item.clientName} Before`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* AFTER Photo */}
                <div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                      letterSpacing: '+0.05em',
                      marginBottom: '0.25rem',
                      textAlign: 'center',
                    }}
                  >
                    AFTER
                  </div>
                  <div
                    className="media-container"
                    style={{
                      width: '100%',
                      height: '125px',
                      borderRadius: '10px',
                      border: '2px solid var(--color-primary)',
                      boxShadow: '0 4px 10px rgba(31, 5, 229, 0.15)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.afterImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"}
                      alt={`${item.clientName} After`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '0.35rem' }}>
                <StarRating rating={item.rating || 5} size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Bottom Action Button */}
      <div className="container" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link to="/clients" className="btn btn-primary" style={{ padding: '0.85rem 2.25rem' }}>
          <span>View All Client Results</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        @keyframes scrollResultsLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .results-marquee-track:hover {
          animation-play-state: paused;
        }

        .result-marquee-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 30px -6px rgba(31, 5, 229, 0.14) !important;
          border-color: rgba(31, 5, 229, 0.3) !important;
        }
      `}</style>
    </section>
  );
};
