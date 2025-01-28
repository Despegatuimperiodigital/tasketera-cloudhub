import { createContext, useContext } from "react"
import { cookies } from "next/headers"

export type User = {
  id: string
  username: string
  role: "admin" | "user"
}

export type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export async function setAuthCookie(user: User) {
  document.cookie = `auth=${JSON.stringify(user)}; path=/; max-age=86400; secure; samesite=strict`
}

export async function removeAuthCookie() {
  document.cookie = `auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

