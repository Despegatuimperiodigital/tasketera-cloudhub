"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateBoardDialog } from "./CreateBoardDialog"
import { CreateClientDialog } from "./CreateClientDialog"
import { CreateTeamMemberDialog } from "./CreateTeamMemberDialog"

export function BoardSelector({ boards, clients, onBoardSelect }) {
  const [selectedBoardId, setSelectedBoardId] = useState(boards[0]?._id.toString() || "")

  const handleBoardChange = (boardId) => {
    setSelectedBoardId(boardId)
    onBoardSelect(boardId)
  }

  return (
    <div className="flex items-center space-x-4 mb-6">
      <Select value={selectedBoardId} onValueChange={handleBoardChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Selecciona un tablero" />
        </SelectTrigger>
        <SelectContent>
          {boards.map((board) => (
            <SelectItem key={board._id} value={board._id.toString()}>
              {board.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <CreateBoardDialog clients={clients} />
      <CreateClientDialog />
      <CreateTeamMemberDialog />
    </div>
  )
}

