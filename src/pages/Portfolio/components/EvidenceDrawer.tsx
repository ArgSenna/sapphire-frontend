import type { Evidence } from '@/api/types'

interface EvidenceDrawerProps {
  open: boolean
  onClose: () => void
  evidences: Evidence[]
  title: string
}

export default function EvidenceDrawer({ open, onClose, evidences, title }: EvidenceDrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 h-full w-full max-w-md overflow-y-auto border-l border-slate-700 bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-base font-medium text-slate-100">证据链 - {title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            aria-label="关闭"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {evidences.map((ev, i) => (
            <div key={i} className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">{ev.source}</span>
                <span className={
                  ev.reliability === 'high' ? 'text-[10px] text-green-400' :
                  ev.reliability === 'medium' ? 'text-[10px] text-yellow-400' :
                  'text-[10px] text-slate-500'
                }>
                  {ev.reliability === 'high' ? '高可信度' : ev.reliability === 'medium' ? '中可信度' : '低可信度'}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{ev.snippet}</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-600">
                <span>{ev.date}</span>
                <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400">
                  来源链接
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
