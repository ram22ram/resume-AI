"use client";

import React, { Suspense, useMemo, useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { COVER_TEMPLATES } from "@/components/templates/registry";
import { useCoverLetterStore } from "@/store/coverLetterStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { 
  User, 
  Building2, 
  FileText, 
  Eye, 
  Download,
  Settings2,
  CloudCheck,
  Loader2,
  Calendar,
  Heading,
  Signature,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";

function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen } = useAuthStore();
  const { onOpen: onUpgradeOpen } = useUpgradeModal();
  
  const { 
    id, 
    setId, 
    title, 
    setTitle, 
    templateId, 
    setTemplateId, 
    coverLetterData, 
    setCoverLetterData,
    updatePersonalInfo,
    updateRecipientInfo,
    updateContent,
    isSaving,
    setIsSaving 
  } = useCoverLetterStore();

  const [localTitle, setLocalTitle] = useState(title);

  // Sync template from URL
  useEffect(() => {
    const tId = searchParams.get("templateId") || searchParams.get("template");
    const clId = searchParams.get("id");
    
    if (tId) setTemplateId(tId);
    if (clId) setId(clId);
  }, [searchParams, setTemplateId, setId]);

  // Load existing cover letter
  useEffect(() => {
    const fetchCoverLetter = async () => {
      const clId = searchParams.get("id");
      if (clId && session) {
        try {
          const res = await fetch(`/api/cover-letters/${clId}`);
          if (res.ok) {
            const data = await res.json();
            setId(data.id);
            setTitle(data.title);
            setLocalTitle(data.title);
            setTemplateId(data.templateId);
            setCoverLetterData(data.data);
          }
        } catch (error) {
          toast.error("Failed to load cover letter");
        }
      }
    };
    fetchCoverLetter();
  }, [session, searchParams, setId, setTitle, setTemplateId, setCoverLetterData]);

  // Auto-save logic
  const handleSave = useCallback(async () => {
    if (!session) return;
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/cover-letters/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: localTitle,
          data: coverLetterData,
          templateId,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        if (!id) {
          setId(saved.id);
          router.replace(`/cover-letter/new?id=${saved.id}&template=${templateId}`);
        }
      }
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSaving(false);
    }
  }, [id, localTitle, coverLetterData, templateId, session, setId, router, setIsSaving]);

  // Debounced effect for auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) handleSave();
    }, 2000);
    return () => clearTimeout(timer);
  }, [coverLetterData, localTitle, templateId, session, handleSave]);

  const template = useMemo(() => 
    COVER_TEMPLATES.find(t => t.id === templateId) || COVER_TEMPLATES[0],
    [templateId]
  );

  const TemplateComponent = template.component;
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: localTitle || "Cover Letter",
  });

  const isPro = session?.user?.plan === "pro";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-muted/20">
      {/* Left Side: Editor (40%) */}
      <div className="w-full lg:w-[40%] h-[100vh] overflow-y-auto p-6 border-r bg-background">
        <div className="max-w-xl mx-auto space-y-8 pb-20">
          <header className="flex flex-col space-y-4 mb-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tight mb-1">Cover Letter</h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Workspace v2.0</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {isSaving ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">
                    <Loader2 className="size-3 animate-spin" />
                    Saving...
                  </div>
                ) : session ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CloudCheck className="size-3" />
                    Synced
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 rounded-full text-[10px] font-black uppercase tracking-widest border-primary text-primary hover:bg-primary/5 shadow-sm"
                    onClick={() => onOpen("login")}
                  >
                    Save to Cloud
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
               <Input 
                 value={localTitle} 
                 onChange={(e) => {
                   setLocalTitle(e.target.value);
                   setTitle(e.target.value);
                 }}
                 placeholder="Letter Title (e.g. Google Application)"
                 className="rounded-2xl font-bold bg-muted/30 border-none h-12 shadow-inner px-5"
               />
               <Button
                 size="icon"
                 variant="outline"
                 className="rounded-2xl shrink-0 h-12 w-12 shadow-sm border-muted-foreground/10"
                 title="Go to settings"
                 onClick={() => router.push('/settings')}
               >
                 <Settings2 className="size-4" />
               </Button>
            </div>
          </header>

          {/* Personal Info */}
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center gap-3 pb-4 bg-muted/10 group-hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <User className="size-5" />
              </div>
              <CardTitle className="text-lg text-primary">Your Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Full Name</label>
                <Input 
                  value={coverLetterData.personalInfo.fullName} 
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} 
                  placeholder="John Doe"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Email</label>
                  <Input 
                    value={coverLetterData.personalInfo.email} 
                    onChange={(e) => updatePersonalInfo({ email: e.target.value })} 
                    placeholder="john@example.com"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Phone</label>
                  <Input 
                    value={coverLetterData.personalInfo.phone} 
                    onChange={(e) => updatePersonalInfo({ phone: e.target.value })} 
                    placeholder="+91 00000 00000"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Address</label>
                <Input 
                  value={coverLetterData.personalInfo.address} 
                  onChange={(e) => updatePersonalInfo({ address: e.target.value })} 
                  placeholder="Bangalore, India"
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipient Info */}
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center gap-3 pb-4 bg-muted/10 group-hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                <Building2 className="size-5" />
              </div>
              <CardTitle className="text-lg">Recipient Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Manager Name</label>
                  <Input 
                    value={coverLetterData.recipientInfo.name} 
                    onChange={(e) => updateRecipientInfo({ name: e.target.value })} 
                    placeholder="Hiring Manager"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Role Applied For</label>
                  <Input 
                    value={coverLetterData.recipientInfo.role} 
                    onChange={(e) => updateRecipientInfo({ role: e.target.value })} 
                    placeholder="Software Engineer"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Company Name</label>
                <Input 
                  value={coverLetterData.recipientInfo.company} 
                  onChange={(e) => updateRecipientInfo({ company: e.target.value })} 
                  placeholder="Tech Solutions Ltd"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Company Address</label>
                <Input 
                  value={coverLetterData.recipientInfo.address} 
                  onChange={(e) => updateRecipientInfo({ address: e.target.value })} 
                  placeholder="Mumbai, India"
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Letter Content */}
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center gap-3 pb-4 bg-muted/10 group-hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
                <FileText className="size-5" />
              </div>
              <CardTitle className="text-lg">Letter Content</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Date</label>
                  <Input 
                    value={coverLetterData.content.date} 
                    onChange={(e) => updateContent({ date: e.target.value })} 
                    placeholder="October 25, 2026"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Subject Line</label>
                  <Input 
                    value={coverLetterData.content.subject} 
                    onChange={(e) => updateContent({ subject: e.target.value })} 
                    placeholder="Application for Software Engineer"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Main Body</label>
                <textarea 
                  value={coverLetterData.content.body} 
                  onChange={(e) => updateContent({ body: e.target.value })} 
                  className="w-full min-h-[400px] p-5 rounded-2xl border bg-background text-sm leading-relaxed focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="I am writing to express my interest in..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Closing</label>
                <Input 
                  value={coverLetterData.content.closing} 
                  onChange={(e) => updateContent({ closing: e.target.value })} 
                  placeholder="Sincerely,"
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side: Preview (60%) */}
      <div className="w-full lg:w-[60%] h-[100vh] overflow-y-auto p-12 flex justify-center bg-muted/30 relative">
        <div className="w-full max-w-[850px]">
          <div className="mb-6 flex justify-between items-center sticky top-0 z-10 bg-muted/30 backdrop-blur-md py-4">
             <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">
                   <Eye className="size-3" /> Live Preview
                </div>
                <h3 className="font-bold text-lg">{template.name}</h3>
             </div>
             <div className="flex gap-2">
                <Button 
                  className={`rounded-xl shadow-xl shadow-primary/20 gap-2 font-bold px-6 ${template.isPremium && !isPro ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (template.isPremium && !isPro) {
                      toast.error("This is a Premium Template. Upgrade to Pro to export.");
                      onUpgradeOpen();
                    } else {
                      handlePrint();
                    }
                  }}
                >
                  <Download className="size-4" /> Export PDF
                </Button>
             </div>
          </div>
          
          <Card className="shadow-2xl border-none rounded-none overflow-hidden bg-white min-h-[1100px] ring-1 ring-black/5 relative group/preview">
             <div ref={contentRef} className="relative">
                {coverLetterData && TemplateComponent ? (
                  <TemplateComponent data={coverLetterData} />
                ) : (
                  <div className="flex items-center justify-center h-full p-20 text-muted-foreground italic">
                    No data available for preview
                  </div>
                )}
             </div>
             {template.isPremium && !isPro && (
                <div className="absolute inset-0 bg-background/5 backdrop-blur-[4px] flex items-center justify-center pointer-events-none z-20">
                   <div className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 transform -rotate-2">
                      <Crown className="size-5" />
                      <span className="font-black text-sm uppercase tracking-wider">Premium Template</span>
                   </div>
                </div>
             )}
          </Card>
          
          <div className="mt-8 text-center pb-20">
             <p className="text-sm text-muted-foreground font-medium">
               Need a different look? <button className="text-primary font-bold hover:underline" onClick={() => router.push('/templates/test')}>Change Template</button>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoverLetterNewPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20">
         <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
            <Loader2 className="size-8 text-primary animate-spin" />
         </div>
         <h2 className="text-xl font-black tracking-tight">Initializing Editor...</h2>
         <p className="text-sm text-muted-foreground font-medium mt-1">Preparing your workspace</p>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
