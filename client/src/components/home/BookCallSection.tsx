import React, { useState } from 'react';
import { Calendar, Clock, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { BookingSectionSettings, BookingPayload } from '../../types';
import { initiateBookingCheckout, verifyBookingPayment, formatAssetUrl } from '../../services/api';
import { getActiveReferralCode } from '../../hooks/useReferralAttribution';

interface BookCallSectionProps {
  settings?: BookingSectionSettings;
}

export const BookCallSection: React.FC<BookCallSectionProps> = ({ settings }) => {
  const data = settings || {
    sectionHeading: "Book Your 1-on-1 Growth Strategy Session",
    description: "Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through.",
    image: "/booking-call.png",
    availableServices: [
      "Full Social Media Management",
      "Carousal Design",
      "Vedio Editing",
      "Web Devolopment",
      "Ai Agent Building",
      "Digital Assets",
      "Run Your PR"
    ]
  };

  const imageSrc = (data.image && !data.image.includes('unsplash') && data.image !== '/booking-call.png') 
    ? formatAssetUrl(data.image) 
    : '/booking-call.png?v=2';

  const [formData, setFormData] = useState<BookingPayload>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: data.availableServices?.[0] || 'Social Media Management',
    preferredDate: '',
    preferredTime: '11:00 AM - 11:30 AM',
    timezone: 'IST (UTC+5:30)',
    message: ''
  });

  const [socialLink, setSocialLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const handleBookingVerification = async (bookingId: string, paymentId: string, signature: string) => {
    try {
      const verifyRes = await verifyBookingPayment({
        bookingId,
        paymentId,
        signature,
      });

      if (!verifyRes.success || !verifyRes.data) {
        setStatus('error');
        setErrorMessage(verifyRes.message || 'Payment verification failed. Please contact support.');
        setLoading(false);
        return;
      }

      setConfirmedBooking(verifyRes.data.booking);
      setStatus('success');
      setSocialLink('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: data.availableServices?.[0] || 'Social Media Management',
        preferredDate: '',
        preferredTime: '11:00 AM - 11:30 AM',
        timezone: 'IST (UTC+5:30)',
        message: ''
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Payment verification encountered an issue.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const payload: BookingPayload = {
        ...formData,
        amount: 999,
        message: [formData.message, socialLink ? `Social / Website: ${socialLink}` : ''].filter(Boolean).join('\n'),
        referralCode: getActiveReferralCode() || undefined
      };

      const checkoutRes = await initiateBookingCheckout(payload);
      if (!checkoutRes.success || !checkoutRes.data) {
        setStatus('error');
        setErrorMessage(checkoutRes.message || 'Failed to initiate booking checkout. Please try again.');
        setLoading(false);
        return;
      }

      const checkoutData = checkoutRes.data;

      // Check if Razorpay is loaded in window and has a valid key
      if (
        checkoutData.provider === 'razorpay' &&
        (window as any).Razorpay &&
        checkoutData.keyId &&
        !checkoutData.keyId.includes('placeholder')
      ) {
        const options = {
          key: checkoutData.keyId,
          amount: (checkoutData.amount || 999) * 100,
          currency: checkoutData.currency || 'INR',
          name: 'AlgoGrowthHub',
          description: `1-on-1 Growth Strategy Session (${formData.service})`,
          image: '/logo.png',
          order_id: checkoutData.providerOrderId,
          handler: async (response: any) => {
            await handleBookingVerification(
              checkoutData.bookingId,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#1F05E5',
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          setLoading(false);
          setStatus('error');
          setErrorMessage(response.error?.description || 'Payment was declined or cancelled.');
        });
        rzp.open();
      } else {
        // Fallback / mock simulator mode (if running in test or placeholder keys)
        await handleBookingVerification(
          checkoutData.bookingId,
          `pay_mock_${Date.now()}`,
          `sig_mock_${Date.now()}`
        );
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Booking submission failed');
      setLoading(false);
    }
  };

  return (
    <section id="book-session" className="section-white section-padding">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="booking-grid"
        >
          {/* Left Column: Heading, Description & Interactive Form */}
          <div>
            {/* Animated Blinking / Pulsing 50% Discount Badge */}
            <div
              className="pulse-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #FF385C 0%, #E11D48 40%, #1F05E5 100%)',
                color: '#FFFFFF',
                padding: '0.5rem 1.3rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.86rem',
                fontWeight: 800,
                letterSpacing: '+0.04em',
                textTransform: 'uppercase',
                border: '1.5px solid rgba(255, 255, 255, 0.5)',
                marginBottom: '1.25rem',
                boxShadow: '0 6px 22px rgba(225, 29, 72, 0.38)',
              }}
            >
              {/* Live Glowing Radar Pulse Dot */}
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    opacity: 0.75,
                    animation: 'ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }}
                />
              </span>
              <span>Open Consultation</span>
            </div>

            <h2
              className="section-title"
              style={{
                textAlign: 'left',
                marginBottom: '1.15rem',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 3.8vw, 2.85rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0F172A',
              }}
            >
              Book A{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #1F05E5 0%, #0284C7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Call
              </span>
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem' }}>
              {data.description || "Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through."}
            </p>

            {status === 'success' && (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #10B981',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={24} color="#059669" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#065F46' }}>
                      1-on-1 Strategy Session Booked & Verified!
                    </h4>
                    <span style={{ display: 'inline-block', marginTop: '0.2rem', fontSize: '0.78rem', fontWeight: 800, color: '#059669', backgroundColor: '#D1FAE5', padding: '0.2rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ⚡ ₹999 PAID • INSTANT CONFIRMATION
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#047857', lineHeight: 1.6, margin: 0 }}>
                  Thank you! Your booking and payment of <strong>₹999</strong> have been recorded successfully. Our senior growth strategist will review your profile and send your Google Meet invitation and agenda via email and WhatsApp.
                </p>

                {confirmedBooking?.providerPaymentId && (
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid #A7F3D0', fontSize: '0.8rem', color: '#065F46', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span><strong>Transaction ID:</strong> <code>{confirmedBooking.providerPaymentId}</code></span>
                    {confirmedBooking?._id && <span><strong>Booking Ref:</strong> <code>{confirmedBooking._id.slice(-8)}</code></span>}
                  </div>
                )}
              </div>
            )}

            {status === 'error' && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#991B1B',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <AlertCircle size={20} color="#EF4444" />
                <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Brand / Bussiness Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Media"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Target Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-white)',
                    }}
                  >
                    {data.availableServices?.map((svc, i) => (
                      <option key={i} value={svc}>{svc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Preferred Call Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Social Media Link / Website *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Paste your website or social media profile"
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                    Preferred Call Time *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      backgroundColor: 'var(--color-white)',
                    }}
                  >
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                    <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
                    <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                    <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                    <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
                    <option value="06:30 PM - 07:00 PM">06:30 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.4rem' }}>
                  Tell US About Your Project (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you need, your goal, current situation, and any specific deadline or requirements."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Fee & Razorpay Trust Card */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                      Strategy Session Fee:
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1F05E5' }}>
                      ₹999
                    </span>
                    <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#94A3B8' }}>
                      ₹1,999
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      50% OFF
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Includes 30-Min 1-on-1 Call • Custom Audit • Action Plan
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#16A34A" />
                  <span>Razorpay Verified</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary pulse-btn"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 25px rgba(31, 5, 229, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                }}
              >
                <Lock size={17} />
                <span>{loading ? 'Processing Payment...' : 'Pay ₹999 & Book Session Now'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: High-Res Creative Visual */}
          <div>
            <div
              className="media-container"
              style={{
                borderRadius: '24px',
                aspectRatio: '4/3',
                maxHeight: '520px',
                boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.15)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <img
                src={imageSrc}
                alt="Book Strategy Call Creator Studio"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/booking-call.png?v=2';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popBlink {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 20px rgba(225, 29, 72, 0.38);
            border-color: rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 0 28px 8px rgba(255, 56, 92, 0.65);
            border-color: rgba(255, 255, 255, 0.95);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .pulse-badge {
          animation: popBlink 1.8s infinite ease-in-out;
        }

        .pulse-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(31, 5, 229, 0.45) !important;
        }

        @media (min-width: 992px) {
          .booking-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};
