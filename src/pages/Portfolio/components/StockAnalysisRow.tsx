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
  expanded: boolean
  onToggle: (code: string) => void
}

export default function StockAnalysisRow({ stock, expanded, onToggle }: StockAnalysisRowProps) {
  const [collapsedDims, setCollapsedDims] = useState<Set<AnalysisDimension>>(new Set())
  const [quote, setQuote] = useState<StockQuote | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [evidence, setEvidence] = useState<{ title: string; items: Evidence[] } | null>(null)

  useEffect(() => {
    api.stock.quote(stock.code).then(setQuote)
    api.analysis.getForStock(stock.code).then(setAnalysis)
  }, [stock.code])

  // 展开时重置折叠状态
  useEffect(() => {
    if (expanded) setCollapsedDims(new Set())
  }, [expanded])

  function toggleDim(key: AnalysisDimension) {
    setCollapsedDims(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300">
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
        onClick={() => onToggle(stock.code)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-900">{stock.name}</span>
            <span className="text-xs text-slate-500">{stock.code}</span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{stock.sector}</span>
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
      </div>

      {expanded && (
        <div className="border-t border-slate-200 px-4 py-3 sm:px-5 sm:py-4">
          {!analysis ? (
            <Spinner className="py-6" />
          ) : (
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
                    expanded={!collapsedDims.has(key)}
                    onToggle={() => toggleDim(key)}
                    onShowEvidence={() => setEvidence({ title: dim.title, items: dim.evidences })}
                  />
                )
              })}
            </div>
          )}
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
