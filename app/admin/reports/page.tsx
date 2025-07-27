"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, Package, Users, DollarSign, Clock } from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

interface Report {
  id: string
  name: string
  type: string
  description: string
  lastGenerated: string
  status: "ready" | "generating" | "scheduled"
  format: string
  size: string
}

export default function ReportsPage() {
  const [reports] = useState<Report[]>([
    {
      id: "1",
      name: "Monthly Delivery Report",
      type: "delivery",
      description: "Comprehensive delivery statistics and performance metrics",
      lastGenerated: "2024-01-15T10:30:00Z",
      status: "ready",
      format: "PDF",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Revenue Analysis",
      type: "financial",
      description: "Revenue breakdown by region, agent, and service type",
      lastGenerated: "2024-01-14T15:45:00Z",
      status: "ready",
      format: "Excel",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Customer Satisfaction Report",
      type: "customer",
      description: "Customer feedback analysis and satisfaction metrics",
      lastGenerated: "2024-01-13T09:20:00Z",
      status: "generating",
      format: "PDF",
      size: "-",
    },
    {
      id: "4",
      name: "Agent Performance Report",
      type: "performance",
      description: "Individual agent performance and efficiency metrics",
      lastGenerated: "2024-01-12T14:10:00Z",
      status: "scheduled",
      format: "PDF",
      size: "3.1 MB",
    },
  ])

  const [selectedType, setSelectedType] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "delivery":
        return <Package className="h-4 w-4" />
      case "financial":
        return <DollarSign className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      case "performance":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      (selectedType === "all" || report.type === selectedType) &&
      (selectedFormat === "all" || report.format.toLowerCase() === selectedFormat),
  )

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and download comprehensive business reports</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 animate-pulse-soft">
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Automated</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
              <p className="text-xs text-muted-foreground">Records</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Generation Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2m</div>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Filter Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <DatePickerWithRange />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="delivery">Delivery Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                  <SelectItem value="customer">Customer Reports</SelectItem>
                  <SelectItem value="performance">Performance Reports</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader>
            <CardTitle>Available Reports ({filteredReports.length})</CardTitle>
            <CardDescription>Generated and scheduled reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report, index) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg animate-fade-in hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(report.type)}</div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">Format: {report.format}</span>
                        {report.size !== "-" && <span className="text-xs text-gray-500">Size: {report.size}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                    {report.status === "ready" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Report Templates */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Quick Report Templates</CardTitle>
            <CardDescription>Generate common reports instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Daily Summary", type: "delivery", icon: Package },
                { name: "Weekly Revenue", type: "financial", icon: DollarSign },
                { name: "Agent Performance", type: "performance", icon: TrendingUp },
                { name: "Customer Analytics", type: "customer", icon: Users },
              ].map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform animate-fade-in bg-transparent"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <template.icon className="h-5 w-5" />
                  <span className="text-sm">{template.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
