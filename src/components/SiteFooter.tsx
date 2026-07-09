import { ArrowUpRight } from 'lucide-react'
import { socials } from '../content/socials'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-dim">Redes</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="group inline-flex min-h-11 items-center gap-1 font-mono text-sm text-text-dim transition-colors duration-(--duration-hover) hover:text-text"
              >
                {name}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-colors duration-(--duration-hover) group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-text-dim">© {new Date().getFullYear()} Camilo Franco</p>
      </div>
    </footer>
  )
}
