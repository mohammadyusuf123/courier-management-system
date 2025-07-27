"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Users, Truck, DollarSign, TrendingUp, AlertTriangle, FileDown } from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { useSocket } from "@/components/providers/socket-provider"
import { ParcelChart } from "@/components/charts/parcel-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const { isConnected } = useSocket()
  const [stats, setStats] = useState({
    totalParcels: 1247,
    activeAgents: 23,
    dailyBookings: 89,
    totalRevenue: 15420.5,
    failedDeliveries: 12,
    codAmount: 3240.75,
    deliveryRate: 94.2,
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "booking", message: "New parcel booked by John Doe", time: "2 minutes ago" },
    { id: 2, type: "delivery", message: "Parcel CP123456 delivered successfully", time: "5 minutes ago" },
    { id: 3, type: "agent", message: "Agent Mike Johnson went online", time: "10 minutes ago" },
    { id: 4, type: "failed", message: "Delivery failed for CP789012", time: "15 minutes ago" },
  ])

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your dashboard data is being exported...",
    })
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully.",
      })
    }, 2000)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "assign":
        router.push("/admin/parcels")
        break
      case "agents":
        router.push("/admin/agents")
        break
      case "alerts":
        toast({
          title: "System Alerts",
          description: "No critical alerts at this time.",
        })
        break
      default:
        break
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Monitor your courier operations in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm border">
              <div className={`h-3 w-3 rounded-full animate-pulse ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm font-medium">{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
            <Button
              onClick={handleExportData}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-slide-up hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Parcels</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.totalParcels.toLocaleString()}</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Active Agents</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <Truck className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.activeAgents}</div>
              <p className="text-xs text-green-600">Out of 35 total agents</p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Daily Bookings</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{stats.dailyBookings}</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Total Revenue</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <ParcelChart />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <RevenueChart />
          </div>
        </div>

        {/* Enhanced Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                Delivery Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate</span>
                  <Badge className="bg-green-100 text-green-800 font-semibold">{stats.deliveryRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Failed Deliveries</span>
                  <Badge className="bg-red-100 text-red-800 font-semibold">{stats.failedDeliveries}</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stats.deliveryRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.7s" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                COD Collections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-blue-900">${stats.codAmount.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Pending collections today</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
                  onClick={() => router.push("/admin/parcels?filter=cod")}
                >
                  View COD Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.8s" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleQuickAction("assign")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Assign Parcels
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleQuickAction("agents")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Agents
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleQuickAction("alerts")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  View Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.9s" }}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your courier operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border hover:shadow-md transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-3 w-3 rounded-full animate-pulse ${
                        activity.type === "booking"
                          ? "bg-blue-500"
                          : activity.type === "delivery"
                            ? "bg-green-500"
                            : activity.type === "agent"
                              ? "bg-purple-500"
                              : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{activity.message}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
