import RatingBadge from './RatingBadge'

import type { ResearchReport, ResearchType } from '@/api/types'

const typeLabels: Record<ResearchType, { label: string; color: string }> = {
  investment: { label: '投资', color: 'bg-amber-500/20 text-amber-400' },
  service: { label: '服务', color: 'bg-blue-500/20 text-blue-400' },
  innovation: { label: '创新', color: 'bg-purple-500/20 text-purple-400' },
}

interface ResearchCardProps {
  report: ResearchReport
  onDelete: (id: string) => void
}

export default function ResearchCard({ report, onDelete }: ResearchCardProps) {
  const typeConfig = typeLabels[report.type]

  return (
    <div
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md active:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{report.stockName}</span>
            <span className="text-xs text-slate-500">{report.stockCode}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
            <RatingBadge rating={report.rating} />
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onDelete(report.id) }}
          className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="删除报告"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div className="mt-3 text-[10px] text-slate-400 font-medium">
        {new Date(report.createdAt).toLocaleString('zh-CN')}
      </div>
    </div>
  )
}
