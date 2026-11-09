import type { Estado, Pagina, Personaje } from './types'

const BASE = 'https://rickandmortyapi.com/api/character'

export class ErrorApi extends Error {
  status: number
  constructor(status: number, mensaje: string) {
    super(mensaje)
    this.status = status
  }
}

interface Filtros {
  nombre: string
  estado: Estado | ''
  pagina: number
}

// Primer fetch: la lista, con busqueda, filtro y pagina
export async function pedirPersonajes(f: Filtros, signal: AbortSignal): Promise<Pagina> {
  const params = new URLSearchParams({ page: String(f.pagina) })
  if (f.nombre.trim()) params.set('name', f.nombre.trim())
  if (f.estado) params.set('status', f.estado)

  const res = await fetch(`${BASE}?${params}`, { signal })

  // Esta API responde 404 cuando no hay coincidencias, eso no es una falla
  if (res.status === 404) return { personajes: [], paginas: 0, total: 0 }
  if (!res.ok) throw new ErrorApi(res.status, 'No se pudo cargar la lista')

  const datos = await res.json()
  return { personajes: datos.results, paginas: datos.info.pages, total: datos.info.count }
}

// Segundo fetch: un personaje por su id
export async function pedirPersonaje(id: string, signal: AbortSignal): Promise<Personaje> {
  const res = await fetch(`${BASE}/${encodeURIComponent(id)}`, { signal })
  if (!res.ok) throw new ErrorApi(res.status, 'No se pudo cargar el personaje')
  return res.json()
}
