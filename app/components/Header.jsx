"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              CloudHub
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 text-sm hover:text-primary transition-colors">
                  <span className="flex items-center">
                    Productos
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/tareas">Gestión de Tareas</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-2 text-sm hover:text-primary transition-colors">
                  <span className="flex items-center">
                    Soluciones
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/canvas">Canvas de Negocio</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/recursos" className="px-4 py-2 text-sm hover:text-primary transition-colors">
                Recursos
              </Link>
              <Link href="/clients" className="px-4 py-2 text-sm hover:text-primary transition-colors">
                Clientes
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/precios" className="px-4 py-2 text-sm hover:text-primary transition-colors">
                Precios
              </Link>
              <Link href="/contacto" className="px-4 py-2 text-sm hover:text-primary transition-colors">
                Contacto
              </Link>
            </nav>
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
            <Button size="sm">Comenzar</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

