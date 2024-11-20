// src/app/(admin)/components/dashboard/subscribers-monitor.tsx
'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Crown,
  Users,
  CreditCard,
  AlertCircle,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  UserPlus
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  color: string;
  features: string[];
}

interface Subscriber {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: string;
  status: 'active' | 'expiring' | 'expired';
  startDate: string;
  endDate: string;
  billing: 'monthly' | 'yearly';
  amount: number;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    color: '#4ade80',
    features: ['5 social accounts', 'Basic analytics', 'Manual posting']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    color: '#2563eb',
    features: ['15 social accounts', 'Advanced analytics', 'Auto scheduling']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    color: '#8b5cf6',
    features: ['Unlimited accounts', 'Custom features', 'Priority support']
  }
];

export function SubscribersMonitor() {
  const [timeRange, setTimeRange] = React.useState('30');
  const [selectedPlan, setSelectedPlan] = React.useState('all');

  // Mock data - replace with real data from your backend
  const subscribers: Subscriber[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'pro',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      billing: 'yearly',
      amount: 299.99
    },
    // Add more subscribers...
  ];

  const subscriptionData = {
    total: 1234,
    active: 1156,
    expiring: 45,
    expired: 33,
    mrr: 32450,
    growth: 12.5,
    planDistribution: {
      basic: 450,
      pro: 580,
      enterprise: 126
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 28000 },
    { month: 'Feb', revenue: 32000 },
    { month: 'Mar', revenue: 35000 },
    { month: 'Apr', revenue: 32450 },
    // Add more months...
  ];

  const getStatusColor = (status: Subscriber['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-50';
      case 'expiring':
        return 'text-yellow-500 bg-yellow-50';
      case 'expired':
        return 'text-red-500 bg-red-50';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    const planInfo = plans.find(p => p.id === plan);
    return planInfo?.color || '#94a3b8';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold">{subscriptionData.total}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{subscriptionData.growth}%</span>
              <span className="text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${subscriptionData.mrr.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">85% of monthly goal</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{subscriptionData.active}</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {subscriptionData.expiring} plans expiring soon
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Subscribers</p>
                <p className="text-2xl font-bold">+128</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-full">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Last 30 days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Active subscribers by plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={plans.map(plan => ({
                      name: plan.name,
                      value: subscriptionData.planDistribution[plan.id],
                      color: plan.color
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {plans.map((plan, index) => (
                      <Cell key={`cell-${index}`} fill={plan.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {plans.map(plan => (
                <div key={plan.id} className="text-center">
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {subscriptionData.planDistribution[plan.id]} users
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly recurring revenue</CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscribers</CardTitle>
              <CardDescription>Detailed list of all subscribers</CardDescription>
            </div>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                {plans.map(plan => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {subscribers
                .filter(sub => selectedPlan === 'all' || sub.plan === selectedPlan)
                .map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={subscriber.avatar} />
                      <AvatarFallback>
                        {subscriber.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{subscriber.name}</p>
                      <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      style={{ backgroundColor: getPlanBadgeColor(subscriber.plan) }}
                      className="text-white"
                    >
                      {plans.find(p => p.id === subscriber.plan)?.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getStatusColor(subscriber.status)}
                    >
                      {subscriber.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${subscriber.amount}/
                        {subscriber.billing === 'monthly' ? 'mo' : 'yr'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires: {new Date(subscriber.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}