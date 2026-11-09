import { Link } from 'react-router-dom'
import HeroEscena from '../components/HeroEscena'

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
      <section className="relative mx-2 mt-2 overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(to_bottom,var(--card)_35%,color-mix(in_srgb,var(--glow)_22%,var(--card)))] px-6 pt-20 sm:mx-3 sm:px-10 md:pt-28">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="anim-entra font-display text-5xl leading-[1] font-bold sm:text-7xl">
            <span className="text-muted">Todos los mundos.</span>
            <br />
            Una sola búsqueda.
          </h1>
          <p className="anim-entra mx-auto mt-6 max-w-lg text-lg text-muted [animation-delay:120ms]">
            Encuentra a cualquier personaje de Rick y Morty, revisa de dónde viene y guarda a los que no quieres perder de vista.
          </p>
          <div className="anim-entra mt-8 flex flex-wrap justify-center gap-3 [animation-delay:200ms]">
            <Link
              to="/explorar"
              className="presiona rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:-translate-y-0.5"
            >
              Entrar al archivo
            </Link>
            <Link
              to="/favoritos"
              className="presiona rounded-full border border-line bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-sunken"
            >
              Ver mis favoritos
            </Link>
          </div>
        </div>

        <HeroEscena />
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="max-w-md font-display text-3xl font-bold sm:text-4xl">Así se usa</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="revela rounded-3xl border border-line bg-card p-7 shadow-soft">
              <span className="font-mono text-sm font-semibold tracking-[0.12em] text-accent">{p.n}</span>
              <h3 className="mt-6 font-display text-xl font-bold">{p.titulo}</h3>
              <p className="mt-2 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
