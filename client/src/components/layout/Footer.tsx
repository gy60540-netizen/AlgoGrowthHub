import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { FooterSettings } from '../../types';

interface FooterProps {
  settings?: FooterSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  const footerData: FooterSettings = {
    description: "AlgoGrowthHub is the premier social media growth agency and creator ecosystem helping visionary brands and creators command algorithmic attention.",
    ...settings,
    instagramUrl: settings?.instagramUrl && settings.instagramUrl !== 'https://instagram.com/algogrowthhub' ? settings.instagramUrl : "https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0",
    twitterUrl: settings?.twitterUrl && settings.twitterUrl !== 'https://x.com/algogrowthhub' ? settings.twitterUrl : "https://x.com/algowinner01",
    telegramUrl: settings?.telegramUrl && settings.telegramUrl !== 'https://t.me/algogrowthhub' ? settings.telegramUrl : "https://t.me/algowinner01",
    email: settings?.email && settings.email !== 'hello@algogrowthhub.com' ? settings.email : "algowinner01official@gmail.com",
    mobile: settings?.mobile && settings.mobile !== '+91 98765 43210' ? settings.mobile : "+91 9369348311",
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-dark)',
        color: 'var(--color-text-light)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid var(--color-bg-dark-border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img
                src="/logo.png"
                alt="AlgoGrowthHub"
                style={{ height: '46px', width: 'auto', filter: 'brightness(1.35)' }}
              />
            </Link>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--color-text-light-muted)',
                marginBottom: '1.5rem',
              }}
            >
              {footerData.description}
            </p>

            {/* Social Links (Instagram, Twitter, Telegram ONLY) */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {footerData.instagramUrl && (
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--color-white)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Instagram size={18} />
                </a>
              )}
              {footerData.twitterUrl && (
                <a
                  href={footerData.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--color-white)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {footerData.telegramUrl && (
                <a
                  href={footerData.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--color-white)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Send size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  About Agency
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Services & Solutions
                </Link>
              </li>
              <li>
                <Link to="/clients" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
              }}
            >
              Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>
                <Link to="/creators" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Creator Network
                </Link>
              </li>
              <li>
                <Link to="/team" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Our Expert Team
                </Link>
              </li>
              <li>
                <Link to="/resources" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Growth Resources & Playbooks
                </Link>
              </li>
              <li>
                <Link to="/book-session" style={{ color: 'var(--color-text-light-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                  Book a Strategy Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (ONLY Email & Mobile) */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1.25rem',
              }}
            >
              Direct Inquiries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(2, 132, 199, 0.15)',
                    color: '#38BDF8',
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-light-muted)', textTransform: 'uppercase' }}>
                    Email Us
                  </span>
                  <a href={`mailto:${footerData.email}`} style={{ color: 'var(--color-white)', fontSize: '0.95rem', fontWeight: 500 }}>
                    {footerData.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-light-muted)', textTransform: 'uppercase' }}>
                    Call / WhatsApp
                  </span>
                  <a href={`tel:${footerData.mobile}`} style={{ color: 'var(--color-white)', fontSize: '0.95rem', fontWeight: 500 }}>
                    {footerData.mobile}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Link
                  to="/admin/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-light-muted)',
                    opacity: 0.6,
                  }}
                >
                  <span>Admin Portal</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-bg-dark-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--color-text-light-muted)',
          }}
        >
          <p>© {currentYear} AlgoGrowthHub. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--color-text-light-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Privacy Policy
            </Link>
            <span style={{ opacity: 0.35 }}>•</span>
            <Link to="/terms" style={{ color: 'var(--color-text-light-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
              Terms of Service
            </Link>
            <span style={{ opacity: 0.35 }}>•</span>
            <span>Engineered for Maximum Virality & Conversion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
