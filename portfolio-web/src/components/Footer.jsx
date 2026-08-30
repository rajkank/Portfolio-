import { site } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/40 py-10">
      <div className="page-container">
        <p className="text-center text-sm text-zinc-500 sm:text-left">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
