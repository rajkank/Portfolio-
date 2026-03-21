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
        className="inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-900/40 px-6 py-3 text-sm font-medium text-white transition hover:border-emerald-500/40 hover:bg-zinc-800/60"
      >
        <FileText className="h-4 w-4" />
        Resume
      </button>
      <ResumeModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
