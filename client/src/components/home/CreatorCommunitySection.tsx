import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Creator } from '../../types';

interface CreatorCommunitySectionProps {
  creators: Creator[];
}

export const CreatorCommunitySection: React.FC<CreatorCommunitySectionProps> = ({ creators }) => {
  // Ensure we have enough items for seamless infinite scroll
  const marqueeList = creators.length > 0 ? [...creators, ...creators, ...creators, ...creators] : [];

  return (
    <section id="creators" className="section-white section-padding" style={{ overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>FOR CREATORS</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '1rem' }}>
            Meet Our Creators
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto', color: '#748496fc', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Join our creator network to get considered for brand collaborations, paid campaigns, creative opportunities, and exclusive creator resources.
          </p>
        </div>
      </div>

      {/* Infinite Smooth Right-to-Left Auto-Scrolling Carousel */}
      <div
        className="creators-marquee-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '1rem 0 2rem 0',
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          className="creators-marquee-track"
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            animation: 'scrollRightToLeft 32s linear infinite',
          }}
        >
          {marqueeList.map((creator, idx) => (
            <div
              key={`${creator._id || creator.instagramUsername}-${idx}`}
              className="hub-card creator-marquee-card"
              style={{
                width: '280px',
                minWidth: '280px',
                padding: '1.25rem',
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
            >
              {/* Compact Creator Profile Avatar (Small Size & Verified Ring) */}
              <div
                style={{
                  position: 'relative',
                  width: '82px',
                  height: '82px',
                  marginBottom: '0.85rem',
                }}
              >
                <img
                  src={creator.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={creator.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 6px 16px rgba(31, 5, 229, 0.15)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                  }}
                >
                  <CheckCircle2 size={13} />
                </div>
              </div>

              {/* Creator Name */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.2rem',
                }}
              >
                {creator.name}
              </h3>

              {/* Niche & Followers Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.65rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    backgroundColor: 'rgba(31, 5, 229, 0.08)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {creator.niche}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#E11D48',
                    backgroundColor: '#FFE4E6',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {creator.followerCount}
                </span>
              </div>

              {/* Bio Snippet */}
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.45,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: '36px',
                }}
              >
                {creator.bio}
              </p>

              {/* Instagram Handle Link */}
              <div
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <a
                  href={creator.instagramUrl || `https://instagram.com/${creator.instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#E11D48',
                  }}
                >
                  <Instagram size={14} />
                  <span>@{creator.instagramUsername}</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <a
          href="#work-with-us"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById('work-with-us');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => {
                const firstInput = target.querySelector('input');
                if (firstInput) (firstInput as HTMLInputElement).focus();
              }, 400);
            } else {
              window.location.href = '/#work-with-us';
            }
          }}
        >
          <span>Join Free Community →</span>
        </a>
      </div>

      <style>{`
        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .creators-marquee-track:hover {
          animation-play-state: paused;
        }

        .creator-marquee-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px -8px rgba(31, 5, 229, 0.15) !important;
          border-color: rgba(31, 5, 229, 0.3) !important;
        }
      `}</style>
    </section>
  );
};
