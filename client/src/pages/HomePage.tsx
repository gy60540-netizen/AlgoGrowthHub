import React, { useEffect, useState } from 'react';
import { 
  getSiteSettings, 
  getServices, 
  getCreators, 
  getExpertTeam, 
  getClientResults, 
  getResources,
  defaultSiteSettings,
  defaultServices,
  defaultCreators,
  defaultTeam,
  defaultClientResults,
  defaultResources
} from '../services/api';
import { 
  SiteSettings, 
  Service, 
  Creator, 
  ExpertTeamMember, 
  ClientResult, 
  Resource 
} from '../types';

import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesGridSection } from '../components/home/ServicesGridSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { ExpertTeamSection } from '../components/home/ExpertTeamSection';
import { CreatorCommunitySection } from '../components/home/CreatorCommunitySection';
import { ClientResultsSection } from '../components/home/ClientResultsSection';
import { ResourcesSection } from '../components/home/ResourcesSection';
import { BookCallSection } from '../components/home/BookCallSection';
import { WorkWithUsSection } from '../components/home/WorkWithUsSection';

export const HomePage: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [creators, setCreators] = useState<Creator[]>(defaultCreators);
  const [team, setTeam] = useState<ExpertTeamMember[]>(defaultTeam);
  const [clientResults, setClientResults] = useState<ClientResult[]>(defaultClientResults);
  const [resources, setResources] = useState<Resource[]>(defaultResources);

  useEffect(() => {
    // Parallel fetch with auto fallback
    Promise.allSettled([
      getSiteSettings().then(setSiteSettings),
      getServices().then(setServices),
      getCreators().then(setCreators),
      getExpertTeam().then(setTeam),
      getClientResults().then(setClientResults),
      getResources().then(setResources),
    ]);
  }, []);

  return (
    <main>
      {/* Section 01: Hero & Navbar (#FFFFFF) */}
      <HeroSection settings={siteSettings.hero} />

      {/* Section 02: About (#F4F8FC) */}
      <AboutSection settings={siteSettings.about} />

      {/* Section 03: Power Services (3x3 Grid) (#FFFFFF) */}
      <ServicesGridSection services={services} />

      {/* Section 04: Why Choose Us (4 Platform Cards) (#F4F8FC) */}
      <WhyChooseUsSection settings={siteSettings.whyChooseUs} />

      {/* Section 05: Meet Our Expert Team (Insta+LinkedIn) (#FFFFFF) */}
      <ExpertTeamSection team={team} />

      {/* Section 06: Creator Community (Instagram ONLY) (#F4F8FC) */}
      <CreatorCommunitySection creators={creators} />

      {/* Section 07: Client Results (Before/After Carousel) (#FFFFFF) */}
      <ClientResultsSection clientResults={clientResults} />

      {/* Section 08: Resources (Free/Premium Playbooks) (#F4F8FC) */}
      <ResourcesSection resources={resources} />

      {/* Section 09: Book a Call Session (#FFFFFF) */}
      <BookCallSection settings={siteSettings.bookingSection} />

      {/* Section 10: Let's Work With Us (#F4F8FC) */}
      <WorkWithUsSection settings={siteSettings.letsWorkWithUs} />
    </main>
  );
};
