"use client"

import { useState, useEffect } from "react"
import { getBoards, getClients } from "./lib/actions"
import { BoardSelector } from "./components/BoardSelector"
import TaskBoard from "./components/TaskBoard"

export default function Home() {
  const [boards, setBoards] = useState([])
  const [clients, setClients] = useState([])
  const [selectedBoardId, setSelectedBoardId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBoards = await getBoards()
      const fetchedClients = await getClients()
      setBoards(fetchedBoards)
      setClients(fetchedClients)
      if (fetchedBoards.length > 0) {
        setSelectedBoardId(fetchedBoards[0]._id.toString())
      }
    }
    fetchData()
  }, [])

  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId)
  }

  const selectedBoard = boards.find((board) => board._id.toString() === selectedBoardId)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">CloudHub - Gestión de Tareas</h1>
      <BoardSelector boards={boards} clients={clients} onBoardSelect={handleBoardSelect} />
      {selectedBoard ? (
        <TaskBoard boardId={selectedBoard._id.toString()} initialTasks={selectedBoard.tasks} />
      ) : (
        <div className="text-center mt-8">
          <p className="text-lg text-muted-foreground">No hay tableros disponibles. Crea uno nuevo para comenzar.</p>
        </div>
      )}
    </div>
  )
}

