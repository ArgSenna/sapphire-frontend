import { cn } from '@/utils'
import SignalLight from '@/components/ui/SignalLight'

import type { SignalColor } from '@/api/types'

interface AnalysisCardProps {
  signal: SignalColor
  title: string
  summary: string
  content: string
  promptVersion: string
  model: string
  analyzedAt: string
  expanded: boolean
  onToggle: () => void
  onShowEvidence: () => void
}

export default function AnalysisCard({
  signal, title, summary, content,
  promptVersion, model, analyzedAt,
  expanded, onToggle, onShowEvidence,
}: AnalysisCardProps) {
  return (
    <div className={cn(
      'rounded-lg border transition-colors',
      expanded ? 'border-slate-700 bg-slate-800/50' : 'border-slate-800 bg-slate-900/30',
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <SignalLight color={signal} />
        <div className="flex-1">
          <span className="text-sm font-medium text-slate-200">{title}</span>
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
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {content}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
            <div className="flex gap-4 text-[10px] text-slate-600">
              <span>Prompt {promptVersion}</span>
              <span>{model}</span>
              <span>{new Date(analyzedAt).toLocaleString('zh-CN')}</span>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onShowEvidence() }}
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
