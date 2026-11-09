import { Link } from 'react-router-dom'
import Parche from '../components/Parche'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-display text-[clamp(5rem,22vw,16rem)] leading-none font-normal text-accent">
        4<Parche />4
      </p>
      <h1 className="mt-6 font-display text-3xl">Este mundo no existe</h1>
      <p className="mt-2 max-w-sm text-muted">La dirección que buscas se perdió en otra dimensión.</p>
      <Link to="/" className="presiona mt-8 bg-ink px-6 py-3 text-sm text-paper">
        Volver al inicio
      </Link>
    </section>
  )
}
