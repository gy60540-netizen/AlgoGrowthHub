import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AboutSettings } from '../../types';

interface AboutSectionProps {
  settings?: AboutSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const aboutData = {
    sectionLabel: settings?.sectionLabel || "WHO WE ARE",
    heading: settings?.heading || "We Help Brands Grow Where People Spend Their Time.",
    description: settings?.description || "AlgoGrowthHub helps businesses and creators build a stronger presence on social media. We handle strategy, content, campaigns, and performance so you can focus on your business.",
    features: [
      { title: "Strategy", desc: "Clear direction before we create." },
      { title: "Content", desc: "Content made for your audience and your goals." },
      { title: "Analytics", desc: "We track what works and improve what doesn't." },
      { title: "Growth", desc: "We keep testing, learning, and improving." },
    ],
    ctaLabel: settings?.ctaLabel || "Learn More About Us",
    ctaUrl: settings?.ctaUrl || "/about",
    images: settings?.images || ["/about-team.png"]
  };

  const imageSrc = (aboutData.images && aboutData.images.length > 0 && aboutData.images[0]) 
    ? (aboutData.images[0].includes('unsplash') ? '/about-team.png' : aboutData.images[0])
    : '/about-team.png';

  return (
    <section id="about" className="section-soft section-padding">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Column: Team / Strategy Image */}
          <div style={{ position: 'relative' }}>
            <div
              className="media-container"
              style={{
                borderRadius: '24px',
                aspectRatio: '4/3',
                maxHeight: '500px',
                boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                overflow: 'hidden',
              }}
            >
              <img
                src={imageSrc}
                alt="AlgoGrowthHub Team"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <div className="section-badge" style={{ marginBottom: '1rem' }}>
              <span>{aboutData.sectionLabel}</span>
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem', color: '#0F172A' }}>
              {aboutData.heading}
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem' }}>
              {aboutData.description}
            </p>

            {/* 4 Value Features */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {aboutData.features.map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.15rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(226, 232, 240, 0.7)',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <CheckCircle2 size={18} color="#1F05E5" />
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
                      {feat.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <Link to={aboutData.ctaUrl} className="btn btn-primary">
              <span>{aboutData.ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
