import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pedirPersonajes } from '../api'
import PortalArt from './PortalArt'
import type { Personaje } from '../types'

// Cada tarjeta: giro, altura y posición dentro del abanico
const posturas = [
  { giro: -14, sube: 46, x: '-2%' },
  { giro: -7, sube: 16, x: '0%' },
  { giro: 0, sube: -14, x: '0%' },
  { giro: 7, sube: 16, x: '0%' },
  { giro: 14, sube: 46, x: '2%' },
]

// Rayos de luz que salen del portal hacia los lados
function Rayos() {
  const lineas = Array.from({ length: 15 }, (_, i) => i - 7)
  return (
    <svg
      viewBox="0 0 1600 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[-12%] bottom-0 h-full w-[124%]"
    >
      <defs>
        <linearGradient id="rayo" gradientUnits="userSpaceOnUse" x1="0" x2="1600" y1="0" y2="0">
          <stop offset="0" stopColor="#6fe08a" stopOpacity="0" />
          <stop offset="0.22" stopColor="#6fe08a" stopOpacity="0.95" />
          <stop offset="0.42" stopColor="#1c7f48" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#1c7f48" stopOpacity="0" />
          <stop offset="0.58" stopColor="#1c7f48" stopOpacity="0.6" />
          <stop offset="0.78" stopColor="#6fe08a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#6fe08a" stopOpacity="0" />
        </linearGradient>
        <filter id="suave">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter="url(#suave)" fill="none" stroke="url(#rayo)" strokeLinecap="round">
        {lineas.map((i) => (
          <g key={i}>
            <path d={`M800 360 C 560 ${360 + i * 6}, 280 ${340 + i * 26}, -40 ${300 + i * 40}`} strokeWidth={1.5 + (7 - Math.abs(i)) * 0.9} />
            <path d={`M800 360 C 1040 ${360 + i * 6}, 1320 ${340 + i * 26}, 1640 ${300 + i * 40}`} strokeWidth={1.5 + (7 - Math.abs(i)) * 0.9} />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function HeroEscena() {
  const [personajes, setPersonajes] = useState<Personaje[]>([])

  // Las tarjetas del abanico salen de la misma API, no están escritas a mano
  useEffect(() => {
    const control = new AbortController()
    pedirPersonajes({ nombre: '', estado: '', pagina: 1 }, control.signal)
      .then((r) => setPersonajes(r.personajes.slice(0, 5)))
      .catch(() => {})
    return () => control.abort()
  }, [])

  return (
    <div className="relative mx-auto mt-14 h-[360px] w-full max-w-5xl sm:h-[520px]">
      <Rayos />

      <div className="absolute inset-x-0 bottom-0 flex justify-center [perspective:900px]">
        <PortalArt className="w-[640px] max-w-[130%] [transform:rotateX(68deg)] sm:w-[960px]" />
      </div>

      <ul className="absolute inset-x-0 bottom-[12%] flex items-end justify-center">
        {personajes.map((p, i) => {
          const q = posturas[i]
          return (
            <li
              key={p.id}
              className="anim-entra -mx-2 w-[27%] max-w-[168px] sm:-mx-3"
              style={{ animationDelay: `${300 + i * 90}ms`, translate: `${q.x} ${q.sube}px` }}
            >
              <div className="anim-flota" style={{ rotate: `${q.giro}deg`, animationDelay: `${i * -1.1}s` }}>
                <Link
                  to={`/explorar/${p.id}`}
                  className="presiona block overflow-hidden rounded-[22px] border border-white/70 bg-card shadow-[0_24px_50px_-18px_rgb(10_40_25/0.55)] transition hover:-translate-y-2"
                >
                  <img src={p.image} alt={`Retrato de ${p.name}`} width={300} height={300} className="aspect-[4/5] w-full object-cover" />
                  <span className="block truncate px-3 py-2 text-xs font-semibold">{p.name}</span>
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
