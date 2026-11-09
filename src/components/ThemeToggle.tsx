import { useState } from 'react'

type Tema = 'claro' | 'oscuro'

export default function ThemeToggle() {
  const [tema, setTema] = useState<Tema>(() =>
    document.documentElement.dataset.tema === 'oscuro' ? 'oscuro' : 'claro',
  )

  function cambiar() {
    const nuevo: Tema = tema === 'oscuro' ? 'claro' : 'oscuro'
    document.documentElement.dataset.tema = nuevo
    try {
      localStorage.setItem('tema', nuevo)
    } catch {
      // No pasa nada si no se puede recordar
    }
    setTema(nuevo)
  }

  return (
    <button
      type="button"
      onClick={cambiar}
      aria-label={tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="grid size-9 place-items-center  border border-line text-ink transition hover:bg-sunken"
    >
      {tema === 'oscuro' ? (
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
