type Props = {
  /** Etiqueta mono corta arriba del título, ej. "Radio" */
  overline?: string
  title: string
}

export default function SectionHeading({ overline, title }: Props) {
  return (
    <div className="mb-10">
      {overline && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
          {overline}
        </p>
      )}
      <h1 className="text-xl md:text-2xl">{title}</h1>
    </div>
  )
}
