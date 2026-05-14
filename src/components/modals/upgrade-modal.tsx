"use client";

import { Check, Crown, Zap, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { create } from "zustand";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface UpgradeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpgradeModal = create<UpgradeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function UpgradeModal() {
  const { isOpen, onClose } = useUpgradeModal();
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to upgrade.");
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Create Razorpay order
      const res = await fetch("/api/payment/order", { method: "POST" });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body?.message === "You are already on the Pro plan.") {
          toast.success("You're already on Pro! 🎉");
          // Force session refresh so UI updates immediately
          await updateSession({ trigger: "update" });
          onClose();
          return;
        }
        throw new Error(body?.message || "Failed to create order");
      }

      const order = await res.json();

      // Step 2: Load Razorpay SDK if not already loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
          document.head.appendChild(script);
        });
      }

      // Step 3: Open Razorpay checkout with production-safe options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Resume-AI",
        description: "Upgrade to Pro Plan — Unlimited Everything",
        order_id: order.id,
        prefill: {
          name: session.user.name || "",
          email: session.user.email || "",
        },
        notes: {
          userId: session.user.id,
        },
        theme: {
          color: "#f59e0b",
        },
        // Retry configuration — allow user to retry on failure
        retry: {
          enabled: true,
          max_count: 3,
        },
        // Disable recurring/subscription flags (one-time payment)
        recurring: false,
        // Disable remember_customer to avoid tokenization issues in test mode
        remember_customer: false,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // Step 4: Verify payment on backend
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (verifyRes.ok) {
              // Step 5: Force session refresh to reflect new plan
              await updateSession({ trigger: "update" });
              toast.success("🎉 Welcome to Pro! Your plan has been upgraded.");
              onClose();
              // Soft reload to apply plan gates across the UI
              setTimeout(() => window.location.reload(), 1500);
            } else {
              const errBody = await verifyRes.json().catch(() => ({}));
              if (errBody?.message === "Payment already verified") {
                // Webhook already processed it — just refresh session
                await updateSession({ trigger: "update" });
                toast.success("🎉 Welcome to Pro! Your plan has been upgraded.");
                onClose();
                setTimeout(() => window.location.reload(), 1500);
              } else {
                toast.error("Payment verification failed. Contact support if charged.");
              }
            }
          } catch {
            // Network error during verification — webhook will handle it
            toast.error(
              "Verification request failed. If you were charged, your plan will be upgraded automatically within a few minutes.",
              { duration: 8000 }
            );
          }
          setIsLoading(false);
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
          // Prevent closing on escape when payment is processing
          escape: true,
          confirm_close: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        console.error("[RAZORPAY] Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      rzp.open();
    } catch (error: any) {
      console.error("[UPGRADE] Error:", error);
      toast.error(error.message || "Failed to initiate payment. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Crown className="size-40" />
          </div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <DialogHeader className="space-y-4 relative z-10">
            <div className="size-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Crown className="size-7" />
            </div>
            <DialogTitle className="text-3xl font-black">Upgrade to Pro</DialogTitle>
            <DialogDescription className="text-white/85 text-base font-medium leading-relaxed">
              Unlock the full potential of your career with premium features.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-8 space-y-7 bg-background">
          {/* Feature list */}
          <ul className="space-y-3">
            {[
              "Access to ALL 50+ Premium Templates",
              "Clean PDF Export — Zero Watermarks",
              "Advanced ATS Score Analysis",
              "Unlimited Resumes & Cover Letters",
              "Resume Duplication",
              "Priority Customer Support",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="size-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                  <Check className="size-3.5" />
                </div>
                <span className="text-sm font-semibold text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Pricing + CTA */}
          <div className="space-y-4 pt-2">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black">₹199</span>
              <span className="text-muted-foreground font-bold mb-1">/ month</span>
            </div>

            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full rounded-2xl h-14 text-base font-black bg-amber-500 hover:bg-amber-600 shadow-xl shadow-amber-500/25 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="size-5 fill-white" />
                  Upgrade Now — ₹199/mo
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground font-semibold">
              🔒 Secure payment via Razorpay · Trusted by 10,000+ professionals
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
