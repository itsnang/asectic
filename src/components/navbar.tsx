"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="text-base font-medium transition-colors hover:text-primary py-2 px-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Action Button */}
                  <div className="pt-4 border-t">
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href="/shop">Shop Now</Link>
                      </Button>
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
