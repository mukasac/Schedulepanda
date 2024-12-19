"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ArrowRight, 
  Search, 
  Filter,
  Clock,
  User,
  Tag,
  ChevronRight,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Suspense } from "react"

const categories = [
  "All",
  "Social Media Tips",
  "Marketing Strategy",
  "Case Studies",
  "Product Updates",
  "Industry News"
]

const featuredPosts = [
  {
    title: "10 Social Media Trends to Watch in 2024",
    excerpt: "Stay ahead of the curve with these emerging social media trends that will shape the digital landscape in 2024.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Industry News",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "Mar 15, 2024",
    readTime: "8 min read",
    tags: ["Trends", "Social Media", "Marketing"]
  },
  {
    title: "How to Create a Winning Social Media Strategy",
    excerpt: "Learn the key components of a successful social media strategy and how to implement them for your business.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Marketing Strategy",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "Mar 12, 2024",
    readTime: "12 min read",
    tags: ["Strategy", "Planning", "Growth"]
  }
]

const recentPosts = [
  {
    title: "Maximizing Engagement with AI-Powered Content",
    excerpt: "Discover how artificial intelligence can help you create more engaging social media content.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Social Media Tips",
    author: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "Mar 10, 2024",
    readTime: "6 min read",
    tags: ["AI", "Content", "Engagement"]
  },
  {
    title: "Case Study: How Brand X Increased Their Social ROI by 300%",
    excerpt: "An in-depth look at how Brand X transformed their social media strategy for massive returns.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Case Studies",
    author: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "Mar 8, 2024",
    readTime: "10 min read",
    tags: ["ROI", "Case Study", "Strategy"]
  },
  {
    title: "New Features Alert: March 2024 Product Updates",
    excerpt: "Check out the latest features and improvements we've added to the Soso platform.",
    image: "/placeholder.svg?height=300&width=600",
    category: "Product Updates",
    author: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "Mar 5, 2024",
    readTime: "4 min read",
    tags: ["Product", "Updates", "Features"]
  }
]

const trendingTopics = [
  "Social Media Analytics",
  "Content Strategy",
  "Instagram Marketing",
  "LinkedIn Growth",
  "TikTok for Business"
]

export default function BlogPage() {
  return (
    <Suspense>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge className="mb-4" variant="outline">Blog</Badge>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insights & Updates
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Expert tips, industry insights, and product updates to help you master social media management.
            </motion.p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <Tabs defaultValue="All" className="mb-20">
            <TabsList className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Featured Posts */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <Badge className="mb-4">{post.category}</Badge>
                      <h3 className="text-xl font-bold mb-2">
                        <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
              <div className="space-y-8">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={300}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div>
                            <Badge className="mb-2">{post.category}</Badge>
                            <h3 className="text-xl font-bold mb-2">
                              <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="hover:text-blue-600">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                            <div className="flex items-center gap-2">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <p className="font-medium">{post.author.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Clock className="w-4 h-4" />
                                  <span>{post.readTime}</span>
                                  <span>•</span>
                                  <span>{post.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingTopics.map((topic) => (
                      <Link
                        key={topic}
                        href={`/blog/topic/${topic.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <span>{topic}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="mb-6">Get the latest social media insights and updates delivered to your inbox.</p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button variant="secondary">Subscribe</Button>
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