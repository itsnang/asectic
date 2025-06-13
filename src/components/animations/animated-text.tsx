"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scale?: boolean;
  initialScale?: number;
  finalScale?: number;
  once?: boolean;
}

export function AnimatedText({
  children,
  delay = 0,
  duration = 0.8,
  className,
  scale = false,
  initialScale = 0.8,
  finalScale = 1,
  once = true,
}: AnimatedTextProps) {
  const initial = scale ? { opacity: 0, scale: initialScale } : { opacity: 0 };

  const animate = scale ? { opacity: 1, scale: finalScale } : { opacity: 1 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
