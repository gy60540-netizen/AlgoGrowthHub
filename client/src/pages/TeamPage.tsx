import React, { useEffect, useState } from 'react';
import { Instagram, Linkedin, Users } from 'lucide-react';
import { getExpertTeam, defaultTeam } from '../services/api';
import { ExpertTeamMember } from '../types';

export const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<ExpertTeamMember[]>(defaultTeam);

  useEffect(() => {
    window.scrollTo(0, 0);
    getExpertTeam().then(setTeam);
  }, []);

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge">
            <Users size={14} />
            <span>Executive Leadership</span>
          </div>
          <h1 className="section-title">The Minds Behind AlgoGrowthHub</h1>
          <p className="section-subtitle">
            Meet our multidisciplinary team of viral short-form producers, algorithmic researchers, and growth strategists.
          </p>
        </div>
      </section>

      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {team.map((member, idx) => (
              <div
                key={member._id || member.name || idx}
                className="hub-card"
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '1.25rem',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
                }}
              >
                {/* Compact Photo Container */}
                <div
                  className="media-container"
                  style={{
                    width: '100%',
                    height: '210px',
                    borderRadius: '14px',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={member.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </div>

                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.18rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  {member.name}
                </h2>

                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                  {member.role}
                </div>

                {/* HARD RULE: Instagram + LinkedIn ONLY */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {member.instagramUrl && (
                    <a
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#E11D48',
                      }}
                    >
                      <Instagram size={15} />
                      <span>Instagram</span>
                    </a>
                  )}

                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#0284C7',
                      }}
                    >
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
