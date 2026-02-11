import { useState } from 'react'

import { findStock } from '@/api/mock'
import { mockStocks } from '@/api/mock'
import { usePortfolioStore } from '@/stores'

export default function AddStockForm() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const { addStock, current } = usePortfolioStore()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const trimmed = query.trim()
    if (!trimmed) return

    const stock = findStock(trimmed)
    if (!stock) {
      setError('未找到该标的，请输入正确的股票代码或名称')
      return
    }
    if (current?.stocks.some(s => s.stock.code === stock.code)) {
      setError('该标的已在组合中')
      return
    }
    addStock(stock.code)
    setQuery('')
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setError('') }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-amber-500"
            placeholder="输入股票代码或名称，如 600519 或 贵州茅台"
            list="stock-suggestions"
          />
          <datalist id="stock-suggestions">
            {mockStocks.map(s => (
              <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
            ))}
          </datalist>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-white hover:bg-amber-700"
        >
          添加
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  )
}
