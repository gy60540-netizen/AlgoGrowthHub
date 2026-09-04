import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { getServices, defaultServices } from '../services/api';
import { Service } from '../types';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    window.scrollTo(0, 0);
    getServices().then(setServices);
  }, []);

  return (
    <main>
      {/* Header */}
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>OUR SERVICES</span>
          </div>
          <h1 className="section-title" style={{ color: '#0F172A', marginBottom: '1rem' }}>
            Social Media Services That Drive Real Growth
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto', color: '#64748B', fontSize: '1.1rem', lineHeight: 1.6 }}>
            We plan, create, and manage your social channels so you can reach the right audience and grow your brand.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {services.map((service, index) => (
              <div
                key={service._id || service.slug || index}
                className="hub-card"
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div
                  className="media-container"
                  style={{
                    aspectRatio: '16/10',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <img
                    src={service.image || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    letterSpacing: '+0.08em',
                    marginBottom: '0.5rem',
                  }}
                >
                  MODULE 0{index + 1}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {service.title}
                </h2>

                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {service.shortDescription}
                </p>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  {service.features?.map((feat, fidx) => (
                    <div key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} color="#0284C7" />
                      <span style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <Link
                    to={`/services/${service.slug || 'service'}`}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <span>Explore Service Blueprint →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
