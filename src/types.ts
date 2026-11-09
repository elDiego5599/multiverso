export type Estado = 'Alive' | 'Dead' | 'unknown'

export interface Personaje {
  id: number
  name: string
  status: Estado
  species: string
  type: string
  gender: string
  origin: { name: string }
  location: { name: string }
  image: string
  episode: string[]
}

export interface Pagina {
  personajes: Personaje[]
  paginas: number
  total: number
}

export type TipoToast = 'exito' | 'error' | 'info'
