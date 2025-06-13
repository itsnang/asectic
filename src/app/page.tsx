import { HoodieCard } from "@/components/hoodie-card";
import { AutoSliderBanner } from "@/components/auto-slider-banner";
import { Button } from "@/components/ui/button";
import { Star, Truck, Shield, Recycle, ArrowRight } from "lucide-react";
import {
  FadeIn,
  BlurFade,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  AnimatedText,
} from "@/components/animations";

export default function Home() {
  const hoodies = [
    {
      id: 1,
      name: "SDFM Classic Black",
      price: 149.99,
      originalPrice: 199.99,
      image1:
        "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2:
        "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",

      badge: "Popular",
      rating: 4.8,
      reviews: 127,
    },
    {
      id: 2,
      name: "SDFM Premium Gray",
      price: 154.99,
      originalPrice: 204.99,
      image1:
        "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2:
        "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",

      badge: "New",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "SDFM Signature Navy",
      price: 159.99,
      originalPrice: 209.99,
      image1:
        "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2:
        "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",

      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "SDFM Limited Edition",
      price: 199.99,
      originalPrice: 249.99,
      image1:
        "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
      image2:
        "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",

      badge: "Limited",
      rating: 4.9,
      reviews: 203,
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $100",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship",
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Eco-friendly production process",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      comment: "The quality is incredible. Best hoodie I've ever owned!",
      rating: 5,
      avatar: "AJ",
    },
    {
      name: "Sarah Chen",
      comment: "Perfect fit and amazing comfort. Highly recommend!",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      comment: "Great style and the material feels premium.",
      rating: 5,
      avatar: "MR",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Full-screen Auto-sliding Banner */}
      <AutoSliderBanner />

      {/* Features Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="text-center group">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Product Section */}
      <section
        id="product-section"
        className="w-full py-20 bg-gradient-to-b from-muted/20 to-background"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <AnimatedText
              scale
              duration={0.8}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Latest Collection
            </AnimatedText>
            <BlurFade delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our premium streetwear collection, crafted with
                attention to detail and designed for the modern lifestyle.
              </p>
            </BlurFade>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {hoodies.map((hoodie, index) => (
              <StaggerItem key={hoodie.id} index={index}>
                <HoodieCard {...hoodie} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <ScaleOnHover whileTap tapScale={0.95}>
              <Button size="lg" className="group">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </ScaleOnHover>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers worldwide
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="bg-card rounded-xl p-6 shadow-lg border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new
              collections, exclusive offers, and style tips.
            </p>
            <BlurFade delay={0.3} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ScaleOnHover whileTap tapScale={0.95}>
                <Button size="lg" className="px-8">
                  Subscribe
                </Button>
              </ScaleOnHover>
            </BlurFade>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
