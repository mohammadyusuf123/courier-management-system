"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, MapPin, Clock, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useSocket } from "@/components/providers/socket-provider"
import { CustomerLayout } from "@/components/layouts/customer-layout"

interface Parcel {
  id: string
  trackingNumber: string
  pickupAddress: string
  deliveryAddress: string
  status: "pending" | "picked-up" | "in-transit" | "delivered" | "failed"
  createdAt: string
  estimatedDelivery: string
  weight: number
  type: string
  paymentMethod: "cod" | "prepaid"
  amount: number
}

export default function CustomerDashboard() {
  const { user } = useAuth()
  const { on, off } = useSocket()
  const [parcels, setParcels] = useState<Parcel[]>([
    {
      id: "1",
      trackingNumber: "CP001234567",
      pickupAddress: "123 Main St, New York, NY",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY",
      status: "in-transit",
      createdAt: "2024-01-15T10:30:00Z",
      estimatedDelivery: "2024-01-16T15:00:00Z",
      weight: 2.5,
      type: "Electronics",
      paymentMethod: "prepaid",
      amount: 25.99,
    },
    {
      id: "2",
      trackingNumber: "CP001234568",
      pickupAddress: "789 Pine St, New York, NY",
      deliveryAddress: "321 Elm St, Queens, NY",
      status: "delivered",
      createdAt: "2024-01-14T09:15:00Z",
      estimatedDelivery: "2024-01-15T14:00:00Z",
      weight: 1.2,
      type: "Documents",
      paymentMethod: "cod",
      amount: 15.5,
    },
  ])

  useEffect(() => {
    on("parcel-updated", (data: any) => {
      setParcels((prev) =>
        prev.map((parcel) => (parcel.id === data.parcelId ? { ...parcel, status: data.status } : parcel)),
      )
    })
    return () => off("parcel-updated")
    // `on/off` are stable (useCallback) so empty deps are safe
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "picked-up":
        return <Package className="h-4 w-4" />
      case "in-transit":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "picked-up":
        return "bg-blue-100 text-blue-800"
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

  const stats = {
    totalParcels: parcels.length,
    inTransit: parcels.filter((p) => p.status === "in-transit").length,
    delivered: parcels.filter((p) => p.status === "delivered").length,
    pending: parcels.filter((p) => p.status === "pending").length,
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Track your parcels and manage your deliveries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalParcels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.inTransit}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your parcels and bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customer/book-parcel">
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Parcel
                </Button>
              </Link>
              <Link href="/customer/track">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Parcel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Parcels */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Parcels</CardTitle>
            <CardDescription>Your latest parcel bookings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parcels.map((parcel) => (
                <div key={parcel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(parcel.status)}
                      <div>
                        <p className="font-medium">{parcel.trackingNumber}</p>
                        <p className="text-sm text-gray-600">
                          {parcel.pickupAddress} → {parcel.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(parcel.status)}>
                      {parcel.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <Link href={`/customer/track/${parcel.trackingNumber}`}>
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
