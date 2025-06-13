"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
  whileTap?: boolean;
  tapScale?: number;
}

export function ScaleOnHover({
  children,
  scale = 1.05,
  duration = 0.3,
  className,
  whileTap = false,
  tapScale = 0.95,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={whileTap ? { scale: tapScale } : undefined}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
