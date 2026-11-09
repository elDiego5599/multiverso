import { Link } from 'react-router-dom'
import PortalArt from '../components/PortalArt'

const pasos = [
  {
    n: '01',
    titulo: 'Busca',
    texto: 'Escribe un nombre y la lista se ajusta mientras tecleas. Si quieres, filtra por vivos, muertos o desconocidos.',
  },
  {
    n: '02',
    titulo: 'Abre la ficha',
    texto: 'De dónde viene, dónde vive ahora y en cuántos episodios aparece. Todo en una sola página.',
  },
  {
    n: '03',
    titulo: 'Guarda a tus favoritos',
    texto: 'Marca la estrella y se queda guardado, incluso si cierras la pestaña y vuelves otro día.',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative mx-2 mt-2 overflow-hidden rounded-[28px] border border-line bg-card px-6 pt-20 pb-24 sm:mx-3 sm:px-10 md:pt-28 md:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_70%_at_85%_30%,color-mix(in_srgb,var(--glow)_32%,transparent),transparent_70%)]"
        />
        <PortalArt className="absolute top-1/2 right-[-18%] w-[520px] -translate-y-1/2 opacity-50 md:right-[-4%] md:opacity-90 md:w-[640px]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="anim-entra mb-5 text-sm font-semibold tracking-wide text-accent uppercase">
            Archivo del multiverso
          </p>
          <h1 className="anim-entra max-w-2xl font-display text-5xl leading-[0.98] font-bold tracking-tight [animation-delay:80ms] sm:text-7xl">
            Todos los mundos caben en una búsqueda.
          </h1>
          <p className="anim-entra mt-6 max-w-lg text-lg text-muted [animation-delay:160ms]">
            Encuentra a cualquier personaje de Rick y Morty, revisa de dónde viene y guarda a los que no quieres perder de vista.
          </p>
          <div className="anim-entra mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
            <Link
              to="/explorar"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:-translate-y-0.5"
            >
              Entrar al archivo
            </Link>
            <Link
              to="/favoritos"
              className="rounded-full border border-line bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-sunken"
            >
              Ver mis favoritos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="max-w-md font-display text-3xl font-bold tracking-tight sm:text-4xl">Así se usa</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="rounded-3xl border border-line bg-card p-7 shadow-soft">
              <span className="font-display text-5xl font-bold text-accent/70">{p.n}</span>
              <h3 className="mt-6 font-display text-xl font-bold">{p.titulo}</h3>
              <p className="mt-2 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
