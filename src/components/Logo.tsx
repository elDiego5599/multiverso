export default function Logo({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" fill="#1f1f1f" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#7b92ff" strokeWidth="5" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="#e8559f" strokeWidth="5" strokeDasharray="42 14" />
      <circle cx="32" cy="32" r="3.5" fill="#6fd57a" />
    </svg>
  )
}
