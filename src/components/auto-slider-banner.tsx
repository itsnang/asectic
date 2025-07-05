"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/7.jpg",
    isAnimated: false,
    title: "Premium Streetwear",
    subtitle: "Elevate Your Style",
    description:
      "Discover our exclusive collection of premium hoodies designed for the modern lifestyle.",
    cta: "Shop Collection",
    secondaryCta: "Watch Story",
    badge: "New Collection",
    features: ["Premium Quality", "Sustainable Materials", "Limited Edition"],
  },
  {
    src: "/10.jpg",
    isAnimated: false,
    title: "Limited Edition",
    subtitle: "Crafted to Perfection",
    description:
      "Experience unmatched quality and comfort with our handcrafted streetwear pieces.",
    cta: "Explore Limited",
    secondaryCta: "Size Guide",
    badge: "Only 50 Left",
    features: ["Hand-Crafted", "Numbered Edition", "Certificate Included"],
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
            quality={95}
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10" />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <motion.div
          key={currentIndex}
          className="text-center max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            variants={badgeVariants}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              {images[currentIndex].badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl"
            variants={contentVariants}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {images[currentIndex].title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-white/90 mb-4 font-light tracking-wide"
            variants={contentVariants}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          >
            {images[currentIndex].subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={contentVariants}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          >
            {images[currentIndex].description}
          </motion.p>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            variants={contentVariants}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          >
            {images[currentIndex].features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
              >
                <div className="w-2 h-2 bg-gradient-brand rounded-full" />
                <span className="text-white/90 text-sm font-medium">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={contentVariants}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={handleShopClick}
                size="lg"
                className="bg-gradient-brand text-white hover:opacity-90 font-semibold px-10 py-4 rounded-full shadow-2xl border-0 text-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {images[currentIndex].cta}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-10 py-4 rounded-full transition-all duration-300 text-lg"
              >
                <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                {images[currentIndex].secondaryCta}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <div className="w-4 h-4 flex gap-1">
              <div className="w-1 h-4 bg-white rounded-full" />
              <div className="w-1 h-4 bg-white rounded-full" />
            </div>
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
        </motion.button>
      </div>

      {/* Side Navigation Arrows */}
      <motion.button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white hidden lg:block"
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white hidden lg:block"
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
