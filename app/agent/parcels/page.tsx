"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, MapPin, Phone, Navigation, CheckCircle, AlertCircle } from "lucide-react"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { useToast } from "@/hooks/use-toast"

interface Parcel {
  id: string
  trackingNumber: string
  pickupAddress: string
  deliveryAddress: string
  customerName: string
  customerPhone: string
  status: string
  priority: string
  estimatedTime: string
  paymentMethod: string
  codAmount?: number
  weight: number
  type: string
  specialInstructions?: string
}

export default function MyParcelsPage() {
  const { toast } = useToast()
  const [parcels, setParcels] = useState<Parcel[]>([
    {
      id: "1",
      trackingNumber: "CP001234567",
      pickupAddress: "123 Main St, New York, NY 10001",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY 11201",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      status: "assigned",
      priority: "high",
      estimatedTime: "30 mins",
      paymentMethod: "cod",
      codAmount: 45.99,
      weight: 2.5,
      type: "Electronics",
      specialInstructions: "Ring doorbell twice, leave at front desk",
    },
    {
      id: "2",
      trackingNumber: "CP001234568",
      pickupAddress: "789 Pine St, Manhattan, NY 10016",
      deliveryAddress: "321 Elm St, Queens, NY 11375",
      customerName: "Jane Smith",
      customerPhone: "+1234567891",
      status: "picked-up",
      priority: "medium",
      estimatedTime: "45 mins",
      paymentMethod: "prepaid",
      weight: 1.8,
      type: "Documents",
    },
    {
      id: "3",
      trackingNumber: "CP001234569",
      pickupAddress: "555 Broadway, Manhattan, NY 10012",
      deliveryAddress: "777 Atlantic Ave, Brooklyn, NY 11238",
      customerName: "Mike Johnson",
      customerPhone: "+1234567892",
      status: "in-transit",
      priority: "low",
      estimatedTime: "1 hour",
      paymentMethod: "prepaid",
      weight: 3.2,
      type: "Clothing",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const updateParcelStatus = (parcelId: string, newStatus: string) => {
    setParcels((prev) => prev.map((parcel) => (parcel.id === parcelId ? { ...parcel, status: newStatus } : parcel)))

    toast({
      title: "Status Updated",
      description: `Parcel status updated to ${newStatus.replace("-", " ")}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "picked-up":
        return "bg-yellow-100 text-yellow-800"
      case "in-transit":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

  const filteredParcels = parcels.filter(
    (parcel) =>
      (statusFilter === "all" || parcel.status === statusFilter) &&
      (parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.customerName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <AgentLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Parcels</h1>
          <p className="text-gray-600">Manage your assigned parcel deliveries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parcels.filter((p) => p.status === "assigned").length}</div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {parcels.filter((p) => p.status === "picked-up" || p.status === "in-transit").length}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">COD Amount</CardTitle>
              <span className="text-green-600">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                $
                {parcels
                  .filter((p) => p.paymentMethod === "cod")
                  .reduce((acc, p) => acc + (p.codAmount || 0), 0)
                  .toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {parcels.filter((p) => p.priority === "high").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Filter Parcels</CardTitle>
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
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="picked-up">Picked Up</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Parcels List */}
        <div className="space-y-4">
          {filteredParcels.map((parcel, index) => (
            <Card
              key={parcel.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <CardTitle className="text-lg">{parcel.trackingNumber}</CardTitle>
                      <CardDescription>
                        {parcel.customerName} • {parcel.type}
                      </CardDescription>
                    </div>
                    <Badge className={getPriorityColor(parcel.priority)}>{parcel.priority.toUpperCase()}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(parcel.status)}>
                      {parcel.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500">{parcel.estimatedTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Pickup Address</h4>
                    <p className="text-sm text-gray-600 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {parcel.pickupAddress}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {parcel.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{parcel.customerPhone}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {parcel.weight}kg • {parcel.paymentMethod.toUpperCase()}
                      {parcel.codAmount && ` • $${parcel.codAmount}`}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform bg-transparent">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Route
                    </Button>

                    {parcel.status === "assigned" && (
                      <Button
                        size="sm"
                        onClick={() => updateParcelStatus(parcel.id, "picked-up")}
                        className="animate-pulse-soft"
                      >
                        Mark Picked Up
                      </Button>
                    )}

                    {parcel.status === "picked-up" && (
                      <Button
                        size="sm"
                        onClick={() => updateParcelStatus(parcel.id, "in-transit")}
                        className="animate-pulse-soft"
                      >
                        In Transit
                      </Button>
                    )}

                    {parcel.status === "in-transit" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateParcelStatus(parcel.id, "delivered")}
                          className="animate-pulse-soft"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Delivered
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => updateParcelStatus(parcel.id, "failed")}>
                          Failed
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {parcel.specialInstructions && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm">
                      <strong>Special Instructions:</strong> {parcel.specialInstructions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AgentLayout>
  )
}
