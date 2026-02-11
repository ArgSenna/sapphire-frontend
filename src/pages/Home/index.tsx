import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/api/services'
import SignalLight from '@/components/ui/SignalLight'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { generateMockAnalysis } from '@/api/mock'

import type { Portfolio, SignalColor, AnalysisDimension } from '@/api/types'

const dimensions: { key: AnalysisDimension; label: string }[] = [
  { key: 'dailySummary', label: '每日汇总' },
  { key: 'eventPrediction', label: '事件预测' },
  { key: 'capitalFlow', label: '资金流' },
  { key: 'riskControl', label: '风险控制' },
]

interface PortfolioOverview {
  portfolio: Portfolio
  stockSignals: Array<{
    code: string
    name: string
    signals: Record<AnalysisDimension, SignalColor>
  }>
}

export default function HomePage() {
  const [data, setData] = useState<PortfolioOverview[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.portfolio.list().then(portfolios => {
      const overviews = portfolios.map(portfolio => ({
        portfolio,
        stockSignals: portfolio.stocks.map(ps => {
          const analysis = generateMockAnalysis(ps.stock.code)
          return {
            code: ps.stock.code,
            name: ps.stock.name,
            signals: {
              dailySummary: analysis.dailySummary.signal,
              eventPrediction: analysis.eventPrediction.signal,
              capitalFlow: analysis.capitalFlow.signal,
              riskControl: analysis.riskControl.signal,
            },
          }
        }),
      }))
      setData(overviews)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />
  if (data.length === 0) return <EmptyState message="暂无投资组合，请先创建" />

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-slate-100">投资总览</h1>
      <div className="space-y-6">
        {data.map(({ portfolio, stockSignals }) => (
          <div
            key={portfolio.id}
            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700"
            onClick={() => navigate(`/portfolio/${portfolio.id}`)}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-medium text-slate-100">{portfolio.name}</h2>
                <p className="mt-0.5 text-xs text-slate-500">{portfolio.description}</p>
              </div>
              <span className="text-xs text-slate-600">{portfolio.stocks.length} 只标的</span>
            </div>

            {stockSignals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs text-slate-500">
                      <th className="pb-2 text-left font-medium">标的</th>
                      {dimensions.map(d => (
                        <th key={d.key} className="pb-2 text-center font-medium">{d.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stockSignals.map(stock => (
                      <tr key={stock.code} className="border-b border-slate-800/50 last:border-0">
                        <td className="py-2.5 text-slate-300">
                          <span className="font-medium">{stock.name}</span>
                          <span className="ml-2 text-xs text-slate-600">{stock.code}</span>
                        </td>
                        {dimensions.map(d => (
                          <td key={d.key} className="py-2.5 text-center">
                            <span className="inline-flex justify-center">
                              <SignalLight color={stock.signals[d.key]} size="sm" />
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-600">暂无标的</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
