"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Maximize2 } from "lucide-react"

interface TrackingMapProps {
  trackingData: any
}

export function TrackingMap({ trackingData }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // This would integrate with Google Maps API in a real application
    // For demo purposes, we'll show an enhanced placeholder
  }, [trackingData])

  const handleOpenInMaps = () => {
    const location = encodeURIComponent(trackingData?.currentLocation || "New York, NY")
    window.open(`https://maps.google.com/maps?q=${location}`, "_blank")
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "text-purple-600"
      case "delivered":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div
      ref={mapRef}
      className={`relative w-full rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 h-auto" : "h-96"
      }`}
    >
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleFullscreen}
          className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInMaps}
          className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Open Maps
        </Button>
      </div>

      {/* Map Content */}
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center space-y-6 max-w-md">
          {/* Animated Map Icon */}
          <div className="relative">
            <div className="text-8xl animate-bounce-subtle">🗺️</div>
            <div className="absolute -top-2 -right-2">
              <div
                className={`w-6 h-6 rounded-full ${getStatusColor(trackingData?.status)} bg-current animate-pulse`}
              ></div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">Live Tracking Map</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-lg">
                <MapPin className={`h-5 w-5 ${getStatusColor(trackingData?.status)}`} />
                <span className="font-semibold">{trackingData?.currentLocation}</span>
              </div>
              <p className="text-gray-600">
                Status:{" "}
                <span className={`font-medium ${getStatusColor(trackingData?.status)}`}>
                  {trackingData?.status?.replace("-", " ").toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
              <div className="text-sm text-gray-600">Estimated Arrival</div>
              <div className="font-semibold text-blue-600">
                {trackingData?.estimatedDelivery
                  ? new Date(trackingData.estimatedDelivery).toLocaleTimeString()
                  : "Calculating..."}
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
              <div className="text-sm text-gray-600">Distance</div>
              <div className="font-semibold text-green-600">
                {trackingData?.status === "delivered" ? "Delivered" : "En Route"}
              </div>
            </div>
          </div>

          {/* Map Integration Note */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50">
            <p className="text-sm text-gray-700">
              <strong>Google Maps Integration:</strong> Real-time location tracking would be displayed here with live
              updates, route optimization, and delivery progress.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleOpenInMaps}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
            >
              Refresh Location
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-25"></div>
      </div>
    </div>
  )
}
