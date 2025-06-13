"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

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

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group bg-card rounded-xl overflow-hidden shadow-lg border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={isHovered ? image2 : image1}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
              badge === "Popular"
                ? "bg-blue-500 text-white"
                : badge === "New"
                  ? "bg-green-500 text-white"
                  : badge === "Limited"
                    ? "bg-red-500 text-white"
                    : "bg-gray-500 text-white"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {badge}
          </motion.div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <motion.div
            className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            -{discountPercentage}%
          </motion.div>
        )}

        {/* Heart Icon */}
        <motion.button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute p-2 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100"
          style={{
            top: "12px",
            right: "12px",
            transform:
              discountPercentage > 0 ? "translateY(2.5rem)" : "translateY(0)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{
              scale: isLiked ? [1, 1.3, 1] : 1,
              rotate: isLiked ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Quick Add to Cart */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="sm"
              className="w-full bg-white/90 text-black hover:bg-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <motion.h3
          className="text-lg font-semibold mb-2 group-hover:text-primary"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h3>

        {/* Rating */}
        {rating && reviews && (
          <motion.div
            className="flex items-center gap-2 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating} ({reviews} reviews)
            </span>
          </motion.div>
        )}

        {/* Price */}
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xl font-bold text-primary">
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
        </motion.div>

        {/* Buy Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full group/btn" variant="outline">
            <motion.span
              className="mr-0 group-hover/btn:mr-2"
              transition={{ duration: 0.2 }}
            >
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
    </motion.div>
  );
}
