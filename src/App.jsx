import PageLoader from './components/PageLoader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackgroundGlow from './components/BackgroundGlow.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen min-h-dvh min-w-0 overflow-x-hidden bg-[#0a0a0a] text-zinc-100">
      <PageLoader />
      <BackgroundGlow />
      <Navbar />
      <main className="relative min-w-0 isolate">
        <Hero />
        <About />
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
