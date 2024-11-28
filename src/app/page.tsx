'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight, 
  CheckCircle, 
  Menu, 
  X, 
  Calendar, 
  MessageCircle, 
  BarChart3, 
  Users, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube 
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
} from "@/components/ui/navigation-menu"

const features = [
  {
    title: "Schedule & Publish",
    description: "Plan and automatically publish your content across multiple platforms.",
    icon: Calendar,
    href: "/features/schedule"
  },
  {
    title: "Engage & Respond",
    description: "Manage all your social interactions from a single, unified inbox.",
    icon: MessageCircle,
    href: "/features/engage"
  },
  {
    title: "Analyze & Report",
    description: "Get in-depth insights and create beautiful, shareable reports.",
    icon: BarChart3,
    href: "/features/analytics"
  },
  {
    title: "Collaborate & Approve",
    description: "Streamline your workflow with team collaboration and approval processes.",
    icon: Users,
    href: "/features/collaborate"
  }
]

const platforms = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "Twitter", icon: Twitter },
  { name: "LinkedIn", icon: Linkedin },
  { name: "YouTube", icon: Youtube },
  { name: "TikTok", icon: Youtube }
]

const testimonials = [
  {
    quote: "Soso has revolutionized our social media strategy. It's a game-changer!",
    author: "Emily Chen",
    role: "Marketing Director",
    company: "TechInnovate",
    image: "/placeholder.svg?height=48&width=48"
  },
  {
    quote: "The analytics and reporting features are unparalleled. Highly recommended!",
    author: "Marcus Johnson",
    role: "Social Media Manager",
    company: "GrowthCo",
    image: "/placeholder.svg?height=48&width=48"
  },
  {
    quote: "Soso's collaboration tools have streamlined our entire content creation process.",
    author: "Sophia Rodriguez",
    role: "Content Strategist",
    company: "CreativeWorks",
    image: "/placeholder.svg?height=48&width=48"
  }
]

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Soso Logo" width={32} height={32} />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Soso</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <ListItem
                          key={feature.title}
                          title={feature.title}
                          href={feature.href}
                        >
                          {feature.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink>Pricing</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/sign-in">Start Free Trial</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder.svg?height=32&width=32" alt="Soso Logo" width={32} height={32} />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Soso</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            {features.map((feature) => (
              <Link 
                key={feature.title}
                href={feature.href} 
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {feature.title}
              </Link>
            ))}
            <Link 
              href="/pricing" 
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/login">Log in</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/scheduler">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simplify Your Social Media Management
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Schedule posts, engage with your audience, and analyze your performance across all social platforms in one place.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input type="email" placeholder="Enter your email" className="max-w-xs" />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8" asChild>
              <Link href="/scheduler">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.p 
            className="mt-4 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            14-day free trial • No credit card required
          </motion.p>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Connect All Your Social Platforms</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col items-center">
                <platform.icon className="w-12 h-12 text-gray-700 dark:text-gray-300" />
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Social Media Success</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link href={feature.href} key={index}>
                <Card className="bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/pricing">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Manage All Your Social Media in One Place</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our intuitive dashboard gives you a bird's-eye view of your social media performance across all platforms. 
                Schedule posts, track engagement, and analyze your growth - all from a single, unified interface.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/scheduler">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image 
                src="/placeholder.svg?height=600&width=800" 
                alt="Soso Dashboard Preview" 
                width={800} 
                height={600} 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Loved by Teams Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-700">
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      width={48} 
                      height={48} 
                      className="rounded-full mr-4" 
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Supercharge Your Social Media?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of marketers and content creators who trust Soso to manage their social media presence.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50" size="lg" asChild>
            <Link href="/scheduler">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.title}>
                    <Link 
                      href={feature.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {feature.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href="/pricing" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
                <li><Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Documentation</Link></li>
                <li><Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Guides</Link></li>
                <li><Link href="/api" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">API</Link></li>
                <li><Link href="/status" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</Link></li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2024 Soso. All rights reserved.
            </p>
            <div className="flex gap-4">
              {platforms.map((platform) => (
                <Link
                  key={platform.name}
                  href={`#${platform.name.toLowerCase()}`}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <platform.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}