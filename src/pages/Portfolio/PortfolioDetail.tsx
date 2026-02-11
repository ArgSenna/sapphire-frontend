import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { usePortfolioStore } from '@/stores'
import PortfolioForm from './components/PortfolioForm'
import StockAnalysisRow from './components/StockAnalysisRow'

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { current, loading, fetchPortfolio, openForm } = usePortfolioStore()
  const [expandedCodes, setExpandedCodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (id) fetchPortfolio(id)
  }, [id, fetchPortfolio])

  // 默认全部展开
  useEffect(() => {
    if (!current) return
    setExpandedCodes(new Set(current.stocks.map(ps => ps.stock.code)))
  }, [current])

  const handleToggle = useCallback((code: string) => {
    setExpandedCodes(prev => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }, [])

  if (loading) return <Spinner />
  if (!current) return <EmptyState message="组合不存在" />

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/portfolio')}
          className="mb-3 flex items-center gap-1 rounded-lg py-1.5 text-xs text-slate-500 hover:text-slate-300 active:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回组合列表
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">{current.name}</h1>
            <p className="mt-1 text-xs text-slate-500">{current.description}</p>
          </div>
          <button
            onClick={() => openForm(current.id)}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            编辑组合
          </button>
        </div>
      </div>

      {current.stocks.length === 0 ? (
        <EmptyState message="暂无标的，请在编辑组合中添加" />
      ) : (
        <div className="space-y-3">
          {current.stocks.map(ps => (
            <StockAnalysisRow
              key={ps.stock.code}
              stock={ps.stock}
              expanded={expandedCodes.has(ps.stock.code)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      <PortfolioForm />
    </div>
  )
}
