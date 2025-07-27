"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation, MapPin, Clock, Zap, Route, Settings } from "lucide-react"
import { AgentLayout } from "@/components/layouts/agent-layout"

interface RouteStop {
  id: string
  address: string
  customerName: string
  trackingNumber: string
  type: "pickup" | "delivery"
  priority: string
  estimatedTime: string
  status: "pending" | "completed"
}

export default function RouteOptimizationPage() {
  const [optimizedRoute, setOptimizedRoute] = useState<RouteStop[]>([
    {
      id: "1",
      address: "123 Main St, New York, NY 10001",
      customerName: "John Doe",
      trackingNumber: "CP001234567",
      type: "pickup",
      priority: "high",
      estimatedTime: "9:00 AM",
      status: "pending",
    },
    {
      id: "2",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      customerName: "John Doe",
      trackingNumber: "CP001234567",
      type: "delivery",
      priority: "high",
      estimatedTime: "9:30 AM",
      status: "pending",
    },
    {
      id: "3",
      address: "789 Pine St, Manhattan, NY 10016",
      customerName: "Jane Smith",
      trackingNumber: "CP001234568",
      type: "pickup",
      priority: "medium",
      estimatedTime: "10:15 AM",
      status: "pending",
    },
    {
      id: "4",
      address: "321 Elm St, Queens, NY 11375",
      customerName: "Jane Smith",
      trackingNumber: "CP001234568",
      type: "delivery",
      priority: "medium",
      estimatedTime: "11:00 AM",
      status: "pending",
    },
  ])

  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsOptimizing(false)
  }

  const markStopCompleted = (stopId: string) => {
    setOptimizedRoute((prev) => prev.map((stop) => (stop.id === stopId ? { ...stop, status: "completed" } : stop)))
  }

  const getTypeColor = (type: string) => {
    return type === "pickup" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalDistance = "24.8 km"
  const estimatedTime = "2h 45m"
  const fuelSavings = "15%"

  return (
    <AgentLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Route Optimization</h1>
            <p className="text-gray-600">Optimize your delivery route for maximum efficiency</p>
          </div>
          <Button
            onClick={handleOptimizeRoute}
            disabled={isOptimizing}
            className="bg-blue-600 hover:bg-blue-700 animate-pulse-soft"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isOptimizing ? "Optimizing..." : "Optimize Route"}
          </Button>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stops</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{optimizedRoute.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDistance}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estimatedTime}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Savings</CardTitle>
              <span className="text-green-600">⛽</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{fuelSavings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Route Map Placeholder */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              Optimized Route Map
            </CardTitle>
            <CardDescription>Visual representation of your optimized delivery route</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-700">Interactive Route Map</h3>
                <p className="text-gray-600 mt-2">Google Maps integration would show optimized route here</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Route Preferences
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                    <Navigation className="h-4 w-4 mr-2" />
                    Start Navigation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Steps */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader>
            <CardTitle>Route Steps</CardTitle>
            <CardDescription>Follow these optimized stops in order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizedRoute.map((stop, index) => (
                <div
                  key={stop.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 animate-fade-in ${
                    stop.status === "completed"
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        stop.status === "completed" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {stop.status === "completed" ? "✓" : index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{stop.customerName}</h3>
                        <Badge className={getTypeColor(stop.type)}>{stop.type.toUpperCase()}</Badge>
                        <Badge className={getPriorityColor(stop.priority)}>{stop.priority.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {stop.address}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stop.trackingNumber} • ETA: {stop.estimatedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {stop.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => markStopCompleted(stop.id)}
                        className="hover:scale-105 transition-transform"
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform bg-transparent">
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Route Optimization Tips */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Optimization Tips</CardTitle>
            <CardDescription>Tips to improve your delivery efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { tip: "Group nearby deliveries together", icon: "📍" },
                { tip: "Consider traffic patterns and peak hours", icon: "🚦" },
                { tip: "Plan for lunch breaks and refueling", icon: "⏰" },
                { tip: "Keep emergency contact numbers handy", icon: "📞" },
                { tip: "Check weather conditions before starting", icon: "🌤️" },
                { tip: "Confirm delivery addresses with customers", icon: "✅" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-fade-in hover:bg-gray-100 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
