interface Props {
  activo: boolean
  nombre: string
  onClick: () => void
  className?: string
}

export default function FavoriteButton({ activo, nombre, onClick, className = '' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      aria-label={activo ? `Quitar a ${nombre} de favoritos` : `Agregar a ${nombre} a favoritos`}
      className={`grid size-9 place-items-center  border border-line shadow-soft backdrop-blur transition hover:scale-105 ${
        activo ? 'bg-glow text-ink' : 'bg-card/90 text-muted hover:text-ink'
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill={activo ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
      </svg>
    </button>
  )
}
