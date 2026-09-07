import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowRight, Download, CreditCard, Smartphone, Building } from 'lucide-react';
import { Resource } from '../../types';
import { initiateCheckout, verifyPayment } from '../../services/api';

interface CheckoutModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: any, downloadToken: string, downloadUrl: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  resource,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'simulator' | 'processing' | 'success' | 'error'>('details');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [verifiedResult, setVerifiedResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  if (!isOpen) return null;

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await initiateCheckout({
        resourceId: resource._id || (resource as any).id || '',
        userEmail: customerEmail,
        userName: customerName,
        userPhone: customerPhone,
      });

      if (!res.success || !res.data) {
        setErrorMessage(res.message || 'Unable to create checkout order');
        setLoading(false);
        return;
      }

      const checkoutOrder = res.data;
      setOrderData(checkoutOrder);

      // If Razorpay provider is active and Razorpay SDK is loaded
      if (checkoutOrder.provider === 'razorpay' && (window as any).Razorpay && checkoutOrder.keyId && !checkoutOrder.keyId.includes('placeholder')) {
        const options = {
          key: checkoutOrder.keyId,
          amount: checkoutOrder.amount * 100,
          currency: checkoutOrder.currency || 'INR',
          name: 'AlgoGrowthHub',
          description: resource.title,
          image: '/logo.png',
          order_id: checkoutOrder.providerOrderId,
          handler: async (response: any) => {
            await handleVerification(checkoutOrder.orderId, response.razorpay_payment_id, response.razorpay_signature);
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
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
        rzp.open();
        setLoading(false);
      } else {
        // Use Smart In-App Payment Gateway Simulator
        setStep('simulator');
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment initiation failed');
      setLoading(false);
    }
  };

  const handleVerification = async (orderId: string, paymentId: string, signature: string) => {
    setStep('processing');
    setLoading(true);

    try {
      const verifyRes = await verifyPayment({
        orderId,
        paymentId,
        signature,
      });

      if (!verifyRes.success || !verifyRes.data) {
        setErrorMessage(verifyRes.message || 'Payment verification failed');
        setStep('error');
        setLoading(false);
        return;
      }

      setVerifiedResult(verifyRes.data);
      setStep('success');
      setLoading(false);
      onSuccess(verifyRes.data.order, verifyRes.data.downloadToken, verifyRes.data.downloadUrl);

      // Automatically trigger download
      triggerFileDownload(verifyRes.data.downloadToken);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed');
      setStep('error');
      setLoading(false);
    }
  };

  const triggerFileDownload = (_token?: string) => {
    const fileUrl = resource.fileKey;
    if (fileUrl && (fileUrl.startsWith('http://') || fileUrl.startsWith('https://'))) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (fileUrl && fileUrl.startsWith('/uploads/')) {
      const serverBase = import.meta.env.VITE_API_BASE_URL
        ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1\/?$/, '')
        : (import.meta.env.PROD ? 'https://algogrowthhub.onrender.com' : '');
      const downloadLink = document.createElement('a');
      downloadLink.href = `${serverBase}${fileUrl}`;
      downloadLink.download = resource.fileName || `${resource.slug || 'resource'}.${resource.fileFormat || 'pdf'}`;
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      return;
    }

    // Fallback confirmation document
    const element = document.createElement('a');
    const file = new Blob([
      `AlgoGrowthHub Official Asset: ${resource.title}\n` +
      `Order ID: ${orderData?.orderId || 'ORD-VERIFIED'}\n` +
      `Purchased By: ${customerName} (${customerEmail})\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Status: Transaction Verified (PAID)\n\n` +
      `Congratulations! You have unlocked full unrestricted access to ${resource.title}.\n` +
      `Visit https://algogrowthhub.com/resources for all updates.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resource.slug || 'algogrowthhub-playbook'}-unlocked.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 'processing') onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          animation: 'fadeInUp 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, #F8FAFC, #FFFFFF)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(31, 5, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1F05E5',
              }}
            >
              <Lock size={16} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                Secure Checkout
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} color="#10B981" /> 256-Bit Encrypted Transaction
              </div>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748B',
                padding: '0.4rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* STEP 1: Customer Details Form */}
        {step === 'details' && (
          <div style={{ padding: '1.5rem' }}>
            {/* Item Preview Card */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1.25rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#1F05E5',
                    backgroundColor: 'rgba(31, 5, 229, 0.08)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    marginBottom: '0.25rem',
                  }}
                >
                  PREMIUM ASSET
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                  {resource.title}
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Instant digital download upon payment
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>
                  {resource.currency === 'INR' || !resource.currency ? '₹' : '$'}{resource.price || 499}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                  ✓ One-Time Payment
                </div>
              </div>
            </div>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#991B1B',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleInitiate} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  Email Address (For Download Link) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="siddharth@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  marginTop: '0.75rem',
                  padding: '0.85rem',
                  width: '100%',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{loading ? 'Initiating Payment...' : `Proceed to Pay ${resource.currency === 'INR' || !resource.currency ? '₹' : '$'}${resource.price || 499}`}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Smart In-App Payment Gateway Simulator */}
        {step === 'simulator' && (
          <div style={{ padding: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                <span>⚡ Razorpay / Mock Gateway Active</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' }}>
                Select Payment Method
              </h4>
              <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Total Payable: <strong style={{ color: '#0F172A' }}>{orderData?.currency === 'INR' || !orderData?.currency ? '₹' : '$'}{orderData?.amount || resource.price}</strong>
              </div>
            </div>

            {/* Payment Options Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setSelectedPayMethod('upi')}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '12px',
                  border: selectedPayMethod === 'upi' ? '2px solid #1F05E5' : '1px solid #E2E8F0',
                  backgroundColor: selectedPayMethod === 'upi' ? '#EEF0FF' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: selectedPayMethod === 'upi' ? '#1F05E5' : '#475569',
                }}
              >
                <Smartphone size={18} />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayMethod('card')}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '12px',
                  border: selectedPayMethod === 'card' ? '2px solid #1F05E5' : '1px solid #E2E8F0',
                  backgroundColor: selectedPayMethod === 'card' ? '#EEF0FF' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: selectedPayMethod === 'card' ? '#1F05E5' : '#475569',
                }}
              >
                <CreditCard size={18} />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayMethod('netbanking')}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '12px',
                  border: selectedPayMethod === 'netbanking' ? '2px solid #1F05E5' : '1px solid #E2E8F0',
                  backgroundColor: selectedPayMethod === 'netbanking' ? '#EEF0FF' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: selectedPayMethod === 'netbanking' ? '#1F05E5' : '#475569',
                }}
              >
                <Building size={18} />
                <span>NetBanking</span>
              </button>
            </div>

            {/* Simulated UPI Screen */}
            {selectedPayMethod === 'upi' && (
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                  Popular UPI Apps
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  {['Google Pay', 'PhonePe', 'Paytm', 'Cred UPI'].map((app, i) => (
                    <span key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, color: '#1E293B' }}>
                      {app}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Order ID: <code style={{ backgroundColor: '#E2E8F0', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>{orderData?.orderId}</code>
                </div>
              </div>
            )}

            {/* Simulated Card Screen */}
            {selectedPayMethod === 'card' && (
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242"
                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.85rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      disabled
                      value="12/28"
                      style={{ width: '50%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      disabled
                      value="•••"
                      style={{ width: '50%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Simulated NetBanking Screen */}
            {selectedPayMethod === 'netbanking' && (
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak'].map((bank, i) => (
                    <span key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {bank}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Test Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => {
                  const paymentId = `pay_${Date.now()}`;
                  const signature = `sig_mock_${Math.random().toString(36).substring(7)}`;
                  handleVerification(orderData.orderId, paymentId, signature);
                }}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem',
                  width: '100%',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#059669',
                  borderColor: '#059669',
                }}
              >
                <CheckCircle2 size={18} />
                <span>✅ Authorize Payment (Complete Purchase)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage('Payment was declined or cancelled by the user.');
                  setStep('error');
                }}
                style={{
                  padding: '0.65rem',
                  width: '100%',
                  fontSize: '0.82rem',
                  color: '#EF4444',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Simulate Payment Failure
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Processing */}
        {step === 'processing' && (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid #E2E8F0',
                borderTopColor: '#1F05E5',
                borderRadius: '50%',
                margin: '0 auto 1.25rem auto',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
              Verifying Cryptographic Payment...
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Generating your secure single-use digital download token. Please do not refresh.
            </p>
          </div>
        )}

        {/* STEP 4: Success & Verified Download Screen */}
        {step === 'success' && (
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <span
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                marginBottom: '0.5rem',
              }}
            >
              TRANSACTION VERIFIED • STATUS: PAID
            </span>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
              Payment Successful!
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#475569', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
              Thank you, <strong>{customerName}</strong>! Your purchase of <strong>{resource.title}</strong> has been confirmed.
            </p>

            {/* Receipt Summary Box */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                padding: '1rem',
                border: '1px solid #E2E8F0',
                marginBottom: '1.5rem',
                textAlign: 'left',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Order ID:</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{verifiedResult?.order?._id || verifiedResult?.order?.id || orderData?.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Amount Paid:</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>
                  {orderData?.currency === 'INR' || !orderData?.currency ? '₹' : '$'}{orderData?.amount || resource.price}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Customer Email:</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{customerEmail}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => triggerFileDownload(verifiedResult?.downloadToken)}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem',
                  width: '100%',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Download size={18} />
                <span>⬇️ Download Unlocked Playbook Now</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.65rem',
                  width: '100%',
                  fontSize: '0.85rem',
                  color: '#64748B',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Close & Return to Resources
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Error Screen */}
        {step === 'error' && (
          <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <AlertCircle size={32} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Payment Unsuccessful
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              {errorMessage || 'Your payment could not be verified or was declined. No amount has been deducted.'}
            </p>

            <button
              type="button"
              onClick={() => {
                setErrorMessage('');
                setStep('details');
              }}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', width: '100%', fontSize: '0.9rem' }}
            >
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
