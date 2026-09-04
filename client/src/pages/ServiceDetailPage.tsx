import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { getServices, defaultServices } from '../services/api';
import { Service } from '../types';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getServices().then((list) => {
      const found = list.find((s) => s.slug === slug) || list[0] || defaultServices[0];
      setService(found);
    });
  }, [slug]);

  if (!service) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p>Loading service blueprint...</p>
      </div>
    );
  }

  return (
    <main>
      {/* Breadcrumb & Header */}
      <section className="section-white" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Link
            to="/services"
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
            <span>Back to All Services</span>
          </Link>

          <div style={{ maxWidth: '800px' }}>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              {service.title}
            </h1>
            <p className="section-subtitle">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'flex-start',
            }}
            className="service-detail-grid"
          >
            {/* Left: Deep Dive & Deliverables */}
            <div>
              <div
                className="media-container"
                style={{
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-xl)',
                  marginBottom: '2.5rem',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <img
                  src={service.image || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
                How We Execute & Deliver Results
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                Our approach to {service.title.toLowerCase()} starts with deep algorithmic profiling and competitive landscape intelligence. We eliminate guesswork by building tested content and distribution funnels tailored to your ideal client persona.
              </p>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, marginTop: '2rem', marginBottom: '1.25rem' }}>
                Key Included Deliverables:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {service.features?.map((feat, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--color-white)',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                    }}
                  >
                    <CheckCircle2 size={22} color="#0284C7" />
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking Consultation Card */}
            <div
              style={{
                position: 'sticky',
                top: '100px',
                backgroundColor: 'var(--color-white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Implement This Service For Your Brand
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Schedule a 30-minute growth diagnostic session. We'll show you exactly how {service.title} can generate predictable pipeline growth.
              </p>

              <Link to="/book-session" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem' }}>
                <Calendar size={18} />
                <span>Book a Strategy Call</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 992px) {
          .service-detail-grid {
            grid-template-columns: 1.35fr 0.85fr !important;
          }
        }
      `}</style>
    </main>
  );
};
