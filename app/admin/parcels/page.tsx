"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Plus,
  FileDown,
  UserPlus,
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Parcel {
  id: string
  trackingNumber: string
  sender: string
  recipient: string
  status: string
  priority: string
  createdAt: string
  amount: number
  agent?: string
  pickupAddress: string
  deliveryAddress: string
  weight: number
  type: string
}

export default function ManageParcelsPage() {
  const { toast } = useToast()
  const [parcels, setParcels] = useState<Parcel[]>([
    {
      id: "1",
      trackingNumber: "CP001234567",
      sender: "John Doe",
      recipient: "Jane Smith",
      status: "in-transit",
      priority: "high",
      createdAt: "2024-01-15",
      amount: 25.99,
      agent: "Mike Johnson",
      pickupAddress: "123 Main St, New York, NY",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY",
      weight: 2.5,
      type: "Electronics",
    },
    {
      id: "2",
      trackingNumber: "CP001234568",
      sender: "Alice Brown",
      recipient: "Bob Wilson",
      status: "delivered",
      priority: "medium",
      createdAt: "2024-01-14",
      amount: 15.5,
      agent: "Sarah Davis",
      pickupAddress: "789 Pine St, Manhattan, NY",
      deliveryAddress: "321 Elm St, Queens, NY",
      weight: 1.8,
      type: "Documents",
    },
    {
      id: "3",
      trackingNumber: "CP001234569",
      sender: "Charlie Green",
      recipient: "David Lee",
      status: "pending",
      priority: "low",
      createdAt: "2024-01-16",
      amount: 32.75,
      pickupAddress: "555 Broadway, Manhattan, NY",
      deliveryAddress: "777 Atlantic Ave, Brooklyn, NY",
      weight: 3.2,
      type: "Clothing",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [newParcel, setNewParcel] = useState({
    sender: "",
    recipient: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    type: "",
    priority: "medium",
    amount: "",
  })

  const handleAddParcel = () => {
    const parcel: Parcel = {
      id: Date.now().toString(),
      trackingNumber: `CP${Date.now()}`,
      sender: newParcel.sender,
      recipient: newParcel.recipient,
      status: "pending",
      priority: newParcel.priority,
      createdAt: new Date().toISOString().split("T")[0],
      amount: Number.parseFloat(newParcel.amount),
      pickupAddress: newParcel.pickupAddress,
      deliveryAddress: newParcel.deliveryAddress,
      weight: Number.parseFloat(newParcel.weight),
      type: newParcel.type,
    }

    setParcels([...parcels, parcel])
    setIsAddDialogOpen(false)
    setNewParcel({
      sender: "",
      recipient: "",
      pickupAddress: "",
      deliveryAddress: "",
      weight: "",
      type: "",
      priority: "medium",
      amount: "",
    })

    toast({
      title: "Parcel Added",
      description: `Parcel ${parcel.trackingNumber} has been created successfully.`,
    })
  }

  const handleEditParcel = () => {
    if (!selectedParcel) return

    setParcels(parcels.map((p) => (p.id === selectedParcel.id ? selectedParcel : p)))
    setIsEditDialogOpen(false)
    setSelectedParcel(null)

    toast({
      title: "Parcel Updated",
      description: "Parcel information has been updated successfully.",
    })
  }

  const handleDeleteParcel = (parcelId: string) => {
    setParcels(parcels.filter((p) => p.id !== parcelId))
    toast({
      title: "Parcel Deleted",
      description: "Parcel has been removed from the system.",
      variant: "destructive",
    })
  }

  const handleAssignAgent = (parcelId: string) => {
    const agents = ["Mike Johnson", "Sarah Davis", "Tom Wilson", "Lisa Brown"]
    const randomAgent = agents[Math.floor(Math.random() * agents.length)]

    setParcels(parcels.map((p) => (p.id === parcelId ? { ...p, agent: randomAgent, status: "assigned" } : p)))

    toast({
      title: "Agent Assigned",
      description: `Parcel has been assigned to ${randomAgent}.`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Parcel data is being exported...",
    })

    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Tracking Number,Sender,Recipient,Status,Priority,Amount,Date\n" +
        filteredParcels
          .map(
            (p) =>
              `${p.trackingNumber},${p.sender},${p.recipient},${p.status},${p.priority},${p.amount},${p.createdAt}`,
          )
          .join("\n")

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "parcels_export.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Complete",
        description: "Parcel data has been exported successfully.",
      })
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "picked-up":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
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

  const filteredParcels = parcels.filter(
    (parcel) =>
      (statusFilter === "all" || parcel.status === statusFilter) &&
      (priorityFilter === "all" || parcel.priority === priorityFilter) &&
      (parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Manage Parcels
            </h1>
            <p className="text-gray-600 text-lg">Monitor and manage all parcel deliveries</p>
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
                  <Plus className="h-4 w-4 mr-2" />
                  Add Parcel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Parcel</DialogTitle>
                  <DialogDescription>Create a new parcel for delivery</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender">Sender Name</Label>
                    <Input
                      id="sender"
                      value={newParcel.sender}
                      onChange={(e) => setNewParcel({ ...newParcel, sender: e.target.value })}
                      placeholder="Enter sender name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Name</Label>
                    <Input
                      id="recipient"
                      value={newParcel.recipient}
                      onChange={(e) => setNewParcel({ ...newParcel, recipient: e.target.value })}
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="pickupAddress">Pickup Address</Label>
                    <Textarea
                      id="pickupAddress"
                      value={newParcel.pickupAddress}
                      onChange={(e) => setNewParcel({ ...newParcel, pickupAddress: e.target.value })}
                      placeholder="Enter pickup address"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={newParcel.deliveryAddress}
                      onChange={(e) => setNewParcel({ ...newParcel, deliveryAddress: e.target.value })}
                      placeholder="Enter delivery address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={newParcel.weight}
                      onChange={(e) => setNewParcel({ ...newParcel, weight: e.target.value })}
                      placeholder="0.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Package Type</Label>
                    <Input
                      id="type"
                      value={newParcel.type}
                      onChange={(e) => setNewParcel({ ...newParcel, type: e.target.value })}
                      placeholder="e.g., Electronics, Documents"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newParcel.priority}
                      onValueChange={(value) => setNewParcel({ ...newParcel, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newParcel.amount}
                      onChange={(e) => setNewParcel({ ...newParcel, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddParcel} className="bg-blue-600 hover:bg-blue-700">
                    Add Parcel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Parcels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{parcels.length}</div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">
                {parcels.filter((p) => p.status === "delivered").length}
              </div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900">
                {parcels.filter((p) => p.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card
            className="animate-slide-up hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">
                {parcels.filter((p) => p.status === "in-transit").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by tracking number, sender, or recipient..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="picked-up">Picked Up</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[200px] border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Parcels Table */}
        <Card className="animate-slide-up hover-lift" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Parcels ({filteredParcels.length})
            </CardTitle>
            <CardDescription>Manage all parcel deliveries in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">Tracking Number</TableHead>
                    <TableHead className="font-semibold">Sender</TableHead>
                    <TableHead className="font-semibold">Recipient</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    <TableHead className="font-semibold">Agent</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParcels.map((parcel, index) => (
                    <TableRow
                      key={parcel.id}
                      className="animate-fade-in hover:bg-gray-50 transition-colors border-b border-gray-100"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium text-blue-600">{parcel.trackingNumber}</TableCell>
                      <TableCell>{parcel.sender}</TableCell>
                      <TableCell>{parcel.recipient}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(parcel.status)} border font-medium`}>
                          {parcel.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getPriorityColor(parcel.priority)} border font-medium`}>
                          {parcel.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={parcel.agent ? "text-green-600 font-medium" : "text-gray-400"}>
                          {parcel.agent || "Unassigned"}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">${parcel.amount}</TableCell>
                      <TableCell>{new Date(parcel.createdAt).toLocaleDateString()}</TableCell>
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
                                setSelectedParcel(parcel)
                                setIsViewDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedParcel(parcel)
                                setIsEditDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {!parcel.agent && (
                              <DropdownMenuItem onClick={() => handleAssignAgent(parcel.id)} className="cursor-pointer">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assign Agent
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `https://maps.google.com/maps?q=${encodeURIComponent(parcel.deliveryAddress)}`,
                                  "_blank",
                                )
                              }
                              className="cursor-pointer"
                            >
                              <MapPin className="mr-2 h-4 w-4" />
                              Track Location
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteParcel(parcel.id)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

        {/* View Parcel Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Parcel Details</DialogTitle>
              <DialogDescription>{selectedParcel?.trackingNumber}</DialogDescription>
            </DialogHeader>
            {selectedParcel && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Sender</Label>
                    <p className="text-sm">{selectedParcel.sender}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Recipient</Label>
                    <p className="text-sm">{selectedParcel.recipient}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <Badge className={getStatusColor(selectedParcel.status)}>
                      {selectedParcel.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Priority</Label>
                    <Badge className={getPriorityColor(selectedParcel.priority)}>
                      {selectedParcel.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Pickup Address</Label>
                  <p className="text-sm">{selectedParcel.pickupAddress}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Delivery Address</Label>
                  <p className="text-sm">{selectedParcel.deliveryAddress}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Weight</Label>
                    <p className="text-sm">{selectedParcel.weight} kg</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Type</Label>
                    <p className="text-sm">{selectedParcel.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Amount</Label>
                    <p className="text-sm">${selectedParcel.amount}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Parcel Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Parcel</DialogTitle>
              <DialogDescription>Update parcel information</DialogDescription>
            </DialogHeader>
            {selectedParcel && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-sender">Sender Name</Label>
                  <Input
                    id="edit-sender"
                    value={selectedParcel.sender}
                    onChange={(e) => setSelectedParcel({ ...selectedParcel, sender: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-recipient">Recipient Name</Label>
                  <Input
                    id="edit-recipient"
                    value={selectedParcel.recipient}
                    onChange={(e) => setSelectedParcel({ ...selectedParcel, recipient: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-pickup">Pickup Address</Label>
                  <Textarea
                    id="edit-pickup"
                    value={selectedParcel.pickupAddress}
                    onChange={(e) => setSelectedParcel({ ...selectedParcel, pickupAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-delivery">Delivery Address</Label>
                  <Textarea
                    id="edit-delivery"
                    value={selectedParcel.deliveryAddress}
                    onChange={(e) => setSelectedParcel({ ...selectedParcel, deliveryAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedParcel.status}
                    onValueChange={(value) => setSelectedParcel({ ...selectedParcel, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="picked-up">Picked Up</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={selectedParcel.priority}
                    onValueChange={(value) => setSelectedParcel({ ...selectedParcel, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditParcel} className="bg-blue-600 hover:bg-blue-700">
                Update Parcel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
