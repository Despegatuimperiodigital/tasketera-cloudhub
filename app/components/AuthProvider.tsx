"use client"

import { useState, useEffect } from "react"
import { AuthContext, type User, setAuthCookie, removeAuthCookie } from "@/app/lib/auth"
import { useRouter } from "next/navigation"

const INITIAL_USER = {
  id: "1",
  username: "f.correak",
  role: "admin",
} as const

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for auth cookie on mount
    const checkAuth = () => {
      const cookies = document.cookie.split(";")
      const authCookie = cookies.find((cookie) => cookie.trim().startsWith("auth="))
      if (authCookie) {
        try {
          const user = JSON.parse(authCookie.split("=")[1])
          setUser(user)
        } catch (error) {
          console.error("Error parsing auth cookie:", error)
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (username === "f.correak" && password === "zealot15") {
        await setAuthCookie(INITIAL_USER)
        setUser(INITIAL_USER)
        router.push("/")
        return true
      }
      return false
    } catch (error) {
      console.error("Error during login:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await removeAuthCookie()
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

