"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight,
  Users,
  Target,
  Rocket,
  Trophy,
  Globe,
  Heart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

const stats = [
  { label: "Active Users", value: "50K+", description: "Trusted by marketers worldwide" },
  { label: "Posts Scheduled", value: "1M+", description: "Every month through our platform" },
  { label: "Team Members", value: "50+", description: "Working across 12 countries" },
  { label: "Client Satisfaction", value: "98%", description: "Based on user feedback" }
]

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize our customers' success in everything we do"
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Constantly pushing boundaries in social media management"
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Deeply passionate about helping businesses grow"
  },
  {
    icon: Globe,
    title: "Global Mindset",
    description: "Building tools for a diverse, global audience"
  }
]

const timeline = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to simplify social media management"
  },
  {
    year: "2021",
    title: "Series A Funding",
    description: "Raised $10M to accelerate product development"
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Opened offices in Europe and Asia"
  },
  {
    year: "2023",
    title: "Major Milestones",
    description: "Reached 50K active users and launched enterprise features"
  }
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Former Product Lead at Twitter with 15+ years in social media"
  },
  {
    name: "David Chen",
    role: "CTO & Co-founder",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Previously led engineering teams at Meta and LinkedIn"
  },
  {
    name: "Maria Garcia",
    role: "Head of Product",
    image: "/placeholder.svg?height=400&width=400",
    bio: "10+ years experience in product management and UX design"
  },
  {
    name: "James Wilson",
    role: "Head of Customer Success",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Passionate about helping businesses succeed on social media"
  }
]

export default function Page() {

  return (
    <Suspense>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* <Navigation /> */}
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Our Story</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Building the Future of Social Media Management
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We're on a mission to help businesses succeed in the digital age by simplifying social media management.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="font-medium mb-1">{stat.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-8"
                >
                  <div className="w-24 text-2xl font-bold text-blue-600">{event.year}</div>
                  <Card className="flex-1">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="rounded-lg mb-4"
                      />
                      <h3 className="font-bold mb-1">{member.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Us on Our Journey</h3>
                <p className="mb-6">Be part of the future of social media management.</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/careers">View Careers</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </Suspense>
  )
}