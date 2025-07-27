"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "agent" | "admin"
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Demo authentication logic
    const demoCredentials = {
      "admin@demo.com": { password: "admin123", role: "admin", name: "Admin User" },
      "agent@demo.com": { password: "agent123", role: "agent", name: "Delivery Agent" },
      "customer@demo.com": { password: "customer123", role: "customer", name: "Customer User" },
    }

    const credential = demoCredentials[email as keyof typeof demoCredentials]

    if (credential && credential.password === password && credential.role === role) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: credential.name,
        email,
        role: role as "customer" | "agent" | "admin",
        phone: "+1234567890",
        address: "123 Demo Street, Demo City",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
