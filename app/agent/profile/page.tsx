"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Bell, Shield, Save, Edit, Camera } from "lucide-react"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AgentProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "Mike Johnson",
    email: user?.email || "mike@example.com",
    phone: user?.phone || "+1234567890",
    address: "123 Agent Street, New York, NY 10001",
    bio: "Experienced delivery agent with 2+ years in the field. Committed to providing excellent customer service and timely deliveries.",
    vehicleType: "motorcycle",
    vehicleModel: "Honda CB500X",
    licensePlate: "ABC-1234",
    emergencyContact: "Sarah Johnson",
    emergencyPhone: "+1234567891",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    autoAcceptOrders: false,
    workingHours: {
      start: "08:00",
      end: "18:00",
    },
  })

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
    <AgentLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your profile information and preferences</p>
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
            <TabsTrigger value="vehicle" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Vehicle</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Preferences</span>
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
                    <p className="text-sm text-gray-500">Agent ID: AG-2024-001</p>
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
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself and your experience..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Manage your delivery vehicle details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      value={profileData.vehicleType}
                      onChange={(e) => setProfileData({ ...profileData, vehicleType: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Vehicle Model</Label>
                    <Input
                      id="vehicleModel"
                      value={profileData.vehicleModel}
                      onChange={(e) => setProfileData({ ...profileData, vehicleModel: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      value={profileData.licensePlate}
                      onChange={(e) => setProfileData({ ...profileData, licensePlate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={profileData.emergencyPhone}
                      onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                    />
                  </div>
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
                      key: "autoAcceptOrders",
                      label: "Auto Accept Orders",
                      description: "Automatically accept matching delivery orders",
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

                <div className="space-y-4">
                  <h3 className="font-medium">Working Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={preferences.workingHours.start}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            workingHours: { ...preferences.workingHours, start: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={preferences.workingHours.end}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            workingHours: { ...preferences.workingHours, end: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
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
                        <h3 className="font-medium">Login History</h3>
                        <p className="text-sm text-gray-600">View your recent login activity</p>
                      </div>
                      <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                        View History
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgentLayout>
  )
}
