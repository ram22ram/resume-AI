"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Crown, Maximize2, X, ArrowRight, Lock } from "lucide-react";
import { ALL_TEMPLATES } from "./registry";
import { TemplatePreview } from "./template-preview";
import { MOCK_RESUME_DATA } from "./mock-data";
import { MOCK_COVER_LETTER_DATA } from "./mock-cover-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";


interface TemplateCardProps {
  id: string;
  name: string;
  isPremium: boolean;
  type: string;
  onPreviewClick?: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  isPremium,
  type,
  onPreviewClick,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen: onUpgradeOpen } = useUpgradeModal();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const template = ALL_TEMPLATES.find((t) => t.id === id);
  if (!template) return null;

  const isPro = session?.user?.plan === "pro";
  const isLocked = isPremium && !isPro;

  // PLAN ENFORCEMENT: Premium templates require Pro plan
  const handleUseTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      onUpgradeOpen();
      return;
    }
    const route = template.type === "cover" ? "/cover-letter/new" : "/resume/new";
    router.push(`${route}?templateId=${id}`);
  };

  const previewData =
    template.type === "cover" ? MOCK_COVER_LETTER_DATA : MOCK_RESUME_DATA;

  return (
    <>
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group cursor-pointer"
        onClick={() => {
          if (onPreviewClick) {
            onPreviewClick();
          } else {
            setIsPreviewOpen(true);
          }
        }}
      >
        <Card className="overflow-hidden border-border/40 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-[2.5rem] bg-background">
          <div className="bg-muted/30 relative overflow-hidden h-[450px] group-hover:bg-muted/10 transition-colors">
            {/* Real Template Preview */}
            <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <TemplatePreview
                component={template.component}
                data={previewData}
                autoScroll={true}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
              {isPremium ? (
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none shadow-lg px-4 py-1.5 rounded-full flex items-center gap-1.5 font-bold">
                  <Crown className="size-3.5 fill-white" />
                  PRO
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-md text-foreground/80 border-none shadow-md px-4 py-1.5 rounded-full font-bold"
                >
                  FREE
                </Badge>
              )}
            </div>

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all duration-500">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10"
              >
                {/* PLAN ENFORCEMENT: Lock button for premium templates on free plan */}
                <Button
                  onClick={handleUseTemplate}
                  size="lg"
                  className={`w-full rounded-2xl h-14 font-black shadow-2xl text-lg group/btn ${
                    isLocked
                      ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/40'
                      : 'bg-primary hover:bg-primary shadow-primary/40'
                  }`}
                >
                  {isLocked ? (
                    <><Lock className="mr-2 size-4" /> Unlock Template</>
                  ) : (
                    <>Use Template <ArrowRight className="ml-2 size-5 group-hover/btn:translate-x-1 transition-transform" /></>
                  )}
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPreviewOpen(true);
                }}
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md font-bold px-6 h-10"
              >
                <Maximize2 className="size-4 mr-2" />
                Quick Preview
              </Button>
            </div>
          </div>

          <CardHeader className="p-7">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                {type === "resume" ? "ATS-Ready" : "Professional"} {type}
              </p>
              <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Full Screen Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden rounded-[3rem] border-none shadow-2xl bg-muted/20">
          <div className="flex flex-col h-full relative">
            <div className="absolute top-6 right-6 z-50">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-xl hover:scale-110 transition-transform"
                onClick={() => setIsPreviewOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-muted/10">
              <div className="w-full max-w-[900px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-white rounded-sm transform origin-top transition-transform duration-700">
                <template.component data={previewData} />
              </div>
            </div>

            <div className="p-8 bg-background border-t flex items-center justify-between px-12">
              <div className="flex flex-col">
                <h3 className="text-2xl font-black">{name}</h3>
                <p className="text-muted-foreground font-medium">
                  {isPremium ? "Premium Pro Template" : "Standard Free Template"}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-8 font-bold"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Close
                </Button>
                {/* ✅ FIX 3: Modal "Create" button also uses handleUseTemplate */}
                <Button
                  size="lg"
                  className="rounded-2xl px-10 font-black shadow-xl shadow-primary/20"
                  onClick={handleUseTemplate}
                >
                  Create with this Template
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};