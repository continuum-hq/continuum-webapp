"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { FEATURE_MATRIX, type FeatureValue } from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: FeatureValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-white/60" aria-label="Included" />
    ) : (
      <Minus className="w-5 h-5 text-muted-foreground/40" aria-label="Not included" />
    );
  }
  return (
    <span
      className={cn(
        "text-sm font-medium",
        value === "Roadmap" && "text-muted-foreground italic",
        value === "Unlimited" || value === "Custom" ? "text-white" : ""
      )}
    >
      {value}
    </span>
  );
}

export function FeatureComparisonTable() {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="min-w-[800px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 pr-6 font-medium text-muted-foreground text-sm">
                Feature
              </th>
              <th className="text-center py-4 px-4 font-serif font-medium min-w-[100px]">
                Free
              </th>
              <th className="text-center py-4 px-4 font-serif font-medium min-w-[100px]">
                Starter
              </th>
              <th className="text-center py-4 px-4 font-serif font-medium min-w-[100px] bg-accent/5">
                Pro
              </th>
              <th className="text-center py-4 px-4 font-serif font-medium min-w-[100px]">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_MATRIX.map((section, sectionIdx) => (
              <Fragment key={`section-${section.category}-${sectionIdx}`}>
                <tr
                  className={cn(
                    "border-b border-border/50",
                    section.highlight && "bg-cyan-500/[0.04]"
                  )}
                >
                  <td colSpan={5} className="py-3 pt-6">
                    {section.highlight ? (
                      <div className="flex flex-col gap-3 rounded-xl border border-cyan-500/25 bg-linear-to-r from-cyan-500/10 via-background to-violet-500/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-card/50 p-2">
                          <Image
                            src="/Continuum_Ops_Logo.png"
                            alt=""
                            width={120}
                            height={40}
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground/95 uppercase tracking-wider text-xs">
                            {section.category}
                          </p>
                          {section.categorySubtitle ? (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {section.categorySubtitle}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <span className="font-medium text-foreground/90 uppercase tracking-wider text-xs">
                        {section.category}
                      </span>
                    )}
                  </td>
                </tr>
                {section.items.map((item, itemIdx) => (
                  <tr
                    key={`${sectionIdx}-${itemIdx}-${item.name}`}
                    className={cn(
                      "border-b border-border/30 transition-colors hover:bg-card/30",
                      section.highlight && "bg-cyan-500/[0.02] hover:bg-cyan-500/[0.06]"
                    )}
                  >
                    <td
                      className={cn(
                        "py-3 pr-6 text-sm text-muted-foreground",
                        section.highlight && "font-medium text-cyan-100/90"
                      )}
                    >
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={item.free} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={item.starter} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-accent/5">
                      <div className="flex justify-center">
                        <CellValue value={item.pro} />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={item.enterprise} />
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
