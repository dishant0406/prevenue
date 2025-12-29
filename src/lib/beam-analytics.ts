/**
 * Beam Analytics Custom Events Tracker
 * 
 * This file contains all custom event tracking functions for Beam Analytics.
 * Following the Beam pattern: window.beam("/custom-events/[event-name]")
 * 
 * Usage:
 * import { trackEvent } from '@/lib/beam-analytics';
 * trackEvent('cta_click', { source: 'hero', destination: '/contact' });
 */

import React from 'react';

// Extend Window interface for Beam Analytics
declare global {
  interface Window {
    beam?: (path: string) => void;
  }
}

// Type definitions for event tracking
export interface EventData {
  source?: string;
  destination?: string;
  value?: string | number;
  category?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

// Custom events configuration
const CUSTOM_EVENTS = {
  // Navigation Events
  NAVBAR_LOGO_CLICK: 'navbar_logo_click',
  NAV_LINK_CLICK: 'nav_link_click',
  FOOTER_LINK_CLICK: 'footer_link_click',
  
  // Call-to-Action Events
  CTA_CLICK: 'cta_click',
  HERO_CTA_CLICK: 'hero_cta_click',
  PRICING_CTA_CLICK: 'pricing_cta_click',
  BOOK_CALL_CLICK: 'book_call_click',
  
  // Form Events
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CONTACT_FILE_UPLOAD: 'contact_file_upload',
  
  // Engagement Events
  PAGE_SCROLL_50: 'page_scroll_50_percent',
  PAGE_SCROLL_75: 'page_scroll_75_percent',
  PAGE_TIME_30S: 'page_time_30_seconds',
  PAGE_TIME_60S: 'page_time_60_seconds',
  PAGE_TIME_120S: 'page_time_2_minutes',
  
  // Feature Interest Events
  FEATURES_VIEW: 'features_section_view',
  PRICING_VIEW: 'pricing_section_view',
  TESTIMONIALS_VIEW: 'testimonials_section_view',
  FAQ_EXPAND: 'faq_item_expand',
  INTEGRATION_CLICK: 'integration_item_click',
  
  // Exit Intent & Engagement
  EXIT_INTENT: 'exit_intent_detected',
  MOBILE_MENU_OPEN: 'mobile_menu_open',
  MOBILE_MENU_CLOSE: 'mobile_menu_close',
  
  // Business Critical Events
  DEMO_REQUEST: 'demo_request',
  PRICING_INQUIRY: 'pricing_inquiry',
  INTEGRATION_INQUIRY: 'integration_inquiry',
} as const;

// Helper function to check if Beam is available
const isBeamAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.beam === 'function';
};

// Core tracking function
export const trackEvent = (eventName: string, data?: EventData): void => {
  if (!isBeamAvailable()) {
    console.warn('Beam Analytics not available');
    return;
  }

  try {
    // Construct event path with optional data
    const basePath = `/custom-events/${eventName}`;
    let eventPath = basePath;
    
    // Add additional context to path if provided
    if (data?.source) {
      eventPath += `/${data.source}`;
    }
    
    if (data?.destination) {
      eventPath += `/to_${data.destination.replace('/', '_')}`;
    }
    
    // Track the event
    if (window.beam) {
      window.beam(eventPath);
    }
    
    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔥 Beam Event:', eventPath, data);
    }
  } catch (error) {
    console.error('Error tracking Beam event:', error);
  }
};

// Specific tracking functions

// Navigation Events
export const trackNavigation = {
  logoClick: () => trackEvent(CUSTOM_EVENTS.NAVBAR_LOGO_CLICK),
  
  linkClick: (linkName: string, destination: string) => 
    trackEvent(CUSTOM_EVENTS.NAV_LINK_CLICK, { source: linkName, destination }),
  
  footerClick: (linkName: string, destination: string) => 
    trackEvent(CUSTOM_EVENTS.FOOTER_LINK_CLICK, { source: linkName, destination }),
};

// CTA and Button Events
export const trackCTA = {
  heroClick: (destination: string = '/contact') => 
    trackEvent(CUSTOM_EVENTS.HERO_CTA_CLICK, { source: 'hero', destination }),
  
  generalClick: (source: string, destination: string = '/contact') => 
    trackEvent(CUSTOM_EVENTS.CTA_CLICK, { source, destination }),
  
  pricingClick: (plan?: string) => 
    trackEvent(CUSTOM_EVENTS.PRICING_CTA_CLICK, { source: 'pricing', value: plan }),
  
  bookCall: (source: string) => 
    trackEvent(CUSTOM_EVENTS.BOOK_CALL_CLICK, { source }),
};

