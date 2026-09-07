import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Users, ArrowRight } from 'lucide-react';
import { ExpertTeamMember } from '../../types';

interface ExpertTeamSectionProps {
  team: ExpertTeamMember[];
}

export const ExpertTeamSection: React.FC<ExpertTeamSectionProps> = ({ team }) => {
  const displayTeam = team.slice(0, 4);

  return (
    <section id="team" className="section-soft section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Users size={14} />
            <span>Core Leadership</span>
          </div>
          <h2 className="section-title">Meet Our Expert Team</h2>
          <p className="section-subtitle">
            Senior strategists, viral short-form producers, and performance media directors behind our client campaigns.
          </p>
        </div>

        {/* Team Grid with Invoizmo Soft Floating Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.85rem',
            marginBottom: '3.5rem',
          }}
        >
          {displayTeam.map((member, idx) => (
            <div
              key={member._id || member.name || idx}
              className="invoizmo-team-card hub-card"
              style={{
                padding: '1.35rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '26px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(226, 232, 240, 0.4)',
                boxShadow: '0 16px 38px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Compact Team Photo with Smooth Rounded Corners */}
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
                  src={member.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />
              </div>

              {/* Name & Role */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '0.25rem',
                  }}
                >
                  {member.name}
                </h3>

                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  {member.role}
                </div>

                {/* HARD RULE: Instagram + LinkedIn ONLY */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(226, 232, 240, 0.6)',
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
                      aria-label={`${member.name} Instagram`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#E11D48',
                        transition: 'transform 0.2s ease',
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
                      aria-label={`${member.name} LinkedIn`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#0284C7',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Team Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/team" className="btn btn-secondary" style={{ padding: '0.85rem 2.25rem' }}>
            <span>Experts</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .invoizmo-team-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 26px 52px -10px rgba(15, 23, 42, 0.12), 0 8px 20px rgba(15, 23, 42, 0.04) !important;
        }

        .invoizmo-team-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
