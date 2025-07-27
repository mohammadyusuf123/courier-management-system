"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Bell, Shield, Save, Edit, Camera, CreditCard } from "lucide-react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CustomerProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "+1234567890",
    address: "123 Customer Street, New York, NY 10001",
    secondaryAddress: "456 Office Building, Manhattan, NY 10016",
    companyName: "Tech Solutions Inc.",
    preferredDeliveryTime: "morning",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    trackingUpdates: true,
    promotionalEmails: false,
    deliveryInstructions: "Ring doorbell twice, leave at front desk if no answer",
  })

  const [paymentMethods] = useState([
    { id: "1", type: "card", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "card", last4: "5555", brand: "Mastercard", isDefault: false },
  ])

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <CustomerLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          <Button onClick={handleSave} disabled={isLoading} className="animate-pulse-soft">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="animate-slide-up">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-xl">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{profileData.name}</h3>
                    <p className="text-gray-600">{profileData.email}</p>
                    <p className="text-sm text-gray-500">Customer since January 2024</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input
                      id="companyName"
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Delivery Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryAddress">Primary Address</Label>
                  <Textarea
                    id="primaryAddress"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    placeholder="Enter your primary delivery address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryAddress">Secondary Address (Optional)</Label>
                  <Textarea
                    id="secondaryAddress"
                    value={profileData.secondaryAddress}
                    onChange={(e) => setProfileData({ ...profileData, secondaryAddress: e.target.value })}
                    placeholder="Enter an alternate delivery address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryInstructions">Default Delivery Instructions</Label>
                  <Textarea
                    id="deliveryInstructions"
                    value={preferences.deliveryInstructions}
                    onChange={(e) => setPreferences({ ...preferences, deliveryInstructions: e.target.value })}
                    placeholder="Special instructions for deliveries"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "smsNotifications",
                      label: "SMS Notifications",
                      description: "Receive notifications via SMS",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive browser push notifications",
                    },
                    {
                      key: "trackingUpdates",
                      label: "Tracking Updates",
                      description: "Get updates about your parcel status",
                    },
                    {
                      key: "promotionalEmails",
                      label: "Promotional Emails",
                      description: "Receive offers and promotional content",
                    },
                  ].map((setting, index) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-4 border rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{setting.label}</div>
                        <div className="text-sm text-gray-600">{setting.description}</div>
                      </div>
                      <Switch
                        checked={preferences[setting.key as keyof typeof preferences] as boolean}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            [setting.key]: checked,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </div>
                  <Button className="hover:scale-105 transition-transform">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        {method.brand}
                      </div>
                      <div>
                        <div className="font-medium">•••• •••• •••• {method.last4}</div>
                        <div className="text-sm text-gray-600">
                          {method.brand} ending in {method.last4}
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform bg-transparent"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Change Password</h3>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                      <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Account Activity</h3>
                        <p className="text-sm text-gray-600">View your recent account activity</p>
                      </div>
                      <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                        View Activity
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
