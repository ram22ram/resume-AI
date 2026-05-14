"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MOCK_RESUME_DATA } from "./mock-data";
import { MOCK_COVER_LETTER_DATA } from "./mock-cover-data";
import { FullTemplatePreview } from "./full-template-preview";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";

interface Props {
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

export const TemplatePreviewModalV2: React.FC<Props> = ({
  isOpen,
  onClose,
  template,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen: onUpgradeOpen } = useUpgradeModal();

  if (!template) return null;

  const isPro = session?.user?.plan === "pro";
  const isLocked = template.isPremium && !isPro;

  const mockData =
    template.type === "cover" ? MOCK_COVER_LETTER_DATA : MOCK_RESUME_DATA;

  const handleUseTemplate = () => {
    // PLAN ENFORCEMENT: block free users from premium templates
    if (isLocked) {
      onUpgradeOpen();
      return;
    }
    const route = template.type === "cover" ? "/cover-letter/new" : "/resume/new";
    router.push(`${route}?template=${template.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full h-full bg-card border shadow-2xl rounded-none md:rounded-[3rem] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
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
                <p className="text-sm text-muted-foreground">
                  Full {template.type === "cover" ? "Cover Letter" : "Resume"} Preview
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isLocked ? (
                  <Button
                    onClick={handleUseTemplate}
                    className="rounded-full px-6 gap-2 bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 text-white"
                  >
                    <Lock className="size-4" />
                    Unlock Template
                    <Crown className="size-4 fill-white" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleUseTemplate}
                    className="rounded-full px-6 gap-2 shadow-lg shadow-primary/20"
                  >
                    Use This Template
                    <ArrowRight className="size-4" />
                  </Button>
                )}

                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-muted/20 p-4 md:p-6 w-full relative">
              <FullTemplatePreview component={template.component} data={mockData} />

              {/* Pro blur overlay for locked templates */}
              {isLocked && (
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[3px] flex items-end justify-center pb-20 pointer-events-none">
                  <div className="bg-amber-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto">
                    <Crown className="size-6" />
                    <div>
                      <p className="font-black text-sm">Premium Template</p>
                      <p className="text-xs text-white/80">Upgrade to Pro to use this template</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={handleUseTemplate}
                      className="ml-4 bg-white text-amber-600 hover:bg-white/90 font-black rounded-xl"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};