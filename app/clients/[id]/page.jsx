import { getClients } from "@/app/lib/actions"
import ClientBoards from "@/app/components/ClientBoards"

export default async function ClientBoardsPage({ params }) {
  const clients = await getClients()
  const client = clients.find((c) => c.id === params.id)

  if (!client) {
    return <div>Cliente no encontrado</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tableros de {client.name}</h1>
      <ClientBoards clientId={client.id} />
    </div>
  )
}

