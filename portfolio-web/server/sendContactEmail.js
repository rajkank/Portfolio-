import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class ContactError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function firstLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

export function parseContactPayload(body) {
  if (!body || typeof body !== 'object') {
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

function ownerHtml({ name, email, subject, message }) {
  const topic = subject || 'Portfolio inquiry'
  return `
    <div style="font-family:Inter,Segoe UI,sans-serif;line-height:1.6;color:#18181b">
      <p style="margin:0 0 16px">New message from your portfolio contact form.</p>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px"><strong>Subject:</strong> ${escapeHtml(topic)}</p>
      <p style="margin:16px 0 8px"><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;margin:0">${escapeHtml(message)}</pre>
    </div>
  `
}

function autoReplyHtml({ name }) {
  return `
    <div style="font-family:Inter,Segoe UI,sans-serif;line-height:1.7;color:#18181b">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for getting in touch through my portfolio. I have received your message and will get back to you as soon as I can — usually within a day.</p>
      <p>If your note is time-sensitive, you can also email me directly at kankraj24@gmail.com.</p>
      <p style="margin-bottom:0">Best regards,<br/>Raj Sudhir Kank<br/>AI Engineer<br/>Mumbai, India</p>
    </div>
  `
}

/**
 * Sends the inquiry to CONTACT_EMAIL, then an auto-reply to the visitor.
 */
export async function sendContactEmails(body, env = process.env) {
  const parsed = parseContactPayload(body)
  if (parsed.spam) return { ok: true }

  const apiKey = env.RESEND_API_KEY
  const toOwner = env.CONTACT_EMAIL
  if (!apiKey || !toOwner) {
    throw new ContactError('The contact form is not connected yet.', 503)
  }

  const from = env.RESEND_FROM_EMAIL || 'Raj Sudhir Kank <onboarding@resend.dev>'
  const topic = parsed.subject || 'Portfolio inquiry'
  const resend = new Resend(apiKey)

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
    console.warn('Contact auto-reply failed:', replyResult.error.message)
  }

  return { ok: true }
}
