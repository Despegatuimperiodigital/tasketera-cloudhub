"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, Code2, FileText, LayoutGrid, MessageSquare, Settings, Users, Zap } from "lucide-react"

const options = [
  { icon: Briefcase, label: "Proyectos" },
  { icon: Calendar, label: "Tareas" },
  { icon: MessageSquare, label: "Marketing" },
  { icon: LayoutGrid, label: "Diseño" },
  { icon: Users, label: "CRM" },
  { icon: Code2, label: "Software" },
  { icon: Settings, label: "IT" },
  { icon: Zap, label: "Operaciones" },
  { icon: FileText, label: "Producto" },
]

export default function ManagementOptions({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">¿Qué te gustaría gestionar?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {options.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
            >
              <option.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{option.label}</span>
            </Button>
          ))}
        </div>
        <div className="flex justify-center p-4">
          <Button className="button-gradient px-8">Comenzar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

