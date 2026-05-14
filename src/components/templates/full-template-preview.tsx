"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, Maximize2, Minimize2 } from "lucide-react";

interface Props {
  component: React.FC<any>;
  data: any;
}

export const FullTemplatePreview: React.FC<Props> = ({
  component: Component,
  data,
}) => {
  const [zoom, setZoom] = useState(1);
  const [fitToWidth, setFitToWidth] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (fitToWidth && containerRef.current) {
      const updateWidth = () => {
        const width = containerRef.current?.clientWidth || 0;
        setContainerWidth(width);
        // Calculate zoom to fit width (A4 paper is 210mm ≈ 793px at 96dpi)
        const targetWidth = Math.min(width - 40, 1200); // Max width of preview
        const calculatedZoom = targetWidth / 793;
        setZoom(Math.min(Math.max(calculatedZoom, 0.4), 1.5));
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [fitToWidth]);

  const zoomIn = () => {
    setFitToWidth(false);
    setZoom((z) => Math.min(z + 0.1, 1.5));
  };
  
  const zoomOut = () => {
    setFitToWidth(false);
    setZoom((z) => Math.max(z - 0.1, 0.3));
  };

  const handleFitToWidth = () => {
    setFitToWidth(true);
  };

  return (
    <div className="w-full h-full flex flex-col">
      
      {/* Controls */}
      <div className="flex justify-end gap-2 mb-4 sticky top-0 bg-background/50 backdrop-blur-sm py-2 z-10 rounded-lg">
        <button
          onClick={zoomOut}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          title="Zoom Out"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={zoomIn}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          title="Zoom In"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={handleFitToWidth}
          className={`p-2 rounded-lg transition-colors ${
            fitToWidth 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
          title="Fit to Width"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Preview Area - Full width scrollable container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto rounded-xl flex justify-center items-start w-full"
      >
        <div
          className="origin-top transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
            width: "210mm", // A4 width at 96dpi
            minHeight: "1123px", // A4 height at 96dpi
          }}
        >
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Component data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};