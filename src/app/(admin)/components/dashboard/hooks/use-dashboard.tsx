// src/app/(admin)/components/dashboard/hooks/use-dashboard.ts
import { useState, useEffect } from 'react';
import { useScheduler } from '@/contexts/scheduler-context';

export function useDashboard() {
  const { posts } = useScheduler();
  const [systemHealth, setSystemHealth] = useState({
    api: { status: 'healthy', latency: '124ms' },
    database: { status: 'healthy', latency: '45ms' },
    queue: { status: 'warning', count: 156 },
    errors: { status: 'critical', count: 23 }
  });

  const [realtimeMetrics, setRealtimeMetrics] = useState({
    activeUsers: 892,
    queuedPosts: 156,
    publishedToday: 47,
    failedPosts: 23
  });

  // Simulate real-time updates - replace with actual WebSocket connection
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        queuedPosts: prev.queuedPosts + Math.floor(Math.random() * 4 - 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    systemHealth,
    realtimeMetrics,
    posts
  };
}