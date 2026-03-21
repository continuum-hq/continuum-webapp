"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Main marketing site (not ops subdomain). Set in Vercel: NEXT_PUBLIC_SITE_URL */
const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://continuumworks.app";

export function OpsAppShell({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const [opsHomeHref, setOpsHomeHref] = useState("/ops");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname.startsWith("ops.")) {
      setOpsHomeHref("/");
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" && typeof window !== "undefined") {
      const callback = window.location.href.split("#")[0];
      router.push(`/login?callbackUrl=${encodeURIComponent(callback)}`);
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href={opsHomeHref} className="flex min-w-0 items-center gap-3">
            <Image
              src="/Continuum_Ops_Logo.png"
              alt="Continuum Ops"
              width={120}
              height={40}
              className="h-9 w-auto object-contain object-left sm:h-10"
              priority
            />
            <span className="hidden text-xs font-medium uppercase tracking-wide text-muted-foreground sm:inline">
              Command center
            </span>
          </Link>

          <Button variant="outline" size="sm" className="shrink-0 gap-2 rounded-full" asChild>
            <a href={MAIN_SITE_URL}>
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
          </Button>
        </div>
      </header>

      <main className="relative">{children}</main>
    </div>
  );
}