// Form Events
export const trackForm = {
  contactStart: (source: string = 'contact_page') => 
    trackEvent(CUSTOM_EVENTS.CONTACT_FORM_START, { source }),
  
  contactSubmit: (hasFiles: boolean = false) => 
    trackEvent(CUSTOM_EVENTS.CONTACT_FORM_SUBMIT, { value: hasFiles ? 'with_files' : 'no_files' }),
  
  contactSuccess: (isPreviousSubmission: boolean = false) => 
    trackEvent(CUSTOM_EVENTS.CONTACT_FORM_SUCCESS, { 
      value: isPreviousSubmission ? 'duplicate' : 'new_submission' 
    }),
  
  contactError: (errorType: string) => 
    trackEvent(CUSTOM_EVENTS.CONTACT_FORM_ERROR, { value: errorType }),
  
  fileUpload: (fileCount: number, totalSize?: number) => 
    trackEvent(CUSTOM_EVENTS.CONTACT_FILE_UPLOAD, { 
      value: fileCount, 
      category: totalSize ? `${Math.round(totalSize / 1024)}KB` : 'unknown_size' 
    }),
};

// Engagement Events
export const trackEngagement = {
  pageScroll: (percentage: 50 | 75) => {
    const eventName = percentage === 50 ? CUSTOM_EVENTS.PAGE_SCROLL_50 : CUSTOM_EVENTS.PAGE_SCROLL_75;
    trackEvent(eventName, { value: percentage });
  },
  
  pageTime: (seconds: 30 | 60 | 120) => {
    const eventMap = {
      30: CUSTOM_EVENTS.PAGE_TIME_30S,
      60: CUSTOM_EVENTS.PAGE_TIME_60S,
      120: CUSTOM_EVENTS.PAGE_TIME_120S,
    };
    trackEvent(eventMap[seconds], { value: seconds });
  },
  
  sectionView: (section: 'features' | 'pricing' | 'testimonials') => {
    const eventMap = {
      features: CUSTOM_EVENTS.FEATURES_VIEW,
      pricing: CUSTOM_EVENTS.PRICING_VIEW,
      testimonials: CUSTOM_EVENTS.TESTIMONIALS_VIEW,
    };
    trackEvent(eventMap[section], { source: section });
  },
  
  faqExpand: (questionId: string) => 
    trackEvent(CUSTOM_EVENTS.FAQ_EXPAND, { value: questionId }),
  
  integrationClick: (integrationName: string) => 
    trackEvent(CUSTOM_EVENTS.INTEGRATION_CLICK, { value: integrationName }),
  
  exitIntent: () => trackEvent(CUSTOM_EVENTS.EXIT_INTENT),
  
  mobileMenu: (action: 'open' | 'close') => {
    const eventName = action === 'open' ? CUSTOM_EVENTS.MOBILE_MENU_OPEN : CUSTOM_EVENTS.MOBILE_MENU_CLOSE;
    trackEvent(eventName);
  },
};

// Business Critical Events
export const trackBusiness = {
  demoRequest: (source: string) => 
    trackEvent(CUSTOM_EVENTS.DEMO_REQUEST, { source }),
  
  pricingInquiry: (plan?: string) => 
    trackEvent(CUSTOM_EVENTS.PRICING_INQUIRY, { value: plan }),
  
  integrationInquiry: (integration: string) => 
    trackEvent(CUSTOM_EVENTS.INTEGRATION_INQUIRY, { value: integration }),
};

// Auto-tracking hooks for common events
export const useBeamTracking = () => {
  // Page time tracking
  React.useEffect(() => {
    const timeTrackers = [
      setTimeout(() => trackEngagement.pageTime(30), 30000),
      setTimeout(() => trackEngagement.pageTime(60), 60000),
      setTimeout(() => trackEngagement.pageTime(120), 120000),
    ];

    return () => timeTrackers.forEach(clearTimeout);
  }, []);

  // Scroll tracking
  React.useEffect(() => {
    const scrollTracked = { '50': false, '75': false };
    
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50 && !scrollTracked['50']) {
        scrollTracked['50'] = true;
        trackEngagement.pageScroll(50);
      }
      
      if (scrollPercent >= 75 && !scrollTracked['75']) {
        scrollTracked['75'] = true;
        trackEngagement.pageScroll(75);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent detection
  React.useEffect(() => {
    let exitIntentTracked = false;
    
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !exitIntentTracked) {
        exitIntentTracked = true;
        trackEngagement.exitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);
};

// Intersection Observer hook for section visibility
export const useSectionTracking = (sectionName: 'features' | 'pricing' | 'testimonials') => {
  const [ref, setRef] = React.useState<HTMLElement | null>(null);
  
  React.useEffect(() => {
    if (!ref) return;
    
    let tracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true;
          trackEngagement.sectionView(sectionName);
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, sectionName]);
  
  return setRef;
};