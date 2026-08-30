/**
 * Posts the contact form to the server so RESEND_API_KEY never ships to the browser.
 */
export async function sendContact({ name, email, subject, message, honeypot }) {
  if (honeypot) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ok: true }
  }

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, subject, message }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.ok !== true) {
    throw new Error(
      typeof data.error === 'string' && data.error.trim()
        ? data.error
        : 'Could not send your message. Please try again or email me directly.',
    )
  }

  return { ok: true }
}
