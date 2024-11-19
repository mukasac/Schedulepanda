"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  CheckCircle, 
  MessageSquare, 
  ArrowRight, 
  Clock,
  Shield,
  Workflow,
  History,
  FileCheck,
  UserCircle,
  Calendar,
  Settings,
  Flag,
  BarChart2,
  Lock,
  BrainCircuit,
  GitBranch,
  RefreshCw,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

const workflowFeatures = [
  {
    title: "Approval Workflows",
    description: "Create custom approval paths for content review",
    icon: Workflow,
    color: "bg-blue-500",
    capabilities: [
      "Multi-level approvals",
      "Custom workflow rules",
      "Role-based routing",
      "Automated notifications"
    ]
  },
  {
    title: "Role-Based Access",
    description: "Define team permissions and content access levels",
    icon: Shield,
    color: "bg-green-500",
    capabilities: [
      "Custom role creation",
      "Granular permissions",
      "Activity monitoring",
      "Security compliance"
    ]
  },
  {
    title: "Team Chat",
    description: "Collaborate in real-time with team messaging",
    icon: MessageSquare,
    color: "bg-purple-500",
    capabilities: [
      "Real-time messaging",
      "Thread discussions",
      "File sharing",
      "@mentions support"
    ]
  },
  {
    title: "Version History",
    description: "Track changes and maintain content versions",
    icon: History,
    color: "bg-orange-500",
    capabilities: [
      "Change tracking",
      "Version comparison",
      "Restore previous versions",
      "Audit trail"
    ]
  }
]

const collaborationTools = [
  {
    icon: FileCheck,
    title: "Content Review",
    description: "Streamlined review and approval process"
  },
  {
    icon: UserCircle,
    title: "Team Management",
    description: "Organize teams and roles effectively"
  },
  {
    icon: Calendar,
    title: "Editorial Calendar",
    description: "Plan and coordinate content schedules"
  },
  {
    icon: Settings,
    title: "Workflow Builder",
    description: "Create custom approval workflows"
  },
  {
    icon: Flag,
    title: "Task Management",
    description: "Track and manage team tasks"
  },
  {
    icon: BarChart2,
    title: "Team Analytics",
    description: "Monitor team performance metrics"
  }
]

const metrics = [
  { label: "Approval Time", value: "2hrs", growth: "-45%" },
  { label: "Team Productivity", value: "92%", growth: "+18%" },
  { label: "Content Quality", value: "96%", growth: "+15%" },
  { label: "Active Users", value: "250+", growth: "+25%" }
]

const workflowSteps = [
  {
    icon: BrainCircuit,
    title: "Content Creation",
    description: "Teams create and draft content",
    step: 1
  },
  {
    icon: GitBranch,
    title: "Review Process",
    description: "Content goes through review workflow",
    step: 2
  },
  {
    icon: CheckCircle,
    title: "Approval",
    description: "Stakeholders approve content",
    step: 3
  },
  {
    icon: RefreshCw,
    title: "Publication",
    description: "Approved content is scheduled",
    step: 4
  }
]

export default function CollaboratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Collaborate & Approve</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Streamline Team Collaboration
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Efficiently manage content approval workflows and team collaboration with powerful tools designed for social media teams.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/scheduler">
                  Start Collaborating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Metrics Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
                    <div className="flex items-end gap-2 mt-2">
                      <h3 className="text-3xl font-bold">{metric.value}</h3>
                      <span className={`text-sm mb-1 ${
                        metric.label === "Approval Time" 
                          ? "text-green-600" 
                          : "text-green-600"
                      }`}>
                        {metric.growth}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Workflow Steps */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {workflowSteps.map((step, index) => (
                <Card key={step.title} className="bg-white dark:bg-gray-800 relative">
                  <div className="absolute -top-4 left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-blue-600 transform translate-x-full hidden md:block" />
                  )}
                  <CardHeader>
                    <step.icon className="w-8 h-8 text-blue-600 mb-2" />
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Collaboration Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowFeatures.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability) => (
                      <li key={capability} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Collaboration Tools */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Essential Tools</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {collaborationTools.map((tool) => (
                <Card key={tool.title} className="bg-white dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <tool.icon className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to transform your team's workflow?</h3>
                    <p className="mb-6">Join teams that are saving hours on content collaboration.</p>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/scheduler">Start Free Trial</Link>
                    </Button>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="aspect-video rounded-lg bg-black/20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}