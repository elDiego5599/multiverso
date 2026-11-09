import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 flex flex-col gap-3 border-t border-line px-6 py-6 font-mono text-xs text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
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
