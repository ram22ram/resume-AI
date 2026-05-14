"use client";

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { StartModal } from '@/components/modals/start-modal';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { PreviewPanel } from '@/components/preview/PreviewPanel';
import { Button } from "@/components/ui/button";
import {
  Download, Layout, Share2, Save, Loader2,
  Eye, EyeOff, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from 'react-to-print';

// ── Inner component (needs Suspense for useSearchParams) ────────────────────
function BuilderContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId') || searchParams.get('template');
  const resumeId   = searchParams.get('id');

  const [showStartModal, setShowStartModal]   = useState(!templateId && !resumeId);
  const [isSaving, setIsSaving]               = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const { setData, data } = useStore();

  // ── Print ref — only prints #resume-preview, not the full page ─────────
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'My Resume — ResumeAI',
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body * { visibility: hidden !important; }
        #resume-preview, #resume-preview * { visibility: visible !important; }
        #resume-preview {
          position: fixed !important;
          inset: 0 !important;
          width: 210mm !important;
          min-height: 297mm !important;
          padding: 12mm 14mm !important;
          transform: none !important;
          margin: 0 !important;
          box-shadow: none !important;
        }
      }
    `,
  });

  // ── Upload + parse resume via API ───────────────────────────────────────
  const handleUpload = async (file: File) => {
    if (!file) return;
    const toastId = toast.loading("Parsing your resume...");
    try {
      const formData = new FormData();
      formData.append('resume', file);
      // We reuse the ATS analyze route's text extraction,
      // or fall back to mock data if the endpoint isn't ready
      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const parsed = await res.json();
        setData(parsed);
        toast.success("Resume parsed successfully!", { id: toastId });
      } else {
        // Graceful fallback — populate with demo data
        populateDemoData();
        toast.success("Resume loaded with sample data!", { id: toastId });
      }
    } catch {
      populateDemoData();
      toast.success("Resume loaded with sample data!", { id: toastId });
    }
    setShowStartModal(false);
  };

  const populateDemoData = () => {
    setData({
      sections: [
        {
          type: 'personal', isVisible: true,
          items: [{
            fullName: "Johnathan Smith",
            jobTitle: "Senior Frontend Engineer",
            email: "john.smith@example.com",
            phone: "+1 (555) 000-1111",
            address: "San Francisco, CA",
            objective: "Expert Frontend Developer with 8+ years of experience in React and Next.js. Passionate about building high-performance web applications.",
          }],
        },
        {
          type: 'experience', isVisible: true,
          items: [
            { company: "Vercel", position: "Senior Engineer", date: "2021 – Present", description: "Led development of Next.js core features. Improved web vitals by 40%." },
            { company: "Stripe", position: "Software Engineer", date: "2018 – 2021", description: "Architected payment flows used by millions of users worldwide." },
          ],
        },
        {
          type: 'education', isVisible: true,
          items: [{ school: "Stanford University", degree: "M.S. Computer Science", startDate: "2016", endDate: "2018" }],
        },
        {
          type: 'skills', isVisible: true,
          items: [
            { name: "React" }, { name: "Next.js" }, { name: "TypeScript" },
            { name: "Tailwind CSS" }, { name: "Node.js" }, { name: "PostgreSQL" },
          ],
        },
      ],
      metadata: { accentColor: '#2563eb' },
    });
  };

  const handleFlowSelect = (flow: 'new' | 'upload') => {
    if (flow === 'upload') {
      // Trigger file picker
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.doc,.docx';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) handleUpload(file);
        else setShowStartModal(false);
      };
      input.click();
    } else {
      setShowStartModal(false);
    }
  };

  // ── Save to DB ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!session) {
      toast.error("Please sign in to save your resume.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/resumes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resumeId || undefined,
          title: data.sections.find(s => s.type === 'personal')?.items[0]?.fullName
            ? `${data.sections.find(s => s.type === 'personal')!.items[0].fullName}'s Resume`
            : 'Untitled Resume',
          data,
          templateId: templateId || 'modern',
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        // Update URL with the saved ID without page reload
        if (!resumeId && saved.id) {
          router.replace(`/resume/new?id=${saved.id}${templateId ? `&templateId=${templateId}` : ''}`);
        }
        toast.success("Resume saved!");
      } else {
        const body = await res.json().catch(() => ({}));
        if (body?.error === 'FREE_LIMIT_REACHED') {
          toast.error("Free plan: max 3 resumes. Upgrade to Pro for unlimited.");
        } else {
          toast.error("Failed to save resume.");
        }
      }
    } catch {
      toast.error("Save failed. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Share ───────────────────────────────────────────────────────────────
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const resumeTitle = data.sections.find(s => s.type === 'personal')?.items[0]?.fullName
    ? `${data.sections.find(s => s.type === 'personal')!.items[0].fullName}'s Resume`
    : templateId
    ? `Template: ${templateId.replace(/-/g, ' ')}`
    : 'Untitled Resume';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <StartModal isOpen={showStartModal} onSelect={handleFlowSelect} />

      {/* ── Top Navbar ──────────────────────────────────────────────────── */}
      <nav className="h-16 md:h-20 bg-white border-b sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between shadow-sm gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl shrink-0"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="font-bold text-sm leading-tight truncate max-w-[140px] sm:max-w-xs">
              {resumeTitle}
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">
              {session ? 'Auto-saved' : 'Sign in to save'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {/* Templates */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-bold hidden sm:flex"
            onClick={() => router.push('/templates/test')}
          >
            <Layout className="size-3.5" /> Templates
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-bold hidden sm:flex"
            onClick={handleShare}
          >
            <Share2 className="size-3.5" /> Share
          </Button>

          {/* Mobile Preview Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-bold lg:hidden"
            onClick={() => setShowMobilePreview((v) => !v)}
          >
            {showMobilePreview ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            {showMobilePreview ? 'Editor' : 'Preview'}
          </Button>

          {/* Save */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-bold px-4"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            <span className="hidden sm:inline">{isSaving ? 'Saving…' : 'Save'}</span>
          </Button>

          {/* Export PDF — FIX: only prints resume-preview div, not full page */}
          <Button
            size="sm"
            className="rounded-xl gap-1.5 text-xs font-black px-4 shadow-lg shadow-primary/20"
            onClick={() => handlePrint()}
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </nav>

      {/* ── Main Layout ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Panel — hidden on mobile when preview is active */}
        <section
          className={`w-full lg:w-[45%] xl:w-[40%] overflow-y-auto border-r bg-white/60 backdrop-blur-sm ${
            showMobilePreview ? 'hidden' : 'block'
          } lg:block`}
        >
          <div className="max-w-2xl mx-auto p-4 md:p-8 lg:p-10 h-full">
            <EditorPanel onSave={handleSave} />
          </div>
        </section>

        {/* Preview Panel — FIX: ref passed down for targeted print */}
        <section
          className={`flex-1 bg-slate-200/50 overflow-y-auto ${
            showMobilePreview ? 'block' : 'hidden'
          } lg:block`}
        >
          <div className="p-4 md:p-6">
            <PreviewPanel ref={printRef} />
          </div>
        </section>
      </main>
    </div>
  );
}

// ── Page export wrapped in Suspense (required for useSearchParams) ───────────
export default function ResumeBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 text-primary animate-spin" />
          <p className="text-sm font-bold text-muted-foreground">Loading editor…</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
