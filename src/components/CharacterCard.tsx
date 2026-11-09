import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colorEstado, estados, traducirEspecie, traducirLugar } from '../etiquetas'
import type { Personaje } from '../types'
import FavoriteButton from './FavoriteButton'

interface Props {
  personaje: Personaje
  favorito: boolean
  onAlternar: (p: Personaje) => void
}

export default function CharacterCard({ personaje: p, favorito, onAlternar }: Props) {
  const [fallo, setFallo] = useState(false)
  return (
    <li className="group relative">
      <Link
        to={`/explorar/${p.id}`}
        className="presiona block overflow-hidden border border-line bg-card shadow-soft transition duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-square overflow-hidden bg-sunken">
          {fallo && (
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-display text-7xl font-light text-muted">
              {p.name.charAt(0)}
            </span>
          )}
          <img
            src={p.image}
            alt={`Retrato de ${p.name}`}
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget
              const n = Number(img.dataset.reintento ?? 0) + 1
              if (n > 5) {
                setFallo(true)
                return
              }
              img.dataset.reintento = String(n)
              setTimeout(() => {
                img.src = `${p.image}?r=${n}`
              }, 1200 * n)
            }}
            width={300}
            height={300}
            className={`size-full object-cover transition duration-500 group-hover:scale-105 ${fallo ? 'invisible' : ''}`}
          />
        </div>
        <div className="p-4">
          <h3 className="truncate font-display text-lg font-medium">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{traducirEspecie(p.species)}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className={`px-2.5 py-1 text-xs font-semibold ${colorEstado[p.status]}`}>
              {estados[p.status]}
            </span>
            <span className="truncate text-xs text-muted">{traducirLugar(p.origin.name)}</span>
          </div>
        </div>
      </Link>
      <FavoriteButton
        activo={favorito}
        nombre={p.name}
        onClick={() => onAlternar(p)}
        className="absolute top-3 right-3"
      />
    </li>
  )
}
