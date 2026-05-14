"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Loader2, Save, User, Mail, CheckCircle2, CreditCard, Crown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";

export default function SettingsPage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const { onOpen: onUpgradeOpen } = useUpgradeModal();

  // Sync form with session once loaded
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Fetch payment history
  useEffect(() => {
    if (session?.user?.id) {
      setIsLoadingPayments(true);
      fetch("/api/payment/history")
        .then((res) => res.json())
        .then((data) => setPayments(data.payments || []))
        .catch(() => {})
        .finally(() => setIsLoadingPayments(false));
    }
  }, [session]);

  // ── Save profile ────────────────────────────────────────────────────────────
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setIsSavingProfile(true);
    setProfileSaved(false);
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to update profile");
      }

      // Force NextAuth session to pick up new name/email
      await updateSession({ name: name.trim(), email: email.trim() });
      setProfileSaved(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Update failed";
      toast.error(msg);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Failed to logout. Try again.");
      setIsLoggingOut(false);
    }
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="flex-1 flex justify-center items-start px-4 md:px-6 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Card className="border border-border/50 shadow-lg rounded-2xl">
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const isDirty =
    name.trim() !== (session?.user?.name || "") ||
    email.trim() !== (session?.user?.email || "");

  return (
    <div className="flex-1 flex justify-center items-start px-4 md:px-6 py-10">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="pl-0 gap-2 font-bold"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <h1 className="text-3xl font-black tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* ── Profile Form ─────────────────────────────────────────────────── */}
        <Card className="border border-border/50 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="size-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your name and email address.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="settings-name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="settings-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="pl-10 rounded-xl h-11 font-medium border-muted-foreground/20"
                    disabled={isSavingProfile}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="settings-email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 rounded-xl h-11 font-medium border-muted-foreground/20"
                    disabled={isSavingProfile}
                    required
                  />
                </div>
              </div>

              {/* Current Plan (read-only) */}
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Current Plan
                </Label>
                <div className="flex items-center gap-2 h-11 px-3 rounded-xl border border-muted-foreground/20 bg-muted/30">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      session?.user?.plan === "pro"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {(session?.user?.plan || "free").toUpperCase()} PLAN
                  </span>
                  {session?.user?.plan !== "pro" && (
                    <button
                      type="button"
                      onClick={() => router.push("/pricing")}
                      className="text-xs text-primary font-bold hover:underline ml-auto"
                    >
                      Upgrade →
                    </button>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full rounded-xl h-11 font-black gap-2"
                disabled={isSavingProfile || !isDirty}
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : profileSaved ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ── Billing & Payments ───────────────────────────────────────────── */}
        <Card className="border border-border/50 shadow-lg rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <CreditCard className="size-5 text-amber-500" />
              Billing & Payments
            </CardTitle>
            <CardDescription>Your subscription and transaction history.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Plan */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-muted-foreground/10">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-xl flex items-center justify-center ${
                  session?.user?.plan === "pro" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                }`}>
                  <Crown className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">
                    {session?.user?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.plan === "pro" ? "₹199/month — All features unlocked" : "Basic features"}
                  </p>
                </div>
              </div>
              {session?.user?.plan !== "pro" && (
                <Button
                  size="sm"
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-xs"
                  onClick={onUpgradeOpen}
                >
                  Upgrade
                </Button>
              )}
            </div>

            {/* Payment History */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Transaction History</h4>
              {isLoadingPayments ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ) : payments.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No transactions yet.</p>
              ) : (
                <div className="space-y-2">
                  {payments.map((p: any) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-muted-foreground/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-lg flex items-center justify-center text-xs font-black ${
                          p.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : p.status === "failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                          ₹
                        </div>
                        <div>
                          <p className="text-sm font-bold">₹{(p.amount / 100).toFixed(0)} — Pro Plan</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(p.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-[10px] font-black uppercase rounded-full px-3 border-none ${
                          p.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : p.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Danger Zone ──────────────────────────────────────────────────── */}
        <Card className="border border-destructive/30 bg-destructive/5 rounded-2xl shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-destructive" />
              <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
            </div>
            <CardDescription>These actions cannot be undone. Please proceed with caution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="destructive"
              className="w-full rounded-xl h-11 font-bold gap-2"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Log Out"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl h-11 border-destructive/30 text-destructive hover:bg-destructive/10 font-bold"
              disabled
              title="Coming soon"
            >
              Delete Account (Coming Soon)
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
