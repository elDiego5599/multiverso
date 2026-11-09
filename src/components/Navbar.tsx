import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavoritos } from '../context/FavoritesContext'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const enlaces = [
  { a: '/', texto: 'Inicio', end: true },
  { a: '/explorar', texto: 'Explorar', end: false },
  { a: '/favoritos', texto: 'Favoritos', end: false },
  { a: '/contacto', texto: 'Contacto', end: false },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { favoritos } = useFavoritos()

  const clase = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1 text-sm transition ${isActive ? 'bg-ink text-paper' : 'hover:text-accent'}`

  return (
    <header className="vidrio sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
      <nav aria-label="Principal" className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-medium tracking-[-0.02em]">
          <Logo />
          Multiverso
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <li key={e.a}>
              <NavLink to={e.a} end={e.end} className={clase}>
                {e.texto}
                {e.a === '/favoritos' && favoritos.length > 0 && (
                  <span className="ml-1.5 bg-accent px-1.5 py-0.5 font-mono text-[11px] text-accent-ink">{favoritos.length}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/explorar" className="presiona hidden bg-ink px-4 py-2 text-sm text-paper md:block">
            Buscar
          </Link>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label="Abrir menú"
            className="grid size-9 place-items-center border border-line md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {abierto && (
        <ul id="menu-movil" className="flex flex-col border-t border-line bg-paper md:hidden">
          {enlaces.map((e) => (
            <li key={e.a} className="border-b border-line last:border-b-0">
              <NavLink
                to={e.a}
                end={e.end}
                onClick={() => setAbierto(false)}
                className={({ isActive }) => `block px-6 py-3.5 font-display text-2xl ${isActive ? 'text-accent' : ''}`}
              >
                {e.texto}
                {e.a === '/favoritos' && favoritos.length > 0 && ` (${favoritos.length})`}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
