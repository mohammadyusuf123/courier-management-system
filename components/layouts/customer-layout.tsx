"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Package, Home, Plus, MapPin, History, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"

interface CustomerLayoutProps {
  children: ReactNode
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
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
              <span className="ml-2 text-xl font-bold text-gray-900">CourierPro</span>
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
              <Link href="/customer/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/customer/book-parcel">
                <Button variant="ghost" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-3" />
                  Book Parcel
                </Button>
              </Link>
              <Link href="/customer/track">
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-3" />
                  Track Parcel
                </Button>
              </Link>
              <Link href="/customer/history">
                <Button variant="ghost" className="w-full justify-start">
                  <History className="h-4 w-4 mr-3" />
                  Booking History
                </Button>
              </Link>
              <Link href="/customer/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-3" />
                  Profile
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
