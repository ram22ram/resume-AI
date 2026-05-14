"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Upload, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3, 
  Lightbulb,
  Crown,
  Loader2
} from "lucide-react";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";
import { useAuthStore } from "@/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AtsCheckerPage() {
  const { data: session } = useSession();
  const { onOpen: onUpgradeOpen } = useUpgradeModal();
  const { onOpen: onAuthOpen } = useAuthStore();
  
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  interface AtsResult {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
    isPro: boolean;
    cta: "login" | "upgrade" | null;
    isLimitReached: boolean;
  }
  const [result, setResult] = useState<AtsResult | null>(null);


  const handleAnalyze = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (!file || !jobDescription) {
      toast.error("Please upload a resume and provide a job description");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else if (res.status === 401) {
        toast.error("Your session has expired. Please sign in again.");
      } else {
        const error = await res.json();
        toast.error(error.message || "Analysis failed");
      }
    } catch {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isPro = session?.user?.plan === "pro";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          ATS Resume Checker
        </h1>
        <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto">
          Upload your resume and the job description to see how well you match. 
          Powered by industry-standard keyword analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Input */}
        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
             <CardHeader className="p-8 bg-muted/30">
                <CardTitle className="text-2xl font-black">1. Upload Resume</CardTitle>
                <CardDescription>Upload your resume in PDF format</CardDescription>
             </CardHeader>
             <CardContent className="p-8">
                <div 
                  className={`border-4 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer ${file ? 'border-primary/50 bg-primary/5' : 'border-muted hover:border-primary/30 hover:bg-muted/30'}`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                   <input 
                     id="file-upload" 
                     type="file" 
                     accept=".pdf" 
                     className="hidden" 
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                   />
                   {file ? (
                     <div className="flex flex-col items-center">
                        <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                           <FileCheck className="size-8" />
                        </div>
                        <p className="font-bold text-lg">{file.name}</p>
                        <p className="text-sm text-muted-foreground">Click to change file</p>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center">
                        <div className="size-16 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mb-4">
                           <Upload className="size-8" />
                        </div>
                        <p className="font-bold text-lg">Click to select PDF</p>
                        <p className="text-sm text-muted-foreground">Standard A4 format recommended</p>
                     </div>
                   )}
                </div>
             </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
             <CardHeader className="p-8 bg-muted/30">
                <CardTitle className="text-2xl font-black">2. Job Description</CardTitle>
                <CardDescription>Paste the target job description here</CardDescription>
             </CardHeader>
             <CardContent className="p-8">
                <Textarea 
                  placeholder="Paste the full job description here..."
                  className="min-h-[250px] rounded-[1.5rem] p-4 text-sm font-medium leading-relaxed resize-none focus:ring-primary"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
             </CardContent>
          </Card>

          <Button 
            type="button"
            className="w-full rounded-[1.5rem] h-16 text-xl font-black shadow-2xl shadow-primary/30 gap-3"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <BarChart3 className="size-6" />
            )}
            {isLoading ? "Analyzing..." : "Check ATS Score"}
          </Button>
        </div>

        {/* Right: Results */}
        <div>
           <AnimatePresence mode="wait">
             {result ? (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="space-y-8"
               >
                  <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-primary text-primary-foreground relative">
                     <div className="absolute top-0 right-0 p-8 opacity-10">
                        <BarChart3 className="size-48" />
                     </div>
                     <CardContent className="p-10 text-center relative z-10">
                        <p className="text-sm font-black uppercase tracking-[0.2em] opacity-70 mb-4">Your Match Score</p>
                        <div className="text-[8rem] font-black leading-none mb-4">{result.score}%</div>
                        <div className="max-w-xs mx-auto">
                           <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${result.score}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
                              />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-6">
                     <Card className="rounded-[2.5rem] border-none shadow-sm bg-green-50/50">
                        <CardHeader className="pb-2">
                           <div className="flex items-center gap-2 text-green-700">
                              <CheckCircle2 className="size-5" />
                              <CardTitle className="text-lg font-bold">Matched Keywords</CardTitle>
                           </div>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                           {result.matchedKeywords.map((kw: string) => (
                              <div key={kw} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase">{kw}</div>
                           ))}
                        </CardContent>
                     </Card>

                     <Card className={`rounded-[2.5rem] border-none shadow-sm relative overflow-hidden ${isPro ? 'bg-amber-50/50' : 'bg-muted/50'}`}>
                        {result.cta === "login" && (
                           <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                              <Lightbulb className="size-10 text-primary mb-4" />
                              <h4 className="text-xl font-black mb-2">Detailed Analysis Hidden</h4>
                              <p className="text-sm text-muted-foreground font-medium mb-6">Sign up to see detailed keyword analysis and AI suggestions.</p>
                              <Button onClick={() => onAuthOpen("signup")} className="rounded-full font-bold gap-2">
                                 Sign Up Now
                                 <ChevronRight className="size-4" />
                              </Button>
                           </div>
                        )}
                        {result.cta === "upgrade" && (
                           <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                              <Crown className="size-10 text-amber-500 mb-4" />
                              <h4 className="text-xl font-black mb-2">Free Scan Used</h4>
                              <p className="text-sm text-muted-foreground font-medium mb-6">You have used your 1 free full analysis. Upgrade to Pro for more scans.</p>
                              <Button onClick={onUpgradeOpen} className="rounded-full bg-amber-500 hover:bg-amber-600 font-bold gap-2">
                                 Upgrade to Pro
                                 <ChevronRight className="size-4" />
                              </Button>
                           </div>
                        )}
                        {result.isLimitReached && result.cta === null && (
                           <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                              <AlertCircle className="size-10 text-red-500 mb-4" />
                              <h4 className="text-xl font-black mb-2">Limit Reached</h4>
                              <p className="text-sm text-muted-foreground font-medium mb-6">{result.suggestions[0]}</p>
                           </div>
                        )}
                        <CardHeader className="pb-2">
                           <div className="flex items-center gap-2 text-amber-700">
                              <AlertCircle className="size-5" />
                              <CardTitle className="text-lg font-bold">Missing Keywords</CardTitle>
                           </div>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                           {result.missingKeywords.map((kw: string) => (
                              <div key={kw} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase">{kw}</div>
                           ))}
                        </CardContent>
                        <CardHeader className="pt-4 pb-2 border-t mt-4">
                           <div className="flex items-center gap-2 text-primary">
                              <Lightbulb className="size-5" />
                              <CardTitle className="text-lg font-bold">AI Suggestions</CardTitle>
                           </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {result.suggestions.map((s: string, i: number) => (
                               <p key={i} className="text-sm font-medium leading-relaxed">• {s}</p>
                            ))}
                        </CardContent>
                     </Card>
                  </div>
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-muted/10 rounded-[3rem] border-2 border-dashed border-muted">
                  <div className="size-24 bg-muted/50 rounded-full flex items-center justify-center mb-8 animate-bounce">
                     <BarChart3 className="size-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Awaiting Analysis</h3>
                  <p className="text-muted-foreground font-medium max-w-sm">
                    Fill in the details on the left to get your instant ATS compatibility score.
                  </p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
