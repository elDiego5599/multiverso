interface Props {
  pagina: number
  total: number
  onCambio: (p: number) => void
}

export default function Pagination({ pagina, total, onCambio }: Props) {
  if (total <= 1) return null
  const boton =
    'rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold shadow-soft transition enabled:hover:-translate-y-0.5 disabled:opacity-40'
  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-4">
      <button type="button" className={boton} disabled={pagina <= 1} onClick={() => onCambio(pagina - 1)}>
        Anterior
      </button>
      <span className="text-sm text-muted">
        Página {pagina} de {total}
      </span>
      <button type="button" className={boton} disabled={pagina >= total} onClick={() => onCambio(pagina + 1)}>
        Siguiente
      </button>
    </nav>
  )
}
