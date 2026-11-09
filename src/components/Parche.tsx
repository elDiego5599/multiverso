// Cuadro con anillos que gira, va incrustado dentro del título del inicio
export default function Parche() {
  return (
    <span aria-hidden="true" className="mx-[0.12em] inline-block size-[0.78em] translate-y-[0.04em] bg-fucsia align-baseline">
      <svg viewBox="0 0 100 100" className="size-full">
        <g className="anim-giro" style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="7" strokeDasharray="60 24 20 36" />
        </g>
        <g className="anim-giro-inverso" style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="24" fill="none" stroke="#1f1f1f" strokeWidth="6" strokeDasharray="40 20" />
        </g>
        <circle cx="50" cy="50" r="7" fill="#fff" />
      </svg>
    </span>
  )
}
