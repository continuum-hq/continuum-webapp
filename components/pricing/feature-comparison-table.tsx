"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { FEATURE_MATRIX, type FeatureValue } from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

function CellValue({ value }: { value: FeatureValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-accent" aria-label="Included" />
    ) : (
      <Minus className="w-5 h-5 text-muted-foreground/40" aria-label="Not included" />
    );
  }
  return (
    <span
      className={cn(
        "text-sm font-medium",
        value === "Roadmap" && "text-muted-foreground italic",
        value === "Unlimited" || value === "Custom" ? "text-accent" : ""
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
              <>
                <tr key={`section-${sectionIdx}`} className="border-b border-border/50">
                  <td
                    colSpan={5}
                    className="py-3 pt-6 font-medium text-foreground/90 uppercase tracking-wider text-xs"
                  >
                    {section.category}
                  </td>
                </tr>
                {section.items.map((item, itemIdx) => (
                  <tr
                    key={`${sectionIdx}-${itemIdx}`}
                    className="border-b border-border/30 hover:bg-card/30 transition-colors"
                  >
                    <td className="py-3 pr-6 text-sm text-muted-foreground">
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
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
