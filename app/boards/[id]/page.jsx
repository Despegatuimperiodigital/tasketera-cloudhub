import { getBoards } from "@/app/lib/actions"
import TaskBoard from "@/app/components/TaskBoard"

export default async function BoardPage({ params }) {
  const boards = await getBoards()
  const board = boards.find((b) => b._id.toString() === params.id)

  if (!board) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tablero no encontrado</h1>
          <p className="text-muted-foreground">El tablero que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <TaskBoard boardId={board._id.toString()} initialTasks={board.tasks} />
    </div>
  )
}

