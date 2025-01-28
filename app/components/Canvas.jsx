export default function Canvas() {
  const sections = [
    { title: "Socios clave", id: "key-partners" },
    { title: "Actividades clave", id: "key-activities" },
    { title: "Recursos clave", id: "key-resources" },
    { title: "Propuesta de valor", id: "value-propositions" },
    { title: "Relaciones con clientes", id: "customer-relationships" },
    { title: "Canales", id: "channels" },
    { title: "Segmentos de cliente", id: "customer-segments" },
    { title: "Estructura de costes", id: "cost-structure" },
    { title: "Fuentes de ingresos", id: "revenue-streams" },
  ]

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {sections.map((section) => (
        <div key={section.id} className="bg-card rounded-lg p-4 shadow-lg transition-smooth hover:shadow-xl">
          <h3 className="text-lg font-semibold mb-3 text-primary">{section.title}</h3>
          <textarea
            className="w-full h-32 p-2 border rounded bg-muted text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            placeholder={`Añade información para ${section.title.toLowerCase()}...`}
          />
        </div>
      ))}
    </div>
  )
}

