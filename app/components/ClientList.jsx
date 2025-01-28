"use client"

import { useState, useEffect } from "react"
import { getClients } from "@/app/lib/actions"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientList() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchClients = async () => {
      const fetchedClients = await getClients()
      setClients(fetchedClients)
    }
    fetchClients()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <Card key={client._id}>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
            <CardDescription>Cliente ID: {client._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={`/clients/${client._id}`}>Ver tableros</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

