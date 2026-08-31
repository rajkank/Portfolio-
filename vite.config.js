import path from 'node:path'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { contactApiPlugin } from './portfolio-web/server/contactApiPlugin.js'

/** Loads RESEND_API_KEY / CONTACT_EMAIL for the /api/contact route (not exposed to the browser). */

export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, path.resolve(process.cwd(), 'portfolio-web'), ''),
    ...loadEnv(mode, process.cwd(), ''),
  }

  return {
    plugins: [react(), tailwindcss(), contactApiPlugin(env)],
  }
})
