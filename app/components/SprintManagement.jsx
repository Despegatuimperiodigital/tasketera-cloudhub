"use client"

import { useState } from "react"
import { Calendar, List, LayoutGrid, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SprintManagement() {
  const [view, setView] = useState("list")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-semibold">Gestión de sprints</h1>
            <p className="text-sm text-muted-foreground">Gestiona y monitorea el progreso de tus sprints</p>
          </div>

          {/* Navigation */}
          <Tabs defaultValue="todos" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList className="bg-transparent space-x-2">
                <TabsTrigger value="todos" className="data-[state=active]:bg-secondary">
                  <List className="h-4 w-4 mr-2" />
                  Todos los sprints
                </TabsTrigger>
                <TabsTrigger value="actual" className="data-[state=active]:bg-secondary">
                  <Calendar className="h-4 w-4 mr-2" />
                  Sprint actual
                </TabsTrigger>
                <TabsTrigger value="proximo" className="data-[state=active]:bg-secondary">
                  <span className="text-lg mr-2">+</span>
                  Próximo sprint
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={view === "list" ? "bg-secondary" : ""}
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={view === "board" ? "bg-secondary" : ""}
                  onClick={() => setView("board")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sprint Card */}
            <div className="bg-card rounded-lg border border-border/50">
              <div className="p-4 border-b border-border/50">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-medium">Sprint 139</h2>
                      <span className="text-sm text-muted-foreground">17 Ago - 31 Ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Activo</span>
                      <span className="text-xs text-muted-foreground">Progreso: 65%</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    Más acciones
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tarea</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Resp.</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prioridad</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">SP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-4">
                        <span className="font-medium">Definir las necesidades de importación de Jira</span>
                      </td>
                      <td className="p-4">
                        <div className="w-8 h-8 bg-secondary rounded-full" />
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                          Listo
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-info/20 text-info">
                          Alta
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">1 SP</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

