import { Link } from 'react-router-dom'
import PortalArt from '../components/PortalArt'

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <PortalArt className="absolute top-1/2 left-1/2 -z-10 w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      <p className="font-display text-8xl font-extrabold tracking-tight text-accent sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Este mundo no existe</h1>
      <p className="mt-2 max-w-sm text-muted">La dirección que buscas se perdió en otra dimension.</p>
      <Link to="/" className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft">
        Volver al inicio
      </Link>
    </section>
  )
}
