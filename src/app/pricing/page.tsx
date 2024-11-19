"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CheckCircle, 
  HelpCircle, 
  ArrowRight,
  Users,
  BarChart3,
  MessageCircle,
  Shield
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: {
      monthly: 29,
      annual: 24,
    },
    description: "Perfect for individuals and small businesses",
    features: [
      "5 social profiles",
      "50 scheduled posts",
      "Basic analytics",
      "Single user",
      "Content calendar",
      "iOS & Android apps",
    ]
  },
  {
    name: "Professional",
    price: {
      monthly: 79,
      annual: 66,
    },
    description: "Best for growing businesses",
    features: [
      "15 social profiles",
      "Unlimited scheduled posts",
      "Advanced analytics",
      "5 team members",
      "Approval workflows",
      "Custom reporting",
      "Priority support",
      "Content calendar",
      "iOS & Android apps",
    ],
    badge: "Most Popular",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: {
      monthly: 199,
      annual: 166,
    },
    description: "For large organizations",
    features: [
      "Unlimited social profiles",
      "Unlimited scheduled posts",
      "Custom analytics",
      "Unlimited team members",
      "Advanced workflows",
      "Custom reporting",
      "24/7 priority support",
      "API access",
      "Custom training",
      "Dedicated account manager",
    ]
  }
]

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, you'll receive a credit for your next billing cycle."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 14-day free trial on all plans. No credit card required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also offer invoice-based billing."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "You can cancel your subscription at any time. If you cancel, you'll have access to your plan until the end of your current billing cycle."
  },
  {
    question: "What happens after my trial ends?",
    answer: "After your trial ends, you'll need to choose a plan to continue using Soso. Don't worry - we'll send you reminders before your trial expires."
  }
]

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Make data-driven decisions with detailed analytics"
  },
  {
    icon: MessageCircle,
    title: "Priority Support",
    description: "Get help when you need it with priority support"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Advanced security features for your peace of mind"
  }
]
export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Choose Your Plan
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Start free and scale as you grow. All plans come with a 14-day trial.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isAnnual ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <span className={`text-sm ${isAnnual ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Annual
                  <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                </span>
              </div>
            </div>
  
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  {plan.badge && (
                    <Badge
                      className="absolute -top-2 -right-2 bg-blue-600"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <Card className={`${
                    plan.highlighted 
                      ? 'border-blue-600 dark:border-blue-400 shadow-blue-100 dark:shadow-blue-900/20' 
                      : ''
                  } h-full`}>
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                        {isAnnual && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Save ${(plan.price.monthly - plan.price.annual) * 12} annually
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full mb-6" asChild>
                        <Link href="/scheduler">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
  
            {/* Features Grid */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <Card key={feature.title} className="bg-white/50 dark:bg-gray-800/50">
                    <CardContent className="pt-6">
                      <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                      <h3 className="font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
  
            {/* FAQs */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
  
            {/* CTA Section */}
            <div className="mt-20">
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="mb-6">Start your 14-day free trial today. No credit card required.</p>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/scheduler">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
  
        <Footer />
      </div>
    )
  }