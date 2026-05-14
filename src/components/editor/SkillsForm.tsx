"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function SkillsForm() {
  const { data, updateSection } = useStore();
  const skills = data.sections.find(s => s.type === 'skills')?.items || [];

  const addItem = () => {
    updateSection('skills', [...skills, { name: '', level: 'Expert' }]);
  };

  const removeItem = (index: number) => {
    updateSection('skills', skills.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newItems = [...skills];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection('skills', newItems);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1 space-y-2">
              <Label>Skill</Label>
              <Input 
                value={skill.name || ''} 
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="JavaScript"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:bg-destructive/10 shrink-0"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 h-12 rounded-xl border-dashed gap-2" onClick={addItem}>
        <Plus className="size-4" />
        Add Skill
      </Button>
    </div>
  );
}
