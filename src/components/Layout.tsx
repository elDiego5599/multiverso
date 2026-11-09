import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50  focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <div className="min-h-screen sm:m-3 sm:min-h-[calc(100vh-1.5rem)] sm:border sm:border-line">
        <Navbar />
        <main id="contenido">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  )
}
