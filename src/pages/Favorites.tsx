import { Link } from 'react-router-dom'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import { useFavoritos } from '../context/FavoritesContext'
import { useFavoritoAccion } from '../hooks/useFavoritoAccion'

export default function Favorites() {
  const { favoritos } = useFavoritos()
  const { alternar, dialogo } = useFavoritoAccion()

  return (
    <section className="mx-auto max-w-6xl px-6 pt-14">
      <header>
        <h1 className="font-display text-4xl font-medium sm:text-5xl">Mis favoritos</h1>
        <p className="mt-3 text-muted">
          {favoritos.length === 0
            ? 'Todavía no guardas a nadie.'
            : `${favoritos.length} ${favoritos.length === 1 ? 'personaje guardado' : 'personajes guardados'}`}
        </p>
      </header>

      <div className="mt-10">
        {favoritos.length === 0 ? (
          <EmptyState titulo="No tienes favoritos guardados" texto="Marca la estrella en cualquier personaje y aparecerá aquí.">
            <Link to="/explorar" className="bg-ink px-5 py-2.5 text-sm font-semibold text-paper">
              Explorar y agregar algunos
            </Link>
          </EmptyState>
        ) : (
          <CharacterGrid personajes={favoritos} onAlternar={alternar} />
        )}
      </div>
      {dialogo}
    </section>
  )
}
