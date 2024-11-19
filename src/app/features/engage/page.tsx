"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Bell, 
  ArrowRight, 
  Inbox,
  Clock,
  ChevronRight,
  Star,
  MessageSquare,
  Share2,
  Filter,
  TagIcon,
  Zap,
  Bot,
  Gauge,
  HeartHandshake
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

const engagementFeatures = [
  {
    title: "Unified Inbox",
    description: "Manage all your social interactions in one place",
    icon: Inbox,
    color: "bg-blue-500",
    capabilities: [
      "All platforms in one view",
      "Smart filtering options",
      "Priority inbox",
      "Team assignments"
    ]
  },
  {
    title: "Smart Notifications",
    description: "Never miss important mentions or messages",
    icon: Bell,
    color: "bg-purple-500",
    capabilities: [
      "Real-time alerts",
      "Custom notification rules",
      "Mobile push notifications",
      "Important mention detection"
    ]
  },
  {
    title: "Team Collaboration",
    description: "Assign and track customer conversations",
    icon: Users,
    color: "bg-green-500",
    capabilities: [
      "Task assignment",
      "Team chat",
      "Performance tracking",
      "Workload management"
    ]
  },
  {
    title: "Quick Responses",
    description: "Use templates and AI suggestions for faster replies",
    icon: MessageCircle,
    color: "bg-orange-500",
    capabilities: [
      "Response templates",
      "AI-powered suggestions",
      "Saved replies",
      "Custom macros"
    ]
  }
]

const tools = [
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Get smart reply suggestions and sentiment analysis"
  },
  {
    icon: TagIcon,
    title: "Auto-Tagging",
    description: "Automatically categorize conversations and mentions"
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description: "Perform common actions with keyboard shortcuts"
  },
  {
    icon: Filter,
    title: "Smart Filters",
    description: "Filter conversations by platform, type, or priority"
  },
  {
    icon: Gauge,
    title: "Response Time",
    description: "Track and improve team response times"
  },
  {
    icon: HeartHandshake,
    title: "Customer Insights",
    description: "View customer history and engagement patterns"
  }
]

const metrics = [
  { label: "Average Response Time", value: "< 5min", growth: "-35%" },
  { label: "Customer Satisfaction", value: "98%", growth: "+12%" },
  { label: "Messages Handled", value: "10K+", growth: "+28%" },
  { label: "Team Efficiency", value: "95%", growth: "+15%" }
]

const testimonials = [
  {
    quote: "Soso has transformed our customer engagement. We've cut response times by 60%!",
    author: "Sarah Chen",
    role: "Customer Success Manager",
    company: "TechCorp"
  },
  {
    quote: "The unified inbox is a game-changer. We never miss important messages now.",
    author: "Michael Brown",
    role: "Social Media Manager",
    company: "GrowthLab"
  },
  {
    quote: "AI suggestions help us maintain a consistent brand voice across all channels.",
    author: "Jessica Lee",
    role: "Community Manager",
    company: "SocialBuzz"
  }
]

export default function EngagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Engage & Respond</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Engage With Your Audience in Real-Time
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Monitor and respond to all your social media interactions from a single, unified inbox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/scheduler">
                  Try It Free
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
                        metric.label === "Average Response Time" 
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

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Engagement Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {engagementFeatures.map((feature) => (
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

          {/* Tools Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Engagement Tools</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool) => (
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

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex flex-col gap-4">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <p className="text-lg mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Ready to improve your engagement?</h3>
                    <p className="mb-6">Start engaging with your audience more effectively today.</p>
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