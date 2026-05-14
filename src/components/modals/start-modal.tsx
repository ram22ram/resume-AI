"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus, Upload } from "lucide-react";

interface StartModalProps {
  isOpen: boolean;
  onSelect: (flow: 'new' | 'upload') => void;
}

export function StartModal({ isOpen, onSelect }: StartModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onSelect('new'); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Let's get started</DialogTitle>
          <p className="text-center text-muted-foreground">
            How would you like to build your resume?
          </p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-8">
          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-4 h-48 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => onSelect('new')}
          >
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <FilePlus className="size-8" />
            </div>
            <div className="text-center">
              <p className="font-bold">Create New</p>
              <p className="text-xs text-muted-foreground mt-1">Start from scratch</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-4 h-48 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => onSelect('upload')}
          >
            <div className="p-4 bg-blue-500/10 rounded-full text-blue-600">
              <Upload className="size-8" />
            </div>
            <div className="text-center">
              <p className="font-bold">Upload Resume</p>
              <p className="text-xs text-muted-foreground mt-1">Parse existing PDF/DOCX</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
