"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import {
  ScrollText,
  Shield,
  AlertCircle,
  FileWarning,
  Ban,
  Scale,
  CreditCard,
  Lock,
  Mail,
  FileTerminal,
  Users,
  Clock,
  Handshake
} from "lucide-react"
import { Suspense } from "react"

const sections = [
  {
    icon: FileTerminal,
    title: "Terms of Use",
    content: [
      {
        subtitle: "Acceptance of Terms",
        text: "By accessing and using Soso's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services."
      },
      {
        subtitle: "Changes to Terms",
        text: "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform."
      }
    ]
  },
  {
    icon: Users,
    title: "User Responsibilities",
    content: [
      {
        subtitle: "Account Requirements",
        text: "Users must be at least 18 years old and provide accurate, complete information when creating an account."
      },
      {
        subtitle: "Account Security",
        text: "Users are responsible for maintaining the security of their account credentials and for all activities that occur under their account."
      }
    ]
  },
  {
    icon: Ban,
    title: "Prohibited Activities",
    content: [
      {
        subtitle: "Content Restrictions",
        text: "Users may not post, upload, or share content that is illegal, harmful, threatening, abusive, or otherwise objectionable."
      },
      {
        subtitle: "Service Interference",
        text: "Users may not attempt to interfere with, compromise, or disrupt our services or servers."
      }
    ]
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content: [
      {
        subtitle: "Billing",
        text: "Users agree to pay all fees according to the pricing plan they select. Fees are non-refundable except as required by law."
      },
      {
        subtitle: "Subscription Terms",
        text: "Subscriptions automatically renew unless cancelled. Users can cancel their subscription at any time through their account settings."
      }
    ]
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Ownership",
        text: "All content and materials available through our services are the property of Soso or its licensors and are protected by intellectual property laws."
      },
      {
        subtitle: "License",
        text: "Users retain ownership of their content but grant Soso a worldwide license to use, store, and distribute their content in connection with our services."
      }
    ]
  },
  {
    icon: Shield,
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "Service Availability",
        text: "We strive for high availability but do not guarantee uninterrupted access to our services. We are not liable for any downtime or service interruptions."
      },
      {
        subtitle: "Damages",
        text: "In no event shall Soso be liable for any indirect, incidental, special, consequential, or punitive damages."
      }
    ]
  }
]

const lastUpdated = "March 15, 2024"

export default function TermsPage() {
  return (

    <Suspense>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Terms of Service</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Please read these terms carefully before using our services.
            </motion.p>
            <motion.p
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Last updated: {lastUpdated}
            </motion.p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-20">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    <div className="space-y-6">
                      {section.content.map((item, i) => (
                        <div key={i}>
                          <h3 className="font-bold mb-2 text-lg">{item.subtitle}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="prose dark:prose-invert max-w-none mb-20">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Additional Terms</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">Governing Law</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      These terms shall be governed by and construed in accordance with the laws of the State of California, 
                      without regard to its conflict of law provisions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Severability</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited 
                      or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Entire Agreement</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      These terms constitute the entire agreement between Soso and you concerning the subject matter hereof, 
                      and they may only be modified by a written amendment signed by an authorized executive of Soso, or by 
                      the posting by Soso of a revised version.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
                    <p className="mb-6">Contact our legal team for any questions about our terms of service.</p>
                    <div className="flex gap-4">
                      <Button variant="secondary" asChild>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                      <Button variant="secondary" asChild>
                        <Link href="mailto:legal@soso.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Legal Team
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 p-8 rounded-full">
                      <Handshake className="w-24 h-24 text-white/90" />
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