"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, CheckCircle, Navigation, MapPin, Phone, Route } from "lucide-react"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { useSocket } from "@/components/providers/socket-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AssignedParcel {
  id: string
  trackingNumber: string
  pickupAddress: string
  deliveryAddress: string
  status: "assigned" | "picked-up" | "in-transit" | "delivered" | "failed"
  priority: "low" | "medium" | "high"
  estimatedTime: string
  customerName: string
  customerPhone: string
  paymentMethod: "cod" | "prepaid"
  codAmount?: number
}

export default function AgentDashboard() {
  const { emit } = useSocket()
  const { toast } = useToast()
  const router = useRouter()
  const [assignedParcels, setAssignedParcels] = useState<AssignedParcel[]>([
    {
      id: "1",
      trackingNumber: "CP001234567",
      pickupAddress: "123 Main St, New York, NY",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY",
      status: "assigned",
      priority: "high",
      estimatedTime: "30 mins",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      paymentMethod: "cod",
      codAmount: 45.99,
    },
    {
      id: "2",
      trackingNumber: "CP001234568",
      pickupAddress: "789 Pine St, New York, NY",
      deliveryAddress: "321 Elm St, Queens, NY",
      status: "picked-up",
      priority: "medium",
      estimatedTime: "45 mins",
      customerName: "Jane Smith",
      customerPhone: "+1234567891",
      paymentMethod: "prepaid",
    },
  ])

  const [stats, setStats] = useState({
    totalAssigned: 8,
    completed: 12,
    inProgress: 3,
    earnings: 245.5,
  })

  const updateParcelStatus = (parcelId: string, newStatus: string) => {
    setAssignedParcels((prev) =>
      prev.map((parcel) => (parcel.id === parcelId ? { ...parcel, status: newStatus as any } : parcel)),
    )

    // Emit socket event for real-time updates
    emit("parcel-status-update", { parcelId, status: newStatus })

    toast({
      title: "Status Updated",
      description: `Parcel status updated to ${newStatus.replace("-", " ")}`,
    })
  }

  const handleGetRoute = (parcel: AssignedParcel) => {
    const origin = encodeURIComponent(parcel.pickupAddress)
    const destination = encodeURIComponent(parcel.deliveryAddress)
    const googleMapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`

    window.open(googleMapsUrl, "_blank")

    toast({
      title: "Route Opened",
      description: "Google Maps route opened in new tab",
    })
  }

  const handleOptimizeRoute = () => {
    router.push("/agent/routes")
    toast({
      title: "Route Optimization",
      description: "Redirecting to route optimization page...",
    })
  }

  const handleCallCustomer = (phone: string, customerName: string) => {
    window.open(`tel:${phone}`)
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${customerName}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "picked-up":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-transit":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <AgentLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agent Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage your assigned parcels and deliveries</p>
          </div>
          <Button
            onClick={handleOptimizeRoute}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Route className="h-4 w-4 mr-2" />
            Optimize Route
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Assigned Today</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.totalAssigned}</div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            style={{ animationDelay: "0.05s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">In Progress</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Clock className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
            style={{ animationDelay: "0.15s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Today's Earnings</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <span className="text-white font-bold text-sm">$</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">${stats.earnings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Assigned Parcels */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Assigned Parcels
            </CardTitle>
            <CardDescription>Your current parcel assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assignedParcels.map((parcel, index) => (
                <div
                  key={parcel.id}
                  className="border-2 border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-lg transition-all duration-300 animate-fade-in bg-gradient-to-r from-white to-gray-50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{parcel.trackingNumber}</h3>
                        <p className="text-gray-600">{parcel.customerName}</p>
                      </div>
                      <Badge className={`${getPriorityColor(parcel.priority)} border font-medium`}>
                        {parcel.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStatusColor(parcel.status)} border font-medium`}>
                        {parcel.status.replace("-", " ").toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        ETA: {parcel.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        Pickup Address
                      </h4>
                      <p className="text-sm text-gray-600 pl-6">{parcel.pickupAddress}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-500" />
                        Delivery Address
                      </h4>
                      <p className="text-sm text-gray-600 pl-6">{parcel.deliveryAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{parcel.customerPhone}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Payment: <span className="font-medium">{parcel.paymentMethod.toUpperCase()}</span>
                        {parcel.codAmount && (
                          <span className="text-green-600 font-semibold"> - $${parcel.codAmount}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCallCustomer(parcel.customerPhone, parcel.customerName)}
                        className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 text-green-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGetRoute(parcel)}
                        className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 text-blue-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Route
                      </Button>

                      {parcel.status === "assigned" && (
                        <Button
                          size="sm"
                          onClick={() => updateParcelStatus(parcel.id, "picked-up")}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          Mark Picked Up
                        </Button>
                      )}

                      {parcel.status === "picked-up" && (
                        <Button
                          size="sm"
                          onClick={() => updateParcelStatus(parcel.id, "in-transit")}
                          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          In Transit
                        </Button>
                      )}

                      {parcel.status === "in-transit" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => updateParcelStatus(parcel.id, "delivered")}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Delivered
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => updateParcelStatus(parcel.id, "failed")}
                            className="transition-all duration-300 transform hover:scale-105"
                          >
                            Failed
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-purple-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used actions for efficient delivery management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => router.push("/agent/parcels")}
                className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Package className="h-5 w-5 mr-2" />
                View All Parcels
              </Button>
              <Button
                onClick={handleOptimizeRoute}
                className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Route className="h-5 w-5 mr-2" />
                Optimize Route
              </Button>
              <Button
                onClick={() => router.push("/agent/history")}
                className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
