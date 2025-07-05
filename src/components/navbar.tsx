"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, User, ShoppingBag, Heart, X } from "lucide-react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const userActions = [
    { icon: Heart, label: "Wishlist", href: "/wishlist", count: 3 },
    { icon: ShoppingBag, label: "Cart", href: "/cart", count: 2 },
    { icon: User, label: "Account", href: "/signin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-8 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium transition-colors hover:text-primary group"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {showSearch ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 h-full"
                      onClick={() => setShowSearch(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Actions */}
            {userActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="relative"
                >
                  <Link href={action.href}>
                    <action.icon className="h-4 w-4" />
                    {action.count && (
                      <motion.span
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        {action.count}
                      </motion.span>
                    )}
                  </Link>
                </Button>
              </motion.div>
            ))}

            <ThemeToggle />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    2
                  </span>
                </Link>
              </Button>
            </motion.div>

            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Search
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Navigation
                    </h3>
                    <nav className="flex flex-col space-y-1">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <SheetClose asChild>
                            <Link
                              href={link.href}
                              className="flex items-center text-base font-medium transition-colors hover:text-primary py-3 px-2 rounded-md hover:bg-muted"
                              onClick={() => setIsOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile User Actions */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Account
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {userActions.map((action, index) => (
                        <motion.div
                          key={action.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <SheetClose asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start relative"
                              asChild
                            >
                              <Link href={action.href}>
                                <action.icon className="h-4 w-4 mr-2" />
                                {action.label}
                                {action.count && (
                                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                                    {action.count}
                                  </span>
                                )}
                              </Link>
                            </Button>
                          </SheetClose>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Action Button */}
                  <div className="pt-4 border-t">
                    <SheetClose asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          size="lg"
                          asChild
                        >
                          <Link href="/products">Shop Collection</Link>
                        </Button>
                      </motion.div>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
