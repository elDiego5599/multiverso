import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import NewsletterDialog from '../components/NewsletterDialog'
import { useToast } from '../context/ToastContext'

interface Campos {
  nombre: string
  email: string
  mensaje: string
}

const vacio: Campos = { nombre: '', email: '', mensaje: '' }

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
      {texto}
    </p>
  )
}

function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const e: Partial<Record<keyof Campos, string>> = {}
  if (c.nombre.trim().length < 2) e.nombre = 'El nombre debe tener al menos 2 caracteres'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim())) e.email = 'Ingresa un email válido (debe contener @ y .)'
  if (c.mensaje.trim().length < 10) e.mensaje = 'El mensaje debe tener al menos 10 caracteres'
  return e
}

export default function Contact() {
  const { avisar } = useToast()
  const [valores, setValores] = useState<Campos>(vacio)
  const [tocados, setTocados] = useState<Partial<Record<keyof Campos, boolean>>>({})
  const [confirmando, setConfirmando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [boletin, setBoletin] = useState(false)

  const errores = validar(valores)
  const valido = Object.keys(errores).length === 0

  function cambiar(campo: keyof Campos, valor: string) {
    setValores((v) => ({ ...v, [campo]: valor }))
  }

  function alSalir(campo: keyof Campos) {
    setTocados((t) => ({ ...t, [campo]: true }))
  }

  function alEnviar(e: FormEvent) {
    e.preventDefault()
    if (!valido) {
      setTocados({ nombre: true, email: true, mensaje: true })
      avisar('error', 'Revisa los campos marcados')
      return
    }
    setConfirmando(true)
  }

  function enviar() {
    setConfirmando(false)
    setEnviando(true)
    // No hay servidor de correo: se simula el envío con una pequeña espera
    setTimeout(() => {
      setEnviando(false)
      setValores(vacio)
      setTocados({})
      avisar('exito', 'Mensaje enviado, gracias por escribir')
      setBoletin(true)
    }, 900)
  }

  const campo =
    'w-full rounded-2xl border bg-paper px-4 py-3 text-sm placeholder:text-muted/70 focus-visible:outline-none'

  function propiedades(c: keyof Campos) {
    const mal = tocados[c] && errores[c]
    return {
      id: c,
      value: valores[c],
      onChange: (e: { target: { value: string } }) => cambiar(c, e.target.value),
      onBlur: () => alSalir(c),
      'aria-invalid': mal ? true : undefined,
      'aria-describedby': mal ? `${c}-error` : undefined,
      className: `${campo} ${mal ? 'border-danger' : 'border-line focus:border-accent'}`,
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-6 pt-14 md:grid-cols-[1fr_1.15fr] md:gap-16">
      <header>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Contacto</h1>
        <p className="mt-4 max-w-sm text-muted">
          ¿Tienes preguntas o sugerencias? Déjame un mensaje y te respondo cuando cruce el siguiente portal.
        </p>
      </header>

      <form
        onSubmit={alEnviar}
        noValidate
        className="rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-8"
      >
        <div>
          <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium">
            Nombre
          </label>
          <input type="text" autoComplete="name" placeholder="Tu nombre" {...propiedades('nombre')} />
          <MensajeError id="nombre" texto={tocados.nombre ? errores.nombre : undefined} />
        </div>
        <div className="mt-5">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input type="email" autoComplete="email" placeholder="tu@correo.com" {...propiedades('email')} />
          <MensajeError id="email" texto={tocados.email ? errores.email : undefined} />
        </div>
        <div className="mt-5">
          <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium">
            Mensaje
          </label>
          <textarea rows={5} placeholder="Escribe tu mensaje aquí..." {...propiedades('mensaje')} />
          <MensajeError id="mensaje" texto={tocados.mensaje ? errores.mensaje : undefined} />
        </div>
        <button
          type="submit"
          disabled={!valido || enviando}
          className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {enviando ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <ConfirmDialog
        abierto={confirmando}
        titulo="¿Enviar el mensaje?"
        textoConfirmar="Enviar"
        onCancelar={() => setConfirmando(false)}
        onConfirmar={enviar}
      >
        Revisa que tu correo esté bien escrito, es donde te vamos a responder.
      </ConfirmDialog>

      <NewsletterDialog
        abierto={boletin}
        onAceptar={() => {
          setBoletin(false)
          avisar('exito', 'Listo, te avisaremos de las novedades')
        }}
        onRechazar={() => {
          setBoletin(false)
          avisar('info', 'Sin problema, no te escribiremos más')
        }}
      />
    </section>
  )
}
