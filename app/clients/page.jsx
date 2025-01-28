import ClientList from "@/app/components/ClientList"

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Clientes</h1>
      <ClientList />
    </div>
  )
}

