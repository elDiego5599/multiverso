import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Personaje } from '../types'

interface Valor {
  favoritos: Personaje[]
  esFavorito: (id: number) => boolean
  agregar: (p: Personaje) => void
  quitar: (id: number) => void
}

const Ctx = createContext<Valor | null>(null)
const CLAVE = 'favoritos'

function leer(): Personaje[] {
  try {
    const crudo = localStorage.getItem(CLAVE)
    return crudo ? JSON.parse(crudo) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Personaje[]>(leer)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(favoritos))
    } catch {
    }
  }, [favoritos])

  const agregar = useCallback((p: Personaje) => {
    setFavoritos((f) => (f.some((x) => x.id === p.id) ? f : [...f, p]))
  }, [])

  const quitar = useCallback((id: number) => {
    setFavoritos((f) => f.filter((x) => x.id !== id))
  }, [])

  const valor = useMemo<Valor>(
    () => ({ favoritos, agregar, quitar, esFavorito: (id) => favoritos.some((x) => x.id === id) }),
    [favoritos, agregar, quitar],
  )

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function useFavoritos() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useFavoritos va dentro de FavoritesProvider')
  return v
}
