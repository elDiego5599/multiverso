import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { pedirPersonajes } from '../api'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import StatusFilter from '../components/StatusFilter'
import { useDebounce } from '../hooks/useDebounce'
import { useFavoritoAccion } from '../hooks/useFavoritoAccion'
import type { Estado, Pagina } from '../types'

type Carga = { tipo: 'cargando' } | { tipo: 'error' } | { tipo: 'listo'; datos: Pagina }

export default function Explore() {
  // La búsqueda vive en la URL: al volver desde una ficha todo sigue como lo dejaste
  const [params, setParams] = useSearchParams()
  const nombre = params.get('q') ?? ''
  const estado = (params.get('estado') ?? '') as Estado | ''
  const pagina = Number(params.get('p')) || 1

  const [texto, setTexto] = useState(nombre)
  const textoRetrasado = useDebounce(texto)
  const [carga, setCarga] = useState<Carga>({ tipo: 'cargando' })
  const [intento, setIntento] = useState(0)
  const { alternar, dialogo } = useFavoritoAccion()

  function cambiar(cambios: Record<string, string>) {
    const nuevo = new URLSearchParams(params)
    for (const [k, v] of Object.entries(cambios)) {
      if (v) nuevo.set(k, v)
      else nuevo.delete(k)
    }
    setParams(nuevo, { replace: true })
  }

  // Cuando el usuario deja de teclear, pasamos el texto a la URL y volvemos a la página 1
  useEffect(() => {
    if (textoRetrasado !== nombre) cambiar({ q: textoRetrasado, p: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textoRetrasado])

  useEffect(() => {
    const control = new AbortController()
    setCarga({ tipo: 'cargando' })
    pedirPersonajes({ nombre, estado, pagina }, control.signal)
      .then((datos) => setCarga({ tipo: 'listo', datos }))
      .catch((e) => {
        if (e.name !== 'AbortError') setCarga({ tipo: 'error' })
      })
    return () => control.abort()
  }, [nombre, estado, pagina, intento])

  function limpiar() {
    setTexto('')
    setParams({}, { replace: true })
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pt-14">
      <header className="max-w-xl">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Explorar personajes</h1>
        <p className="mt-3 text-muted">Los datos llegan en tiempo real desde la API. Busca por nombre o filtra por estado.</p>
      </header>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row">
        <SearchBar valor={texto} onCambio={setTexto} />
        <StatusFilter valor={estado} onCambio={(e) => cambiar({ estado: e, p: '' })} />
      </div>

      <div className="mt-10" aria-live="polite">
        {carga.tipo === 'cargando' && <Loader />}
        {carga.tipo === 'error' && <ErrorState onReintentar={() => setIntento((n) => n + 1)} />}
        {carga.tipo === 'listo' && carga.datos.personajes.length === 0 && (
          <EmptyState titulo="Nadie coincide con esa búsqueda" texto="Prueba con otro nombre o quita el filtro de estado.">
            <button type="button" onClick={limpiar} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper">
              Limpiar búsqueda
            </button>
          </EmptyState>
        )}
        {carga.tipo === 'listo' && carga.datos.personajes.length > 0 && (
          <>
            <p className="mb-5 text-sm text-muted">
              {carga.datos.total} {carga.datos.total === 1 ? 'resultado' : 'resultados'}
            </p>
            <CharacterGrid personajes={carga.datos.personajes} onAlternar={alternar} />
            <Pagination pagina={pagina} total={carga.datos.paginas} onCambio={(p) => cambiar({ p: p === 1 ? '' : String(p) })} />
          </>
        )}
      </div>
      {dialogo}
    </section>
  )
}
