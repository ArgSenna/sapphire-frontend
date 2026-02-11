import { useState, useEffect } from 'react'

import SignalLight from '@/components/ui/SignalLight'
import Spinner from '@/components/ui/Spinner'
import { api } from '@/api/services'
import { formatPrice, formatPercent, getChangeColor } from '@/utils'
import AnalysisCard from './AnalysisCard'
import EvidenceDrawer from './EvidenceDrawer'

import type { Stock, StockQuote, AnalysisData, AnalysisDimension, Evidence } from '@/api/types'

const dimensionKeys: AnalysisDimension[] = ['dailySummary', 'eventPrediction', 'capitalFlow', 'riskControl']

interface StockAnalysisRowProps {
  stock: Stock
  onRemove: () => void
}

export default function StockAnalysisRow({ stock, onRemove }: StockAnalysisRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [expandedDim, setExpandedDim] = useState<AnalysisDimension | null>(null)
  const [quote, setQuote] = useState<StockQuote | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [evidence, setEvidence] = useState<{ title: string; items: Evidence[] } | null>(null)

  useEffect(() => {
    api.stock.quote(stock.code).then(setQuote)
  }, [stock.code])

  function handleExpand() {
    if (!expanded && !analysis) {
      setLoading(true)
      api.analysis.getForStock(stock.code).then(data => {
        setAnalysis(data)
        setLoading(false)
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30 transition-colors hover:border-slate-700">
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
        onClick={handleExpand}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-100">{stock.name}</span>
            <span className="text-xs text-slate-600">{stock.code}</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">{stock.sector}</span>
          </div>
          {quote && (
            <div className="mt-1 flex items-center gap-3 text-xs">
              <span className={getChangeColor(quote.changePercent)}>{formatPrice(quote.price)}</span>
              <span className={getChangeColor(quote.changePercent)}>{formatPercent(quote.changePercent)}</span>
            </div>
          )}
        </div>

        {analysis && (
          <div className="flex items-center gap-2">
            {dimensionKeys.map(key => (
              <SignalLight key={key} color={analysis[key].signal} size="sm" />
            ))}
          </div>
        )}

        <button
          onClick={e => { e.stopPropagation(); onRemove() }}
          className="rounded-lg p-2 text-slate-600 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/10"
          aria-label="移除"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-800 px-4 py-3 sm:px-5 sm:py-4">
          {loading ? (
            <Spinner className="py-6" />
          ) : analysis ? (
            <div className="space-y-3">
              {dimensionKeys.map(key => {
                const dim = analysis[key]
                return (
                  <AnalysisCard
                    key={key}
                    signal={dim.signal}
                    title={dim.title}
                    summary={dim.summary}
                    content={dim.content}
                    promptVersion={dim.promptVersion}
                    model={dim.model}
                    analyzedAt={dim.analyzedAt}
                    expanded={expandedDim === key}
                    onToggle={() => setExpandedDim(expandedDim === key ? null : key)}
                    onShowEvidence={() => setEvidence({ title: dim.title, items: dim.evidences })}
                  />
                )
              })}
            </div>
          ) : null}
        </div>
      )}

      <EvidenceDrawer
        open={!!evidence}
        onClose={() => setEvidence(null)}
        evidences={evidence?.items ?? []}
        title={evidence?.title ?? ''}
      />
    </div>
  )
}
