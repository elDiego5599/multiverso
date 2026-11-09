import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explorar', element: <Explore /> },
      { path: 'explorar/:id', element: <Detail /> },
      { path: 'favoritos', element: <Favorites /> },
      { path: 'contacto', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <ToastProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ToastProvider>
  )
}
