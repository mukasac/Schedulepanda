// src/app/(admin)/components/moderation/moderation-view.tsx
'use client'

import { useState } from 'react'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle, Filter } from 'lucide-react'

interface Report {
  id: number
  content: string
  type: string
  reporter: string
  status: string
  date: string
  platform: string
}

const sampleReports: Report[] = [
  {
    id: 1,
    content: "This is promotional spam content",
    type: "Spam",
    reporter: "john@example.com",
    status: "Pending",
    date: "2024-11-19",
    platform: "Twitter"
  },
  {
    id: 2,
    content: "Inappropriate language in post",
    type: "Inappropriate",
    reporter: "alice@example.com",
    status: "Under Review",
    date: "2024-11-19",
    platform: "Instagram"
  },
  {
    id: 3,
    content: "Copyright violation - using protected content",
    type: "Copyright",
    reporter: "legal@example.com",
    status: "Resolved",
    date: "2024-11-18",
    platform: "Facebook"
  }
]

export function ModerationView() {
  const [reports, setReports] = useState<Report[]>(sampleReports)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning"
      case "Under Review":
        return "default"
      case "Resolved":
        return "success"
      default:
        return "secondary"
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statistics = {
    total: reports.length,
    pending: reports.filter(r => r.status === "Pending").length,
    underReview: reports.filter(r => r.status === "Under Review").length,
    resolved: reports.filter(r => r.status === "Resolved").length
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Content Moderation</h2>
        <p className="text-muted-foreground">
          Review and manage reported content across all platforms
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.underReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={filterStatus}
          onValueChange={setFilterStatus}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.content}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.reporter}</TableCell>
                <TableCell>{report.platform}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(report.status)}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}