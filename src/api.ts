import type { Estado, Pagina, Personaje } from './types'

const BASE = 'https://rickandmortyapi.com/api/character'

export class ErrorApi extends Error {
  status: number
  constructor(status: number, mensaje: string) {
    super(mensaje)
    this.status = status
  }
}

async function pedir(url: string, signal: AbortSignal, intentos = 3): Promise<Response> {
  const res = await fetch(url, { signal })
  if (res.status !== 429 || intentos <= 1) return res
  const espera = Math.min(Number(res.headers.get('retry-after')) || 3, 5) * 1000
  await new Promise<void>((ok, fallo) => {
    const t = setTimeout(ok, espera)
    signal.addEventListener('abort', () => {
      clearTimeout(t)
      fallo(new DOMException('Cancelado', 'AbortError'))
    })
  })
  return pedir(url, signal, intentos - 1)
}

interface Filtros {
  nombre: string
  estado: Estado | ''
  pagina: number
}

export async function pedirPersonajes(f: Filtros, signal: AbortSignal): Promise<Pagina> {
  const params = new URLSearchParams({ page: String(f.pagina) })
  if (f.nombre.trim()) params.set('name', f.nombre.trim())
  if (f.estado) params.set('status', f.estado)

  const res = await pedir(`${BASE}?${params}`, signal)

  if (res.status === 404) return { personajes: [], paginas: 0, total: 0 }
  if (!res.ok) throw new ErrorApi(res.status, 'No se pudo cargar la lista')

  const datos = await res.json()
  return { personajes: datos.results, paginas: datos.info.pages, total: datos.info.count }
}

export async function pedirPersonaje(id: string, signal: AbortSignal): Promise<Personaje> {
  const res = await pedir(`${BASE}/${encodeURIComponent(id)}`, signal)
  if (!res.ok) throw new ErrorApi(res.status, 'No se pudo cargar el personaje')
  return res.json()
}
