// src/app/(admin)/components/dashboard/components/system-status.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, Clock, AlertTriangle } from 'lucide-react';

interface SystemStatusProps {
  systemHealth: {
    api: { status: string; latency: string };
    database: { status: string; latency: string };
    queue: { status: string; count: number };
    errors: { status: string; count: number };
  };
}

export function SystemStatus({ systemHealth }: SystemStatusProps) {
  const SystemStatusCard = ({ title, status, metric, icon: Icon }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{metric}</p>
          </div>
          <div className={`p-4 rounded-full ${
            status === 'healthy' ? 'bg-green-100 text-green-600' :
            status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
            'bg-red-100 text-red-600'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SystemStatusCard 
        title="API Health"
        status={systemHealth.api.status}
        metric={systemHealth.api.latency}
        icon={Activity}
      />
      <SystemStatusCard
        title="Database Status"
        status={systemHealth.database.status}
        metric={systemHealth.database.latency}
        icon={Zap}
      />
      <SystemStatusCard
        title="Queue Status"
        status={systemHealth.queue.status}
        metric={`${systemHealth.queue.count} pending`}
        icon={Clock}
      />
      <SystemStatusCard
        title="Error Rate"
        status={systemHealth.errors.status}
        metric={`${systemHealth.errors.count} errors`}
        icon={AlertTriangle}
      />
    </div>
  );
}