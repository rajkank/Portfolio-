import { useState } from 'react'
import { FileText } from 'lucide-react'
import { ResumeModal } from './ResumeModal.jsx'

/** Hero CTA — opens {@link ResumeModal} (same style as “View projects”). */
export default function ResumeHeroButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-muted/30 bg-navy-deep/40 px-6 py-3.5 text-sm font-medium text-paper transition hover:border-accent/40 hover:bg-navy-deep/60 sm:w-auto sm:py-3"
      >
        <FileText className="h-4 w-4" />
        Check Out My Resume
      </button>
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
