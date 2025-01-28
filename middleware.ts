import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obtener la cookie de autenticación
  const authCookie = request.cookies.get("auth")

  // Comprobar si la ruta actual es la página de login
  const isLoginPage = request.nextUrl.pathname === "/login"

  // Si no hay cookie de autenticación y no estamos en la página de login,
  // redirigir a la página de login
  if (!authCookie && !isLoginPage) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si hay cookie de autenticación y estamos en la página de login,
  // redirigir a la página principal
  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // En cualquier otro caso, continuar con la solicitud
  return NextResponse.next()
}

// Configurar las rutas que deben ser protegidas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}

