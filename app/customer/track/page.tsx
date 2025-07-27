"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Package, Truck, CheckCircle, Clock, Phone, Navigation, Share2 } from "lucide-react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { TrackingMap } from "@/components/tracking/tracking-map"
import { useToast } from "@/hooks/use-toast"

export default function TrackParcelPage() {
  const { toast } = useToast()
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid tracking number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock tracking data based on input
    const mockData = {
      CP001234567: {
        trackingNumber: "CP001234567",
        status: "in-transit",
        currentLocation: "Distribution Center, Brooklyn",
        estimatedDelivery: "2024-01-16T15:00:00Z",
        timeline: [
          {
            status: "Order Placed",
            timestamp: "2024-01-15T10:30:00Z",
            location: "New York, NY",
            completed: true,
          },
          {
            status: "Picked Up",
            timestamp: "2024-01-15T14:20:00Z",
            location: "123 Main St, New York, NY",
            completed: true,
          },
          {
            status: "In Transit",
            timestamp: "2024-01-15T16:45:00Z",
            location: "Distribution Center, Brooklyn",
            completed: true,
          },
          {
            status: "Out for Delivery",
            timestamp: null,
            location: "Local Delivery Hub",
            completed: false,
          },
          {
            status: "Delivered",
            timestamp: null,
            location: "456 Oak Ave, Brooklyn, NY",
            completed: false,
          },
        ],
        parcelDetails: {
          weight: "2.5 kg",
          dimensions: "30×20×15 cm",
          type: "Electronics",
          paymentMethod: "Prepaid",
          sender: "John Doe",
          recipient: "Jane Smith",
          agentName: "Mike Johnson",
          agentPhone: "+1234567890",
        },
      },
      CP001234568: {
        trackingNumber: "CP001234568",
        status: "delivered",
        currentLocation: "Delivered",
        estimatedDelivery: "2024-01-14T12:00:00Z",
        timeline: [
          {
            status: "Order Placed",
            timestamp: "2024-01-13T09:30:00Z",
            location: "New York, NY",
            completed: true,
          },
          {
            status: "Picked Up",
            timestamp: "2024-01-13T11:20:00Z",
            location: "789 Pine St, Manhattan, NY",
            completed: true,
          },
          {
            status: "In Transit",
            timestamp: "2024-01-13T13:45:00Z",
            location: "Distribution Center, Queens",
            completed: true,
          },
          {
            status: "Out for Delivery",
            timestamp: "2024-01-14T09:00:00Z",
            location: "Local Delivery Hub",
            completed: true,
          },
          {
            status: "Delivered",
            timestamp: "2024-01-14T12:00:00Z",
            location: "321 Elm St, Queens, NY",
            completed: true,
          },
        ],
        parcelDetails: {
          weight: "1.8 kg",
          dimensions: "25×15×10 cm",
          type: "Documents",
          paymentMethod: "COD",
          sender: "Alice Brown",
          recipient: "Bob Wilson",
          agentName: "Sarah Davis",
          agentPhone: "+1234567891",
        },
      },
    }

    const data = mockData[trackingNumber as keyof typeof mockData]

    if (data) {
      setTrackingData(data)
      toast({
        title: "Tracking Found",
        description: `Parcel ${trackingNumber} found successfully.`,
      })
    } else {
      toast({
        title: "Not Found",
        description: "No parcel found with this tracking number.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleShareTracking = () => {
    if (!trackingData) return

    const shareUrl = `${window.location.origin}/track?number=${trackingData.trackingNumber}`
    navigator.clipboard.writeText(shareUrl)

    toast({
      title: "Link Copied",
      description: "Tracking link copied to clipboard.",
    })
  }

  const handleCallAgent = () => {
    if (!trackingData?.parcelDetails?.agentPhone) return

    window.open(`tel:${trackingData.parcelDetails.agentPhone}`)
    toast({
      title: "Calling Agent",
      description: `Calling ${trackingData.parcelDetails.agentName}...`,
    })
  }

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="h-4 w-4 text-gray-400" />

    switch (status) {
      case "Order Placed":
        return <Package className="h-4 w-4 text-blue-600" />
      case "Picked Up":
        return <Package className="h-4 w-4 text-green-600" />
      case "In Transit":
        return <Truck className="h-4 w-4 text-purple-600" />
      case "Out for Delivery":
        return <Truck className="h-4 w-4 text-orange-600" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Track Your Parcel
          </h1>
          <p className="text-gray-600 text-lg">Enter your tracking number to get real-time updates</p>
        </div>

        {/* Enhanced Tracking Input */}
        <Card className="animate-slide-up hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Enter Tracking Number
            </CardTitle>
            <CardDescription>Your tracking number can be found in your booking confirmation email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter tracking number (e.g., CP001234567)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                className="flex-1 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              />
              <Button
                onClick={handleTrack}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 transition-all duration-300 transform hover:scale-105"
              >
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Tracking..." : "Track"}
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Try these sample tracking numbers:</p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => setTrackingNumber("CP001234567")}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  CP001234567
                </button>
                <button
                  onClick={() => setTrackingNumber("CP001234568")}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  CP001234568
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Tracking: {trackingData.trackingNumber}</CardTitle>
                    <CardDescription>Current Location: {trackingData.currentLocation}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getStatusColor(trackingData.status)} border font-medium text-sm px-3 py-1`}>
                      {trackingData.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShareTracking}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:from-gray-100 hover:to-gray-200 transition-all duration-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Estimated Delivery</h4>
                      <p className="text-lg font-semibold text-blue-600">
                        {new Date(trackingData.estimatedDelivery).toLocaleDateString()} at{" "}
                        {new Date(trackingData.estimatedDelivery).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Parcel Details</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Type: {trackingData.parcelDetails.type}</p>
                        <p>Weight: {trackingData.parcelDetails.weight}</p>
                        <p>Dimensions: {trackingData.parcelDetails.dimensions}</p>
                        <p>Payment: {trackingData.parcelDetails.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Delivery Agent</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{trackingData.parcelDetails.agentName}</p>
                          <p className="text-sm text-gray-600">{trackingData.parcelDetails.agentPhone}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCallAgent}
                          className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 text-green-700 transition-all duration-300"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Sender & Recipient</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>From: {trackingData.parcelDetails.sender}</p>
                        <p>To: {trackingData.parcelDetails.recipient}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Tracking Timeline */}
            <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  Tracking Timeline
                </CardTitle>
                <CardDescription>Follow your parcel's journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 animate-fade-in ${event.completed ? "" : "opacity-60"}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`mt-1 p-2 rounded-full ${event.completed ? "bg-blue-100" : "bg-gray-100"}`}>
                        {getStatusIcon(event.status, event.completed)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${event.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {event.status}
                          </h3>
                          {event.timestamp && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm ${event.completed ? "text-gray-600" : "text-gray-400"} flex items-center mt-1`}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </p>
                        {event.completed && index < trackingData.timeline.length - 1 && (
                          <div className="w-px h-6 bg-gray-300 ml-4 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Live Map */}
            <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Live Tracking Map
                </CardTitle>
                <CardDescription>Real-time location of your parcel</CardDescription>
              </CardHeader>
              <CardContent>
                <TrackingMap trackingData={trackingData} />
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/maps?q=${encodeURIComponent(trackingData.currentLocation)}`,
                        "_blank",
                      )
                    }
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
