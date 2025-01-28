import Link from "next/link"
import { Home, Calendar, Briefcase, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="bg-card text-card-foreground w-16 min-h-screen p-4 transition-smooth hover:w-64">
      <nav className="space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-primary opacity-0 group-hover:opacity-100 transition-smooth">
            CH
          </h2>
          <ul className="space-y-6">
            <li>
              <Link href="/" className="flex items-center space-x-2 hover:text-accent transition-smooth group">
                <Home className="h-6 w-6" />
                <span className="opacity-0 group-hover:opacity-100 transition-smooth">Inicio</span>
              </Link>
            </li>
            <li>
              <Link href="/tareas" className="flex items-center space-x-2 hover:text-accent transition-smooth group">
                <Calendar className="h-6 w-6" />
                <span className="opacity-0 group-hover:opacity-100 transition-smooth">Tareas</span>
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="flex items-center space-x-2 hover:text-accent transition-smooth group">
                <Briefcase className="h-6 w-6" />
                <span className="opacity-0 group-hover:opacity-100 transition-smooth">Servicios</span>
              </Link>
            </li>
            <li>
              <Link href="/canvas" className="flex items-center space-x-2 hover:text-accent transition-smooth group">
                <Settings className="h-6 w-6" />
                <span className="opacity-0 group-hover:opacity-100 transition-smooth">Canvas</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

