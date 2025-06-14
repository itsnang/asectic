"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/7.jpg",
    isAnimated: false,
    title: "Premium Streetwear",
    subtitle: "Elevate Your Style",
    description:
      "Discover our exclusive collection of premium hoodies designed for the modern lifestyle.",
  },
  {
    src: "/10.jpg",
    isAnimated: false,
    title: "Limited Edition",
    subtitle: "Crafted to Perfection",
    description:
      "Experience unmatched quality and comfort with our handcrafted streetwear pieces.",
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageError = (index: number) => {
    setError(`Failed to load image ${index + 1}`);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-background">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background text-destructive">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <Image
            src={images[currentIndex].src}
            alt={`Banner ${currentIndex + 1}`}
            fill
            sizes="100vw"
            quality={90}
            priority={currentIndex === 0}
            unoptimized={images[currentIndex].isAnimated}
            onError={() => handleImageError(currentIndex)}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/60 flex flex-col items-center justify-center z-20">
        <motion.div
          key={currentIndex}
          className="text-center max-w-4xl mx-auto px-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-2xl"
            variants={contentVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {images[currentIndex].title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow-lg"
            variants={contentVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {images[currentIndex].subtitle}
          </motion.p>

          <motion.p
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={contentVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {images[currentIndex].description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={contentVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShopClick}
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 rounded-full shadow-xl"
              >
                SHOP NOW
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hidden md:block"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white hidden md:block"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Enhanced Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8 shadow-lg"
                : "bg-white/50 hover:bg-white/75 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <motion.button
        onClick={toggleAutoPlay}
        className="absolute bottom-6 right-6 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{ rotate: isAutoPlaying ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </div>
  );
}
