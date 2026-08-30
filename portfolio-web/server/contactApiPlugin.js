import { ContactError, sendContactEmails } from './sendContactEmail.js'

function readJsonBody(req, limit = 50_000) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new ContactError('Message is too large.', 413))
        req.destroy()
        return
      }
      chunks.push(chunk)
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

function json(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

export function contactApiPlugin(env) {
  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0]
      if (url !== '/api/contact') return next()

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
      }

      if (req.method !== 'POST') {
        json(res, 405, { ok: false, error: 'Method not allowed' })
        return
      }

      try {
        const body = await readJsonBody(req)
        await sendContactEmails(body, env)
        json(res, 200, { ok: true })
      } catch (error) {
        const statusCode = error instanceof ContactError ? error.statusCode : 500
        const message =
          error instanceof ContactError
            ? error.message
            : 'Could not send your message. Please try again or email me directly.'
        json(res, statusCode, { ok: false, error: message })
      }
    })
  }

  return {
    name: 'contact-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}
