import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@/api/services'
import ResearchCard from './components/ResearchCard'
import CreateResearchModal from './components/CreateResearchModal'

import type { ResearchReport } from '@/api/types'

export default function ResearchPage() {
  const navigate = useNavigate()
  const [reports, setReports] = useState<ResearchReport[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    api.research.list()
      .then(setReports)
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    await api.research.delete(id)
    setReports(prev => prev.filter(r => r.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-amber-400" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h1 className="text-lg font-semibold text-slate-100">标的研究</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-amber-400"
        >
          新建研究
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <svg className="mb-3 h-12 w-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">暂无研究报告</p>
          <button
            onClick={() => setShowCreate(true)}
            className="mt-3 text-sm text-amber-500 hover:text-amber-400"
          >
            创建第一份研究
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map(report => (
            <ResearchCard key={report.id} report={report} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <CreateResearchModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={report => {
          setShowCreate(false)
          navigate(`/research/${report.id}`)
        }}
      />
    </div>
  )
}
