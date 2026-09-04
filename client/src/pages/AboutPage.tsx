import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Target, Users } from 'lucide-react';
import { getSiteSettings, defaultSiteSettings } from '../services/api';
import { SiteSettings } from '../types';

export const AboutPage: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSiteSettings().then(setSiteSettings);
  }, []);

  return (
    <main>
      {/* Hero Header */}
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div className="section-badge" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={14} />
            <span>ABOUT ALGOGROWTHHUB</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Building Brands People Remember.
          </h1>
          <p className="section-subtitle" style={{ fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
            We help businesses and creators build a stronger digital presence through simple strategy, consistent content, and smart social media marketing.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'center',
              marginBottom: '5rem',
            }}
            className="about-page-grid"
          >
            <div
              className="media-container"
              style={{
                borderRadius: '24px',
                aspectRatio: '4/3',
                boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                overflow: 'hidden',
              }}
            >
              <img
                src="/about-team.png"
                alt="AlgoGrowthHub Team Working on Content Strategy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                A Practical Approach to Social Growth
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.25rem' }}>
                Growing on social media is not about chasing random trends. It comes down to understanding what your audience cares about, publishing quality content consistently, and keeping communication clear.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem' }}>
                At AlgoGrowthHub, we work alongside founders, marketing teams, and creators as an extension of their team — managing the day-to-day work so you can stay focused on building your product or business.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  "Clear direction before we create.",
                  "Content made for your audience and your goals.",
                  "We track what works and improve what doesn't.",
                  "We keep testing, learning, and improving."
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#1F05E5" />
                    <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            <div className="hub-card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(31, 5, 229, 0.08)', color: '#1F05E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                Clear Strategy
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                We analyze your audience and niche to build a practical content plan that aligns with your real goals.
              </p>
            </div>

            <div className="hub-card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Target size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                Consistent Content
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                From short-form reels to clean graphics, we produce content that looks great and communicates clearly.
              </p>
            </div>

            <div className="hub-card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.6)', boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>
                Creator Partnerships
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                Connect with relevant creators to introduce your brand to new audiences naturally and build trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="section-white section-padding" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '0.85rem' }}>
            Ready to Grow Your Social Media Presence?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem', color: '#64748B' }}>
            Book a 30-minute introductory call to discuss your goals and how we can help.
          </p>
          <Link to="/book-session" className="btn btn-primary">
            <span>Book A Call →</span>
          </Link>
        </div>
      </section>

      <style>{`
        @media (min-width: 992px) {
          .about-page-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </main>
  );
};
