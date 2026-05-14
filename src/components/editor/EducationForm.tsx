"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const { data, updateSection } = useStore();
  const education = data.sections.find(s => s.type === 'education')?.items || [];

  const addItem = () => {
    updateSection('education', [...education, { school: '', degree: '', startDate: '', endDate: '', location: '' }]);
  };

  const removeItem = (index: number) => {
    updateSection('education', education.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newItems = [...education];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection('education', newItems);
  };

  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
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
              <Label>School</Label>
              <Input 
                value={edu.school || ''} 
                onChange={(e) => handleChange(index, 'school', e.target.value)}
                placeholder="Harvard University"
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input 
                value={edu.degree || ''} 
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                value={edu.startDate || ''} 
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="2016"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input 
                value={edu.endDate || ''} 
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="2020"
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full h-12 rounded-xl border-dashed gap-2" onClick={addItem}>
        <Plus className="size-4" />
        Add Education
      </Button>
    </div>
  );
}
