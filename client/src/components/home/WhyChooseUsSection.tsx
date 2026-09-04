import React from 'react';
import { Target, FileText, BarChart3, HeartHandshake, Sparkles } from 'lucide-react';
import { WhyChooseUsSettings } from '../../types';

interface WhyChooseUsSectionProps {
  settings?: WhyChooseUsSettings;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ settings }) => {
  const benefitCards = [
    {
      title: "Clear Strategy",
      description: "We start with your goals and build a plan around them.",
      icon: <Target size={22} color="#1F05E5" />,
      bg: "#EEF2FF"
    },
    {
      title: "Quality Content",
      description: "Content that looks good, feels natural, and fits your audience.",
      icon: <FileText size={22} color="#059669" />,
      bg: "#ECFDF5"
    },
    {
      title: "Regular Reporting",
      description: "See what is working and where we can improve.",
      icon: <BarChart3 size={22} color="#0284C7" />,
      bg: "#F0F9FF"
    },
    {
      title: "Long-Term Support",
      description: "We work with you beyond a single campaign.",
      icon: <HeartHandshake size={22} color="#7C3AED" />,
      bg: "#F5F3FF"
    }
  ];

  const sectionLabel = settings?.sectionLabel || "WHY CHOOSE US";
  const heading = settings?.heading || "Your Success, Our Priority";
  const description = settings?.description || "We focus on clear communication, useful ideas, consistent work, and measurable progress.";
  const imageSrc = (settings?.primaryImage && !settings?.primaryImage.includes('unsplash')) 
    ? settings.primaryImage 
    : '/why-choose-us.png';

  return (
    <section id="why-choose-us" className="section-soft section-padding">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="why-choose-grid"
        >
          {/* Left Column: Text & 4 Benefit Cards (2x2) */}
          <div>
            <div className="section-badge" style={{ marginBottom: '1rem' }}>
              <Sparkles size={14} />
              <span>{sectionLabel}</span>
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem', color: '#0F172A' }}>
              {heading}
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2.5rem' }}>
              {description}
            </p>

            {/* Exactly 4 Benefit Cards (2x2 Grid) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.4rem',
              }}
              className="platform-cards-grid"
            >
              {benefitCards.map((card, idx) => (
                <div
                  key={idx}
                  className="invoizmo-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.65rem 1.65rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      backgroundColor: card.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.15rem',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    {card.icon}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.45rem', letterSpacing: '-0.015em' }}>
                    {card.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Full-Cover Clean 3D Growth Graphic with Invoizmo Soft Shadow */}
          <div>
            <div
              style={{
                width: '100%',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px -10px rgba(15, 23, 42, 0.12), 0 8px 16px rgba(15, 23, 42, 0.04)',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                maxHeight: '520px',
                aspectRatio: '4/3',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src={imageSrc}
                alt="Why Choose AlgoGrowthHub Strategy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/why-choose-us.png';
                }}
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
        </div>
      </div>

      <style>{`
        .invoizmo-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 48px -8px rgba(15, 23, 42, 0.13), 0 8px 18px rgba(15, 23, 42, 0.04) !important;
        }

        @media (min-width: 992px) {
          .why-choose-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @media (max-width: 640px) {
          .platform-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
