import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { getSiteSettings, defaultSiteSettings } from '../services/api';
import { SiteSettings } from '../types';
import { BookCallSection } from '../components/home/BookCallSection';

export const BookSessionPage: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSiteSettings().then(setSiteSettings);
  }, []);

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge">
            <Calendar size={14} />
            <span>Growth Consultation</span>
          </div>
          <h1 className="section-title">Schedule Your 1-on-1 Growth Diagnostic</h1>
          <p className="section-subtitle">
            Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through.
          </p>
        </div>
      </section>

      {/* Embedded Booking Section with full responsive form */}
      <BookCallSection settings={siteSettings.bookingSection} />
    </main>
  );
};
