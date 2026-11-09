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
    `relative rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      isActive ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line vidrio bg-card/80 py-2 pr-2.5 pl-4 shadow-soft backdrop-blur-xl backdrop-saturate-150"
      >
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <Logo />
          Multiverso
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => (
            <li key={e.a}>
              <NavLink to={e.a} end={e.end} className={clase}>
                {e.texto}
                {e.a === '/favoritos' && favoritos.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-accent-ink">
                    {favoritos.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {abierto && (
        <ul
          id="menu-movil"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-line bg-card p-2 shadow-soft md:hidden"
        >
          {enlaces.map((e) => (
            <li key={e.a}>
              <NavLink
                to={e.a}
                end={e.end}
                onClick={() => setAbierto(false)}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-2.5 text-sm font-medium ${isActive ? 'bg-ink text-paper' : 'text-ink'}`
                }
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
