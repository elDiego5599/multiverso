export default function Loader({ texto = 'Cargando datos...' }: { texto?: string }) {
  return (
    <div role="status" className="flex min-h-72 flex-col items-center justify-center gap-4 text-muted">
      <svg viewBox="0 0 50 50" className="size-12 motion-safe:animate-spin" aria-hidden="true">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.2" />
        <circle cx="25" cy="25" r="20" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeDasharray="40 90" />
      </svg>
      <p className="text-sm">{texto}</p>
    </div>
  )
}
