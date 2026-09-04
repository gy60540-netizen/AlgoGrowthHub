import React, { useEffect } from 'react';
import { FileCheck, Shield, HelpCircle, Mail, Phone } from 'lucide-react';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Header Section */}
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <FileCheck size={14} />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Terms & Conditions
          </h1>
          <p className="section-subtitle" style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto' }}>
            Effective Date: September 2026. Please read these terms carefully before engaging our services or joining our creator network.
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
            {/* 1. Engagement & Services */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(31, 5, 229, 0.08)', color: 'var(--color-primary)' }}>
                  <Shield size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  1. Agency Engagement & Scope
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                AlgoGrowthHub provides strategic growth consulting, digital asset creation, short-form video editing, carousel designs, and full social media management. Specific deliverables, turnaround schedules, and commercial terms are confirmed during the 1-on-1 strategy intake session.
              </p>
            </div>

            {/* 2. Creator Network */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(2, 132, 199, 0.08)', color: '#0284C7' }}>
                  <HelpCircle size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  2. Creator Network Guidelines
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                Creators applying through our platform warrant that their submitted follower metrics, platform links, and engagement rates are genuine. Brand collaboration terms, compensations, and content guidelines will be outlined in individual campaign agreements.
              </p>
            </div>

            {/* 3. Intellectual Property */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10B981' }}>
                  <FileCheck size={20} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  3. Intellectual Property Rights
                </h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.98rem' }}>
                Upon complete receipt of contracted fees, all finalized creative assets (videos, carousels, web code, branding materials) produced specifically for the client become the exclusive property of the client.
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
                Need Assistance With Our Terms?
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Reach out to our executive support team directly:
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
