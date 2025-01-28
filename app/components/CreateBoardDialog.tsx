"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createBoard, getClients, getTeamMembers } from "@/app/lib/actions"
import { useRouter } from "next/navigation"
import type { Client, TeamMember } from "@/app/lib/definitions"
import { CreateClientDialog } from "./CreateClientDialog"

export function CreateBoardDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [clientId, setClientId] = useState("")
  const [clients, setClients] = useState<Client[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const fetchedClients = await getClients()
      const fetchedTeamMembers = await getTeamMembers()
      setClients(fetchedClients)
      setTeamMembers(fetchedTeamMembers)
    }
    fetchData()
  }, [])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const result = await createBoard(clientId, name, selectedTeamMembers)
    if (result.success) {
      setOpen(false)
      router.refresh()
      setName("")
      setClientId("")
      setSelectedTeamMembers([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo tablero
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo tablero</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del tablero
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del tablero"
              required
            />
          </div>

          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <div className="flex items-center space-x-2">
              <Select value={clientId} onValueChange={setClientId} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CreateClientDialog />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Miembros del equipo</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={selectedTeamMembers.includes(member.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTeamMembers([...selectedTeamMembers, member.id])
                      } else {
                        setSelectedTeamMembers(selectedTeamMembers.filter((id) => id !== member.id))
                      }
                    }}
                  />
                  <label
                    htmlFor={`member-${member.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {member.name} - {member.role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} type="button">
              Cancelar
            </Button>
            <Button type="submit">Crear tablero</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

