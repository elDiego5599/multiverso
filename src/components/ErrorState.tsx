interface Props {
  mensaje?: string
  onReintentar: () => void
}

export default function ErrorState({ mensaje = 'No se pudo cargar la información.', onReintentar }: Props) {
  return (
    <div role="alert" className="flex min-h-72 flex-col items-center justify-center gap-2 text-center">
      <span aria-hidden="true" className="mb-2 grid size-12 place-items-center  bg-danger-soft text-xl font-bold text-danger">
        !
      </span>
      <p className="font-display text-lg font-medium">{mensaje}</p>
      <p className="text-sm text-muted">Revisa tu conexión e inténtalo de nuevo.</p>
      <button
        type="button"
        onClick={onReintentar}
        className="mt-4  bg-danger px-5 py-2.5 text-sm font-semibold text-danger-ink transition hover:-translate-y-0.5"
      >
        Reintentar
      </button>
    </div>
  )
}
