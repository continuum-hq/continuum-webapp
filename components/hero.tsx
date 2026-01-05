"use client"
import { WaitlistForm } from "./waitlist-form"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Badge
          variant="outline"
          className="px-4 py-1.5 border-accent/20 text-accent bg-accent/5 rounded-full font-medium text-sm"
        >
          Now in Private Beta
        </Badge>

        <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-serif font-medium">
          Unify your work <br />
          <span className="text-muted-foreground/40 italic">in one flow</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
          Stop context switching between Jira, GitHub, and Calendar. Continuum orchestrates your tools through natural
          language in Slack.
        </p>

        <div className="max-w-md mx-auto pt-4">
          <WaitlistForm />
        </div>

        <div className="pt-12 relative">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-xl border border-border bg-background/50 overflow-hidden aspect-video flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center border border-border shadow-xl mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-accent border-b-[8px] border-b-transparent ml-1" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Watch the Demo</p>
              </div>
            </div>
          </div>

          {/* Decorative lines like in Brillance */}
          <div className="absolute -bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  )
}
