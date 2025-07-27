"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function BookParcelPage() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    pickupCity: "",
    pickupZip: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryZip: "",
    recipientName: "",
    recipientPhone: "",
    parcelType: "",
    weight: "",
    dimensions: "",
    description: "",
    paymentMethod: "prepaid",
    codAmount: "",
    specialInstructions: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const trackingNumber = "CP" + Math.random().toString(36).substr(2, 9).toUpperCase()

      toast({
        title: "Parcel booked successfully!",
        description: `Your tracking number is: ${trackingNumber}`,
      })

      router.push("/customer/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book parcel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book New Parcel</h1>
          <p className="text-gray-600">Fill in the details to schedule a pickup</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pickup Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pickup Information</CardTitle>
              <CardDescription>Where should we pick up your parcel?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Textarea
                    id="pickupAddress"
                    placeholder="Enter full pickup address"
                    value={formData.pickupAddress}
                    onChange={(e) => handleChange("pickupAddress", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupCity">City</Label>
                    <Input
                      id="pickupCity"
                      placeholder="City"
                      value={formData.pickupCity}
                      onChange={(e) => handleChange("pickupCity", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupZip">ZIP Code</Label>
                    <Input
                      id="pickupZip"
                      placeholder="ZIP Code"
                      value={formData.pickupZip}
                      onChange={(e) => handleChange("pickupZip", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
              <CardDescription>Where should we deliver your parcel?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="Enter full delivery address"
                    value={formData.deliveryAddress}
                    onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryCity">City</Label>
                    <Input
                      id="deliveryCity"
                      placeholder="City"
                      value={formData.deliveryCity}
                      onChange={(e) => handleChange("deliveryCity", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryZip">ZIP Code</Label>
                    <Input
                      id="deliveryZip"
                      placeholder="ZIP Code"
                      value={formData.deliveryZip}
                      onChange={(e) => handleChange("deliveryZip", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    placeholder="Full name of recipient"
                    value={formData.recipientName}
                    onChange={(e) => handleChange("recipientName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientPhone">Recipient Phone</Label>
                  <Input
                    id="recipientPhone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.recipientPhone}
                    onChange={(e) => handleChange("recipientPhone", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parcel Details */}
          <Card>
            <CardHeader>
              <CardTitle>Parcel Details</CardTitle>
              <CardDescription>Tell us about your parcel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parcelType">Parcel Type</Label>
                  <Select
                    value={formData.parcelType}
                    onValueChange={(value) => handleChange("parcelType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food Items</SelectItem>
                      <SelectItem value="fragile">Fragile Items</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
                  <Input
                    id="dimensions"
                    placeholder="e.g., 30×20×10"
                    value={formData.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the parcel contents"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Choose your payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange("paymentMethod", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prepaid" id="prepaid" />
                  <Label htmlFor="prepaid">Prepaid - Pay now online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                </div>
              </RadioGroup>

              {formData.paymentMethod === "cod" && (
                <div className="space-y-2">
                  <Label htmlFor="codAmount">COD Amount ($)</Label>
                  <Input
                    id="codAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.codAmount}
                    onChange={(e) => handleChange("codAmount", e.target.value)}
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
              <CardDescription>Any additional information for the delivery agent</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Ring doorbell twice, Leave at front desk, etc."
                value={formData.specialInstructions}
                onChange={(e) => handleChange("specialInstructions", e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Parcel"}
            </Button>
          </div>
        </form>
      </div>
    </CustomerLayout>
  )
}
