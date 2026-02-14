import { useState, useEffect } from 'react'

import Modal from '@/components/ui/Modal'
import { findStock, mockStocks } from '@/api/mock'
import { usePortfolioStore } from '@/stores'

import type { PortfolioFormData } from '@/api/types'

export default function PortfolioForm() {
  const { formOpen, editingId, portfolios, current, closeForm, createPortfolio, updatePortfolio, addStock, removeStock } = usePortfolioStore()
  const [form, setForm] = useState<PortfolioFormData>({ name: '', description: '' })
  const [query, setQuery] = useState('')
  const [stockError, setStockError] = useState('')

  const editing = editingId ? (current?.id === editingId ? current : portfolios.find(p => p.id === editingId)) : null

  useEffect(() => {
    if (editing) {
      setForm({ name: editing.name, description: editing.description })
    } else {
      setForm({ name: '', description: '' })
    }
    setQuery('')
    setStockError('')
  }, [editing, formOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editing) {
      updatePortfolio(editing.id, form)
    } else {
      createPortfolio(form)
    }
  }

  function handleAddStock(e: React.FormEvent) {
    e.preventDefault()
    setStockError('')
    const trimmed = query.trim()
    if (!trimmed) return
    const stock = findStock(trimmed)
    if (!stock) {
      setStockError('未找到该标的')
      return
    }
    if (editing?.stocks.some(s => s.stock.code === stock.code)) {
      setStockError('该标的已在组合中')
      return
    }
    addStock(stock.code)
    setQuery('')
  }

  return (
    <Modal open={formOpen} onClose={closeForm} title={editing ? '编辑组合' : '新建组合'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-slate-500 font-medium">组合名称</label>
          <input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="例如：核心持仓"
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-500 font-medium">描述</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
            rows={2}
            placeholder="简要描述投资策略..."
          />
        </div>

        {editing && (
          <div>
            <label className="mb-2 block text-xs text-slate-500 font-medium">管理标的</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={e => { setQuery(e.target.value); setStockError('') }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="输入代码或名称添加"
                  list="stock-suggestions-form"
                />
                <datalist id="stock-suggestions-form">
                  {mockStocks.map(s => (
                    <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
                  ))}
                </datalist>
              </div>
              <button
                type="button"
                onClick={handleAddStock}
                className="rounded-lg bg-black px-3 py-1.5 text-xs text-white hover:bg-slate-800"
              >
                添加
              </button>
            </div>
            {stockError && <p className="mt-1 text-xs text-red-500 font-medium">{stockError}</p>}

            {editing.stocks.length > 0 && (
              <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
                {editing.stocks.map(ps => (
                  <div key={ps.stock.code} className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-100 px-3 py-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-900 font-medium">{ps.stock.name}</span>
                      <span className="text-xs text-slate-500">{ps.stock.code}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStock(ps.stock.code)}
                      className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      aria-label="移除"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeForm}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={!form.name.trim()}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-500"
          >
            {editing ? '保存' : '创建'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
