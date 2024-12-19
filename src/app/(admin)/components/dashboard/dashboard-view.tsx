// src/app/(admin)/components/dashboard/dashboard-view.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScheduler } from "@/contexts/scheduler-context";
import { useModal } from "@/contexts/modal-context";
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  Activity,
  Zap,
  BarChart2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  RefreshCcw,
  Settings,
  MessageSquare,
  Share2,
  Eye,
  CreditCard,
  Crown,
  UserPlus,
  DollarSign
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface PlatformStatus {
  connected: boolean;
  rateLimitRemaining: number;
  posts: number;
  engagement: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  color: string;
  subscribers: number;
  growth: number;
}

interface SystemMetrics {
  activeUsers: number;
  queuedPosts: number;
  publishedToday: number;
  failedPosts: number;
}

export function DashboardView() {
  const { systemStatus, posts, analytics } = useScheduler();
  const { openModal } = useModal();
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Platform Statistics
  const platformStatus: Record<string, PlatformStatus> = {
    facebook: { connected: true, rateLimitRemaining: 4500, posts: 245, engagement: 82.5 },
    twitter: { connected: true, rateLimitRemaining: 280, posts: 189, engagement: 75.3 },
    instagram: { connected: true, rateLimitRemaining: 850, posts: 321, engagement: 91.2 },
    linkedin: { connected: true, rateLimitRemaining: 450, posts: 156, engagement: 68.7 }
  };

  // Subscription Plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      color: '#4ade80',
      subscribers: 1250,
      growth: 12.5
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 59,
      color: '#2563eb',
      subscribers: 845,
      growth: 18.2
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      color: '#8b5cf6',
      subscribers: 234,
      growth: 24.8
    }
  ];

  // System Metrics
  const metrics: SystemMetrics = {
    activeUsers: 892,
    queuedPosts: 156,
    publishedToday: 47,
    failedPosts: 23
  };

  // Activity Data
  const activityData = [
    { time: '00:00', posts: 12, users: 45, revenue: 240 },
    { time: '04:00', posts: 8, users: 30, revenue: 180 },
    { time: '08:00', posts: 25, users: 85, revenue: 420 },
    { time: '12:00', posts: 45, users: 120, revenue: 680 },
    { time: '16:00', posts: 38, users: 95, revenue: 520 },
    { time: '20:00', posts: 28, users: 75, revenue: 380 }
  ];

  // Revenue Data
  const revenueData = [
    { month: 'Jan', mrr: 28000, users: 1850 },
    { month: 'Feb', mrr: 32000, users: 2100 },
    { month: 'Mar', mrr: 35000, users: 2400 },
    { month: 'Apr', mrr: 32450, users: 2320 }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update metrics
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh data logic
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const showPlatformDetails = (platform: string) => {
    openModal({
      title: `${platform} Performance`,
      size: 'lg',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 grid-cols-2">
            {/* Platform-specific metrics */}
            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {platformStatus[platform].rateLimitRemaining} / 5000
                </div>
                <p className="text-sm text-muted-foreground">Requests remaining</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {platformStatus[platform].engagement}%
                </div>
                <p className="text-sm text-muted-foreground">Average engagement</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="posts" name="Posts" stroke="#2563eb" />
                    <Line type="monotone" dataKey="users" name="Engagement" stroke="#16a34a" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Complete overview of your social media platform
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCcw className={cn(
            "h-4 w-4 mr-2",
            isRefreshing && "animate-spin"
          )} />
          Refresh
        </Button>
      </div>

      {/* System Alerts */}
      {Object.entries(platformStatus).map(([platform, status]) => 
        status.rateLimitRemaining < 300 && (
          <Alert key={platform}
          //  variant="warning"
           >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>API Rate Limit Warning</AlertTitle>
            <AlertDescription>
              {platform} API rate limit is running low ({status.rateLimitRemaining} requests remaining)
            </AlertDescription>
          </Alert>
        )
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickStatCard
          title="Active Users"
          value={metrics.activeUsers}
          change="+12.3%"
          changeType="increase"
          icon={Users}
          description="Currently online"
        />
        <QuickStatCard
          title="Queued Posts"
          value={metrics.queuedPosts}
          change="+8.2%"
          changeType="increase"
          icon={Clock}
          description="Pending publication"
        />
        <QuickStatCard
          title="Published Today"
          value={metrics.publishedToday}
          change="+15.4%"
          changeType="increase"
          icon={CheckCircle}
          description="Successfully posted"
        />
        <QuickStatCard
          title="Failed Posts"
          value={metrics.failedPosts}
          change="-5.4%"
          changeType="decrease"
          icon={AlertCircle}
          description="Needs attention"
        />
      </div>

      {/* Subscription Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{plan.name} Plan</p>
                  <p className="text-2xl font-bold">{plan.subscribers}</p>
                </div>
                <div className="p-4 rounded-full" style={{ backgroundColor: `${plan.color}20` }}>
                  <Crown className="h-6 w-6" style={{ color: plan.color }} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{plan.growth}%</span>
                <span className="text-muted-foreground ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <PlatformPerformanceCard 
          platformStatus={platformStatus}
          onPlatformClick={showPlatformDetails}
        />
        <ActivityOverviewCard 
          data={activityData}
        />
      </div>

      {/* Subscription Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <SubscriptionDistributionCard 
          plans={subscriptionPlans}
        />
        <RevenueOverviewCard 
          data={revenueData}
        />
      </div>

      {/* Recent Activity */}
      <RecentActivityCard 
        posts={posts}
      />
    </div>
  );
}

// Helper Components
function QuickStatCard({ title, value, change, changeType, icon: Icon, description }:any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn(
            "p-4 rounded-full",
            changeType === "increase" ? "bg-green-100" : "bg-red-100"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              changeType === "increase" ? "text-green-600" : "text-red-600"
            )} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {changeType === "increase" ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={cn(
            "font-medium",
            changeType === "increase" ? "text-green-600" : "text-red-600"
          )}>
            {change}
          </span>
          <span className="text-muted-foreground ml-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function PlatformPerformanceCard({ platformStatus, onPlatformClick }:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Performance</CardTitle>
        <CardDescription>Real-time platform metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(platformStatus).map(([platform, status]:any) => (
            <div
              key={platform}
              className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
              onClick={() => onPlatformClick(platform)}
            >
              <div className="flex items-center gap-4">
                {platform === 'facebook' && <Facebook className="h-5 w-5" />}
                {platform === 'twitter' && <Twitter className="h-5 w-5" />}
                {platform === 'instagram' && <Instagram className="h-5 w-5" />}
                {platform === 'linkedin' && <Linkedin className="h-5 w-5" />}
                <div>
                  <p className="font-medium capitalize">{platform}</p>
                  <p className="text-sm text-muted-foreground">
                    {status.posts} posts scheduled
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                // variant={
                //   status.rateLimitRemaining > 1000 ? "success" :
                //   status.rateLimitRemaining > 300 ? "warning" :
                //   "destructive"
                // }
                >
                  {status.rateLimitRemaining} requests
                </Badge>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityOverviewCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>24-hour performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="posts"
                stroke="#2563eb"
                name="Posts"
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#16a34a"
                name="Users"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#9333ea"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function SubscriptionDistributionCard({ plans }) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Distribution</CardTitle>
        <CardDescription>Active subscribers by plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={plans}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="subscribers"
              >
                {plans.map((plan, index) => (
                  <Cell key={`cell-${index}`} fill={plan.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="text-center">
              <div className="font-medium">{plan.name}</div>
              <div className="text-2xl font-bold">{plan.subscribers}</div>
              <div className="text-sm text-muted-foreground">subscribers</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueOverviewCard({ data }:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly recurring revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="mrr" fill="#2563eb" name="MRR ($)" />
              <Bar yAxisId="right" dataKey="users" fill="#16a34a" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">${data[data.length - 1].mrr.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Current MRR</p>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.3%</span>
                <span className="text-muted-foreground ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">${(data[data.length - 1].mrr / data[data.length - 1].users).toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Average Revenue per User</p>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5.2%</span>
                <span className="text-muted-foreground ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivityCard({ posts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest posts and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {posts.slice(0, 5).map((post, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                <div className={cn(
                  "p-2 rounded-full",
                  post.status === 'published' ? 'bg-green-100' :
                  post.status === 'failed' ? 'bg-red-100' :
                  'bg-yellow-100'
                )}>
                  {post.status === 'published' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : post.status === 'failed' ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {post.platform === 'facebook' && <Facebook className="h-4 w-4" />}
                    {post.platform === 'twitter' && <Twitter className="h-4 w-4" />}
                    {post.platform === 'instagram' && <Instagram className="h-4 w-4" />}
                    {post.platform === 'linkedin' && <Linkedin className="h-4 w-4" />}
                    <span className="font-medium capitalize">{post.platform}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground truncate">
                    {post.content}
                  </p>
                  {post.analytics && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.analytics.views?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.analytics.engagement?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        {post.analytics.shares?.toLocaleString() || 0}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">
                    {new Date(post.scheduledDate).toLocaleTimeString()}
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(post.scheduledDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default DashboardView;