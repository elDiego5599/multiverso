import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorApi, pedirPersonaje } from '../api'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import FavoriteButton from '../components/FavoriteButton'
import Loader from '../components/Loader'
import { useFavoritos } from '../context/FavoritesContext'
import { colorEstado, estados, traducirEspecie, traducirGenero, traducirLugar } from '../etiquetas'
import { useFavoritoAccion } from '../hooks/useFavoritoAccion'
import type { Personaje } from '../types'

type Carga = { tipo: 'cargando' } | { tipo: 'error' } | { tipo: 'no-existe' } | { tipo: 'listo'; p: Personaje }

export default function Detail() {
  const { id = '' } = useParams()
  const [carga, setCarga] = useState<Carga>({ tipo: 'cargando' })
  const [intento, setIntento] = useState(0)
  const { esFavorito } = useFavoritos()
  const { alternar, dialogo } = useFavoritoAccion()

  useEffect(() => {
    const control = new AbortController()
    setCarga({ tipo: 'cargando' })
    pedirPersonaje(id, control.signal)
      .then((p) => setCarga({ tipo: 'listo', p }))
      .catch((e) => {
        if (e.name === 'AbortError') return
        setCarga(e instanceof ErrorApi && e.status === 404 ? { tipo: 'no-existe' } : { tipo: 'error' })
      })
    return () => control.abort()
  }, [id, intento])

  return (
    <section className="mx-auto max-w-5xl px-6 pt-10">
      <Link to="/explorar" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink">
        <span aria-hidden="true">←</span> Volver a explorar
      </Link>

      <div className="mt-6" aria-live="polite">
        {carga.tipo === 'cargando' && <Loader />}
        {carga.tipo === 'error' && <ErrorState onReintentar={() => setIntento((n) => n + 1)} />}
        {carga.tipo === 'no-existe' && (
          <EmptyState titulo="Ese personaje no existe" texto="Puede que el número no esté en el archivo.">
            <Link to="/explorar" className="bg-ink px-5 py-2.5 text-sm font-semibold text-paper">
              Ver todos los personajes
            </Link>
          </EmptyState>
        )}
        {carga.tipo === 'listo' && <Ficha p={carga.p} favorito={esFavorito(carga.p.id)} onAlternar={alternar} />}
      </div>
      {dialogo}
    </section>
  )
}

interface FichaProps {
  p: Personaje
  favorito: boolean
  onAlternar: (p: Personaje) => void
}

function Ficha({ p, favorito, onAlternar }: FichaProps) {
  const datos: [string, string][] = [
    ['Especie', traducirEspecie(p.species)],
    ['Género', traducirGenero(p.gender)],
    ['Origen', traducirLugar(p.origin.name)],
    ['Última ubicación', traducirLugar(p.location.name)],
    ['Episodios', String(p.episode.length)],
  ]
  if (p.type) datos.splice(1, 0, ['Tipo', p.type])

  return (
    <article className="anim-entra grid overflow-hidden  border border-line bg-card shadow-soft md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <img src={p.image} alt={`Retrato de ${p.name}`} width={300} height={300} className="aspect-square size-full object-cover" />
      <div className="flex flex-col p-7 sm:p-9">
        <span className={`w-fit  px-3 py-1 text-xs font-semibold ${colorEstado[p.status]}`}>{estados[p.status]}</span>
        <h1 className="mt-3 font-display text-4xl font-medium">{p.name}</h1>

        <dl className="mt-6 divide-y divide-line text-sm">
          {datos.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center gap-3 pt-8">
          <FavoriteButton activo={favorito} nombre={p.name} onClick={() => onAlternar(p)} />
          <span className="text-sm text-muted">{favorito ? 'Está en tus favoritos' : 'Agregar a favoritos'}</span>
        </div>
      </div>
    </article>
  )
}
