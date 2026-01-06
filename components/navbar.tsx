"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <nav className="flex items-center justify-between px-6 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full shadow-2xl shadow-black/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            {/* <CHANGE> Updated orange-accent to accent */}
            <div className="w-6 h-6 bg-accent rounded-full animate-pulse" />
            <span className="font-serif text-lg font-bold tracking-tight">
              Continuum
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-foreground text-white hover:bg-foreground/90 transition-all border-none font-medium"
        >
          Join Waitlist
        </Button>
      </nav>
    </motion.header>
  );
}
