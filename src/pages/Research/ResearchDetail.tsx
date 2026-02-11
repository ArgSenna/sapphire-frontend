import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { api } from '@/api/services'
import { cn } from '@/utils'
import EvidenceDrawer from '@/pages/Portfolio/components/EvidenceDrawer'
import RatingBadge from './components/RatingBadge'
import ResearchElementCard from './components/ResearchElementCard'

import type { ResearchReport, ResearchType, Evidence } from '@/api/types'

const typeLabels: Record<ResearchType, { label: string; color: string }> = {
  investment: { label: '投资研究', color: 'bg-amber-500/20 text-amber-400' },
  service: { label: '服务研究', color: 'bg-blue-500/20 text-blue-400' },
  innovation: { label: '创新研究', color: 'bg-purple-500/20 text-purple-400' },
}

export default function ResearchDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [report, setReport] = useState<ResearchReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set())
  const [counterExpanded, setCounterExpanded] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerEvidences, setDrawerEvidences] = useState<Evidence[]>([])
  const [drawerTitle, setDrawerTitle] = useState('')

  useEffect(() => {
    if (!id) return
    api.research.getById(id)
      .then(r => {
        if (!r) navigate('/research', { replace: true })
        else {
          setReport(r)
          setExpandedSet(new Set(r.elements.map((_, i) => i)))
          setCounterExpanded(true)
        }
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  function toggleElement(idx: number) {
    setExpandedSet(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  function showEvidence(evidences: Evidence[], title: string) {
    setDrawerEvidences(evidences)
    setDrawerTitle(title)
    setDrawerOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-amber-400" />
      </div>
    )
  }

  if (!report) return null

  const typeConfig = typeLabels[report.type]

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6">
      <button
        onClick={() => navigate('/research')}
        className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        返回列表
      </button>

      {/* 报告头部 */}
      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-100">{report.stockName}</h1>
              <span className="text-sm text-slate-600">{report.stockCode}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              <RatingBadge rating={report.rating} size="lg" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-600">
          <span>生成时间: {new Date(report.createdAt).toLocaleString('zh-CN')}</span>
        </div>
      </div>

      {/* 总体结论 */}
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium text-slate-300">总体结论</h2>
        <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
          <p className="text-sm leading-relaxed text-slate-300">{report.conclusion}</p>
        </div>
      </div>

      {/* 要素分析 */}
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium text-slate-300">要素分析</h2>
        <div className="space-y-2">
          {report.elements.map((el, i) => (
            <ResearchElementCard
              key={i}
              element={el}
              expanded={expandedSet.has(i)}
              onToggle={() => toggleElement(i)}
              onShowEvidence={() => showEvidence(el.evidences, el.title)}
            />
          ))}
        </div>
      </div>

      {/* AI反方意见 */}
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium text-slate-300">AI 反方意见</h2>
        <div className={cn(
          'rounded-lg border transition-colors',
          counterExpanded ? 'border-slate-700 bg-slate-800/50' : 'border-slate-800 bg-slate-900/30',
        )}>
          <button
            onClick={() => setCounterExpanded(!counterExpanded)}
            className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:px-4"
          >
            <svg className="h-5 w-5 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-slate-200">反方观点</span>
            </div>
            <svg
              className={cn('h-4 w-4 shrink-0 text-slate-500 transition-transform', counterExpanded && 'rotate-180')}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {counterExpanded && (
            <div className="border-t border-slate-800 px-3.5 py-3.5 sm:px-4 sm:py-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {report.counterArgument.content}
                {' '}
                <button
                  onClick={() => showEvidence(report.counterArgument.evidences, '反方观点')}
                  className="text-xs text-amber-500 hover:text-amber-400"
                >
                  查看证据链
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 研究员补充意见 */}
      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-slate-300">研究员补充意见</h2>
        <div className="rounded-lg border border-dashed border-slate-800 bg-slate-900/20 p-4">
          <p className="text-sm italic text-slate-600">暂无研究员补充意见。此区域将由研究员手动填写补充分析。</p>
        </div>
      </div>

      <EvidenceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        evidences={drawerEvidences}
        title={drawerTitle}
      />
    </div>
  )
}
