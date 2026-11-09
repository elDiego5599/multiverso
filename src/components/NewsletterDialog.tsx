import { useEffect, useRef } from 'react'

interface Props {
  abierto: boolean
  onAceptar: () => void
  onRechazar: () => void
}

/*
 * DARK PATTERN A PROPOSITO (pedido en la consigna): este modal usa varias trampas
 * de diseño para empujar al usuario a suscribirse, y no deberían copiarse en un
 * producto real:
 *   1. Confirmshaming: el botón de salida dice "No, prefiero perderme todo",
 *      para que decir que no se sienta como una mala decisión.
 *   2. Jerarquía engañosa: aceptar es un botón grande y llamativo, rechazar es
 *      un texto pequeño y casi gris, fácil de pasar por alto.
 *   3. Urgencia falsa: "solo hoy" no responde a nada real.
 *   4. Sin salida fácil: no hay X, ni se cierra con Esc ni con clic afuera.
 */
export default function NewsletterDialog({ abierto, onAceptar, onRechazar }: Props) {
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
      aria-labelledby="boletin-titulo"
      // Trampa 4: se anula Esc para que el modal no se pueda descartar sin elegir
      onCancel={(e) => e.preventDefault()}
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border border-line bg-card p-0 text-ink shadow-soft"
    >
      <div className="relative bg-ink px-8 pt-9 pb-8 text-paper">
        <p className="text-xs font-semibold tracking-widest text-glow uppercase">Solo hoy</p>
        <h2 id="boletin-titulo" className="mt-2 font-display text-3xl leading-tight font-bold">
          Espera, no te vayas con las manos vacías
        </h2>
        <p className="mt-3 text-sm text-paper/70">
          Recibe en tu correo datos secretos del multiverso antes que nadie. Cupos limitados.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 px-8 py-7">
        <button
          type="button"
          onClick={onAceptar}
          className="w-full rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-ink shadow-soft transition hover:-translate-y-0.5"
        >
          Sí, quiero los secretos
        </button>
        <button type="button" onClick={onRechazar} className="text-[11px] text-muted/70 underline-offset-2 hover:underline">
          No, prefiero perderme todo
        </button>
      </div>
    </dialog>
  )
}
