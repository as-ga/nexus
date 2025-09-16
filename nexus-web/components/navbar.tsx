"use client";

import { Button } from "@/components/ui/button";
import { QrCode, Cpu, Menu, X, SlidersVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">NEXUS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/scan"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Scan
            </Link>
            <Link
              href="/code-gen"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              Code-Gen
            </Link>
            <Link
              href="/assign"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <SlidersVerticalIcon className="w-4 h-4" />
              Assign
            </Link>
            <Link
              href="https://docs.google.com/document/d/1DIxt2ky7pPeWd0pqnW-cxRB1MhpxeonpA72K1vYXMYs"
              target="_blank"
              className="cursor-pointer"
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-background hover:bg-accent cursor-pointer"
              >
                Documentation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-accent"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                href="/scan"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <QrCode className="w-4 h-4" />
                Scan
              </Link>
              <Link
                href="/code-gen"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Cpu className="w-4 h-4" />
                Code-Gen
              </Link>
              <Link
                href="/assign"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-2 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <SlidersVerticalIcon className="w-4 h-4" />
                Assign
              </Link>
              <Link
                href="https://docs.google.com/document/d/1DIxt2ky7pPeWd0pqnW-cxRB1MhpxeonpA72K1vYXMYs"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit bg-background hover:bg-accent"
                >
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
