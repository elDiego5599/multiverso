import type { ReactNode } from 'react'

interface Props {
  titulo: string
  texto?: string
  children?: ReactNode
}

export default function EmptyState({ titulo, texto, children }: Props) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-2 text-center">
      <svg viewBox="0 0 64 64" className="mb-2 size-16 text-muted/50" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <circle cx="32" cy="32" r="24" strokeDasharray="10 6" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
      </svg>
      <p className="font-display text-lg font-medium">{titulo}</p>
      {texto && <p className="max-w-sm text-sm text-muted">{texto}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
