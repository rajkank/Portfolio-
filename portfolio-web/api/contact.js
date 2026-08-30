import { ContactError, sendContactEmails } from '../server/sendContactEmail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  try {
    await sendContactEmails(req.body, process.env)
    res.status(200).json({ ok: true })
  } catch (error) {
    const statusCode = error instanceof ContactError ? error.statusCode : 500
    const message =
      error instanceof ContactError
        ? error.message
        : 'Could not send your message. Please try again or email me directly.'
    res.status(statusCode).json({ ok: false, error: message })
  }
}
