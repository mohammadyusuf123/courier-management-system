"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Truck,
  Search,
  UserPlus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  FileDown,
  UserCheck,
} from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  status: "online" | "offline" | "busy"
  activeDeliveries: number
  completedDeliveries: number
  rating: number
  joinedDate: string
  location: string
  vehicleType: string
  vehicleModel: string
  licensePlate: string
}

export default function DeliveryAgentsPage() {
  const { toast } = useToast()
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1234567890",
      status: "online",
      activeDeliveries: 5,
      completedDeliveries: 342,
      rating: 4.8,
      joinedDate: "2023-03-15",
      location: "Manhattan, NY",
      vehicleType: "Motorcycle",
      vehicleModel: "Honda CB500X",
      licensePlate: "ABC-1234",
    },
    {
      id: "2",
      name: "Sarah Davis",
      email: "sarah@example.com",
      phone: "+1234567891",
      status: "busy",
      activeDeliveries: 3,
      completedDeliveries: 289,
      rating: 4.9,
      joinedDate: "2023-02-10",
      location: "Brooklyn, NY",
      vehicleType: "Van",
      vehicleModel: "Ford Transit",
      licensePlate: "XYZ-5678",
    },
    {
      id: "3",
      name: "Tom Wilson",
      email: "tom@example.com",
      phone: "+1234567892",
      status: "offline",
      activeDeliveries: 0,
      completedDeliveries: 156,
      rating: 4.6,
      joinedDate: "2023-05-20",
      location: "Queens, NY",
      vehicleType: "Bicycle",
      vehicleModel: "Trek FX 3",
      licensePlate: "N/A",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    vehicleType: "",
    vehicleModel: "",
    licensePlate: "",
  })

  const [availableParcels] = useState([
    { id: "1", trackingNumber: "CP001234567", address: "123 Main St, NY", priority: "high" },
    { id: "2", trackingNumber: "CP001234568", address: "456 Oak Ave, NY", priority: "medium" },
    { id: "3", trackingNumber: "CP001234569", address: "789 Pine St, NY", priority: "low" },
  ])

  const handleAddAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      email: newAgent.email,
      phone: newAgent.phone,
      status: "offline",
      activeDeliveries: 0,
      completedDeliveries: 0,
      rating: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      location: newAgent.location,
      vehicleType: newAgent.vehicleType,
      vehicleModel: newAgent.vehicleModel,
      licensePlate: newAgent.licensePlate,
    }

    setAgents([...agents, agent])
    setIsAddDialogOpen(false)
    setNewAgent({
      name: "",
      email: "",
      phone: "",
      location: "",
      vehicleType: "",
      vehicleModel: "",
      licensePlate: "",
    })

    toast({
      title: "Agent Added",
      description: `${agent.name} has been added to the system.`,
    })
  }

  const handleEditAgent = () => {
    if (!selectedAgent) return

    setAgents(agents.map((a) => (a.id === selectedAgent.id ? selectedAgent : a)))
    setIsEditDialogOpen(false)
    setSelectedAgent(null)

    toast({
      title: "Agent Updated",
      description: "Agent information has been updated successfully.",
    })
  }

  const handleDeleteAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId)
    setAgents(agents.filter((a) => a.id !== agentId))
    toast({
      title: "Agent Removed",
      description: `${agent?.name} has been removed from the system.`,
      variant: "destructive",
    })
  }

  const handleAssignParcels = (parcelIds: string[]) => {
    if (!selectedAgent) return

    setAgents(
      agents.map((a) =>
        a.id === selectedAgent.id ? { ...a, activeDeliveries: a.activeDeliveries + parcelIds.length } : a,
      ),
    )
    setIsAssignDialogOpen(false)
    setSelectedAgent(null)

    toast({
      title: "Parcels Assigned",
      description: `${parcelIds.length} parcel(s) assigned successfully.`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Agent data is being exported...",
    })

    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Name,Email,Phone,Status,Active Deliveries,Completed,Rating,Location\n" +
        filteredAgents
          .map(
            (a) =>
              `${a.name},${a.email},${a.phone},${a.status},${a.activeDeliveries},${a.completedDeliveries},${a.rating},${a.location}`,
          )
          .join("\n")

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "agents_export.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Complete",
        description: "Agent data has been exported successfully.",
      })
    }, 2000)
  }

  const handleTrackLocation = (agent: Agent) => {
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(agent.location)}`, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "busy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const filteredAgents = agents.filter(
    (agent) =>
      (statusFilter === "all" || agent.status === statusFilter) &&
      (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Delivery Agents
            </h1>
            <p className="text-gray-600 text-lg">Manage your delivery team and monitor performance</p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 text-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <FileDown className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>Add a new delivery agent to your team</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newAgent.phone}
                      onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAgent.location}
                      onChange={(e) => setNewAgent({ ...newAgent, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={newAgent.vehicleType}
                      onValueChange={(value) => setNewAgent({ ...newAgent, vehicleType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bicycle">Bicycle</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel">Vehicle Model</Label>
                    <Input
                      id="vehicleModel"
                      value={newAgent.vehicleModel}
                      onChange={(e) => setNewAgent({ ...newAgent, vehicleModel: e.target.value })}
                      placeholder="Enter vehicle model"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      value={newAgent.licensePlate}
                      onChange={(e) => setNewAgent({ ...newAgent, licensePlate: e.target.value })}
                      placeholder="Enter license plate (or N/A for bicycle)"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAgent} className="bg-blue-600 hover:bg-blue-700">
                    Add Agent
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Agents</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Truck className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{agents.length}</div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            style={{ animationDelay: "0.05s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Online Now</CardTitle>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">
                {agents.filter((a) => a.status === "online").length}
              </div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Busy</CardTitle>
              <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900">
                {agents.filter((a) => a.status === "busy").length}
              </div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            style={{ animationDelay: "0.15s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Avg Rating</CardTitle>
              <span className="text-yellow-500 text-lg">⭐</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">
                {(agents.reduce((acc, agent) => acc + agent.rating, 0) / agents.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Search & Filter Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px] border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Agents Table */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.25s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-blue-600" />
              Agents ({filteredAgents.length})
            </CardTitle>
            <CardDescription>Manage your delivery agents and track their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Agent</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Active</TableHead>
                    <TableHead className="font-semibold">Completed</TableHead>
                    <TableHead className="font-semibold">Rating</TableHead>
                    <TableHead className="font-semibold">Joined</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent, index) => (
                    <TableRow
                      key={agent.id}
                      className="animate-fade-in hover:bg-gray-50 transition-colors border-b border-gray-100"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                                {agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${getStatusDot(agent.status)} border-2 border-white animate-pulse`}
                            ></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(agent.status)} border font-medium`}>
                          {agent.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{agent.phone}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {agent.vehicleType} - {agent.vehicleModel}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{agent.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-sm">
                          {agent.activeDeliveries}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
                          {agent.completedDeliveries}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-medium">{agent.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{new Date(agent.joinedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAgent(agent)
                                setIsViewDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAgent(agent)
                                setIsEditDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedAgent(agent)
                                setIsAssignDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Assign Parcels
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTrackLocation(agent)} className="cursor-pointer">
                              <MapPin className="mr-2 h-4 w-4" />
                              Track Location
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteAgent(agent.id)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Agent
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Agent Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agent Profile</DialogTitle>
              <DialogDescription>
                {selectedAgent?.name} - {selectedAgent?.email}
              </DialogDescription>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold">
                      {selectedAgent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAgent.name}</h3>
                    <p className="text-gray-600">{selectedAgent.email}</p>
                    <Badge className={getStatusColor(selectedAgent.status)}>{selectedAgent.status.toUpperCase()}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    <p className="text-sm">{selectedAgent.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Location</Label>
                    <p className="text-sm">{selectedAgent.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Vehicle</Label>
                    <p className="text-sm">
                      {selectedAgent.vehicleType} - {selectedAgent.vehicleModel}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">License Plate</Label>
                    <p className="text-sm">{selectedAgent.licensePlate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Active Deliveries</Label>
                    <p className="text-sm font-semibold text-blue-600">{selectedAgent.activeDeliveries}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Completed Deliveries</Label>
                    <p className="text-sm font-semibold text-green-600">{selectedAgent.completedDeliveries}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Rating</Label>
                    <p className="text-sm font-semibold">⭐ {selectedAgent.rating}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Joined Date</Label>
                    <p className="text-sm">{new Date(selectedAgent.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Agent Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Agent</DialogTitle>
              <DialogDescription>Update agent information</DialogDescription>
            </DialogHeader>
            {selectedAgent && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedAgent.name}
                    onChange={(e) => setSelectedAgent({ ...selectedAgent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    value={selectedAgent.email}
                    onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedAgent.phone}
                    onChange={(e) => setSelectedAgent({ ...selectedAgent, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={selectedAgent.location}
                    onChange={(e) => setSelectedAgent({ ...selectedAgent, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedAgent.status}
                    onValueChange={(value: any) => setSelectedAgent({ ...selectedAgent, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-vehicle">Vehicle Type</Label>
                  <Select
                    value={selectedAgent.vehicleType}
                    onValueChange={(value) => setSelectedAgent({ ...selectedAgent, vehicleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="bicycle">Bicycle</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditAgent} className="bg-blue-600 hover:bg-blue-700">
                Update Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Assign Parcels Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assign Parcels</DialogTitle>
              <DialogDescription>Assign parcels to {selectedAgent?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">Available parcels for assignment:</div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableParcels.map((parcel) => (
                  <div key={parcel.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{parcel.trackingNumber}</div>
                      <div className="text-sm text-gray-600">{parcel.address}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(parcel.priority)}>{parcel.priority.toUpperCase()}</Badge>
                      <Button
                        size="sm"
                        onClick={() => handleAssignParcels([parcel.id])}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleAssignParcels(availableParcels.map((p) => p.id))}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Assign All
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )

  function getPriorityColor(priority: string) {
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
}
