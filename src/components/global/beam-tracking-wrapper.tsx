"use client";

import { useBeamTracking } from '@/lib/beam-analytics';
import React from 'react';

interface BeamTrackingWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that automatically tracks page engagement metrics
 * including scroll depth, time on page, and exit intent
 */
export const BeamTrackingWrapper: React.FC<BeamTrackingWrapperProps> = ({ children }) => {
  // Automatically track page engagement
  useBeamTracking();
  
  return <>{children}</>;
};

export default BeamTrackingWrapper;