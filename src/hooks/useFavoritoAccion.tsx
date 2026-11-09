import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import { useFavoritos } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import type { Personaje } from '../types'

export function useFavoritoAccion() {
  const { esFavorito, agregar, quitar } = useFavoritos()
  const { avisar } = useToast()
  const [pendiente, setPendiente] = useState<Personaje | null>(null)

  function alternar(p: Personaje) {
    if (esFavorito(p.id)) {
      setPendiente(p)
    } else {
      agregar(p)
      avisar('exito', `${p.name} agregado a favoritos`)
    }
  }

  const dialogo = (
    <ConfirmDialog
      abierto={pendiente !== null}
      titulo="¿Quitar de favoritos?"
      textoConfirmar="Quitar"
      onCancelar={() => setPendiente(null)}
      onConfirmar={() => {
        if (!pendiente) return
        quitar(pendiente.id)
        avisar('info', `${pendiente.name} salió de tus favoritos`)
        setPendiente(null)
      }}
    >
      ¿Seguro que quieres quitar a <strong className="text-ink">{pendiente?.name}</strong> de tus favoritos?
    </ConfirmDialog>
  )

  return { alternar, dialogo }
}
