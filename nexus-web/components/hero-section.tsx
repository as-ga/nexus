"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Target } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className={`mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium animate-pulse-glow">
              <Zap className="w-4 h-4 mr-2" />
              Smart India Hackathon 2025
            </Badge>
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            <span className="text-primary">NEXUS</span>
          </h1>

          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-balance ${isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"}`}
          >
            <span className="text-foreground">AI-Powered Laser QR</span>{" "}
            <span className="text-accent">Marking System</span>
          </h2>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animate-delay-400" : "opacity-0"}`}
          >
            Revolutionizing Indian Railways track fitting identification with permanent laser marking, mobile scanning,
            and predictive maintenance analytics
          </p>

          {/* Key benefits */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-10 ${isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Enhanced Safety</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Quality Control</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Predictive Maintenance</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"}`}
          >
            <Button size="lg" className="px-8 py-4 text-lg font-semibold animate-pulse-glow">
              Explore Technology
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-background hover:bg-accent"
            >
              View Research Paper
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"}`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10 Crore</div>
              <div className="text-muted-foreground">Elastic Rail Clips Annually</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5 Crore</div>
              <div className="text-muted-foreground">Liners Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">8.5 Crore</div>
              <div className="text-muted-foreground">Rail Pads Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
