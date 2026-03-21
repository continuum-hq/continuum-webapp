"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Check, Minus } from "lucide-react";
import { FEATURE_MATRIX, type FeatureItem, type FeatureValue } from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

function opsTaglineFromName(name: string): string {
  const parts = name.split(/\s—\s/);
  return parts.length > 1 ? parts.slice(1).join(" — ") : name;
}

function FeatureNameCell({ item }: { item: FeatureItem }) {
  if (item.nameVariant === "ops-logo") {
    const tagline = opsTaglineFromName(item.name);
    return (
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 min-w-0" aria-label={item.name}>
        <Image
          src="/Continuum_Ops_Logo.png"
          alt=""
          width={1080}
          height={1080}
          className="h-[18px] sm:h-5 w-auto max-w-[min(7.5rem,28vw)] object-contain object-left shrink-0 opacity-[0.92]"
        />
        <span className="text-s font-medium text-muted-foreground leading-snug max-w-[16rem]">
          {tagline}
        </span>
      </div>
    );
  }
  return <>{item.name}</>;
}

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
                <tr className="border-b border-border/50">
                  <td
                    colSpan={5}
                    className="py-3 pt-6 font-medium text-foreground/90 uppercase tracking-wider text-xs"
                  >
                    {section.category}
                  </td>
                </tr>
                {section.items.map((item, itemIdx) => {
                  const isOpsRow = item.rowAccent === "ops";
                  const isOpsCoreRow = item.nameVariant === "ops-logo";
                  return (
                    <tr
                      key={`${sectionIdx}-${itemIdx}-${item.name}`}
                      className={cn(
                        "border-b border-border/30 transition-colors",
                        isOpsRow
                          ? "bg-cyan-500/6 hover:bg-cyan-500/10"
                          : isOpsCoreRow
                            ? "bg-accent/5 hover:bg-accent/8"
                            : "hover:bg-card/30"
                      )}
                    >
                      <td
                        className={cn(
                          "py-3 pr-6 text-sm text-muted-foreground",
                          isOpsRow &&
                          "border-l-2 border-l-cyan-500/50 bg-cyan-500/5 pl-3 text-cyan-50/95",
                          isOpsCoreRow &&
                          "border-l-2 border-l-accent/40 bg-accent/5 pl-3 text-foreground/90"
                        )}
                      >
                        <FeatureNameCell item={item} />
                      </td>
                      <td
                        className={cn(
                          "py-3 px-4 text-center",
                          isOpsRow && "bg-cyan-500/5",
                          isOpsCoreRow && "bg-accent/5"
                        )}
                      >
                        <div className="flex justify-center">
                          <CellValue value={item.free} />
                        </div>
                      </td>
                      <td
                        className={cn(
                          "py-3 px-4 text-center",
                          isOpsRow && "bg-cyan-500/5",
                          isOpsCoreRow && "bg-accent/5"
                        )}
                      >
                        <div className="flex justify-center">
                          <CellValue value={item.starter} />
                        </div>
                      </td>
                      <td
                        className={cn(
                          "py-3 px-4 text-center",
                          isOpsRow
                            ? "bg-cyan-500/10"
                            : isOpsCoreRow
                              ? "bg-accent/10"
                              : "bg-accent/5"
                        )}
                      >
                        <div className="flex justify-center">
                          <CellValue value={item.pro} />
                        </div>
                      </td>
                      <td
                        className={cn(
                          "py-3 px-4 text-center",
                          isOpsRow && "bg-cyan-500/5",
                          isOpsCoreRow && "bg-accent/5"
                        )}
                      >
                        <div className="flex justify-center">
                          <CellValue value={item.enterprise} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
