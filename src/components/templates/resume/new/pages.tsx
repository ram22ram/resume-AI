"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ALL_TEMPLATES } from "@/components/templates/registry";
import { MOCK_RESUME_DATA } from "@/components/templates/mock-data";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Default / fallback resume data — every field is defined so the template
// never receives undefined and crashes.
// ---------------------------------------------------------------------------
const DEFAULT_RESUME_DATA = {
  ...MOCK_RESUME_DATA,
  // Override mock name so the user knows it is editable
  name: "Your Name",
  email: "you@example.com",
  phone: "",
  location: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
};

export default function NewResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Read templateId from URL
  const templateId = searchParams.get("templateId");

  // ✅ Resolve template from registry
  const template = useMemo(
    () => ALL_TEMPLATES.find((t) => t.id === templateId && t.type === "resume"),
    [templateId]
  );

  // ------------------------------------------------------------------ //
  // Edge case 1: no templateId in URL → redirect to template picker
  // ------------------------------------------------------------------ //
  if (!templateId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <AlertCircle className="size-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">No template selected</h1>
        <p className="text-muted-foreground max-w-sm">
          Please choose a template before opening the editor.
        </p>
        <Button onClick={() => router.push("/templates?type=resume")}>
          Browse Templates
        </Button>
      </div>
    );
  }

  // ------------------------------------------------------------------ //
  // Edge case 2: templateId present but not found in registry
  // ------------------------------------------------------------------ //
  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <h1 className="text-2xl font-bold">Template not found</h1>
        <p className="text-muted-foreground max-w-sm">
          The template <code className="font-mono text-sm bg-muted px-1 rounded">{templateId}</code> doesn't exist or may have been removed.
        </p>
        <Button onClick={() => router.push("/templates?type=resume")}>
          Pick Another Template
        </Button>
      </div>
    );
  }

  // ------------------------------------------------------------------ //
  // Happy path: render the editor with the resolved template
  // ------------------------------------------------------------------ //
  return <ResumeEditor template={template} initialData={DEFAULT_RESUME_DATA} />;
}

// ---------------------------------------------------------------------------
// ResumeEditor — drop your real editor component here.
// This stub renders the live template preview on the right and a placeholder
// form panel on the left so the page is never blank.
// ---------------------------------------------------------------------------
interface ResumeEditorProps {
  template: (typeof ALL_TEMPLATES)[number];
  initialData: typeof DEFAULT_RESUME_DATA;
}

function ResumeEditor({ template, initialData }: ResumeEditorProps) {
  const [data, setData] = React.useState(initialData);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left: edit panel ── */}
      <aside className="w-full max-w-md border-r bg-background overflow-y-auto p-6 flex flex-col gap-6 shrink-0">
        <div>
          <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">
            Editing
          </p>
          <h1 className="text-2xl font-black">{template.name}</h1>
        </div>

        {/* Basic fields — replace with your real form */}
        {(
          [
            { label: "Full Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Location", key: "location" },
          ] as const
        ).map(({ label, key }) => (
          <label key={key} className="flex flex-col gap-1.5 text-sm font-medium">
            {label}
            <input
              className="border rounded-xl px-4 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={(data as any)[key] ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, [key]: e.target.value }))
              }
              placeholder={label}
            />
          </label>
        ))}

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Summary
          <textarea
            rows={4}
            className="border rounded-xl px-4 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            value={data.summary ?? ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, summary: e.target.value }))
            }
            placeholder="Write a short professional summary…"
          />
        </label>

        {/* TODO: replace stub with full section editors (experience, education, skills) */}
        <p className="text-xs text-muted-foreground border rounded-xl p-4 bg-muted/20">
          ✏️ More sections (Experience, Education, Skills) go here — wire up your real editor components.
        </p>
      </aside>

      {/* ── Right: live preview ── */}
      <main className="flex-1 bg-muted/10 overflow-y-auto flex justify-center p-8">
        <div className="w-full max-w-[850px] bg-white shadow-2xl rounded-sm origin-top">
          {/* ✅ Render the resolved template component with live data */}
          <template.component data={data} />
        </div>
      </main>
    </div>
  );
}