"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";

/** Hero strip for /pricing — highlights Continuum Ops brief limits (aligned with GET /plans). */
export function OpsPricingHighlight() {
  return (
    <section className="relative overflow-hidden border-y border-cyan-500/20 bg-linear-to-br from-cyan-500/[0.12] via-background to-violet-500/[0.08] px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 211, 238, 0.15), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="relative shrink-0 rounded-2xl border border-cyan-500/30 bg-card/40 p-4 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20">
              <Image
                src="/Continuum_Ops_Logo.png"
                alt="Continuum Ops"
                width={160}
                height={56}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
                Continuum Ops · Command center
              </p>
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Unified Ops briefs on every plan
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                AI summaries and manual refreshes for your Jira & GitHub workspace — higher tiers unlock more
                daily AI generations and manual refreshes.
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-none sm:gap-4">
            <div className="rounded-2xl border border-cyan-500/35 bg-cyan-500/10 px-4 py-4 text-center shadow-inner shadow-cyan-950/20">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-cyan-300" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-wide text-cyan-100/80">
                AI briefs / day
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold tabular-nums text-cyan-50">0 → 8+</p>
              <p className="mt-1 text-[10px] text-muted-foreground">by tier</p>
            </div>
            <div className="rounded-2xl border border-violet-500/35 bg-violet-500/10 px-4 py-4 text-center shadow-inner shadow-violet-950/20">
              <RefreshCw className="mx-auto mb-2 h-6 w-6 text-violet-300" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-wide text-violet-100/80">
                Manual refresh / day
              </p>
              <p className="mt-1 font-serif text-2xl font-semibold tabular-nums text-violet-50">0 → 5+</p>
              <p className="mt-1 text-[10px] text-muted-foreground">by tier</p>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Exact numbers per plan are in the comparison table.{" "}
          <Link
            href="/ops"
            className="font-medium text-cyan-400 underline-offset-2 transition-colors hover:text-cyan-300 hover:underline"
          >
            Open Continuum Ops
          </Link>
        </p>
      </div>
    </section>
  );
}
