import { useState } from 'react'

import { cn } from '@/utils'

import type { Evidence } from '@/api/types'

function EvidenceItem({ ev, depth = 0 }: { ev: Evidence; depth?: number }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = ev.children && ev.children.length > 0

  return (
    <div className={cn(
      'rounded-lg border bg-white p-3.5',
      depth === 0 ? 'border-slate-200' : 'border-slate-200/80',
    )}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{ev.source}</span>
        <span className={
          ev.reliability === 'high' ? 'text-[10px] text-green-600' :
          ev.reliability === 'medium' ? 'text-[10px] text-yellow-600' :
          'text-[10px] text-slate-400'
        }>
          {ev.reliability === 'high' ? '高可信度' : ev.reliability === 'medium' ? '中可信度' : '低可信度'}
        </span>
      </div>
      <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-500">{ev.snippet}</p>
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span>{ev.date}</span>
        <div className="flex items-center gap-3">
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-0.5 text-amber-500/70 hover:text-amber-400"
            >
              <span>支撑证据 ({ev.children!.length})</span>
              <svg
                className={cn('h-3 w-3 transition-transform', expanded && 'rotate-180')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400">
            来源链接
          </a>
        </div>
      </div>
      {hasChildren && expanded && (
        <div className="mt-3 space-y-2 border-l-2 border-slate-200 pl-3">
          {ev.children!.map((child, i) => (
            <EvidenceItem key={i} ev={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

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
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 h-full w-full overflow-y-auto border-l border-slate-200 bg-slate-50 p-4 sm:max-w-md sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-medium text-slate-900">证据链 - {title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="关闭"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {evidences.map((ev, i) => (
            <EvidenceItem key={i} ev={ev} />
          ))}
        </div>
      </div>
    </div>
  )
}
