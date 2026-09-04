import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { getClientResults, defaultClientResults } from '../services/api';
import { ClientResult } from '../types';
import { StarRating } from '../components/ui/StarRating';

export const ClientsPage: React.FC = () => {
  const [clientResults, setClientResults] = useState<ClientResult[]>(defaultClientResults);

  useEffect(() => {
    window.scrollTo(0, 0);
    getClientResults().then(setClientResults);
  }, []);

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge">
            <Award size={14} />
            <span>Proven Transformations</span>
          </div>
          <h1 className="section-title">Client Case Studies & Verified Results</h1>
          <p className="section-subtitle">
            Explore direct Before & After metric transformations across organic reach, follower acquisition, and brand equity.
          </p>
        </div>
      </section>

      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {clientResults.map((item, idx) => (
              <div
                key={item._id || idx}
                className="hub-card"
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 1. Client Name */}
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  {item.clientName}
                </h2>

                {/* 2 & 3. Side-by-Side Before/After Images */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        letterSpacing: '+0.06em',
                        marginBottom: '0.5rem',
                        textAlign: 'center',
                      }}
                    >
                      BEFORE
                    </div>
                    <div
                      className="media-container"
                      style={{
                        aspectRatio: '4/5',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #CBD5E1',
                      }}
                    >
                      <img
                        src={item.beforeImage || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"}
                        alt={`${item.clientName} Before`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: 'var(--color-primary)',
                        letterSpacing: '+0.06em',
                        marginBottom: '0.5rem',
                        textAlign: 'center',
                      }}
                    >
                      AFTER
                    </div>
                    <div
                      className="media-container"
                      style={{
                        aspectRatio: '4/5',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid var(--color-primary)',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.2)',
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

                {/* 4. Rating */}
                <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: '0.5rem' }}>
                  <StarRating rating={item.rating || 5} size={22} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
