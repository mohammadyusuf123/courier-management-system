"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Package, MapPin, Star } from "lucide-react"
import { CustomerLayout } from "@/components/layouts/customer-layout"

interface BookingHistory {
  id: string
  trackingNumber: string
  pickupAddress: string
  deliveryAddress: string
  recipientName: string
  status: string
  bookingDate: string
  deliveredDate?: string
  amount: number
  paymentMethod: string
  rating?: number
  feedback?: string
}

export default function BookingHistoryPage() {
  const [bookings] = useState<BookingHistory[]>([
    {
      id: "1",
      trackingNumber: "CP001234567",
      pickupAddress: "123 Main St, New York, NY",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY",
      recipientName: "Jane Smith",
      status: "delivered",
      bookingDate: "2024-01-15",
      deliveredDate: "2024-01-15",
      amount: 25.99,
      paymentMethod: "prepaid",
      rating: 5,
      feedback: "Great service, on time delivery!",
    },
    {
      id: "2",
      trackingNumber: "CP001234568",
      pickupAddress: "789 Pine St, New York, NY",
      deliveryAddress: "321 Elm St, Queens, NY",
      recipientName: "Bob Wilson",
      status: "delivered",
      bookingDate: "2024-01-14",
      deliveredDate: "2024-01-14",
      amount: 18.5,
      paymentMethod: "cod",
      rating: 4,
      feedback: "Good delivery, package was safe",
    },
    {
      id: "3",
      trackingNumber: "CP001234569",
      pickupAddress: "555 Broadway, Manhattan, NY",
      deliveryAddress: "777 Atlantic Ave, Brooklyn, NY",
      recipientName: "Carol Brown",
      status: "in-transit",
      bookingDate: "2024-01-16",
      amount: 32.75,
      paymentMethod: "prepaid",
    },
    {
      id: "4",
      trackingNumber: "CP001234570",
      pickupAddress: "111 Park Ave, New York, NY",
      deliveryAddress: "222 Ocean Dr, Staten Island, NY",
      recipientName: "David Lee",
      status: "failed",
      bookingDate: "2024-01-13",
      amount: 22.0,
      paymentMethod: "cod",
      rating: 1,
      feedback: "Package never arrived, very disappointed",
    },
    {
      id: "5",
      trackingNumber: "CP001234571",
      pickupAddress: "333 5th Ave, Manhattan, NY",
      deliveryAddress: "444 Beach St, Bronx, NY",
      recipientName: "Eva Martinez",
      status: "delivered",
      bookingDate: "2024-01-12",
      deliveredDate: "2024-01-12",
      amount: 28.25,
      paymentMethod: "prepaid",
      rating: 5,
      feedback: "Excellent service, very professional",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "week" && new Date(booking.bookingDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "month" && new Date(booking.bookingDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesStatus && matchesDate
  })

  const stats = {
    totalBookings: bookings.length,
    totalSpent: bookings.reduce((acc, b) => acc + b.amount, 0),
    successfulDeliveries: bookings.filter((b) => b.status === "delivered").length,
    averageRating: bookings
      .filter((b) => b.rating && b.rating > 0)
      .reduce((acc, b, _, arr) => acc + (b.rating || 0) / arr.length, 0),
  }

  return (
    <CustomerLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
            <p className="text-gray-600">View all your parcel bookings and track their status</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 animate-pulse-soft">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <span className="text-green-600">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">On deliveries</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Deliveries</CardTitle>
              <span className="text-green-600">✓</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successfulDeliveries}</div>
              <p className="text-xs text-muted-foreground">Completed orders</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="flex mt-1">{renderStars(Math.round(stats.averageRating))}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Filter Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by tracking number or recipient..."
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
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <Card
              key={booking.id}
              className="animate-slide-up hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{booking.trackingNumber}</CardTitle>
                    <CardDescription>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <span className="font-medium">${booking.amount}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Pickup Address</h4>
                    <p className="text-sm text-gray-600 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {booking.pickupAddress}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600 flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {booking.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Recipient: <strong>{booking.recipientName}</strong>
                    </span>
                    <span className="text-sm text-gray-600">
                      Payment: <strong>{booking.paymentMethod.toUpperCase()}</strong>
                    </span>
                    {booking.deliveredDate && (
                      <span className="text-sm text-gray-600">
                        Delivered: <strong>{new Date(booking.deliveredDate).toLocaleDateString()}</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {booking.rating && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{booking.rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>

                {booking.feedback && (
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm">
                      <strong>Your feedback:</strong> {booking.feedback}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
