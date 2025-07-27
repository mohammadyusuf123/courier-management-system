"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History, Search, Download, Eye, Star } from "lucide-react"
import { AgentLayout } from "@/components/layouts/agent-layout"

interface DeliveryHistory {
  id: string
  trackingNumber: string
  customerName: string
  deliveryAddress: string
  completedDate: string
  deliveryTime: string
  rating: number
  earnings: number
  status: "delivered" | "failed"
  feedback?: string
}

export default function DeliveryHistoryPage() {
  const [deliveries] = useState<DeliveryHistory[]>([
    {
      id: "1",
      trackingNumber: "CP001234560",
      customerName: "Alice Johnson",
      deliveryAddress: "123 Oak St, Brooklyn, NY",
      completedDate: "2024-01-15",
      deliveryTime: "28 mins",
      rating: 5,
      earnings: 12.5,
      status: "delivered",
      feedback: "Great service, on time delivery!",
    },
    {
      id: "2",
      trackingNumber: "CP001234561",
      customerName: "Bob Wilson",
      deliveryAddress: "456 Pine Ave, Manhattan, NY",
      completedDate: "2024-01-15",
      deliveryTime: "35 mins",
      rating: 4,
      earnings: 15.0,
      status: "delivered",
      feedback: "Good delivery, package was safe",
    },
    {
      id: "3",
      trackingNumber: "CP001234562",
      customerName: "Carol Brown",
      deliveryAddress: "789 Elm St, Queens, NY",
      completedDate: "2024-01-14",
      deliveryTime: "N/A",
      rating: 0,
      earnings: 0,
      status: "failed",
      feedback: "Customer not available, multiple attempts made",
    },
    {
      id: "4",
      trackingNumber: "CP001234563",
      customerName: "David Lee",
      deliveryAddress: "321 Maple Dr, Bronx, NY",
      completedDate: "2024-01-14",
      deliveryTime: "22 mins",
      rating: 5,
      earnings: 18.75,
      status: "delivered",
      feedback: "Excellent service, very professional",
    },
    {
      id: "5",
      trackingNumber: "CP001234564",
      customerName: "Eva Martinez",
      deliveryAddress: "555 Cedar Ln, Staten Island, NY",
      completedDate: "2024-01-13",
      deliveryTime: "45 mins",
      rating: 4,
      earnings: 22.0,
      status: "delivered",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const getStatusColor = (status: string) => {
    return status === "delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && delivery.completedDate === "2024-01-15") ||
      (dateFilter === "week" && new Date(delivery.completedDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesStatus && matchesDate
  })

  const stats = {
    totalDeliveries: deliveries.filter((d) => d.status === "delivered").length,
    totalEarnings: deliveries.reduce((acc, d) => acc + d.earnings, 0),
    averageRating: deliveries.filter((d) => d.rating > 0).reduce((acc, d, _, arr) => acc + d.rating / arr.length, 0),
    averageTime: Math.round(
      deliveries
        .filter((d) => d.deliveryTime !== "N/A")
        .reduce((acc, d, _, arr) => {
          const time = Number.parseInt(d.deliveryTime.split(" ")[0])
          return acc + time / arr.length
        }, 0),
    ),
  }

  return (
    <AgentLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery History</h1>
            <p className="text-gray-600">View your past delivery performance and earnings</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 animate-pulse-soft">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDeliveries}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <span className="text-green-600">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="flex mt-1">{renderStars(Math.round(stats.averageRating))}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
              <span className="text-blue-600">⏱️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageTime}m</div>
              <p className="text-xs text-muted-foreground">Minutes per delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Filter History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by tracking number or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Delivery History Table */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader>
            <CardTitle>Delivery History ({filteredDeliveries.length})</CardTitle>
            <CardDescription>Your complete delivery record with performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery, index) => (
                  <TableRow
                    key={delivery.id}
                    className="animate-fade-in hover:bg-gray-50 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
                    <TableCell>{delivery.customerName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{delivery.deliveryAddress}</TableCell>
                    <TableCell>{new Date(delivery.completedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{delivery.deliveryTime}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(delivery.status)}>{delivery.status.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      {delivery.rating > 0 ? (
                        <div className="flex items-center space-x-1">
                          <span>{delivery.rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={delivery.earnings > 0 ? "text-green-600 font-medium" : "text-gray-400"}>
                        ${delivery.earnings.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
