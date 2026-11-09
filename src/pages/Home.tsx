import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Parche from '../components/Parche'
import TiraPersonajes from '../components/TiraPersonajes'

const atajos = [
  { nombre: 'Rick', color: 'bg-naranja' },
  { nombre: 'Morty', color: 'bg-lila' },
  { nombre: 'Summer', color: 'bg-verde' },
  { nombre: 'Beth', color: 'bg-rosa' },
  { nombre: 'Jerry', color: 'bg-fucsia text-white' },
]

const pasos = [
  { n: '01', titulo: 'Busca', texto: 'Escribe un nombre y la lista se ajusta mientras tecleas. Filtra por vivos, muertos o desconocidos.' },
  { n: '02', titulo: 'Abre la ficha', texto: 'De dónde viene, dónde vive ahora y en cuántos episodios aparece. Todo en una sola página.' },
  { n: '03', titulo: 'Guarda a los tuyos', texto: 'Marca la estrella y se queda guardado, incluso si cierras la pestaña y vuelves otro día.' },
]

export default function Home() {
  const [texto, setTexto] = useState('')
  const navegar = useNavigate()

  const buscar = (e: FormEvent) => {
    e.preventDefault()
    navegar(texto.trim() ? `/explorar?q=${encodeURIComponent(texto.trim())}` : '/explorar')
  }

  return (
    <>
      <section className="px-6 pt-16 pb-20 text-center sm:pt-24">
        <h1 className="anim-entra mx-auto max-w-6xl font-display text-[clamp(2.9rem,9.5vw,8.2rem)] leading-[0.95] font-normal">
          To<span className="text-accent">dos</span> los <Parche /> mundos
          <br />
          ca<span className="text-accent">ben en</span> una
          <br />
          bús<span className="text-accent">queda</span>
        </h1>
        <p className="anim-entra mx-auto mt-8 max-w-xl text-lg text-muted [animation-delay:100ms]">
          Todos los personajes de Rick y Morty en un solo archivo. Busca, mira de dónde vienen y guarda a los que no quieres perder.
        </p>

        <form role="search" onSubmit={buscar} className="anim-entra mx-auto mt-10 flex max-w-3xl text-left [animation-delay:180ms]">
          <div className="flex min-h-36 flex-1 flex-col bg-sunken p-4 sm:min-h-44">
            <label htmlFor="busqueda-inicio" className="sr-only">
              Nombre del personaje
            </label>
            <input
              id="busqueda-inicio"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Busca un personaje..."
              autoComplete="off"
              className="w-full bg-transparent text-base outline-none placeholder:text-muted sm:text-lg"
            />
            <span className="mt-auto font-mono text-xs text-muted uppercase">Más de 800 personajes</span>
          </div>
          <button
            type="submit"
            aria-label="Buscar personajes"
            className="grid w-24 shrink-0 place-items-center bg-accent text-accent-ink transition hover:brightness-110 sm:w-40"
          >
            <svg viewBox="0 0 24 24" className="size-12 sm:size-16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 20V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>

        <ul className="anim-entra mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2 [animation-delay:240ms]">
          {atajos.map((a) => (
            <li key={a.nombre}>
              <Link to={`/explorar?q=${a.nombre}`} className={`presiona block px-3 py-1.5 text-sm text-[#1f1f1f] transition hover:-translate-y-0.5 ${a.color}`}>
                {a.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Algunos personajes del archivo">
        <div className="flex items-center justify-between border-y border-line px-6 py-3 font-mono text-xs uppercase">
          <span>[ Del archivo ]</span>
          <Link to="/explorar" className="hover:text-accent">
            Ver todos
          </Link>
        </div>
        <TiraPersonajes />
      </section>

      <section className="px-6 py-24 sm:py-32">
        <p className="font-mono text-xs uppercase">[ Se queda contigo ]</p>
        <p className="mt-6 max-w-5xl font-display text-4xl leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Guarda a quien te importa. <span className="text-ink/30">Tu lista sigue ahí cuando vuelves, sin cuenta y sin pasos de más.</span>
        </p>
      </section>

      <section className="border-t border-line">
        <h2 className="sr-only">Así se usa</h2>
        <ol className="grid md:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="revela border-b border-line p-8 md:border-r md:last:border-r-0">
              <span className="font-mono text-xs">[ {p.n} ]</span>
              <h3 className="mt-16 font-display text-3xl">{p.titulo}</h3>
              <p className="mt-3 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
