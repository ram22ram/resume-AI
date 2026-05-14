"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AuthModal() {
  const router = useRouter();
  const { isOpen, view, onClose, setView } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (view === "signup") {
      if (!name.trim()) return toast.error("Full Name is required");
      if (password.length < 6)
        return toast.error("Password must be at least 6 characters");
    } else {
      if (!email || !password)
        return toast.error("Email and password are required");
    }

    setIsLoading(true);

    try {
      if (view === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || "Something went wrong");
        }

        toast.success("Account created! Signing you in...");

        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      } else {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSocialAuth = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      toast.error("Social login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[2rem] sm:rounded-[2.5rem] p-0 border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] focus:outline-none">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-blue-600 p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="size-40" />
          </div>
          <DialogHeader className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                <div className="size-6 bg-white rounded-md flex items-center justify-center">
                  <div className="size-3 bg-primary rounded-sm" />
                </div>
              </div>
              <span className="font-black text-xl tracking-tight">Resume-AI</span>
            </div>
            <DialogTitle className="text-4xl font-black leading-tight">
              {view === "login" ? "Welcome Back" : "Start Your Journey"}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-lg font-medium leading-relaxed max-w-[300px]">
              {view === "login"
                ? "Sign in to access your resumes and track your career growth."
                : "Join 10,000+ job seekers landing their dream roles."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-10 bg-background">
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-[1.25rem] h-14 bg-muted/50 p-1.5 border border-muted ring-offset-background">
              <TabsTrigger value="login" className="rounded-xl font-bold transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl font-bold transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="login" className="mt-0 outline-none">
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={onEmailAuth} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email-login"
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email-login"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="rounded-2xl h-12 border-muted-foreground/10 focus-visible:ring-primary focus-visible:border-primary font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <Label
                          htmlFor="password-login"
                          className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                        >
                          Password
                        </Label>
                        {/* FIX: Added onClick with toast — no full reset flow yet */}
                        <button
                          type="button"
                          className="text-xs font-bold text-primary hover:underline"
                          onClick={() => {
                            import("sonner").then(({ toast }) => {
                              toast.info("Password reset: Please contact support@resume-ai.com to reset your password.", { duration: 5000 });
                            });
                          }}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <Input
                        id="password-login"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="rounded-2xl h-12 border-muted-foreground/10 focus-visible:ring-primary focus-visible:border-primary font-medium"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </motion.div>
              </TabsContent>

              <TabsContent value="signup" className="mt-0 outline-none">
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={onEmailAuth} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name-signup"
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name-signup"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        className="rounded-2xl h-12 border-muted-foreground/10 focus-visible:ring-primary focus-visible:border-primary font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email-signup"
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="rounded-2xl h-12 border-muted-foreground/10 focus-visible:ring-primary focus-visible:border-primary font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="password-signup"
                        className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 px-1"
                      >
                        Password
                      </Label>
                      <Input
                        id="password-signup"
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="rounded-2xl h-12 border-muted-foreground/10 focus-visible:ring-primary focus-visible:border-primary font-medium"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
              <span className="bg-background px-4 text-muted-foreground/60">
                One-Tap Sign In
              </span>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="rounded-2xl h-14 font-black gap-3 hover:bg-muted/30 border-muted-foreground/10 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSocialAuth("google")}
              disabled={isLoading}
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </div> */}

          <div className="mt-10 pt-8 border-t border-muted-foreground/5 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground/70">
              <CheckCircle2 className="size-5 text-green-500 shrink-0" />
              <span className="text-sm font-bold">
                Auto-save your progress instantly
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground/70">
              <CheckCircle2 className="size-5 text-green-500 shrink-0" />
              <span className="text-sm font-bold">
                Access 50+ Premium Templates
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
