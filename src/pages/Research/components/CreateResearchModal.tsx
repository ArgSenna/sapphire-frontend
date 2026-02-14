import { useState } from 'react'

import Modal from '@/components/ui/Modal'
import { api } from '@/api/services'
import { cn } from '@/utils'

import type { ResearchType, ResearchReport } from '@/api/types'

const typeOptions: { value: ResearchType; label: string; desc: string }[] = [
  { value: 'investment', label: '投资驱动', desc: '聚焦财务、估值、竞争力等投资维度' },
  { value: 'service', label: '服务驱动', desc: '聚焦单位经济模型、运营效率、客户LTV、竞争格局与KPI验证' },
  { value: 'innovation', label: '创新驱动', desc: '聚焦新品竞争力、研发效率、商业化留存、竞争格局与KPI验证' },
]

interface CreateResearchModalProps {
  open: boolean
  onClose: () => void
  onCreated: (report: ResearchReport) => void
}

export default function CreateResearchModal({ open, onClose, onCreated }: CreateResearchModalProps) {
  const [query, setQuery] = useState('')
  const [stock, setStock] = useState<{ code: string; name: string } | null>(null)
  const [type, setType] = useState<ResearchType>('investment')
  const [searching, setSearching] = useState(false)
  const [creating, setCreating] = useState(false)
  const [notFound, setNotFound] = useState(false)

  function reset() {
    setQuery('')
    setStock(null)
    setType('investment')
    setNotFound(false)
  }

  async function handleSearch() {
    if (!query.trim()) return
    setSearching(true)
    setNotFound(false)
    const found = await api.stock.find(query.trim())
    if (found) {
      setStock({ code: found.code, name: found.name })
    } else {
      setNotFound(true)
      setStock(null)
    }
    setSearching(false)
  }

  async function handleCreate() {
    if (!stock) return
    setCreating(true)
    const report = await api.research.create(stock.code, type)
    setCreating(false)
    reset()
    onCreated(report)
  }

  function handleClose() {
    if (creating) return
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="新建研究">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs text-slate-500 font-medium">搜索股票</label>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setNotFound(false) }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="输入股票代码或名称"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !query.trim()}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400"
            >
              {searching ? '搜索中...' : '搜索'}
            </button>
          </div>
          {notFound && <p className="mt-1.5 text-xs text-red-500 font-medium">未找到匹配的股票</p>}
          {stock && (
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
              <span className="text-sm font-medium text-amber-900">{stock.name}</span>
              <span className="text-xs text-amber-700">{stock.code}</span>
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-slate-500 font-medium">报告类型</label>
          <div className="space-y-2">
            {typeOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-left transition-all',
                  type === opt.value
                    ? 'border-black bg-slate-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <span className={cn("text-sm font-medium", type === opt.value ? "text-slate-900" : "text-slate-700")}>{opt.label}</span>
                <p className="mt-0.5 text-xs text-slate-500">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!stock || creating}
          className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-500"
        >
          {creating ? '生成报告中...' : '生成研究报告'}
        </button>
      </div>
    </Modal>
  )
}
