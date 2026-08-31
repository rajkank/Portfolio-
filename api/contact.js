import { handleContactRequest } from '../portfolio-web/server/contactHandler.js'

export const config = { runtime: 'nodejs' }

export default async function handler(req, res) {
  await handleContactRequest(req, res, process.env)
}
