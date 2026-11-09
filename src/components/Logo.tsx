export default function Logo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#16201b" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#6fe08a" strokeWidth="4" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="#b9f5c6" strokeWidth="3" strokeDasharray="40 14" />
      <circle cx="32" cy="32" r="4.5" fill="#6fe08a" />
    </svg>
  )
}
