import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Mail, FileText, Award } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Project Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NEXUS</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm leading-relaxed">
              AI-powered laser QR code marking system for Indian Railways track fitting identification and predictive
              maintenance.
            </p>
            <Badge variant="secondary" className="mb-2">
              <Award className="w-3 h-3 mr-1" />
              Smart India Hackathon 2025
            </Badge>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="font-semibold mb-4">Technology Stack</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>• Fiber Laser Deep Engraving</li>
              <li>• Data Matrix QR Codes</li>
              <li>• AI/ML Predictive Analytics</li>
              <li>• Mobile-First Architecture</li>
              <li>• Enterprise Integration</li>
            </ul>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-semibold mb-4">Key Features</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>• Permanent Component Marking</li>
              <li>• Offline Mobile Scanning</li>
              <li>• Real-time Quality Control</li>
              <li>• Predictive Maintenance</li>
              <li>• Supply Chain Optimization</li>
            </ul>
          </div>

          {/* Contact & Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-3">
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Research Paper
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contact Team
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2025 NEXUS - Railway QR System. Developed for Smart India Hackathon 2025 - Ministry of Railways
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            Problem Statement ID: 25021 | Category: Hardware | Theme: Transportation & Logistics
          </p>
        </div>
      </div>
    </footer>
  )
}
