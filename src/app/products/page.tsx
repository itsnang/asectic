"use client";

import { HoodieCard } from "@/components/hoodie-card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  FadeIn,
  BlurFade,
  StaggerContainer,
  StaggerItem,
  AnimatedText,
} from "@/components/animations";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    const filtered = products.filter((product) => {
      const trimmedSearchTerm = searchTerm.trim();
      if (!trimmedSearchTerm || trimmedSearchTerm === "") return true;
      return product.name
        .toLowerCase()
        .includes(trimmedSearchTerm.toLowerCase());
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...filtered].sort((a, b) => b.id - a.id);
      default: // popular
        return [...filtered].sort((a, b) => b.reviews - a.reviews);
    }
  }, [searchTerm, sortBy]);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <AnimatedText
            scale
            duration={0.8}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Our Products
          </AnimatedText>
          <BlurFade delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete collection of premium streetwear. Each piece
              is crafted with precision and designed for those who appreciate
              quality and style.
            </p>
          </BlurFade>
        </FadeIn>

        {/* Search and Sort */}
        <BlurFade delay={0.3} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card rounded-xl p-6 shadow-sm border">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("popular")}
              >
                Popular
              </Button>
              <Button
                variant={sortBy === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("newest")}
              >
                Newest
              </Button>
              <Button
                variant={sortBy === "price-low" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("price-low")}
              >
                Price ↑
              </Button>
              <Button
                variant={sortBy === "price-high" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("price-high")}
              >
                Price ↓
              </Button>
            </div>
          </div>
        </BlurFade>

        {/* Results Count */}
        <BlurFade delay={0.4} className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
          </p>
        </BlurFade>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <StaggerContainer
            key={`${searchTerm}-${sortBy}-${filteredAndSortedProducts.length}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
            once={false}
          >
            {filteredAndSortedProducts.map((product, index) => (
              <StaggerItem key={product.id} index={index}>
                <HoodieCard {...product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <BlurFade delay={0.5} className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search term
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
              }}
            >
              Clear Search
            </Button>
          </BlurFade>
        )}

        {/* Load More Button */}
        {filteredAndSortedProducts.length > 0 && (
          <FadeIn className="text-center">
            <Button variant="outline" size="lg" className="px-8">
              Load More Products
            </Button>
          </FadeIn>
        )}
      </div>
    </main>
  );
}
