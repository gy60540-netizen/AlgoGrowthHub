import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone, Calendar } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Header Section */}
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={14} />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p className="section-subtitle" style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            Last updated: September 2026. Your privacy and digital data integrity are of paramount importance to AlgoGrowthHub.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-soft section-padding">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 5vw, 3.5rem)',
              boxShadow: '0 4px 25px rgba(0, 0, 0, 0.04)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            {/* Section 1 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(31, 5, 229, 0.08)', color: 'var(--color-primary)' }}>
                  <Lock size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  1. Information We Collect
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem', marginBottom: '0.75rem' }}>
                When you interact with <strong>AlgoGrowthHub</strong>, request consultations, apply to our creator network, or book growth strategy sessions, we collect personal and business information that you voluntarily provide to us:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                <li><strong>Personal Identification Data:</strong> Full name, official email address, telephone/WhatsApp contact number.</li>
                <li><strong>Business & Social Profile Data:</strong> Brand name, website URLs, social media profile links (Instagram, YouTube, LinkedIn, Telegram), niche, and follower metrics.</li>
                <li><strong>Consultation Requirements:</strong> Specific business growth goals, target services requested, preferred scheduling dates, and project descriptions.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(2, 132, 199, 0.08)', color: '#0284C7' }}>
                  <Eye size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  2. How We Use Your Information
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem', marginBottom: '0.75rem' }}>
                We process your data strictly for legitimate operational purposes, including:
              </p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                <li>Facilitating scheduled 1-on-1 strategy sessions and consultation calls.</li>
                <li>Delivering custom short-form video editing, carousel designs, web development, and social media management services.</li>
                <li>Matching creators in our network with verified brand collaboration campaigns and sponsorships.</li>
                <li>Sending transactional updates, booking confirmations, and growth audit reports.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10B981' }}>
                  <FileText size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  3. Data Security & Third-Party Sharing
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                We enforce strict data encryption and access-control standards. We <strong>never sell, rent, or trade</strong> your private personal data or social media credentials to third-party data brokers. Data is stored securely and accessed only by authorized AlgoGrowthHub leadership and technical administrators.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B' }}>
                  <Calendar size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  4. Your Rights & Data Erasure
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                You maintain full rights to review, update, or request immediate deletion of any personal data submitted through our booking or creator forms. To exercise your rights, please reach out directly using the official contact channels below.
              </p>
            </div>

            {/* Contact Box */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-light)',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                Have Questions Regarding Privacy?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                If you have any questions or require data clarification, please contact our legal and support team:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="var(--color-primary)" />
                  <a href="mailto:algowinner01official@gmail.com" style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                    algowinner01official@gmail.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="#10B981" />
                  <a href="tel:+919369348311" style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                    +91 9369348311
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
