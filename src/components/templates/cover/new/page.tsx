"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ALL_TEMPLATES } from "@/components/templates/registry";
import { MOCK_COVER_LETTER_DATA } from "@/components/templates/mock-cover-data";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Default / fallback cover letter data
// ---------------------------------------------------------------------------
const DEFAULT_COVER_DATA = {
  ...MOCK_COVER_LETTER_DATA,
  senderName: "Your Name",
  senderEmail: "you@example.com",
  senderPhone: "",
  senderLocation: "",
  recipientName: "",
  recipientTitle: "",
  companyName: "",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  subject: "",
  body: "",
};

export default function NewCoverLetterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Read templateId from URL
  const templateId = searchParams.get("templateId");

  // ✅ Resolve template — must be type "cover"
  const template = useMemo(
    () => ALL_TEMPLATES.find((t) => t.id === templateId && t.type === "cover"),
    [templateId]
  );

  // ------------------------------------------------------------------ //
  // Edge case 1: no templateId
  // ------------------------------------------------------------------ //
  if (!templateId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <AlertCircle className="size-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">No template selected</h1>
        <p className="text-muted-foreground max-w-sm">
          Please choose a template before opening the editor.
        </p>
        <Button onClick={() => router.push("/templates?type=cover")}>
          Browse Templates
        </Button>
      </div>
    );
  }

  // ------------------------------------------------------------------ //
  // Edge case 2: invalid templateId
  // ------------------------------------------------------------------ //
  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <AlertCircle className="size-12 text-destructive" />
        <h1 className="text-2xl font-bold">Template not found</h1>
        <p className="text-muted-foreground max-w-sm">
          The template{" "}
          <code className="font-mono text-sm bg-muted px-1 rounded">
            {templateId}
          </code>{" "}
          doesn't exist or may have been removed.
        </p>
        <Button onClick={() => router.push("/templates?type=cover")}>
          Pick Another Template
        </Button>
      </div>
    );
  }

  // ------------------------------------------------------------------ //
  // Happy path
  // ------------------------------------------------------------------ //
  return <CoverLetterEditor template={template} initialData={DEFAULT_COVER_DATA} />;
}

// ---------------------------------------------------------------------------
// CoverLetterEditor stub — replace with your real editor
// ---------------------------------------------------------------------------
interface CoverLetterEditorProps {
  template: (typeof ALL_TEMPLATES)[number];
  initialData: typeof DEFAULT_COVER_DATA;
}

function CoverLetterEditor({ template, initialData }: CoverLetterEditorProps) {
  const [data, setData] = React.useState(initialData);

  const field = (
    label: string,
    key: keyof typeof DEFAULT_COVER_DATA,
    placeholder = label
  ) => (
    <label key={key} className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      <input
        className="border rounded-xl px-4 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
        value={(data as any)[key] ?? ""}
        onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
      />
    </label>
  );

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

        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Your Details
        </p>
        {field("Full Name", "senderName")}
        {field("Email", "senderEmail")}
        {field("Phone", "senderPhone")}
        {field("Location", "senderLocation")}

        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Recipient
        </p>
        {field("Recipient Name", "recipientName")}
        {field("Recipient Title", "recipientTitle")}
        {field("Company Name", "companyName")}
        {field("Subject", "subject")}

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Letter Body
          <textarea
            rows={10}
            className="border rounded-xl px-4 py-2.5 text-sm bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            value={data.body ?? ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, body: e.target.value }))
            }
            placeholder="Write your cover letter here…"
          />
        </label>
      </aside>

      {/* ── Right: live preview ── */}
      <main className="flex-1 bg-muted/10 overflow-y-auto flex justify-center p-8">
        <div className="w-full max-w-[850px] bg-white shadow-2xl rounded-sm origin-top">
          {/* ✅ Render the resolved cover letter template with live data */}
          <template.component data={data} />
        </div>
      </main>
    </div>
  );
}