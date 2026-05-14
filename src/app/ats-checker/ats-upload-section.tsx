"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function ATSUploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="pt-6">
        <div className="border-2 border-dashed border-primary/50 rounded-lg p-12 mb-6">
          <p className="text-muted-foreground mb-4">
            {file ? `Selected: ${file.name}` : "Drag and drop your PDF resume here"}
          </p>
          <Input 
            type="file" 
            className="hidden" 
            id="resume-upload" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
          />
          <Button type="button" variant="secondary" onClick={handleBrowseClick}>
            Browse Files
          </Button>
        </div>
        <Button type="button" className="w-full" disabled={!file}>
          Analyze Resume
        </Button>
      </CardContent>
    </Card>
  );
}
