import type { Estado } from '../types'

interface Props {
  valor: Estado | ''
  onCambio: (e: Estado | '') => void
}

const opciones: { valor: Estado | ''; texto: string }[] = [
  { valor: '', texto: 'Todos' },
  { valor: 'Alive', texto: 'Vivos' },
  { valor: 'Dead', texto: 'Muertos' },
  { valor: 'unknown', texto: 'Desconocidos' },
]

export default function StatusFilter({ valor, onCambio }: Props) {
  return (
    <div role="group" aria-label="Filtrar por estado" className="flex flex-wrap gap-1.5 rounded-full border border-line bg-card p-1 shadow-soft">
      {opciones.map((o) => (
        <button
          key={o.valor}
          type="button"
          onClick={() => onCambio(o.valor)}
          aria-pressed={valor === o.valor}
          className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
            valor === o.valor ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
          }`}
        >
          {o.texto}
        </button>
      ))}
    </div>
  )
}
