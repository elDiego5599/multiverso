interface Props {
  valor: string
  onCambio: (v: string) => void
}

export default function SearchBar({ valor, onCambio }: Props) {
  return (
    <div className="relative flex-1">
      <label htmlFor="buscar" className="sr-only">
        Buscar personaje por nombre
      </label>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id="buscar"
        type="search"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        placeholder="Buscar personaje..."
        autoComplete="off"
        className="w-full rounded-full border border-line bg-card py-3 pr-4 pl-11 text-sm shadow-soft placeholder:text-muted focus:border-accent focus:outline-none"
      />
    </div>
  )
}
