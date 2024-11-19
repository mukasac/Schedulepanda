"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calendar,
  Clock, 
  Globe,
  ArrowRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronRight,
  Hash,
  Image as ImageIcon,
  Video,
  FileText,
  BarChart2
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

const socialPlatforms = [
  { name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { name: "Twitter", icon: Twitter, color: "bg-sky-500" },
  { name: "Instagram", icon: Instagram, color: "bg-pink-600" },
  { name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" }
]

const features = [
  {
    title: "Visual Calendar",
    description: "Plan your content with an intuitive drag-and-drop calendar interface",
    icon: Calendar,
    color: "bg-blue-500",
    capabilities: [
      "Drag & Drop Scheduling",
      "Multi-Platform View",
      "Content Queue",
      "Time Slot Management"
    ]
  },
  {
    title: "Smart Scheduling",
    description: "AI-powered best time suggestions for maximum engagement",
    icon: Clock,
    color: "bg-purple-500",
    capabilities: [
      "Best Time Predictions",
      "Audience Timezone Detection",
      "Engagement Analytics",
      "Custom Schedule Templates"
    ]
  },
  {
    title: "Cross-Platform Publishing",
    description: "Publish to multiple platforms with platform-specific optimizations",
    icon: Globe,
    color: "bg-green-500",
    capabilities: [
      "Platform-Specific Formatting",
      "Auto-Hashtag Suggestions",
      "Media Optimization",
      "Preview Posts"
    ]
  }
]

const contentTypes = [
  {
    icon: ImageIcon,
    title: "Images & Graphics",
    description: "Support for multiple images, carousels, and stories"
  },
  {
    icon: Video,
    title: "Videos & Reels",
    description: "Share videos across platforms with optimal formatting"
  },
  {
    icon: FileText,
    title: "Text Posts",
    description: "Create engaging text content with formatting options"
  },
  {
    icon: Hash,
    title: "Hashtag Management",
    description: "Organize and track hashtag performance"
  },
  {
    icon: BarChart2,
    title: "Performance Tracking",
    description: "Monitor post engagement and reach"
  }
]

const metrics = [
  { label: "Posts Scheduled", value: "10K+", growth: "+25%" },
  { label: "Time Saved", value: "40hrs", growth: "+15%" },
  { label: "Engagement Rate", value: "5.2%", growth: "+8%" },
  { label: "Team Efficiency", value: "97%", growth: "+12%" }
]

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Schedule & Publish</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Schedule & Publish Content with Ease
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Plan, schedule, and automatically publish your content across all major social platforms from one central dashboard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/scheduler">
                  Start Scheduling Now
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
                      <span className="text-green-600 text-sm mb-1">{metric.growth}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Platform Integration */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Supported Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialPlatforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
                >
                  <div className={`p-4 rounded-full ${platform.color}`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-medium">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Powerful Scheduling Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
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

          {/* Content Types */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Support for All Content Types</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {contentTypes.map((type) => (
                <Card key={type.title} className="bg-white dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <type.icon className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
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
                    <h3 className="text-2xl font-bold mb-4">Ready to streamline your content workflow?</h3>
                    <p className="mb-6">Join thousands of marketers saving time with our scheduling tools.</p>
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