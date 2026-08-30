import { site } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/40 py-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:py-10 sm:pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
      <div className="page-container">
        <p className="text-center text-sm text-zinc-500 sm:text-left">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
