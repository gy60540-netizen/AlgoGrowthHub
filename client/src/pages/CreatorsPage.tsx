import React, { useEffect, useState } from 'react';
import { Instagram, ArrowRight, Sparkles } from 'lucide-react';
import { getCreators, defaultCreators, formatAssetUrl } from '../services/api';
import { Creator } from '../types';

export const CreatorsPage: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>(defaultCreators);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCreators().then(setCreators);
  }, []);

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Verified Influencer Network</span>
          </div>
          <h1 className="section-title">AlgoGrowthHub Creator Roster</h1>
          <p className="section-subtitle">
            Connect with verified Instagram creators across tech, finance, lifestyle, and business.
          </p>
        </div>
      </section>

      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {creators.map((creator, idx) => (
              <div
                key={creator._id || creator.instagramUsername || idx}
                className="hub-card"
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 1:1 Aspect Ratio Fixed Container */}
                <div
                  className="media-container"
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <img
                    src={formatAssetUrl(creator.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=1F05E5&color=fff&size=400&bold=true`}
                    alt={creator.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=1F05E5&color=fff&size=400&bold=true`;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                    {creator.name}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#E11D48',
                      backgroundColor: '#FFE4E6',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    {creator.followerCount}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {creator.niche}
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {creator.bio}
                </p>

                {/* HARD RULE: Instagram ONLY */}
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                  <a
                    href={creator.instagramUrl || `https://instagram.com/${creator.instagramUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: '#E11D48',
                    }}
                  >
                    <Instagram size={17} />
                    <span>@{creator.instagramUsername}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
