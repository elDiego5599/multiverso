import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  abierto: boolean
  titulo: string
  children: ReactNode
  textoConfirmar: string
  onConfirmar: () => void
  onCancelar: () => void
}

// <dialog> nativo: showModal() se encarga del foco, de Esc y del fondo bloqueado
export default function ConfirmDialog({ abierto, titulo, children, textoConfirmar, onConfirmar, onCancelar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (abierto && !d.open) d.showModal()
    if (!abierto && d.open) d.close()
  }, [abierto])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirmar-titulo"
      onCancel={(e) => {
        e.preventDefault()
        onCancelar()
      }}
      onClick={(e) => {
        // Un clic en el fondo (el propio dialog) lo cierra
        if (e.target === ref.current) onCancelar()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-line bg-card p-0 text-ink shadow-soft"
    >
      <div className="flex flex-col items-center px-7 pt-9 pb-7 text-center">
        <span
          aria-hidden="true"
          className="mb-5 grid size-14 place-items-center rounded-full bg-white text-3xl font-extrabold text-danger shadow-soft ring-1 ring-line"
        >
          !
        </span>
        <h2 id="confirmar-titulo" className="font-display text-xl font-bold">
          {titulo}
        </h2>
        <div className="mt-2 text-sm text-muted">{children}</div>
        <div className="mt-7 flex w-full gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 rounded-full border border-line bg-sunken px-4 py-2.5 text-sm font-semibold transition hover:brightness-95"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="flex-1 rounded-full bg-danger px-4 py-2.5 text-sm font-semibold text-danger-ink transition hover:brightness-110"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </dialog>
  )
}
