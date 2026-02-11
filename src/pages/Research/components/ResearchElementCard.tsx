import { cn } from '@/utils'
import RatingBadge from './RatingBadge'

import type { ResearchElement } from '@/api/types'

interface ResearchElementCardProps {
  element: ResearchElement
  expanded: boolean
  onToggle: () => void
  onShowEvidence: () => void
}

export default function ResearchElementCard({ element, expanded, onToggle, onShowEvidence }: ResearchElementCardProps) {
  return (
    <div className={cn(
      'rounded-lg border transition-colors',
      expanded ? 'border-slate-700 bg-slate-800/50' : 'border-slate-800 bg-slate-900/30',
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:px-4"
      >
        <RatingBadge rating={element.rating} />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-slate-200">{element.title}</span>
          <p className="mt-0.5 truncate text-xs text-slate-500">{element.summary}</p>
        </div>
        <svg
          className={cn('h-4 w-4 shrink-0 text-slate-500 transition-transform', expanded && 'rotate-180')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-slate-800 px-3.5 py-3.5 sm:px-4 sm:py-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
            {element.content}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-800 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-wrap gap-3 text-[10px] text-slate-600">
              <span>Prompt {element.promptVersion}</span>
              <span>{element.model}</span>
              <span>{new Date(element.analyzedAt).toLocaleString('zh-CN')}</span>
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
