import type { ToastItem } from '../context/ToastContext'

const estilos = {
  exito: 'border-accent/40 bg-card text-ink',
  error: 'border-danger/50 bg-card text-ink',
  info: 'border-line bg-card text-ink',
}

const marcas = {
  exito: 'bg-accent text-accent-ink',
  error: 'bg-danger text-danger-ink',
  info: 'bg-ink text-paper',
}

const simbolos = { exito: '✓', error: '!', info: 'i' }

interface Props {
  toasts: ToastItem[]
  onCerrar: (id: number) => void
}

export default function Toaster({ toasts, onCerrar }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`anim-toast pointer-events-auto flex w-full max-w-sm items-center gap-3 border px-3.5 py-3 text-sm shadow-soft ${estilos[t.tipo]}`}
        >
          <span
            aria-hidden="true"
            className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${marcas[t.tipo]}`}
          >
            {simbolos[t.tipo]}
          </span>
          <span className="flex-1">{t.mensaje}</span>
          <button
            type="button"
            onClick={() => onCerrar(t.id)}
            aria-label="Cerrar aviso"
            className="grid size-6 place-items-center text-muted transition hover:bg-sunken hover:text-ink"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
