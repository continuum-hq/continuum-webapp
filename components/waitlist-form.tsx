"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowRight } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("You're on the list!")
    setEmail("")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        {/* <CHANGE> Updated orange-accent to accent */}
        <Input
          type="email"
          placeholder="Enter your work email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full h-12 bg-card border-border px-6 focus:ring-accent/50 focus:border-accent transition-all"
        />
      </div>
      {/* <CHANGE> Updated orange-accent to accent */}
      <Button
        type="submit"
        disabled={loading}
        className="rounded-full h-12 px-8 bg-accent hover:bg-accent/90 text-white font-medium group transition-all"
      >
        {loading ? "Joining..." : "Get Early Access"}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  )
}
