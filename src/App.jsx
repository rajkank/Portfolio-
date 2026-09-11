import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackgroundGlow from './components/BackgroundGlow.jsx'
import { scrollToSection } from './utils/scrollToSection.js'

/** If the site opens as `.../#contact` (bookmark / share), jump to that section on load. */
function ScrollToHashOnLoad() {
  useEffect(() => {
    const raw = window.location.hash
    if (!raw || raw.length <= 1) return
    let id
    try {
      id = decodeURIComponent(raw.slice(1))
    } catch {
      return
    }
    if (!id || !document.getElementById(id)) return

    const t = window.setTimeout(() => scrollToSection(id), 80)
    return () => window.clearTimeout(t)
  }, [])

  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen min-h-dvh min-w-0 overflow-x-hidden bg-navy-midnight text-paper">
      <ScrollToHashOnLoad />
      <BackgroundGlow />
      <Navbar />
      <main className="relative isolate min-w-0 overflow-x-hidden">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
