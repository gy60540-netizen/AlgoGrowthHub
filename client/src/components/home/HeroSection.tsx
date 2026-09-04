import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSettings } from '../../types';

interface HeroSectionProps {
  settings?: HeroSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const headline = settings?.heading || settings?.headline || "We Turn Social Attention Into Real Growth.";
  const description = settings?.description || settings?.subheading || settings?.subheadline || "We plan, create, and manage social media strategies that help brands reach the right audience, build a stronger presence, and grow.";
  const primaryCta = settings?.ctaText1 || "Get Started →";
  const primaryCtaUrl = settings?.ctaLink1 || "/book-session";
  const secondaryCta = settings?.ctaText2 || "Explore Services";
  const secondaryCtaUrl = settings?.ctaLink2 || "/services";

  return (
    <section
      id="hero"
      className="hero-section"
    >
      {/* Soft Top Sky Gradient to guarantee high text contrast */}
      <div className="hero-gradient-overlay" />

      {/* Top Centered Content Block */}
      <div className="container hero-content-container">
        {/* Main Headline */}
        <h1 className="hero-main-heading">
          We Turn Social Attention{' '}
          <span className="hero-heading-gradient">
            Into Real Growth.
          </span>
        </h1>

        {/* Subtext Description */}
        <p className="hero-subtext">
          {description}
        </p>

        {/* Action Buttons: Flanking Left & Right on Desktop, Stacked & Centered on Mobile */}
        <div className="hero-buttons-container">
          <Link
            to={primaryCtaUrl}
            className="btn btn-primary hero-btn-primary"
          >
            <span>{primaryCta}</span>
          </Link>

          <Link
            to={secondaryCtaUrl}
            className="btn btn-secondary hero-btn-secondary"
          >
            <span>{secondaryCta}</span>
          </Link>
        </div>
      </div>

      {/* Desktop Bottom Spacer */}
      <div className="hero-desktop-spacer" />

      <style>{`
        /* Base / Desktop Styles */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding-top: 74px;
          padding-bottom: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-image: url('/hero-bg.jpg');
          background-size: 100% auto;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-color: #D9EEFC;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.45) 32%, rgba(255, 255, 255, 0) 65%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-content-container {
          position: relative;
          z-index: 3;
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
          padding-top: 1.5rem;
        }

        .hero-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.1rem, 4.2vw, 3.4rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin-bottom: 1rem;
        }

        .hero-heading-gradient {
          background: linear-gradient(135deg, #1F05E5 0%, #0284C7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .hero-subtext {
          font-size: clamp(0.96rem, 1.4vw, 1.14rem);
          line-height: 1.65;
          color: #1E293B;
          max-width: 740px;
          margin: 0 auto 1.65rem auto;
          font-weight: 500;
        }

        .hero-buttons-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(12rem, 24vw, 22rem);
          margin-top: 0.5rem;
        }

        .hero-btn-primary {
          padding: 0.85rem 1.85rem;
          font-size: 0.98rem;
          box-shadow: 0 8px 25px rgba(31, 5, 229, 0.35);
        }

        .hero-btn-secondary {
          padding: 0.85rem 1.85rem;
          font-size: 0.98rem;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-color: rgba(203, 213, 225, 0.9);
        }

        .hero-desktop-spacer {
          position: relative;
          z-index: 2;
          width: 100%;
          height: clamp(320px, 42vw, 480px);
          pointer-events: none;
        }

        /* 📱 Mobile & Tablet Responsive View (Strict Overrides) */
        @media (max-width: 991px) {
          .hero-section {
            background-image: url('/hero-bg-mobile.jpg') !important;
            background-size: cover !important;
            background-position: center bottom !important;
            background-repeat: no-repeat !important;
            min-height: 580px !important;
            height: auto !important;
            max-height: 640px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }

          .hero-gradient-overlay {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.45) 30%, rgba(255, 255, 255, 0) 52%) !important;
          }

          .hero-content-container {
            padding-top: 76px !important;
            max-width: 92% !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }

          .hero-main-heading {
            font-size: clamp(1.38rem, 5.2vw, 1.7rem) !important;
            margin-bottom: 0.4rem !important;
            line-height: 1.18 !important;
            text-align: center !important;
          }

          .hero-subtext {
            font-size: 0.82rem !important;
            line-height: 1.38 !important;
            margin-bottom: 0.75rem !important;
            max-width: 310px !important;
            text-align: center !important;
          }

          .hero-buttons-container {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            width: 100% !important;
            max-width: 230px !important;
            margin: 0 auto !important;
          }

          .hero-btn-primary, .hero-btn-secondary {
            width: 100% !important;
            padding: 0.58rem 1.15rem !important;
            font-size: 0.84rem !important;
            border-radius: 9999px !important;
          }

          .desktop-only-widget {
            display: none !important;
          }

          .hero-desktop-spacer {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
