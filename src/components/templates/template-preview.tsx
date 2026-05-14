"use client";

import React, { memo, useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface TemplatePreviewProps {
  component: React.FC<any>;
  data: any;
  autoScroll?: boolean;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = memo(({ component: Component, data, autoScroll = true }) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const startScroll = async () => {
      if (!autoScroll || isHovered) return;
      
      try {
        await controls.start({
          y: [0, -1000],
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          },
        });
      } catch (e) {
        // Handle cancellation
      }
    };

    if (autoScroll && !isHovered) {
      startScroll();
    } else {
      controls.stop();
    }

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [autoScroll, isHovered, controls]);

  if (!data) return null;
  
  return (
    <div 
      className="w-full h-full overflow-hidden bg-white relative rounded-inherit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-full origin-top-left" style={{ transform: "scale(0.4)" }}>
        <motion.div 
          animate={controls}
          className="w-[850px] p-8"
        >
          <Component data={data} />
        </motion.div>
      </div>
      
      {/* Bottom fade for preview effect */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
      
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5" />
    </div>
  );
});

TemplatePreview.displayName = "TemplatePreview";
