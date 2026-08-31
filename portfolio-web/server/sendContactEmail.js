import { Resend } from 'resend'
import { autoReplyHtml, ownerHtml } from './emailTemplates.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class ContactError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

function firstLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

export function parseContactPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Buffer.isBuffer(body)) {
    throw new ContactError('Invalid request.')
  }

  if (typeof body.honeypot === 'string' && body.honeypot.trim()) {
    return { spam: true }
  }

  const name = firstLine(body.name ?? '')
  const email = firstLine(body.email ?? '').toLowerCase()
  const subject = firstLine(body.subject ?? '')
  const message = String(body.message ?? '').trim()

  if (name.length < 2 || name.length > 100) {
    throw new ContactError('Please enter your name.')
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    throw new ContactError('Please enter a valid email.')
  }
  if (subject.length > 160) {
    throw new ContactError('Subject is too long.')
  }
  if (message.length < 10 || message.length > 5000) {
    throw new ContactError('Please write a short message (at least 10 characters).')
  }

  return {
    spam: false,
    name,
    email,
    subject,
    message,
  }
}

/**
 * Sends the inquiry to CONTACT_EMAIL, then an auto-reply to the visitor.
 */
export async function sendContactEmails(body, env = process.env) {
  const parsed = parseContactPayload(body)
  if (parsed.spam) return { ok: true }

  const apiKey = env.RESEND_API_KEY
  const toOwner = env.CONTACT_EMAIL || 'kankraj24@gmail.com'
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set')
    throw new ContactError('The contact form is not connected yet.', 503)
  }
  if (!env.CONTACT_EMAIL) {
    console.warn('[contact] CONTACT_EMAIL is not set; using default recipient')
  }

  const from = env.RESEND_FROM_EMAIL || 'Raj Sudhir Kank <onboarding@resend.dev>'
  const topic = parsed.subject || 'Portfolio inquiry'
  const resend = new Resend(apiKey)

  console.info('[contact] sending owner email', {
    to: toOwner,
    from,
    replyTo: parsed.email,
  })

  const ownerResult = await resend.emails.send({
    from,
    to: toOwner,
    replyTo: parsed.email,
    subject: `Portfolio contact from ${parsed.name}${parsed.subject ? ` — ${parsed.subject}` : ''}`,
    html: ownerHtml(parsed),
    text: [
      `Name: ${parsed.name}`,
      `Email: ${parsed.email}`,
      `Subject: ${topic}`,
      '',
      parsed.message,
    ].join('\n'),
  })

  if (ownerResult.error) {
    console.error('[contact] Resend owner email failed', {
      name: ownerResult.error.name,
      message: ownerResult.error.message,
      statusCode: ownerResult.error.statusCode,
    })
    throw new ContactError(
      ownerResult.error.message || 'Could not send your message. Please try again.',
      502,
    )
  }

  const replyResult = await resend.emails.send({
    from,
    to: parsed.email,
    subject: `Thanks for reaching out, ${parsed.name}`,
    html: autoReplyHtml(parsed),
    text: [
      `Hi ${parsed.name},`,
      '',
      'Thanks for getting in touch through my portfolio. I have received your message and will get back to you as soon as I can — usually within a day.',
      '',
      'If your note is time-sensitive, you can also email me directly at kankraj24@gmail.com.',
      '',
      'Best regards,',
      'Raj Sudhir Kank',
      'AI Engineer',
      'Mumbai, India',
    ].join('\n'),
  })

  if (replyResult.error) {
    console.warn('[contact] auto-reply failed', {
      name: replyResult.error.name,
      message: replyResult.error.message,
      statusCode: replyResult.error.statusCode,
    })
  } else {
    console.info('[contact] emails sent')
  }

  return { ok: true }
}
