import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import type { TipoToast } from '../types'
import Toaster from '../components/Toaster'

export interface ToastItem {
  id: number
  tipo: TipoToast
  mensaje: string
}

interface Valor {
  avisar: (tipo: TipoToast, mensaje: string) => void
}

const Ctx = createContext<Valor | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const siguiente = useRef(1)

  const cerrar = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const avisar = useCallback(
    (tipo: TipoToast, mensaje: string) => {
      const id = siguiente.current++
      setToasts((t) => [...t.slice(-3), { id, tipo, mensaje }])
      // Se va solo a los 4 segundos
      setTimeout(() => cerrar(id), 4000)
    },
    [cerrar],
  )

  return (
    <Ctx.Provider value={{ avisar }}>
      {children}
      <Toaster toasts={toasts} onCerrar={cerrar} />
    </Ctx.Provider>
  )
}

export function useToast() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useToast va dentro de ToastProvider')
  return v
}
