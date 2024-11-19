import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import { PlatformInfo } from "@/types/types"

export const PLATFORM_INFO: Record<string, PlatformInfo> = {
  twitter: {
    icon: Twitter,
    charLimit: 280,
    color: "bg-blue-500 hover:bg-blue-600",
    gradient: "from-blue-500 to-blue-600",
    bestTimes: ["9:00 AM", "3:00 PM"],
    maxHashtags: 5,
    mediaTypes: [".jpg", ".png", ".gif", ".webp"],
    features: ["Threads", "Polls", "Mentions"],
    baseReach: 1000
  },
  facebook: {
    icon: Facebook,
    charLimit: 63206,
    color: "bg-indigo-600 hover:bg-indigo-700",
    gradient: "from-indigo-600 to-indigo-700",
    bestTimes: ["1:00 PM", "4:00 PM"],
    maxHashtags: 3,
    mediaTypes: [".jpg", ".png", ".gif", ".mp4"],
    features: ["Events", "Groups", "Shop"],
    baseReach: 2000
  },
  instagram: {
    icon: Instagram,
    charLimit: 2200,
    color: "bg-pink-600 hover:bg-pink-700",
    gradient: "from-pink-600 to-rose-600",
    bestTimes: ["11:00 AM", "2:00 PM"],
    maxHashtags: 30,
    mediaTypes: [".jpg", ".png", ".mp4"],
    features: ["Stories", "Reels", "Shop"],
    baseReach: 1500
  },
  linkedin: {
    icon: Linkedin,
    charLimit: 3000,
    color: "bg-sky-700 hover:bg-sky-800",
    gradient: "from-sky-700 to-sky-800",
    bestTimes: ["8:00 AM", "5:00 PM"],
    maxHashtags: 5,
    mediaTypes: [".jpg", ".png", ".pdf", ".doc"],
    features: ["Articles", "Jobs", "Groups"],
    baseReach: 800
  }
}

export const CATEGORIES = [
  "Marketing",
  "News",
  "Product Update",
  "Event",
  "Blog Post",
  "Job Posting"
] as const

export const TIME_ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney"
] as const

export const CONTENT_TEMPLATES = {
    marketing: [
      "Check out our latest {product} - perfect for {audience}!",
      "Don't miss out on {offer} - limited time only!",
      "Transform your {pain_point} with our innovative {solution}"
    ],
    news: [
      "Breaking: {headline}",
      "Just announced: {announcement}",
      "Latest update: {update}"
    ],
    event: [
      "Join us for {event_name} on {date}",
      "Don't miss {event_name} - Register now!",
      "Save the date: {event_name}"
    ]
  } as const