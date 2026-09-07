import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Results', path: '/clients' },
    { name: 'Creators', path: '/creators' },
    { name: 'Our Team', path: '/team' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.75)',
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '62px' 
        }}
      >
        {/* Brand Logo - Bigger & Prominent */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo.png?v=2"
            alt="AlgoGrowthHub"
            style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.6rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  position: 'relative',
                  padding: '0.2rem 0',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-3px',
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Auth Area */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.85rem' }} className="desktop-cta">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isAdmin && (
                <Link
                  to="/admin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  <ShieldCheck size={13} />
                  <span>Admin Panel</span>
                </Link>
              )}
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={logout}
                title="Log Out"
                style={{
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  padding: '0.4rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link
                to="/login"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  padding: '0.4rem 0.65rem',
                }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/book-session" className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}>
            <span>Book a Call</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  padding: '0.35rem 0',
                }}
              >
                {link.name}
              </Link>
            ))}

            <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {isAuthenticated ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Signed in as {user?.name}</span>
                  <button onClick={logout} className="btn btn-secondary btn-sm">Log Out</button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                to="/book-session"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.4rem', padding: '0.75rem' }}
              >
                <span>Book a Call Session</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
