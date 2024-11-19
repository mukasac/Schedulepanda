"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Activity,
  ArrowRight, 
  PieChart,
  LineChart,
  Share2,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

const analyticsFeatures = [
  {
    title: "Performance Metrics",
    description: "Track engagement, reach, and growth across all platforms",
    icon: Activity,
    color: "bg-blue-500",
    metrics: ["Engagement Rate", "Reach", "Impressions", "Growth Rate"]
  },
  {
    title: "Audience Insights",
    description: "Understand your followers with detailed demographics",
    icon: Users,
    color: "bg-green-500",
    metrics: ["Age Groups", "Locations", "Interests", "Active Times"]
  },
  {
    title: "Custom Reports",
    description: "Create and schedule automated reports for stakeholders",
    icon: BarChart,
    color: "bg-purple-500",
    metrics: ["PDF Export", "Scheduled Reports", "Custom Metrics", "White Labeling"]
  },
  {
    title: "Competitive Analysis",
    description: "Compare your performance against competitors",
    icon: TrendingUp,
    color: "bg-orange-500",
    metrics: ["Benchmark Data", "Industry Trends", "Share of Voice", "Content Analysis"]
  }
]

const reports = [
  {
    title: "Engagement Analysis",
    icon: PieChart,
    metrics: ["Likes", "Comments", "Shares", "Saves"]
  },
  {
    title: "Growth Tracking",
    icon: LineChart,
    metrics: ["Follower Growth", "Reach", "Impressions", "Profile Visits"]
  },
  {
    title: "Content Performance",
    icon: BarChart,
    metrics: ["Top Posts", "Best Times", "Format Analysis", "Hashtag Impact"]
  },
  {
    title: "Social ROI",
    icon: Share2,
    metrics: ["Conversion Rate", "Click-through Rate", "Cost per Engagement", "Revenue Attribution"]
  }
]

const metrics = [
  { label: "Total Reach", value: "2.4M", growth: "+12.5%" },
  { label: "Engagement Rate", value: "4.8%", growth: "+2.1%" },
  { label: "Post Performance", value: "89%", growth: "+5.7%" },
  { label: "Audience Growth", value: "12.5K", growth: "+18.2%" }
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Analytics & Reporting</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Data-Driven Social Media Insights
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get comprehensive analytics and reports to optimize your social media strategy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/scheduler">
                  Start Free Trial
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

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Analytics Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {analyticsFeatures.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.metrics.map((metric) => (
                      <li key={metric} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reports Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Comprehensive Reports</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {reports.map((report) => (
                <Card key={report.title} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <report.icon className="w-8 h-8 text-blue-600" />
                      <CardTitle>{report.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-4">
                      {report.metrics.map((metric) => (
                        <li key={metric} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          {metric}
                        </li>
                      ))}
                    </ul>
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
                    <h3 className="text-2xl font-bold mb-4">Ready to unlock powerful insights?</h3>
                    <p className="mb-6">Start optimizing your social media strategy with data-driven decisions.</p>
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