"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock,
  Globe,
  Send,
  ChevronRight,
  Building2,
  Users,
  HelpCircle,
  Briefcase,
  MessageCircle,
  BugPlay
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team typically responds within 2 hours",
    value: "support@soso.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 5pm",
    value: "+1 (555) 123-4567"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available 24/7 for urgent support",
    value: "Start Chat"
  }
]

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, CA 94105",
    country: "United States",
    timezone: "PST (UTC-8)"
  },
  {
    city: "London",
    address: "456 Oxford Street, W1C 1AP",
    country: "United Kingdom",
    timezone: "GMT (UTC+0)"
  },
  {
    city: "Singapore",
    address: "789 Marina Bay, 018956",
    country: "Singapore",
    timezone: "SGT (UTC+8)"
  }
]

const categories = [
  {
    icon: Building2,
    label: "Enterprise Solutions"
  },
  {
    icon: Users,
    label: "Sales Inquiry"
  },
  {
    icon: HelpCircle,
    label: "Technical Support"
  },
  {
    icon: Briefcase,
    label: "Partnerships"
  },
  {
    icon: MessageCircle,
    label: "General Question"
  },
  {
    icon: BugPlay,
    label: "Report an Issue"
  }
]

export default function ContactPage() {
  return (
    <Suspense>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Contact Us</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{method.description}</p>
                    <p className="font-medium text-blue-600 dark:text-blue-400">{method.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.label} value={category.label.toLowerCase()}>
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="How can we help you?" 
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full md:w-auto">
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office) => (
                  <Card key={office.city}>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{office.city}</h3>
                      <div className="space-y-2 text-gray-600 dark:text-gray-300">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 mt-1" />
                          <div>
                            <p>{office.address}</p>
                            <p>{office.country}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <p>{office.timezone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FAQ CTA */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Need Quick Answers?</h3>
                    <p className="mb-6">Check out our comprehensive FAQ section for instant help with common questions.</p>
                    <Button variant="secondary" asChild>
                      <Link href="/faq">
                        Visit FAQ
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 p-8 rounded-full">
                      <HelpCircle className="w-24 h-24 text-white/90" />
                    </div>
                  </div>
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