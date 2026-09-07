import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Users, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [loginRole, setLoginRole] = useState<'admin' | 'partner'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email.trim(), password);
      if (res.success) {
        const role = (res.user?.role || '').toUpperCase();
        if (role === 'PARTNER') {
          navigate('/partner/dashboard');
        } else {
          if (loginRole === 'partner') {
            // Admin accidentally logged in on partner tab
            navigate('/admin');
          } else {
            navigate('/admin');
          }
        }
      } else {
        setError(res.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const isPartner = loginRole === 'partner';

  return (
    <div
      style={{
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--color-bg-soft)',
      }}
    >
      <div
        className="hub-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--color-white)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {/* Role Selector Segmented Control */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F1F5F9',
            padding: '0.35rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid #E2E8F0',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setLoginRole('admin');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.6rem 0.75rem',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: !isPartner ? '#FFFFFF' : 'transparent',
              color: !isPartner ? '#0F172A' : '#64748B',
              fontWeight: !isPartner ? 800 : 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              boxShadow: !isPartner ? '0 2px 8px rgba(15, 23, 42, 0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <ShieldCheck size={16} color={!isPartner ? 'var(--color-primary)' : '#64748B'} />
            <span>Login as Admin</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginRole('partner');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '0.6rem 0.75rem',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: isPartner ? '#FFFFFF' : 'transparent',
              color: isPartner ? '#1F05E5' : '#64748B',
              fontWeight: isPartner ? 800 : 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              boxShadow: isPartner ? '0 2px 8px rgba(31, 5, 229, 0.12)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s ease',
            }}
          >
            <Users size={16} color={isPartner ? '#1F05E5' : '#64748B'} />
            <span>Login as Partner</span>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: isPartner ? '#EDE9FE' : 'var(--color-primary-light)',
              color: isPartner ? '#6D28D9' : 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            {isPartner ? <Users size={28} /> : <ShieldCheck size={28} />}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-text-primary)' }}>
            {isPartner ? 'Partner Referral Portal' : 'CMS Administrator'}
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            {isPartner
              ? 'Access your referral links, visitor traffic & live verified leads'
              : 'AlgoGrowthHub Content & Operations Control'}
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#991B1B',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
              {isPartner ? 'Partner Email Address' : 'Admin Email'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder={isPartner ? 'aman@example.com' : 'admin@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                }}
              />
              <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 2.75rem 0.8rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                }}
              />
              <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.95rem',
              marginTop: '0.5rem',
              backgroundColor: isPartner ? '#1F05E5' : undefined,
            }}
          >
            <span>{loading ? 'Authenticating...' : isPartner ? 'Sign In to Partner Portal' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};
