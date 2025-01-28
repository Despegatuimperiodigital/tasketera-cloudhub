"use client"

import { useState, useEffect } from "react"
import { getBoards } from "@/app/lib/actions"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientBoards({ clientId }) {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchBoards = async () => {
      const allBoards = await getBoards()
      const clientBoards = allBoards.filter((board) => board.clientId === clientId)
      setBoards(clientBoards)
    }
    fetchBoards()
  }, [clientId])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <Card key={board._id}>
          <CardHeader>
            <CardTitle>{board.name}</CardTitle>
            <CardDescription>Tablero ID: {board._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={`/boards/${board._id}`}>Ver tablero</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

