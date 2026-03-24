import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Download, Eye, FileText, X } from 'lucide-react'
import { site } from '../../data/site.js'

const ease = [0.22, 1, 0.36, 1]

/**
 * Full-screen overlay + resume picker / embedded PDF preview.
 * PDF is shown in an iframe (same origin) — no new tab for “View”.
 */
export function ResumeModal({ open, onClose }) {
  const [step, setStep] = useState('pick')
  const titleId = useId()
  const pdfUrl = encodeURI(site.resume.pdfPath)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) setStep('pick')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = site.resume.downloadFileName
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="resume-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-[max(1rem,env(safe-area-inset-top,0px))] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            aria-label="Close resume dialog"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-zinc-900/98 to-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_64px_-20px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.32, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.12),transparent_55%)]" />

            <header className="relative flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2">
                {step === 'preview' ? (
                  <button
                    type="button"
                    onClick={() => setStep('pick')}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/60 text-zinc-300 transition hover:border-emerald-500/40 hover:text-white"
                    aria-label="Back to options"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/60 text-emerald-400">
                    <FileText className="h-4 w-4" />
                  </span>
                )}
                <div className="min-w-0">
                  <h2 id={titleId} className="truncate font-serif text-lg text-white sm:text-xl">
                    {step === 'preview' ? 'Resume preview' : 'Resume'}
                  </h2>
                  <p className="text-[11px] text-zinc-500 sm:text-xs">
                    {step === 'preview'
                      ? 'Displayed here — no new tab'
                      : 'View in this window or download a copy'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/60 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {step === 'pick' ? (
              <div className="relative grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-zinc-700/80 bg-zinc-900/50 p-5 text-left transition hover:border-emerald-500/45 hover:bg-zinc-800/60 hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.35)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25 transition group-hover:bg-emerald-500/25">
                    <Eye className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">View</span>
                    <span className="mt-1 block text-sm text-zinc-500">
                      Open the PDF preview inside this panel
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-zinc-700/80 bg-zinc-900/50 p-5 text-left transition hover:border-teal-500/45 hover:bg-zinc-800/60 hover:shadow-[0_0_40px_-12px_rgba(20,184,166,0.3)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/25 transition group-hover:bg-teal-500/25">
                    <Download className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">Download</span>
                    <span className="mt-1 block text-sm text-zinc-500">
                      Save {site.resume.downloadFileName} to your device
                    </span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="relative flex min-h-0 flex-1 flex-col px-3 pb-4 pt-1 sm:px-5 sm:pb-5">
                <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 ring-1 ring-white/5">
                  <iframe
                    title="Resume PDF"
                    src={`${pdfUrl}#view=FitH`}
                    className="h-[min(68vh,620px)] w-full sm:h-[min(70vh,640px)]"
                  />
                </div>
                <p className="mt-3 text-center text-[11px] text-zinc-600">
                  If the preview is blank, use Download — some browsers limit embedded PDFs.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
