"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink,
  Layout,
  Mail,
  History,
  Search,
  Sparkles,
  ArrowRight,
  MousePointer2,
  CloudCheck,
  Eye,
  Crown
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<{ resumes: any[]; coverLetters: any[] }>({ resumes: [], coverLetters: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen: onUpgradeOpen } = useUpgradeModal();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      toast.error("Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  // FIX: Refetch count when user returns to this tab (e.g., after saving a resume)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && session) {
        fetchData();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [session]);

  const deleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Resume deleted");
        fetchData();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const duplicateResume = async (id: string) => {
    const toastId = toast.loading("Duplicating resume...");
    try {
      const res = await fetch("/api/resumes/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success("Resume duplicated!", { id: toastId });
        fetchData();
      } else {
        const body = await res.json().catch(() => ({}));
        toast.dismiss(toastId);
        if (body?.error === "PRO_REQUIRED") {
          toast.error("Resume duplication is a Pro feature.", {
            action: {
              label: "Upgrade →",
              onClick: onUpgradeOpen,
            },
          });
          onUpgradeOpen();
        } else {
          toast.error(body?.message || "Duplication failed");
        }
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    }
  };


  const isPro = session?.user?.plan === "pro";

  if (status === "loading" || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64 rounded-2xl" />
            <Skeleton className="h-4 w-96 rounded-full" />
          </div>
          <Skeleton className="h-14 w-44 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           <Skeleton className="h-40 rounded-[2.5rem]" />
           <Skeleton className="h-40 rounded-[2.5rem]" />
           <Skeleton className="h-40 rounded-[2.5rem]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
      >
        <div className="relative px-4">
          <div className="absolute -left-0 top-0 w-1.5 h-full bg-primary rounded-full hidden md:block" />
          <h1 className="text-5xl font-black tracking-tight mb-3 text-primary">My Workspace</h1>
          <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
             <Sparkles className="size-4 text-amber-500" />
             Crafting your path to professional excellence.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/templates/test">
            <Button className="rounded-2xl h-14 px-10 text-lg font-black shadow-[0_20px_40px_-12px_rgba(var(--primary-rgb),0.3)] transition-all hover:scale-105 active:scale-95 gap-3">
              <Plus className="size-6" />
              Create New
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="rounded-[2.5rem] border-none bg-gradient-to-br from-primary via-primary/90 to-blue-600 text-primary-foreground shadow-2xl overflow-hidden group">
           <div className="absolute -right-12 -top-12 size-48 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
           <CardContent className="p-10 relative z-10">
              <div className="flex justify-between items-center mb-6">
                 <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10">
                    <FileText className="size-8" />
                 </div>
                 <Badge variant="secondary" className="bg-white/20 text-white border-none font-black px-4 py-1">LIVE</Badge>
              </div>
              <div className="text-5xl font-black mb-2 tracking-tighter">{data.resumes.length}</div>
              <div className="text-xs font-black opacity-70 uppercase tracking-[0.2em]">Active Resumes</div>
           </CardContent>
        </Card>
        <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white shadow-2xl overflow-hidden group">
           <div className="absolute -right-12 -top-12 size-48 bg-primary/20 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
           <CardContent className="p-10 relative z-10">
              <div className="flex justify-between items-center mb-6">
                 <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <Mail className="size-8" />
                 </div>
                 <Badge variant="secondary" className="bg-primary text-white border-none font-black px-4 py-1">{isPro ? "PRO" : "FREE"}</Badge>
              </div>
              <div className="text-5xl font-black mb-2 tracking-tighter">{data.coverLetters.length}</div>
              <div className="text-xs font-black opacity-70 uppercase tracking-[0.2em]">Cover Letters</div>
           </CardContent>
        </Card>
        <Card className="rounded-[2.5rem] border-2 border-dashed border-muted-foreground/20 bg-muted/5 hover:bg-muted/10 transition-all cursor-pointer group flex flex-col justify-center" onClick={() => router.push('/ats-checker')}>
           <CardContent className="p-10 flex flex-col items-center text-center">
              <div className="size-16 rounded-[1.5rem] bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <div className="text-xl font-black mb-2">ATS Shield</div>
              <p className="text-sm text-muted-foreground font-medium max-w-[180px]">Optimize for 100% scanning success rate.</p>
           </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-16">
          {/* Resumes Section */}
          <section>
            <div className="flex items-center justify-between mb-10 px-4">
               <div className="flex items-center gap-4">
                 <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10 shadow-sm">
                   <Layout className="size-5" />
                 </div>
                 <h2 className="text-3xl font-black tracking-tight">Recent Resumes</h2>
               </div>
               <Link href="/templates/test" className="text-sm font-black text-primary hover:underline underline-offset-4 flex items-center gap-2">
                  Browse Templates <ArrowRight className="size-4" />
               </Link>
            </div>

            {data.resumes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-gradient-to-b from-muted/10 to-muted/30 rounded-[3.5rem] border-2 border-dashed border-muted-foreground/10"
              >
                <div className="size-24 bg-background rounded-[2rem] shadow-xl border flex items-center justify-center mx-auto mb-8 relative">
                   <div className="absolute inset-0 bg-primary/5 rounded-[2rem] animate-pulse" />
                   <FileText className="size-12 text-primary relative z-10" />
                </div>
                <h3 className="text-3xl font-black mb-4">No resumes yet?</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-medium leading-relaxed">
                   The first step to your new career starts here. Create a professional resume in minutes.
                </p>
                <Link href="/templates/test">
                  <Button className="rounded-2xl h-14 px-12 text-lg font-black shadow-2xl transition-all hover:scale-105 active:scale-95">
                     Get Started Now
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data.resumes.map((resume, i) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="rounded-[2.5rem] overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 border-none bg-background ring-1 ring-muted-foreground/10">
                      <div className="h-56 bg-muted/30 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10 group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative z-10 size-24 bg-white rounded-3xl shadow-2xl border flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500">
                           <FileText className="size-12 text-primary/40" />
                        </div>
                        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                           <Link href={`/resume/new?id=${resume.id}&template=${resume.templateId}`}>
                              <Button className="rounded-2xl font-black px-10 h-12 shadow-2xl bg-white text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all">
                                 Open Editor
                              </Button>
                           </Link>
                        </div>
                      </div>
                      <CardHeader className="p-8 pb-4">
                        <div className="flex justify-between items-start">
                           <div className="space-y-1">
                             <CardTitle className="text-2xl font-black truncate max-w-[200px] leading-tight group-hover:text-primary transition-colors">{resume.title}</CardTitle>
                             <p className="text-[10px] font-black text-muted-foreground flex items-center gap-2 uppercase tracking-[0.1em] opacity-60">
                                <History className="size-3" />
                                Modified {new Date(resume.updatedAt).toLocaleDateString()}
                             </p>
                           </div>
                           <DropdownMenu>
                               <DropdownMenuTrigger
                                 className="inline-flex items-center justify-center rounded-2xl hover:bg-muted size-10 bg-transparent border-0 cursor-pointer transition-colors"
                                 aria-label="Resume options"
                               >
                                  <MoreVertical className="size-5" />
                               </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-[1.5rem] p-2 min-w-[200px] shadow-2xl border-none ring-1 ring-black/5">
                                 <DropdownMenuItem className="rounded-xl cursor-pointer font-bold gap-3 py-3 px-4" onClick={() => router.push(`/resume/new?id=${resume.id}&template=${resume.templateId}`)}>
                                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary"><Edit className="size-4" /></div> Edit
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl cursor-pointer font-bold gap-3 py-3 px-4" onClick={() => duplicateResume(resume.id)}>
                                    <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500"><Copy className="size-4" /></div> Duplicate
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="rounded-xl cursor-pointer font-bold gap-3 py-3 px-4" onClick={() => router.push(`/resume/new?id=${resume.id}&template=${resume.templateId}`)}>
                                    <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500"><Eye className="size-4" /></div> Preview
                                 </DropdownMenuItem>
                                 <div className="my-1 border-t border-muted-foreground/5" />
                                 <DropdownMenuItem className="rounded-xl cursor-pointer font-bold gap-3 py-3 px-4 text-destructive focus:text-destructive focus:bg-destructive/5" onClick={() => deleteResume(resume.id)}>
                                    <div className="p-1.5 bg-destructive/10 rounded-lg text-destructive"><Trash2 className="size-4" /></div> Delete
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardFooter className="px-8 pb-8 pt-0">
                         <div className="flex items-center gap-3">
                            <Badge className="rounded-xl bg-muted text-muted-foreground border-none font-black text-[10px] uppercase tracking-wider px-3 h-7">
                               {resume.templateId.replace(/-/g, ' ')}
                            </Badge>
                         </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Cover Letters Section */}
          <section>
            <div className="flex items-center justify-between mb-10 px-4">
               <div className="flex items-center gap-4">
                 <div className="size-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10 shadow-sm">
                   <Mail className="size-5" />
                 </div>
                 <h2 className="text-3xl font-black tracking-tight">Cover Letters</h2>
               </div>
               <Link href="/templates/test" className="text-sm font-black text-blue-600 hover:underline underline-offset-4 flex items-center gap-2">
                  Browse Cover Letters <ArrowRight className="size-4" />
               </Link>
            </div>

            {data.coverLetters.length === 0 ? (
               <div className="py-12 bg-muted/20 rounded-[2.5rem] border border-dashed text-center">
                  <p className="text-muted-foreground font-medium mb-4">No cover letters created yet.</p>
                  <Link href="/templates/test">
                     <Button variant="outline" className="rounded-xl font-bold">Create One</Button>
                  </Link>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.coverLetters.map(cl => (
                    <Card key={cl.id} className="rounded-[2.5rem] hover:shadow-lg transition-all border-none bg-background ring-1 ring-muted-foreground/10 group overflow-hidden">
                       <CardContent className="p-8 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                             <div className="size-14 bg-blue-500/10 rounded-2xl text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail className="size-7" />
                             </div>
                             <div className="flex flex-col">
                                <span className="font-black text-xl leading-none mb-2">{cl.title}</span>
                                <div className="flex items-center gap-2">
                                   <Badge variant="secondary" className="text-[9px] font-black uppercase px-2 py-0 h-5">Modern</Badge>
                                   <span className="text-[10px] font-bold text-muted-foreground">{new Date(cl.updatedAt).toLocaleDateString()}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <Link href={`/cover-letter/new?id=${cl.id}&template=${cl.templateId}`}>
                                <Button size="sm" variant="ghost" className="rounded-full font-bold">Edit</Button>
                             </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  className="inline-flex items-center justify-center rounded-full hover:bg-muted size-9 bg-transparent border-0 cursor-pointer transition-colors"
                                  aria-label="Cover letter options"
                                >
                                  <MoreVertical className="size-5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-[1.5rem] p-2 min-w-[160px] shadow-2xl border-none ring-1 ring-black/5">
                                  <DropdownMenuItem
                                    className="rounded-xl cursor-pointer font-bold gap-3 py-3 px-4 text-destructive focus:text-destructive focus:bg-destructive/5"
                                    onClick={() => {
                                      if (confirm("Delete this cover letter?")) {
                                        fetch(`/api/cover-letters/${cl.id}`, { method: "DELETE" })
                                          .then(res => {
                                            if (res.ok) {
                                              toast.success("Cover letter deleted");
                                              fetchData();
                                            }
                                          })
                                          .catch(() => toast.error("Delete failed"));
                                      }
                                    }}
                                  >
                                    <div className="p-1.5 bg-destructive/10 rounded-lg text-destructive"><Trash2 className="size-4" /></div> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                          </div>
                       </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </section>
        </div>

        {/* Pro Upsell Sidebar */}
        {!isPro && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden xl:block w-80 space-y-6"
          >
             <Card className="rounded-[2.5rem] bg-gradient-to-br from-amber-400 to-orange-600 text-white p-8 border-none shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                   <Sparkles className="size-20" />
                </div>
                <div className="relative z-10">
                   <h4 className="text-2xl font-black mb-2 leading-tight">Upgrade to Pro</h4>
                   <p className="text-sm font-medium opacity-90 mb-6 leading-relaxed">Unlock premium templates, unlimited resumes & cover letters, and full ATS reports.</p>
                   <Button variant="secondary" className="w-full rounded-xl font-black h-12 shadow-xl" onClick={onUpgradeOpen}>
                      Upgrade Now — ₹199/mo
                   </Button>
                </div>
             </Card>

             <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-muted-foreground/5">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Career Insights</h5>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                      <div className="p-2 bg-green-500/10 rounded-xl text-green-500"><CloudCheck className="size-4" /></div>
                      <div>
                         <p className="text-xs font-bold leading-tight">Your data is synced and secured in our private cloud.</p>
                      </div>
                   </div>
                   <div className="flex gap-4 items-start">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary"><MousePointer2 className="size-4" /></div>
                      <div>
                         <p className="text-xs font-bold leading-tight">Drag and drop sections in the live editor for best flow.</p>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
