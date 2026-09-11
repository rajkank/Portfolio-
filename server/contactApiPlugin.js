import { ContactError } from './sendContactEmail.js'
import { handleContactRequest } from './contactHandler.js'

export function contactApiPlugin(env) {
  const attach = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0]
      if (url !== '/api/contact') return next()

      try {
        await handleContactRequest(req, res, env)
      } catch (error) {
        if (!res.headersSent) {
          const statusCode = error instanceof ContactError ? error.statusCode : 500
          res.statusCode = statusCode
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              ok: false,
              error: 'Could not send your message. Please try again or email me directly.',
            }),
          )
        }
      }
    })
  }

  return {
    name: 'contact-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}
