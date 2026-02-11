import SignalLight from '@/components/ui/SignalLight'
import { generateMockAnalysis } from '@/api/mock'

import type { Portfolio, SignalColor } from '@/api/types'

function countSignals(portfolio: Portfolio): Record<SignalColor, number> {
  const counts: Record<SignalColor, number> = { green: 0, red: 0, yellow: 0 }
  for (const ps of portfolio.stocks) {
    const a = generateMockAnalysis(ps.stock.code)
    for (const dim of [a.dailySummary, a.eventPrediction, a.capitalFlow, a.riskControl]) {
      counts[dim.signal]++
    }
  }
  return counts
}

interface PortfolioCardProps {
  portfolio: Portfolio
  onEdit: () => void
  onDelete: () => void
  onClick: () => void
}

export default function PortfolioCard({ portfolio, onEdit, onDelete, onClick }: PortfolioCardProps) {
  const signals = countSignals(portfolio)

  return (
    <div
      className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:bg-slate-900/80 active:bg-slate-900/80"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-slate-100">{portfolio.name}</h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">{portfolio.description}</p>
        </div>
        <div className="ml-3 flex gap-1">
          <button
            onClick={e => { e.stopPropagation(); onEdit() }}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-300 active:bg-slate-800"
            aria-label="编辑"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/10"
            aria-label="删除"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-600">{portfolio.stocks.length} 只标的</span>
        {portfolio.stocks.length > 0 && (
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><SignalLight color="green" size="sm" /> {signals.green}</span>
            <span className="flex items-center gap-1"><SignalLight color="red" size="sm" /> {signals.red}</span>
            <span className="flex items-center gap-1"><SignalLight color="yellow" size="sm" /> {signals.yellow}</span>
          </div>
        )}
      </div>

      <div className="mt-2 text-[10px] text-slate-700">
        更新于 {portfolio.updatedAt}
      </div>
    </div>
  )
}
