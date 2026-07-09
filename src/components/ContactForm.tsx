import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'ok' | 'error'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
}) {
  const cls =
    'w-full min-h-12 border-0 border-b border-line bg-transparent py-3 text-base text-text placeholder:text-text-dim focus:border-accent focus:outline-none transition-colors duration-(--duration-hover)'
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs uppercase tracking-[0.08em] text-text-dim">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} required className={cls} />
      ) : (
        <input name={name} type={type} required className={cls} />
      )}
    </label>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    // Honeypot: si un bot completó el campo oculto, descartar en silencio
    if (data.get('_gotcha')) return

    if (!FORMSPREE_ID) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return <p className="text-base text-accent-2">Mensaje enviado. Gracias por escribir.</p>
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-6">
      <Field label="Nombre" name="name" />
      <Field label="Email" name="email" type="email" />
      <Field label="Mensaje" name="message" textarea />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start border border-text px-6 py-3 font-mono text-xs uppercase tracking-[0.08em] text-text transition-colors duration-(--duration-hover) hover:bg-text hover:text-bg disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-error">
          {FORMSPREE_ID
            ? 'No se pudo enviar. Probá de nuevo o escribime por redes.'
            : 'El formulario todavía no está conectado (falta VITE_FORMSPREE_ID).'}
        </p>
      )}
    </form>
  )
}
