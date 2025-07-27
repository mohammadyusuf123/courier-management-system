"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Package, Users, DollarSign, Clock, MapPin } from "lucide-react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const deliveryData = [
  { name: "Mon", deliveries: 45, revenue: 1250, failed: 2 },
  { name: "Tue", deliveries: 52, revenue: 1430, failed: 1 },
  { name: "Wed", deliveries: 38, revenue: 1050, failed: 3 },
  { name: "Thu", deliveries: 61, revenue: 1680, failed: 2 },
  { name: "Fri", deliveries: 73, revenue: 2010, failed: 1 },
  { name: "Sat", deliveries: 89, revenue: 2450, failed: 4 },
  { name: "Sun", deliveries: 67, revenue: 1850, failed: 2 },
]

const monthlyData = [
  { month: "Jan", revenue: 45000, deliveries: 1250, customers: 280 },
  { month: "Feb", revenue: 52000, deliveries: 1430, customers: 320 },
  { month: "Mar", revenue: 48000, deliveries: 1350, customers: 350 },
  { month: "Apr", revenue: 61000, deliveries: 1680, customers: 380 },
  { month: "May", revenue: 73000, deliveries: 2010, customers: 420 },
  { month: "Jun", revenue: 89000, deliveries: 2450, customers: 480 },
]

const statusData = [
  { name: "Delivered", value: 842, color: "#10B981" },
  { name: "In Transit", value: 156, color: "#8B5CF6" },
  { name: "Pending", value: 89, color: "#F59E0B" },
  { name: "Failed", value: 23, color: "#EF4444" },
]

const regionData = [
  { region: "Manhattan", deliveries: 245, growth: 12 },
  { region: "Brooklyn", deliveries: 189, growth: 8 },
  { region: "Queens", deliveries: 167, growth: 15 },
  { region: "Bronx", deliveries: 134, growth: 5 },
  { region: "Staten Island", deliveries: 78, growth: 18 },
]

const chartConfig = {
  deliveries: { label: "Deliveries", color: "hsl(var(--chart-1))" },
  revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
  failed: { label: "Failed", color: "hsl(var(--chart-3))" },
  customers: { label: "Customers", color: "hsl(var(--chart-4))" },
}

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your courier operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,420</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +15.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +22.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24m</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
                -5.2% faster than last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Performance */}
              <Card className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
                <CardHeader>
                  <CardTitle>Daily Performance</CardTitle>
                  <CardDescription>Deliveries and revenue over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={deliveryData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="deliveries" fill="var(--color-deliveries)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Delivery Status Distribution */}
              <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Delivery Status Distribution</CardTitle>
                  <CardDescription>Current status of all parcels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {statusData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Revenue Trend */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.35s" }}>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue, deliveries, and customer growth over 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        fill="var(--color-revenue)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="deliveries"
                        stroke="var(--color-deliveries)"
                        fill="var(--color-deliveries)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                  <CardDescription>Top performing delivery agents this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Mike Johnson", deliveries: 142, rating: 4.9, efficiency: 95 },
                      { name: "Sarah Davis", deliveries: 138, rating: 4.8, efficiency: 92 },
                      { name: "Tom Wilson", deliveries: 129, rating: 4.7, efficiency: 89 },
                      { name: "Lisa Brown", deliveries: 125, rating: 4.8, efficiency: 91 },
                    ].map((agent, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.deliveries} deliveries</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">{agent.rating}</span>
                          </div>
                          <div className="text-sm text-gray-500">{agent.efficiency}% efficiency</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Delivery Time Analysis</CardTitle>
                  <CardDescription>Average delivery times by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={[
                          { time: "6-9 AM", avgTime: 28 },
                          { time: "9-12 PM", avgTime: 22 },
                          { time: "12-3 PM", avgTime: 25 },
                          { time: "3-6 PM", avgTime: 31 },
                          { time: "6-9 PM", avgTime: 35 },
                        ]}
                      >
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="avgTime" stroke="var(--color-deliveries)" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Delivery volume and growth by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg animate-fade-in hover:bg-gray-50 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium">{region.region}</div>
                          <div className="text-sm text-gray-500">{region.deliveries} deliveries this month</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={region.growth > 10 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                        >
                          +{region.growth}% growth
                        </Badge>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(region.deliveries / 245) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Customer Growth Trends</CardTitle>
                <CardDescription>New customer acquisitions and retention metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="customers" stroke="var(--color-customers)" strokeWidth={3} />
                      <Line
                        type="monotone"
                        dataKey="deliveries"
                        stroke="var(--color-deliveries)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
