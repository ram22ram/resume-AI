"use client";

type EventName = 
  | "signup" 
  | "login" 
  | "resume_created" 
  | "ats_used" 
  | "template_selected" 
  | "upgrade_clicked" 
  | "payment_success";

export const trackEvent = (event: EventName, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${event}`, properties);
  }

  // Placeholder for PostHog / Google Analytics
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture(event, properties);
  // }
};
