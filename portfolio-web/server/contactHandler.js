import { ContactError, sendContactEmails } from './sendContactEmail.js'

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function parseExistingBody(body) {
  if (Buffer.isBuffer(body)) {
    const raw = body.toString('utf8')
    if (!raw) return {}
    return JSON.parse(raw)
  }
  if (typeof body === 'string') {
    return body.trim() ? JSON.parse(body) : {}
  }
  if (typeof body === 'object') return body
  throw new ContactError('Invalid request.')
}

async function readContactBody(req, limit = 50_000) {
  if (req.body !== undefined && req.body !== null && req.body !== '') {
    try {
      return parseExistingBody(req.body)
    } catch (error) {
      if (error instanceof ContactError) throw error
      throw new ContactError('Invalid request.')
    }
  }

  if (req.readableEnded) {
    throw new ContactError('Invalid request.')
  }

  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new ContactError('Message is too large.', 413))
        req.destroy()
      } else {
        chunks.push(chunk)
      }
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new ContactError('Invalid request.'))
      }
    })
    req.on('error', reject)
  })
}

function logContactFailure(error, req, env) {
  console.error('[api/contact] failed', {
    method: req.method,
    hasBody: req.body !== undefined && req.body !== null && req.body !== '',
    hasApiKey: Boolean(env.RESEND_API_KEY),
    hasContactEmail: Boolean(env.CONTACT_EMAIL),
    name: error?.name,
    message: error?.message,
    statusCode: error?.statusCode,
    stack: error?.stack,
  })
}

/**
 * Node-compatible /api/contact handler used by both Vite (local) and Vercel.
 */
export async function handleContactRequest(req, res, env = process.env) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' })
    return
  }

  try {
    const body = await readContactBody(req)
    await sendContactEmails(body, env)
    sendJson(res, 200, { ok: true })
  } catch (error) {
    logContactFailure(error, req, env)
    const statusCode = error instanceof ContactError ? error.statusCode : 500
    const message =
      error instanceof ContactError
        ? error.message
        : 'Could not send your message. Please try again or email me directly.'
    sendJson(res, statusCode, { ok: false, error: message })
  }
}
