import { useEffect } from 'react';
import { trackReferralClick } from '../services/api';

const REFERRAL_KEY = 'agh_referral_code';
const REFERRAL_TIMESTAMP_KEY = 'agh_referral_time';
const VISITOR_KEY = 'agh_visitor_id';
const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 Days

export function getActiveReferralCode(): string | null {
  try {
    const code = localStorage.getItem(REFERRAL_KEY);
    const timestamp = localStorage.getItem(REFERRAL_TIMESTAMP_KEY);
    if (!code || !timestamp) return null;

    const elapsed = Date.now() - parseInt(timestamp, 10);
    if (elapsed > ATTRIBUTION_WINDOW_MS) {
      localStorage.removeItem(REFERRAL_KEY);
      localStorage.removeItem(REFERRAL_TIMESTAMP_KEY);
      return null;
    }
    return code;
  } catch (_e) {
    return null;
  }
}

export function getOrCreateVisitorId(): string {
  try {
    let visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
      visitorId = `vis_${Math.random().toString(36).substring(2, 11)}_${Date.now().toString(36)}`;
      localStorage.setItem(VISITOR_KEY, visitorId);
    }
    return visitorId;
  } catch (_e) {
    return `vis_${Date.now()}`;
  }
}

export function useReferralAttribution(): { referralCode: string | null } {
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const refParam = searchParams.get('ref') || searchParams.get('referral');

      if (refParam) {
        const cleanCode = refParam.toUpperCase().trim();
        const visitorId = getOrCreateVisitorId();

        // Save 30-day attribution
        localStorage.setItem(REFERRAL_KEY, cleanCode);
        localStorage.setItem(REFERRAL_TIMESTAMP_KEY, Date.now().toString());

        // Background track event (silent & non-blocking)
        trackReferralClick({
          code: cleanCode,
          landingPath: window.location.pathname,
          visitorId,
          referrer: document.referrer || undefined,
        }).catch(() => {});
      }
    } catch (_err) {
      // Fail silently to never affect user browsing
    }
  }, []);

  return {
    referralCode: getActiveReferralCode(),
  };
}
