import { useFavoritos } from '../context/FavoritesContext'
import type { Personaje } from '../types'
import CharacterCard from './CharacterCard'

interface Props {
  personajes: Personaje[]
  onAlternar: (p: Personaje) => void
}

export default function CharacterGrid({ personajes, onAlternar }: Props) {
  const { esFavorito } = useFavoritos()
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {personajes.map((p) => (
        <CharacterCard key={p.id} personaje={p} favorito={esFavorito(p.id)} onAlternar={onAlternar} />
      ))}
    </ul>
  )
}
