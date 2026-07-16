"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEventProps } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: AnalyticsEventProps;
};

/**
 * <Link> qui émet un événement Vercel Analytics au clic.
 * Utilisable depuis un Server Component (Pricing, Realizations…) là où un
 * onClick direct est impossible.
 */
export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
