import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mx-auto mt-24 flex max-w-6xl flex-col gap-3 px-6 pb-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        Datos de{' '}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          The Rick and Morty API
        </a>
      </p>
      <p>
        Proyecto 01 de React.{' '}
        <Link to="/contacto" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
          Escríbeme
        </Link>
      </p>
    </footer>
  )
}
