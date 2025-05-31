"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "/7.jpg",
    isAnimated: false,
  },
  {
    src: "/10.jpg",
    isAnimated: false,
  },
];

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageError = (index: number) => {
    setError(`Failed to load image ${index + 1}`);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-background">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background text-destructive">
          {error}
        </div>
      )}

      {images.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.src}
            alt={`Banner ${index + 1}`}
            fill
            sizes="100vw"
            quality={85}
            priority={index === 0}
            unoptimized={image.isAnimated}
            onError={() => handleImageError(index)}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 dark:from-black/50 dark:via-black/30 dark:to-black/50 flex flex-col items-center justify-center z-20">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center mb-3 drop-shadow-lg">
          Premium Streetwear
        </h1>
        <p className="text-lg text-white/90 text-center mb-6 drop-shadow">
          Elevate Your Style
        </p>
        <Button
          onClick={handleShopClick}
          size="lg"
          variant="outline"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 text-white hover:text-white"
        >
          SHOP
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
