import { useState, useEffect } from 'react'

import Modal from '@/components/ui/Modal'
import { usePortfolioStore } from '@/stores'

import type { PortfolioFormData } from '@/api/types'

export default function PortfolioForm() {
  const { formOpen, editingId, portfolios, closeForm, createPortfolio, updatePortfolio } = usePortfolioStore()
  const [form, setForm] = useState<PortfolioFormData>({ name: '', description: '' })

  const editing = editingId ? portfolios.find(p => p.id === editingId) : null

  useEffect(() => {
    if (editing) {
      setForm({ name: editing.name, description: editing.description })
    } else {
      setForm({ name: '', description: '' })
    }
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

  return (
    <Modal open={formOpen} onClose={closeForm} title={editing ? '编辑组合' : '新建组合'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-slate-400">组合名称</label>
          <input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-500"
            placeholder="例如：核心持仓"
            autoFocus
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">描述</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-500"
            rows={3}
            placeholder="简要描述投资策略..."
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeForm}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={!form.name.trim()}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-white hover:bg-amber-700 disabled:opacity-40"
          >
            {editing ? '保存' : '创建'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
