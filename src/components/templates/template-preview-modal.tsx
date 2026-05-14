"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { MOCK_RESUME_DATA } from "./mock-data";
import { MOCK_COVER_LETTER_DATA } from "./mock-cover-data";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    name: string;
    type: "resume" | "cover";
    component: React.FC<any>;
    isPremium?: boolean;
  } | null;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ isOpen, onClose, template }) => {
  const router = useRouter();

  if (!template) return null;

  const TemplateComponent = template.component;
  const mockData = template.type === "cover" ? MOCK_COVER_LETTER_DATA : MOCK_RESUME_DATA;

  const handleUseTemplate = () => {
    const route = template.type === "cover" ? "/cover-letter/new" : "/resume/new";
    router.push(`${route}?template=${template.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-card border shadow-2xl rounded-[3rem] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-black">{template.name}</h2>
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none px-3 py-0.5 rounded-full flex items-center gap-1.5 font-bold text-[10px]">
                      <Crown className="size-3 fill-white" />
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Full {template.type === 'cover' ? 'Cover Letter' : 'Resume'} Preview</p>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={handleUseTemplate} className="rounded-full px-6 gap-2 shadow-lg shadow-primary/20">
                  Use This Template
                  <ArrowRight className="size-4" />
                </Button>
                <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-muted/20">
              <div className="w-full max-w-[850px] mx-auto bg-white shadow-xl min-h-[1100px] p-1 shadow-black/5">
                <TemplateComponent data={mockData} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
