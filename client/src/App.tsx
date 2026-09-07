import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CreatorsPage } from './pages/CreatorsPage';
import { TeamPage } from './pages/TeamPage';
import { ClientsPage } from './pages/ClientsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { BookSessionPage } from './pages/BookSessionPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { PartnerDashboardPage } from './pages/partner/PartnerDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AuthProvider } from './context/AuthContext';
import { getSiteSettings, defaultSiteSettings } from './services/api';
import { SiteSettings } from './types';
import { useReferralAttribution } from './hooks/useReferralAttribution';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useReferralAttribution();
  const location = useLocation();
  const isDashboard = location.pathname === '/admin' || location.pathname === '/partner/dashboard';
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    getSiteSettings().then(setSiteSettings);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isDashboard && <Navbar />}
      <div style={{ paddingTop: !isDashboard && !isHomePage ? '84px' : 0 }}>
        {children}
      </div>
      {!isDashboard && <Footer settings={siteSettings.footer} />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/book-session" element={<BookSessionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/partner/login" element={<AdminLoginPage />} />
            <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
