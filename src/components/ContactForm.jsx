import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { sendContact } from '../utils/sendContact.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const empty = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.'
  if (message.length < 10) errors.message = 'Please write a short message (at least 10 characters).'
  return errors
}

const fieldClass =
  'w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 disabled:opacity-60'

export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  const busy = status === 'submitting'

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('submitting')
    try {
      await sendContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        honeypot: values.website.trim(),
      })
      setStatus('success')
      setValues(empty)
    } catch (err) {
      setStatus('error')
      setFormError(
        err instanceof Error && err.message
          ? err.message
          : 'Could not send your message. Please try again or email me directly.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center px-2 py-10 text-center sm:py-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-white">Message sent</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          Thanks for reaching out. I received your note, and you should get a confirmation email
          shortly. I typically reply within a day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setFormError('')
          }}
          className="mt-7 rounded-full border border-zinc-700 bg-zinc-950/50 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-emerald-500/40 hover:text-white"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={onChange}
          error={errors.name}
          disabled={busy}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={onChange}
          error={errors.email}
          disabled={busy}
        />
      </div>

      <Field
        id="contact-subject"
        name="subject"
        label="Subject"
        optional
        autoComplete="off"
        placeholder="What is this about?"
        value={values.subject}
        onChange={onChange}
        disabled={busy}
      />

      <Field
        id="contact-message"
        name="message"
        label="Message"
        as="textarea"
        rows={6}
        placeholder="Tell me about the role, project, or idea…"
        value={values.message}
        onChange={onChange}
        error={errors.message}
        disabled={busy}
      />

      {/* Honeypot — hidden from people, filled by some bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>

      {formError ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{formError}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-zinc-500">
          You’ll get a confirmation email. I read every message personally.
        </p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function Field({
  id,
  name,
  label,
  optional,
  error,
  as = 'input',
  type = 'text',
  ...rest
}) {
  const Tag = as
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
        {label}
        {optional ? (
          <span className="ml-2 font-sans text-[10px] font-normal normal-case tracking-normal text-zinc-600">
            optional
          </span>
        ) : (
          <span className="ml-1 text-emerald-500/80">*</span>
        )}
      </label>
      <Tag
        id={id}
        name={name}
        type={as === 'textarea' ? undefined : type}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${fieldClass} ${as === 'textarea' ? 'min-h-[9rem] resize-y' : ''} ${
          error ? 'border-red-500/40 focus:border-red-400/50 focus:ring-red-400/20' : ''
        }`}
        {...rest}
      />
      {error ? (
        <p id={describedBy} className="mt-1.5 text-xs text-red-300/90">
          {error}
        </p>
      ) : null}
    </div>
  )
}
