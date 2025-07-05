"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Eye, Zap, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HoodieCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image1: string;
  image2: string;
  badge?: string;
  rating?: number;
  reviews?: number;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function HoodieCard({
  name,
  price,
  originalPrice,
  image1,
  image2,
  badge,
  rating,
  reviews,
}: HoodieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const savings = originalPrice ? originalPrice - price : 0;

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case "Popular":
        return <TrendingUp className="w-3 h-3" />;
      case "New":
        return <Zap className="w-3 h-3" />;
      case "Limited":
        return <Star className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badgeType: string) => {
    switch (badgeType) {
      case "Popular":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white";
      case "New":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "Limited":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:border-primary/30 transition-all duration-500 w-full h-fit"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 rounded-t-2xl">
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isHovered ? "hover" : "default"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={isHovered ? image2 : image1}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          {/* Product Badge */}
          {badge && (
            <motion.div
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${getBadgeColor(badge)}`}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-1.5">
                {getBadgeIcon(badge)}
                <span>{badge}</span>
              </div>
            </motion.div>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <motion.div
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              -{discountPercentage}%
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className="absolute top-3 right-3 flex flex-col gap-2 z-10"
          style={{
            transform:
              discountPercentage > 0 ? "translateY(3rem)" : "translateY(0)",
          }}
        >
          {/* Heart Button */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-border"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                scale: isLiked ? [1, 1.4, 1] : 1,
                rotate: isLiked ? [0, -15, 15, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Quick View Button */}
          <motion.button
            className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-border"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4 relative z-10">
        {/* Product Name */}
        <motion.h3
          className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem] flex items-center"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h3>

        {/* Rating */}
        {rating && reviews && (
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {rating}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviews} reviews)
            </span>
          </motion.div>
        )}

        {/* Price Section */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <motion.span
                  className="text-sm text-muted-foreground line-through"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ${originalPrice.toFixed(2)}
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Size Selection */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {!selectedSize ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                variant="outline"
                className="w-full bg-background/50 backdrop-blur-sm hover:bg-background border-border shadow-lg font-medium"
                onClick={() => setSelectedSize("M")}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Select Size
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary shadow-lg"
                        : "bg-background/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Buy Now Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-2"
        >
          <Button
            className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <motion.span className="mr-0 group-hover/btn:mr-2 transition-all duration-200">
              Buy Now
            </motion.span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
}
