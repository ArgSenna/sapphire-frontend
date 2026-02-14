import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { usePortfolioStore } from '@/stores'
import PortfolioCard from './components/PortfolioCard'
import PortfolioForm from './components/PortfolioForm'

export default function PortfolioPage() {
  const { portfolios, loading, fetchPortfolios, openForm, deletePortfolio } = usePortfolioStore()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => { fetchPortfolios() }, [fetchPortfolios])

  if (loading && portfolios.length === 0) return <Spinner />

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:py-6 bg-slate-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900">投资组合</h1>
        <button
          onClick={() => openForm()}
          className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-slate-800 transition-colors"
        >
          + 新建组合
        </button>
      </div>

      {portfolios.length === 0 ? (
        <EmptyState message="还没有投资组合，点击上方按钮创建" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map(p => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              onEdit={() => openForm(p.id)}
              onDelete={() => setDeleteId(p.id)}
              onClick={() => navigate(`/portfolio/${p.id}`)}
            />
          ))}
        </div>
      )}

      <PortfolioForm />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) deletePortfolio(deleteId) }}
        title="删除组合"
        message="确定要删除该投资组合吗？此操作不可撤销。"
        confirmText="删除"
        danger
      />
    </div>
  )
}
