"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Settings,
  Server,
  Cookie,
  Mail,
  AlertCircle
} from "lucide-react"

const sections = [
  {
    icon: FileText,
    title: "Information We Collect",
    content: [
      "Personal information (name, email, contact details)",
      "Account credentials and preferences",
      "Usage data and analytics",
      "Device and browser information",
      "Social media data when integrated"
    ]
  },
  {
    icon: Server,
    title: "How We Use Your Data",
    content: [
      "Providing and improving our services",
      "Personalizing your experience",
      "Processing your transactions",
      "Sending service updates and marketing communications",
      "Analytics and performance monitoring"
    ]
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "Industry-standard encryption protocols",
      "Regular security audits and monitoring",
      "Secure data storage and transmission",
      "Access controls and authentication",
      "Incident response procedures"
    ]
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: [
      "Essential cookies for site functionality",
      "Analytics and performance cookies",
      "Marketing and advertising cookies",
      "Third-party integrations",
      "Cookie preferences management"
    ]
  },
  {
    icon: Eye,
    title: "Your Privacy Rights",
    content: [
      "Access to your personal data",
      "Right to data portability",
      "Right to be forgotten",
      "Consent management",
      "Data correction and deletion"
    ]
  },
  {
    icon: Settings,
    title: "Privacy Controls",
    content: [
      "Privacy settings customization",
      "Marketing preferences",
      "Data sharing options",
      "Account privacy controls",
      "Third-party permissions"
    ]
  }
]

const lastUpdated = "March 15, 2024"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Privacy Policy</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Privacy Matters
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We are committed to protecting your privacy and ensuring the security of your data.
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

          {/* Privacy Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-xl font-bold">{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="space-y-8 mb-20">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have different data protection laws. When we transfer your data, we ensure appropriate 
                safeguards are in place to protect your information and comply with applicable data protection laws.
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "last updated" date at the top of this policy. You are advised 
                to review this privacy policy periodically for any changes.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Have Privacy Questions?</h3>
                    <p className="mb-6">Contact our privacy team for any questions or concerns about your data.</p>
                    <div className="flex gap-4">
                      <Button variant="secondary" asChild>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                      <Button variant="secondary" asChild>
                        <Link href="mailto:privacy@soso.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Privacy Team
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 p-8 rounded-full">
                      <Shield className="w-24 h-24 text-white/90" />
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
  )
}