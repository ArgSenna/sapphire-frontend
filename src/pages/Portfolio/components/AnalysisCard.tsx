import { cn } from '@/utils'
import SignalLight from '@/components/ui/SignalLight'

import type { SignalColor } from '@/api/types'

interface AnalysisCardProps {
  signal: SignalColor
  title: string
  summary: string
  content: string
  expanded: boolean
  onToggle: () => void
  onShowEvidence: () => void
}

export default function AnalysisCard({
  signal, title, summary, content,
  expanded, onToggle, onShowEvidence,
}: AnalysisCardProps) {
  return (
    <div className={cn(
      'rounded-lg border transition-colors',
      expanded ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-white',
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:px-4"
      >
        <SignalLight color={signal} />
        <div className="flex-1">
          <span className="text-sm font-medium text-slate-800">{title}</span>
          <p className="mt-0.5 text-xs text-slate-500">{summary}</p>
        </div>
        <svg
          className={cn('h-4 w-4 text-slate-500 transition-transform', expanded && 'rotate-180')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-slate-200 px-3.5 py-3.5 sm:px-4 sm:py-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
            {content}
            {' '}
            <button
              onClick={onShowEvidence}
              className="text-xs text-amber-500 hover:text-amber-400"
            >
              查看证据链
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
