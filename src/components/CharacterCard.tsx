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
  return (
    <li className="group relative">
      <Link
        to={`/explorar/${p.id}`}
        className="presiona block overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition duration-300 hover:-translate-y-1"
      >
        <div className="aspect-square overflow-hidden bg-sunken">
          <img
            src={p.image}
            alt={`Retrato de ${p.name}`}
            loading="lazy"
            width={300}
            height={300}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="truncate font-display text-lg font-bold">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{traducirEspecie(p.species)}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colorEstado[p.status]}`}>
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
