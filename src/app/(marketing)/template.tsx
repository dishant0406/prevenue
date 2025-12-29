"use client";

import { useBeamTracking } from '@/lib/beam-analytics';

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auto-track page engagement (scroll, time, exit intent)
  useBeamTracking();

  return <>{children}</>;
}