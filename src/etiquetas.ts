import type { Estado } from './types'

export const estados: Record<Estado, string> = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
}

const generos: Record<string, string> = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
}

const especies: Record<string, string> = {
  Human: 'Humano',
  Alien: 'Alienígena',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Cronenberg: 'Cronenberg',
  Disease: 'Enfermedad',
  Poopybutthole: 'Poopybutthole',
  Mythological: 'Mitológico',
  unknown: 'Desconocida',
}

export const traducirGenero = (g: string) => generos[g] ?? g
export const traducirEspecie = (e: string) => especies[e] ?? e
export const traducirLugar = (l: string) => (l === 'unknown' ? 'Desconocido' : l)

export const colorEstado: Record<Estado, string> = {
  Alive: 'bg-accent/15 text-accent',
  Dead: 'bg-danger-soft text-danger',
  unknown: 'bg-sunken text-muted',
}
