"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalForm } from './PersonalForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  GraduationCap,
  Code,
  CheckCircle2,
  LayoutList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const steps = [
  { id: 'personal',   title: 'Personal Details',     icon: User },
  { id: 'experience', title: 'Experience',            icon: Briefcase },
  { id: 'education',  title: 'Education',             icon: GraduationCap },
  { id: 'skills',     title: 'Skills',                icon: Code },
  { id: 'custom',     title: 'Custom Sections',       icon: LayoutList },
];

const FORM_MAP: Record<number, React.FC> = {
  0: PersonalForm,
  1: ExperienceForm,
  2: EducationForm,
  3: SkillsForm,
  4: CustomSectionsForm,
};

interface EditorPanelProps {
  onSave?: () => Promise<void> | void;
}

export function EditorPanel({ onSave }: EditorPanelProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const isLastStep = activeStep === steps.length - 1;

  // "Finish & Save": call parent save API, then redirect to dashboard
  const handleFinish = async () => {
    if (onSave) {
      await onSave();
    } else {
      toast.success("Resume saved! Redirecting to your dashboard...", { duration: 2500 });
    }
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  const CurrentForm = FORM_MAP[activeStep] || PersonalForm;

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Step Progress — scrollable on mobile */}
      <div className="flex items-start gap-1 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isDone = index < activeStep;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`flex flex-col items-center gap-1.5 min-w-[64px] px-2 py-2 rounded-2xl transition-all text-center ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : isDone
                  ? 'text-green-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div
                className={`size-9 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                    : isDone
                    ? 'bg-green-100 text-green-600'
                    : 'bg-muted'
                }`}
              >
                {isDone ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wide leading-tight">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="flex-1 bg-white border border-border/50 rounded-[1.5rem] p-6 md:p-8 shadow-sm overflow-y-auto">
        <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-foreground">
          {steps[activeStep].title}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <CurrentForm />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center gap-3">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={activeStep === 0}
          className="rounded-xl h-11 px-5 gap-2 font-bold"
        >
          <ChevronLeft className="size-4" /> Back
        </Button>

        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeStep ? 'w-6 bg-primary' : 'w-1.5 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* FIX: Last step enabled with Finish handler */}
        <Button
          onClick={isLastStep ? handleFinish : nextStep}
          className="rounded-xl h-11 px-6 gap-2 font-bold shadow-lg shadow-primary/20"
        >
          {isLastStep ? (
            <><CheckCircle2 className="size-4" /> Finish & Save</>
          ) : (
            <>Next <ChevronRight className="size-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
