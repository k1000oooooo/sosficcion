import { useHead } from '@unhead/react'
import SectionHeading from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'

export default function Contacto() {
  useHead({ title: 'Contacto — Camilo Franco' })
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <SectionHeading overline="Escribime" title="Contacto" />
      <ContactForm />
    </main>
  )
}
