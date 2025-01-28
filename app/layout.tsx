import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./components/AuthProvider"
import { Loader2 } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>{({ isLoading }) => (isLoading ? <LoadingScreen /> : children)}</AuthProvider>
      </body>
    </html>
  )
}

