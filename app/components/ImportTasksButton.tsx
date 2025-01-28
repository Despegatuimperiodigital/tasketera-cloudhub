"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { importTasks } from "@/app/lib/actions"
import { useRouter } from "next/navigation"

interface ImportTasksButtonProps {
  boardId: string
}

export function ImportTasksButton({ boardId }: ImportTasksButtonProps) {
  const [isImporting, setIsImporting] = useState(false)
  const router = useRouter()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const csv = e.target?.result
      if (typeof csv === "string") {
        try {
          const result = await importTasks(boardId, csv)
          if (result.success) {
            router.refresh()
          } else {
            console.error("Error importing tasks:", result.error)
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        } catch (error) {
          console.error("Error importing tasks:", error)
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      }
      setIsImporting(false)
    }
    reader.readAsText(file)
  }

  return (
    <>
      <input type="file" id="import-tasks" accept=".csv" className="hidden" onChange={handleFileUpload} />
      <Button
        onClick={() => document.getElementById("import-tasks")?.click()}
        variant="outline"
        size="sm"
        disabled={isImporting}
      >
        <Upload className="mr-2 h-4 w-4" />
        {isImporting ? "Importando..." : "Importar tareas"}
      </Button>
    </>
  )
}

