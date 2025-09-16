"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, MapPin, Target } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const phases = [
  {
    phase: "Phase 1",
    title: "Pilot Program",
    duration: "Year 1",
    description: "Limited scope validation with one Zonal Railway division",
    progress: 100,
    status: "Planning",
    icon: Target,
    details: [
      "Single Zonal Railway selection",
      "2-3 strategic manufacturers",
      "Elastic rail clips & fishplates focus",
      "KPI-driven success metrics",
    ],
  },
  {
    phase: "Phase 2",
    title: "Zonal Rollout",
    duration: "Years 2-3",
    description: "Full zonal deployment with system refinement",
    progress: 0,
    status: "Future",
    icon: MapPin,
    details: [
      "All divisions within pilot zone",
      "Expanded component types",
      "More manufacturing partners",
      "Workflow optimization",
    ],
  },
  {
    phase: "Phase 3",
    title: "Pan-India Deployment",
    duration: "Years 4-5",
    description: "Network-wide implementation with central monitoring",
    progress: 0,
    status: "Future",
    icon: Users,
    details: ["Zone-by-zone rollout", "Central command center", "IREPS procurement mandate", "Universal adoption"],
  },
]

const kpis = [
  { metric: "Mark Readability (Manufacturing)", target: ">99.9%", current: "TBD" },
  { metric: "Mark Readability (6 months field)", target: ">95%", current: "TBD" },
  { metric: "AMV Station Uptime", target: ">99.5%", current: "TBD" },
  { metric: "Mobile App Sync Success", target: ">98%", current: "TBD" },
  { metric: "Data Entry Error Reduction", target: "90%", current: "TBD" },
  { metric: "Material Receipt Time Reduction", target: "50%", current: "TBD" },
]

export function ImplementationSection() {
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
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Implementation Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            <span className="text-primary">Phased Rollout</span> Strategy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Strategic implementation from pilot program to pan-India deployment
          </p>
        </div>

        {/* Implementation Phases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={phase.status === "Planning" ? "default" : "secondary"}>{phase.status}</Badge>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{phase.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {phase.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>

                  <ul className="space-y-2">
                    {phase.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Success Metrics */}
        <div className={`${isVisible ? "animate-fade-in-up animate-delay-600" : "opacity-0"}`}>
          <h3 className="text-2xl font-bold text-center mb-8">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">{kpi.target}</div>
                  <div className="text-sm font-medium mb-1">{kpi.metric}</div>
                  <div className="text-xs text-muted-foreground">Current: {kpi.current}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
