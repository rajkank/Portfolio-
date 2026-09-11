import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Download, Eye, X } from 'lucide-react'
import { site } from '../../data/site.js'

const ease = [0.22, 1, 0.36, 1]

export function ResumeModal({ open, onClose }) {
  const [step, setStep] = useState('pick')
  const [downloadNotice, setDownloadNotice] = useState(false)
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
    if (!open) {
      setStep('pick')
      setDownloadNotice(false)
    }
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
    setDownloadNotice(true)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="resume-modal"
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:pt-[max(1rem,env(safe-area-inset-top,0px))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close resume dialog"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92dvh,880px)] w-full max-w-2xl flex-col overflow-hidden border border-muted/20 bg-navy-dark sm:max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 border-b border-muted/20 px-4 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                {step === 'preview' ? (
                  <button
                    type="button"
                    onClick={() => setStep('pick')}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-muted/25 text-muted transition hover:border-accent/40 hover:text-paper"
                    aria-label="Back to options"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                ) : null}
                <div className="min-w-0">
                  <h2 id={titleId} className="truncate font-serif text-lg text-paper sm:text-xl">
                    {step === 'preview' ? 'Resume preview' : 'Resume'}
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    {step === 'preview'
                      ? 'Preview your resume below'
                      : 'View online or download a copy'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-muted/25 text-muted transition hover:border-accent/40 hover:text-paper"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {downloadNotice ? (
              <div
                role="status"
                aria-live="polite"
                className="border-b border-muted/20 bg-navy-deep/50 px-4 py-3 sm:px-6"
              >
                <p className="text-sm font-medium text-paper">Download started</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {site.resume.downloadAfterMessage}{' '}
                  <span className="text-paper">{site.resume.downloadFileName}</span>.
                </p>
              </div>
            ) : null}

            {step === 'pick' ? (
              <div className="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="flex items-start gap-3 border border-muted/20 bg-navy-deep/50 p-4 text-left transition hover:border-accent/35 sm:p-5"
                >
                  <Eye className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <span className="block font-medium text-paper">View</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      Open the PDF preview in this window
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-start gap-3 border border-muted/20 bg-navy-deep/50 p-4 text-left transition hover:border-accent/35 sm:p-5"
                >
                  <Download className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <span className="block font-medium text-paper">Download</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {site.resume.downloadDescription}
                    </span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-6">
                <div className="min-h-0 flex-1 overflow-hidden border border-muted/20 bg-navy-midnight">
                  <iframe
                    title="Resume PDF"
                    src={`${pdfUrl}#view=FitH`}
                    className="h-[min(62dvh,560px)] w-full sm:h-[min(68dvh,620px)] md:h-[min(70dvh,640px)]"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-muted sm:text-sm">
                  If the preview is blank, use Download — some browsers limit embedded PDFs.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
