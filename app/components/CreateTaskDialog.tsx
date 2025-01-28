"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTask, getUsers } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import type { User, Task } from "@/app/lib/definitions"

const priorities = ["Baja", "Media", "Alta", "Crítica"]

interface CreateTaskDialogProps {
  boardId: string
  tasks?: Task[]
  currentTaskId?: string
}

export function CreateTaskDialog({ boardId, tasks = [], currentTaskId }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<string>("")
  const [storyPoints, setStoryPoints] = useState("")
  const [assigneeId, setAssigneeId] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])
  const [relatedTasks, setRelatedTasks] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("priority", priority)
    formData.append("storyPoints", storyPoints)
    formData.append("assigneeId", assigneeId)
    formData.append("relatedTasks", JSON.stringify(relatedTasks))

    const result = await createTask(boardId, formData)
    if (result.success) {
      setOpen(false)
      router.refresh()
      // Reset form fields
      setTitle("")
      setDescription("")
      setPriority("")
      setStoryPoints("")
      setAssigneeId("")
      setRelatedTasks([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nueva tarea</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe la tarea..."
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la prioridad" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="storyPoints" className="block text-sm font-medium text-gray-700">
              Puntos de historia
            </label>
            <Input
              id="storyPoints"
              type="number"
              min="1"
              max="13"
              value={storyPoints}
              onChange={(e) => setStoryPoints(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
              Asignar a
            </label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un miembro del equipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Sin asignar</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="relatedTasks" className="block text-sm font-medium text-gray-700">
              Tareas relacionadas
            </label>
            <Select
              value={relatedTasks}
              onValueChange={(value) => setRelatedTasks(Array.isArray(value) ? value : [value])}
              multiple
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tareas relacionadas" />
              </SelectTrigger>
              <SelectContent>
                {tasks
                  .filter((task) => task.id !== currentTaskId)
                  .map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} type="button">
              Cancelar
            </Button>
            <Button type="submit">Crear tarea</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

