export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

export type TaskPriority = "Baja" | "Media" | "Alta" | "Crítica"
export type TaskStatus = "Por hacer" | "En progreso" | "En revisión" | "Completado"

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: string
  storyPoints: number
  createdAt: Date
  updatedAt: Date
  relatedTasks: string[] // IDs de tareas relacionadas
}

export type Board = {
  id: string
  name: string
  clientId: string
  tasks: Task[]
  teamMemberIds: string[] // Nuevos miembros del equipo asignados al tablero
}

export type Client = {
  id: string
  name: string
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: string
}

