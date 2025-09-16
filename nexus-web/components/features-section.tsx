"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eraser as Laser, Smartphone, Database, BarChart3, Shield, Cog } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Laser,
    title: "Fiber Laser Deep Engraving",
    description:
      "Permanent Data Matrix codes using 30-60W MOPA fiber lasers with 0.02+ inch depth for maximum durability",
    badge: "Hardware",
    color: "text-primary",
  },
  {
    icon: Smartphone,
    title: "Offline-First Mobile App",
    description:
      "Field-ready application with local database sync, GPS tagging, and conflict resolution for P-Way staff",
    badge: "Software",
    color: "text-accent",
  },
  {
    icon: Database,
    title: "Enterprise Integration",
    description: "Seamless integration with IREPS, UDM, and TMS systems for end-to-end traceability",
    badge: "Integration",
    color: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "AI-powered failure prediction using Graph Neural Networks and component lifecycle data",
    badge: "AI/ML",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Quality Control",
    description: "Automated anomaly detection for proactive batch recalls and supplier performance tracking",
    badge: "Safety",
    color: "text-accent",
  },
  {
    icon: Cog,
    title: "Automated Marking Station",
    description: "High-throughput AMV stations with vision verification and 99.9% mark readability",
    badge: "Automation",
    color: "text-secondary",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 200)
            })
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
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Core Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Comprehensive Track Fitting <span className="text-primary">Identification System</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From laser marking to predictive maintenance, our solution covers every aspect of railway component
            lifecycle management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleCards.includes(index)

            return (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-card ${feature.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
