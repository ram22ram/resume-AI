"use client";

import React, { useState } from "react";
import { COVER_TEMPLATES } from "@/components/templates/registry";
import { TemplateCard } from "@/components/templates/template-card";
import { motion } from "framer-motion";
import { FileText, Sparkles, Layout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TemplatePreviewModal } from "@/components/templates/template-preview-modal";

export default function CoverLetterTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <FileText className="size-4" />
          Cover Letter Gallery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
        >
          Land Your <span className="text-blue-600">Dream Job</span> with Style
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Professional templates designed to pair perfectly with your resume and catch any recruiter's eye.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {COVER_TEMPLATES.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TemplateCard
              id={template.id}
              name={template.name}
              isPremium={template.isPremium}
              type="cover"
              onPreviewClick={() => setSelectedTemplate(template)}
            />
          </motion.div>
        ))}
      </div>

      <TemplatePreviewModal
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate}
      />

      {COVER_TEMPLATES.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed">
          <p className="text-muted-foreground font-medium">
            No cover letter templates found.
          </p>
        </div>
      )}
    </div>
  );
}
