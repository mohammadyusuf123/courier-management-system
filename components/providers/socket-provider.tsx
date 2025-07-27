"use client"

import { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo, type ReactNode } from "react"

interface SocketContextType {
  isConnected: boolean
  emit: (event: string, data: any) => void
  on: (event: string, callback: (data: any) => void) => void
  off: (event: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const listenersRef = useRef<Map<string, ((data: any) => void)[]>>(new Map())

  useEffect(() => {
    // Simulate socket connection
    setIsConnected(true)

    return () => {
      setIsConnected(false)
    }
  }, [])

  const emit = useCallback((event: string, data: any) => {
    // Simulate socket emit
    console.log("Socket emit:", event, data)

    // Simulate real-time updates for demo
    if (event === "parcel-status-update") {
      setTimeout(() => {
        const listeners = listenersRef.current.get("parcel-updated")
        if (listeners) {
          listeners.forEach((callback) => callback(data))
        }
      }, 1000)
    }
  }, [])

  const on = useCallback((event: string, callback: (data: any) => void) => {
    const listeners = listenersRef.current.get(event) ?? []
    listeners.push(callback)
    listenersRef.current.set(event, listeners)
  }, [])

  const off = useCallback((event: string) => {
    listenersRef.current.delete(event)
  }, [])

  const value = useMemo(() => ({ isConnected, emit, on, off }), [isConnected, emit, on, off])
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}
