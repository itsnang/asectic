"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  index?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  index,
}: StaggerItemProps) {
  const getDirectionVariants = () => {
    const distance = 20;
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const itemVariants = {
    hidden: getDirectionVariants(),
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div variants={itemVariants} custom={index} className={className}>
      {children}
    </motion.div>
  );
}
