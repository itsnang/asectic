import { HoodieCard } from "@/components/hoodie-card";
import { AutoSliderBanner } from "@/components/auto-slider-banner";
import { Button } from "@/components/ui/button";
import {
  Star,
  Truck,
  Shield,
  Recycle,
  ArrowRight,
  Award,
  Users,
  Zap,
} from "lucide-react";
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
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Eco-friendly production process",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "99%", label: "Satisfaction Rate" },
    { icon: Zap, value: "24/7", label: "Customer Support" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Fashion Enthusiast",
      comment:
        "The quality is incredible. Best hoodie I've ever owned! The material feels premium and the fit is perfect.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      location: "New York, NY",
    },
    {
      name: "Sarah Chen",
      role: "Style Blogger",
      comment:
        "Perfect fit and amazing comfort. The attention to detail is remarkable. Highly recommend to anyone!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=2",
      location: "Los Angeles, CA",
    },
    {
      name: "Mike Rodriguez",
      role: "Creative Director",
      comment:
        "Great style and the material feels premium. The design is timeless and the quality exceeds expectations.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=3",
      location: "Chicago, IL",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Full-screen Auto-sliding Banner */}
      <AutoSliderBanner />

      {/* Stats Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/5 via-background to-brand/5">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="text-center group">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-brand/10 rounded-full flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-brand/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <AnimatedText
              scale
              duration={0.8}
              className="text-4xl font-bold mb-4"
            >
              Why Choose SDFM?
            </AnimatedText>
            <BlurFade delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're committed to delivering exceptional quality and service
                that exceeds your expectations.
              </p>
            </BlurFade>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="text-center group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  <div
                    className={`mx-auto w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Product Section */}
      <section
        id="product-section"
        className="w-full py-24 bg-gradient-to-b from-muted/20 to-background"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20">
            <AnimatedText
              scale
              duration={0.8}
              className="text-5xl font-bold mb-6 text-gradient-brand"
            >
              Latest Collection
            </AnimatedText>
            <BlurFade delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our premium streetwear collection, crafted with
                attention to detail and designed for the modern lifestyle. Each
                piece tells a story of quality and style.
              </p>
            </BlurFade>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {hoodies.map((hoodie, index) => (
              <StaggerItem key={hoodie.id} index={index}>
                <HoodieCard {...hoodie} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <ScaleOnHover>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-6 text-lg"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </ScaleOnHover>
          </FadeIn>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="w-full py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-20">
            <AnimatedText
              scale
              duration={0.8}
              className="text-5xl font-bold mb-6"
            >
              What Our Customers Say
            </AnimatedText>
            <BlurFade delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust SDFM for their
                streetwear needs
              </p>
            </BlurFade>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    &ldquo;{testimonial.comment}&rdquo;
                  </blockquote>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="w-full py-24 bg-gradient-to-br from-primary/10 via-brand/5 to-primary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <AnimatedText
              scale
              duration={0.8}
              className="text-5xl font-bold mb-6 text-gradient-brand"
            >
              Stay in the Loop
            </AnimatedText>
            <BlurFade delay={0.2}>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Subscribe to our newsletter and be the first to know about new
                collections, exclusive offers, style tips, and behind-the-scenes
                content.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-border/50">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-muted-foreground"
                />
                <ScaleOnHover>
                  <Button
                    size="lg"
                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg font-semibold rounded-xl"
                  >
                    Subscribe
                  </Button>
                </ScaleOnHover>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Join 10,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </BlurFade>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
