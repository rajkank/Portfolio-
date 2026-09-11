import { site } from '../data/site.js'
import MotionReveal from './MotionReveal.jsx'

const contactLinks = [
  {
    id: 'email',
    label: site.email,
    href: `mailto:${site.email}`,
  },
  {
    id: 'phone',
    label: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'location',
    label: site.location,
  },
]

const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: site.social.linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: site.social.github,
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    href: site.social.kaggle,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: site.social.instagram,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black py-10 text-white pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] sm:py-14 sm:pb-[max(3rem,env(safe-area-inset-bottom,0px))]">
      <MotionReveal className="page-container min-w-0" y={20}>
        <div className="flex flex-col gap-8 sm:gap-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 max-w-md">
              <p className="font-serif text-xl tracking-tight sm:text-2xl md:text-3xl">{site.navName}</p>
              <ul className="mt-4 space-y-3">
                {contactLinks.map((item) => (
                  <li key={item.id}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-balance-wrap inline-block text-sm text-white/80 transition hover:text-white sm:text-[15px]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-sm text-white/80 sm:text-[15px]">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Connect
              </p>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 transition hover:text-white sm:text-[15px]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-white/45 sm:text-sm">
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/45 sm:text-sm">{site.title}</p>
          </div>
        </div>
      </MotionReveal>
    </footer>
  )
}
