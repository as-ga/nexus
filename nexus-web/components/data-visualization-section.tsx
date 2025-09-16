"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const failureData = [
  { month: "Jan", predicted: 12, actual: 15 },
  { month: "Feb", predicted: 18, actual: 16 },
  { month: "Mar", predicted: 22, actual: 20 },
  { month: "Apr", predicted: 15, actual: 18 },
  { month: "May", predicted: 25, actual: 23 },
  { month: "Jun", predicted: 20, actual: 19 },
]

const supplierData = [
  { name: "Supplier A", mtbf: 2400, color: "#10b981" },
  { name: "Supplier B", mtbf: 2100, color: "#164e63" },
  { name: "Supplier C", mtbf: 1800, color: "#84cc16" },
  { name: "Supplier D", mtbf: 1500, color: "#f59e0b" },
]

const componentTypes = [
  { name: "Rail Clips", value: 45, color: "#10b981" },
  { name: "Fishplates", value: 25, color: "#164e63" },
  { name: "Rail Pads", value: 20, color: "#84cc16" },
  { name: "Bolts", value: 10, color: "#f59e0b" },
]

const metrics = [
  {
    title: "Components Tracked",
    value: "2.3M+",
    change: "+15%",
    trend: "up",
    icon: CheckCircle,
    color: "text-accent",
  },
  {
    title: "Failure Predictions",
    value: "98.5%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    title: "Quality Alerts",
    value: "23",
    change: "-12%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Avg Response Time",
    value: "4.2h",
    change: "-25%",
    trend: "down",
    icon: Clock,
    color: "text-secondary",
  },
]

export function DataVisualizationSection() {
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
            Analytics Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            <span className="text-primary">Data-Driven</span> Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Advanced analytics and predictive maintenance powered by AI and machine learning
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card
                key={index}
                className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Failure Prediction Chart */}
          <Card className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Predictive vs Actual Failures</CardTitle>
              <CardDescription>AI model accuracy in predicting component failures</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={failureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="actual" stroke="#164e63" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Supplier Performance */}
          <Card className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Supplier MTBF Performance</CardTitle>
              <CardDescription>Mean Time Between Failures by supplier (hours)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplierData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="mtbf" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Component Distribution */}
          <Card className={`${isVisible ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Component Type Distribution</CardTitle>
              <CardDescription>Breakdown of tracked components by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={componentTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {componentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Benefits Summary */}
          <Card className={`${isVisible ? "animate-slide-in-right animate-delay-200" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>System Benefits</CardTitle>
              <CardDescription>Quantified improvements from implementation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Safety Incidents Reduced</span>
                <span className="font-bold text-accent">-45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Maintenance Efficiency</span>
                <span className="font-bold text-primary">+60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Inventory Accuracy</span>
                <span className="font-bold text-secondary">+85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cost Savings (Annual)</span>
                <span className="font-bold text-accent">₹12.5 Cr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Quality Control</span>
                <span className="font-bold text-primary">+90%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <span className="font-bold text-secondary">-70%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
