"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import React from "react"
// Asegúrate de importar el tipo Task de las definiciones
interface ExportTasksButtonProps {
  tasks: Task[]
}

export function ExportTasksButton({ tasks }: ExportTasksButtonProps) {
  const exportTasks = React.useCallback(() => {
    const headers = [
      "ID",
      "Título",
      "Descripción",
      "Estado",
      "Prioridad",
      "Puntos de historia",
      "Asignado a",
      "Tareas relacionadas",
    ]
    const csvContent = [
      headers.join(","),
      ...tasks.map((task) =>
        [
          task.id,
          `"${task.title.replace(/"/g, '""')}"`,
          `"${task.description.replace(/"/g, '""')}"`,
          task.status,
          task.priority,
          task.storyPoints,
          task.assigneeId || "",
          `"${task.relatedTasks.join(";")}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "tareas.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [tasks])

  return (
    <Button onClick={exportTasks} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Exportar tareas
    </Button>
  )
}

