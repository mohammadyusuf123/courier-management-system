"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Package, Home, Users, Truck, BarChart3, Settings, LogOut, FileText } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CourierPro Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/parcels">
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-3" />
                  Manage Parcels
                </Button>
              </Link>
              <Link href="/admin/agents">
                <Button variant="ghost" className="w-full justify-start">
                  <Truck className="h-4 w-4 mr-3" />
                  Delivery Agents
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-3" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Analytics
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-3" />
                  Reports
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
