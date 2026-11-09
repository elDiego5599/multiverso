import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pedirPersonajes } from '../api'
import type { Personaje } from '../types'

const fondos = ['bg-naranja', 'bg-lila', 'bg-verde', 'bg-rosa', 'bg-fucsia', 'bg-accent']

// Una tira de personajes sacada de la API, cada uno sobre un bloque de color
export default function TiraPersonajes() {
  const [personajes, setPersonajes] = useState<Personaje[]>([])

  useEffect(() => {
    const control = new AbortController()
    pedirPersonajes({ nombre: '', estado: '', pagina: 2 }, control.signal)
      .then((r) => setPersonajes(r.personajes.slice(0, 6)))
      .catch(() => {})
    return () => control.abort()
  }, [])

  return (
    <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6">
      {personajes.map((p, i) => (
        <li key={p.id} className="border-r border-b border-line">
          <Link to={`/explorar/${p.id}`} className="group block">
            <div className={`${fondos[i % fondos.length]} overflow-hidden`}>
              <img
                src={p.image}
                alt={`Retrato de ${p.name}`}
                width={300}
                height={300}
                loading="lazy"
                className="aspect-square w-full object-cover mix-blend-multiply grayscale transition duration-500 group-hover:scale-105 group-hover:mix-blend-normal group-hover:grayscale-0"
              />
            </div>
            <p className="truncate px-3 py-2.5 font-mono text-xs uppercase">{p.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
