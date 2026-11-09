// Portal de fondo para el inicio: anillos que giran a distinta velocidad
export default function PortalArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="nucleo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d9ffe2" />
          <stop offset="0.35" stopColor="#6fe08a" />
          <stop offset="1" stopColor="#1c7f48" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="anillo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9f5c6" />
          <stop offset="1" stopColor="#1c7f48" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="230" fill="url(#nucleo)" opacity="0.5" />
      <g className="anim-giro" style={{ transformOrigin: '300px 300px' }}>
        <circle cx="300" cy="300" r="250" fill="none" stroke="url(#anillo)" strokeWidth="10" strokeLinecap="round" strokeDasharray="180 90 40 120" />
      </g>
      <g className="anim-giro-inverso" style={{ transformOrigin: '300px 300px' }}>
        <circle cx="300" cy="300" r="205" fill="none" stroke="url(#anillo)" strokeWidth="6" strokeLinecap="round" strokeDasharray="120 60 220 40" opacity="0.85" />
        <circle cx="300" cy="300" r="160" fill="none" stroke="#6fe08a" strokeWidth="4" strokeLinecap="round" strokeDasharray="60 40" opacity="0.7" />
      </g>
      <g className="anim-giro" style={{ transformOrigin: '300px 300px' }}>
        <circle cx="300" cy="300" r="115" fill="none" stroke="url(#anillo)" strokeWidth="8" strokeLinecap="round" strokeDasharray="90 70 30 80" />
      </g>
      <circle cx="300" cy="300" r="52" fill="url(#nucleo)" />
    </svg>
  )
}
