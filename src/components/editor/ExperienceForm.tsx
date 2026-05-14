"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ExperienceForm() {
  const { data, updateSection } = useStore();
  const experiences = data.sections.find(s => s.type === 'experience')?.items || [];

  const addItem = () => {
    updateSection('experience', [...experiences, { company: '', position: '', date: '', description: [] }]);
  };

  const removeItem = (index: number) => {
    updateSection('experience', experiences.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newItems = [...experiences];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection('experience', newItems);
  };

  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index} className="p-6 border rounded-2xl bg-muted/30 relative group">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="size-4" />
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                value={exp.position || ''} 
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label>Employer</Label>
              <Input 
                value={exp.company || ''} 
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="Google"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                value={exp.date || ''} 
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                placeholder="Jan 2020 - Present"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                value={exp.location || ''} 
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-12 rounded-xl border-dashed gap-2" onClick={addItem}>
        <Plus className="size-4" />
        Add Employment
      </Button>
    </div>
  );
}
