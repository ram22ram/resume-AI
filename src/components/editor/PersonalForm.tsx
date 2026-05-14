"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PersonalForm() {
  const { data, updatePersonal } = useStore();
  const personal = data.sections.find(s => s.type === 'personal')?.items[0] || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonal({
      ...personal,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={personal.fullName || ''} 
            onChange={handleChange} 
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Wanted Job Title</Label>
          <Input 
            id="jobTitle" 
            name="jobTitle" 
            value={personal.jobTitle || ''} 
            onChange={handleChange} 
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            value={personal.email || ''} 
            onChange={handleChange} 
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={personal.phone || ''} 
            onChange={handleChange} 
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          name="address" 
          value={personal.address || ''} 
          onChange={handleChange} 
          placeholder="New York, USA"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective">Professional Summary</Label>
        <Textarea 
          id="objective" 
          name="objective" 
          value={personal.objective || ''} 
          onChange={handleChange} 
          placeholder="Briefly describe your career goals and achievements..."
          className="h-32"
        />
      </div>
    </div>
  );
}
