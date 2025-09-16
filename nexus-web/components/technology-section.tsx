"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Zap, Eye, Cpu } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const techSpecs = [
  {
    category: "Laser Technology",
    items: [
      "Fiber Laser (1064-1090nm wavelength)",
      "30-60W MOPA power output",
      "Deep engraving (0.02+ inch depth)",
      "Data Matrix symbology with ECC 200",
    ],
  },
  {
    category: "Vision System",
    items: [
      "Industrial smart camera",
      "Coaxial & dark-field lighting",
      "ISO/IEC 29158 quality grading",
      "99.9% mark readability verification",
    ],
  },
  {
    category: "Mobile Platform",
    items: [
      "Offline-first architecture",
      "Local Room database",
      "GPS coordinate tagging",
      "Conflict resolution algorithms",
    ],
  },
]

const processSteps = [
  {
    step: "01",
    title: "Component Loading",
    description: "2-position indexing table for continuous operation",
    icon: Cpu,
  },
  {
    step: "02",
    title: "Laser Marking",
    description: "Fiber laser engraves permanent Data Matrix code",
    icon: Zap,
  },
  {
    step: "03",
    title: "Vision Verification",
    description: "Smart camera validates mark quality and readability",
    icon: Eye,
  },
  {
    step: "04",
    title: "Data Transmission",
    description: "Component data uploaded to central traceability database",
    icon: CheckCircle,
  },
]

export function TechnologySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology Deep Dive
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            <span className="text-primary">Automated Marking</span> & Verification Station
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            State-of-the-art laser marking technology designed for the harsh railway environment
          </p>
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">AMV Station Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-2 animate-pulse-glow">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="absolute -top-2 -right-2">
                      {step.step}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground mx-auto mt-4 hidden lg:block" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techSpecs.map((spec, index) => (
            <Card
              key={index}
              className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{spec.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {spec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8 py-4">
            View Technical Documentation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
