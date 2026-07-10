import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/resonance-extra', label: 'Resonance Extra' },
  { to: '/creativa-radio', label: 'Creativa Radio' },
  { to: '/discografia', label: 'Discografía' },
  { to: '/videos', label: 'Videos' },
  { to: '/books', label: 'Books' },
  { to: '/contacto', label: 'Contacto' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-[0.08em] text-text transition-colors duration-(--duration-hover) hover:text-accent"
        >
          Camilo Franco
        </Link>

        {/* Desktop */}
        <nav className="hidden gap-8 md:flex" aria-label="Principal">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-(--duration-hover) ${
                  isActive
                    ? 'text-accent underline decoration-1 underline-offset-[6px]'
                    : 'text-text-dim hover:text-text'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="flex h-11 w-11 items-center justify-center text-text md:hidden"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
        </div>
      </header>

      {/* Mobile overlay — fuera del header: backdrop-blur crearía un
          containing block y colapsaría la caja del fixed */}
      {open && (
        <nav
          aria-label="Principal"
          className="fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col gap-2 bg-bg px-5 pt-10 md:hidden"
        >
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              style={{ animationDelay: `${i * 40}ms` }}
              className={({ isActive }) =>
                `animate-fade-up py-3 text-2xl ${
                  isActive ? 'text-accent' : 'text-text'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  )
}
