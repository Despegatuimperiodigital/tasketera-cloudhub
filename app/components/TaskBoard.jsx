"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { updateTaskStatus, getUsers, assignTask } from "@/app/lib/actions"
import { CreateTaskDialog } from "./CreateTaskDialog"
import { ExportTasksButton } from "./ExportTasksButton"
import { ImportTasksButton } from "./ImportTasksButton"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/lib/auth"

const statusColumns = ["Por hacer", "En progreso", "En revisión", "Completado"]

export default function TaskBoard({ boardId, initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [users, setUsers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const onDragEnd = async (result) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId
      const result = await updateTaskStatus(boardId, draggableId, newStatus)

      if (result.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === draggableId ? { ...task, status: newStatus } : task)),
        )
      }
    }
  }

  const handleAssignTask = async (taskId, userId) => {
    try {
      const result = await assignTask(boardId, taskId, userId)
      if (result.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, assigneeId: userId === "unassigned" ? null : userId } : task,
          ),
        )
      }
    } catch (error) {
      console.error("Error al asignar la tarea:", error)
    }
  }

  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return "Sin asignar"
    const assignee = users.find((u) => u._id === assigneeId)
    return assignee ? assignee.name : "Sin asignar"
  }

  const canAssignTasks = user?.role === "admin"

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tareas del tablero</h2>
        <div className="flex space-x-2">
          <ImportTasksButton boardId={boardId} />
          <ExportTasksButton tasks={tasks} />
          <CreateTaskDialog boardId={boardId} tasks={tasks} />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusColumns.map((status) => (
            <Card key={status}>
              <CardHeader>
                <CardTitle>{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[200px]">
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-secondary p-3 rounded-lg space-y-2"
                              >
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-muted-foreground">{task.description}</div>
                                <div className="flex justify-between items-center">
                                  <Badge>{task.priority}</Badge>
                                  {canAssignTasks ? (
                                    <Select
                                      value={task.assigneeId || "unassigned"}
                                      onValueChange={(value) => handleAssignTask(task.id, value)}
                                    >
                                      <SelectTrigger className="w-[150px]">
                                        <SelectValue>{getAssigneeName(task.assigneeId)}</SelectValue>
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="unassigned">Sin asignar</SelectItem>
                                        {users.map((user) => (
                                          <SelectItem key={user._id} value={user._id}>
                                            {user.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div className="text-sm text-muted-foreground">
                                      {getAssigneeName(task.assigneeId)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

