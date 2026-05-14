"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, User, Crown, Save, Loader2, CheckCircle2, Edit2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Update failed");
      }
      await updateSession({ name: name.trim() });
      setSaved(true);
      setIsEditing(false);
      toast.success("Name updated!");
      setTimeout(() => setSaved(false), 3000);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="flex-1 flex justify-center items-start px-4 md:px-6 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-40" />
          </div>
          <Card className="border border-border/50 shadow-lg rounded-2xl">
            <CardContent className="space-y-6 pt-8">
              <Skeleton className="size-20 rounded-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const joinedDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <h1 className="text-3xl font-black tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        {/* ── Profile Card ──────────────────────────────────────────────────── */}
        <Card className="border border-border/50 shadow-lg rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Account Information</CardTitle>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 font-bold border-primary/30 text-primary hover:bg-primary/5"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="size-3.5" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
              <Avatar className="size-20 ring-4 ring-primary/10">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-black">{session?.user?.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                <span
                  className={`inline-block mt-1 text-[11px] font-black px-3 py-1 rounded-full ${
                    session?.user?.plan === "pro"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {(session?.user?.plan || "free").toUpperCase()} PLAN
                </span>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-border/50">
                <div className="space-y-2">
                  <Label htmlFor="profile-name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="pl-10 rounded-xl h-11 font-medium"
                      disabled={isSaving}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="rounded-xl h-11 px-6 font-bold gap-2"
                    disabled={isSaving || name.trim() === session?.user?.name}
                  >
                    {isSaving ? (
                      <><Loader2 className="size-4 animate-spin" /> Saving...</>
                    ) : saved ? (
                      <><CheckCircle2 className="size-4" /> Saved!</>
                    ) : (
                      <><Save className="size-4" /> Save Changes</>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl h-11 px-6 font-bold"
                    onClick={() => {
                      setIsEditing(false);
                      setName(session?.user?.name || "");
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 pt-2 border-t border-border/50">
                {/* Name (read) */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    <User className="size-3.5" />
                    Full Name
                  </div>
                  <p className="font-semibold text-base pl-1">{session?.user?.name || "Not provided"}</p>
                </div>
                {/* Email (read) */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    <Mail className="size-3.5" />
                    Email Address
                  </div>
                  <p className="font-semibold text-base pl-1">{session?.user?.email || "Not provided"}</p>
                </div>
                {/* Member since */}
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Member Since
                  </div>
                  <p className="font-semibold text-base pl-1">{joinedDate}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Quick Actions ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full rounded-xl h-11 font-bold gap-2" asChild>
            <Link href="/settings">
              <User className="size-4" />
              Account Settings
            </Link>
          </Button>

          {session?.user?.plan !== "pro" && (
            <Button className="w-full rounded-xl h-11 font-bold gap-2 shadow-lg shadow-primary/20" asChild>
              <Link href="/pricing">
                <Crown className="size-4" />
                Upgrade to Pro — Unlock Everything
              </Link>
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
