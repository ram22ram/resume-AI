"use client";

import React from "react";
import { ALL_TEMPLATES } from "@/components/templates/registry";
import { TemplateCard } from "@/components/templates/template-card";
import { motion } from "framer-motion";
import { Layout } from "lucide-react";
import { TemplatePreviewModalV2 } from "@/components/templates/template-preview-modal-v2";

export default function TemplatesTestPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Layout className="size-4" />
          Template Gallery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
        >
          Choose Your <span className="text-primary">Perfect</span> Template
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Select from our wide range of professionally designed, ATS-friendly templates.
          Each one is crafted to help you land more interviews.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {ALL_TEMPLATES.map((template, i) => (
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
              type={template.type}
              onPreviewClick={() => setSelectedTemplate(template)}
            />
          </motion.div>
        ))}
      </div>

      <TemplatePreviewModalV2
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate}
      />

      {ALL_TEMPLATES.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-[3rem] border border-dashed">
          <p className="text-muted-foreground font-medium">
            No templates found in the registry.
          </p>
        </div>
      )}
    </div>
  );
}