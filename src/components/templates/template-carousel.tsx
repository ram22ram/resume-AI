"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_TEMPLATES } from "./registry";
import { TemplatePreview } from "./template-preview";
import { TemplatePreviewModal } from "./template-preview-modal";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { MOCK_RESUME_DATA } from "./mock-data";
import { MOCK_COVER_LETTER_DATA } from "./mock-cover-data";

interface TemplateCarouselProps {
  type?: "resume" | "cover";
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  type = "resume",
}) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  const carouselTemplates = ALL_TEMPLATES.filter((t) => t.type === type).slice(0, 7);

  const next = useCallback(() => {
    if (carouselTemplates.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % carouselTemplates.length);
  }, [carouselTemplates.length]);

  const prev = useCallback(() => {
    if (carouselTemplates.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + carouselTemplates.length) % carouselTemplates.length);
  }, [carouselTemplates.length]);

  useEffect(() => {
    if (isPaused || carouselTemplates.length === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next, carouselTemplates.length]);

  if (carouselTemplates.length === 0) return null;

  // ✅ FIX 1: Extracted navigation handler with correct ?templateId= param
  const handleUseTemplate = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation();
    const route = type === "cover" ? "/cover-letter/new" : "/resume/new";
    router.push(`${route}?templateId=${templateId}`);
  };

  return (
    <div className="w-full py-12 relative group/carousel">
      {/* Navigation Buttons */}
      <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <Button
          onClick={prev}
          variant="outline"
          size="icon"
          className="size-12 rounded-full bg-background/80 backdrop-blur-md shadow-xl hover:scale-110 transition-transform"
        >
          <ChevronLeft className="size-6" />
        </Button>
      </div>
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <Button
          onClick={next}
          variant="outline"
          size="icon"
          className="size-12 rounded-full bg-background/80 backdrop-blur-md shadow-xl hover:scale-110 transition-transform"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div
        className="flex items-center justify-center gap-4 md:gap-8 px-4 overflow-x-hidden min-h-[550px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {carouselTemplates.map((template, index) => {
            const isCenter = index === activeIndex;
            const distance = Math.abs(index - activeIndex);

            if (distance > 2) return null;

            return (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{
                  opacity: isCenter ? 1 : 0.4,
                  scale: isCenter ? 1.05 : 0.85,
                  x: (index - activeIndex) * 50,
                  zIndex: 10 - distance,
                }}
                exit={{ opacity: 0, scale: 0.5, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative shrink-0 w-[280px] md:w-[320px] group/card cursor-pointer"
                // ✅ FIX 2: Non-center cards navigate to themselves on click;
                //    center card click is handled by overlay buttons below.
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
              >
                <div
                  className={`
                    relative rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 bg-card
                    ${
                      isCenter
                        ? "border-primary shadow-2xl shadow-primary/20 ring-8 ring-primary/5"
                        : "border-border/50 shadow-lg"
                    }
                  `}
                >
                  <div className="h-[420px] relative">
                    <TemplatePreview
                      component={template.component}
                      data={
                        type === "cover" ? MOCK_COVER_LETTER_DATA : MOCK_RESUME_DATA
                      }
                    />

                    {/* ✅ FIX 3: Overlay only on center card; buttons have stopPropagation */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/card:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                          }}
                          className="rounded-full gap-2 bg-white text-primary hover:bg-white/90 scale-90 group-hover/card:scale-100 transition-all duration-500 shadow-xl"
                        >
                          <Eye className="size-4" /> Preview Full
                        </Button>
                        {/* ✅ FIX 4: Uses handleUseTemplate with correct ?templateId= */}
                        <Button
                          onClick={(e) => handleUseTemplate(e, template.id)}
                          className="rounded-full gap-2 scale-90 group-hover/card:scale-100 transition-all duration-500 delay-75 shadow-xl shadow-primary/20"
                        >
                          <MousePointer2 className="size-4" /> Use Template
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-background/50 backdrop-blur-sm border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold truncate pr-2">{template.name}</h3>
                      {template.isPremium && (
                        <Badge className="bg-amber-500 hover:bg-amber-600 border-none text-[10px] uppercase font-black px-2 py-0.5">
                          Pro
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {carouselTemplates.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 transition-all duration-500 rounded-full ${
              i === activeIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      <TemplatePreviewModal
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate}
      />
    </div>
  );
};