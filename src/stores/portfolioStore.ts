import { create } from 'zustand'
import { api } from '@/api/services'

import type { Portfolio, PortfolioFormData } from '@/api/types'

interface PortfolioState {
  portfolios: Portfolio[]
  current: Portfolio | null
  loading: boolean
  formOpen: boolean
  editingId: string | null

  fetchPortfolios: () => Promise<void>
  fetchPortfolio: (id: string) => Promise<void>
  createPortfolio: (data: PortfolioFormData) => Promise<void>
  updatePortfolio: (id: string, data: PortfolioFormData) => Promise<void>
  deletePortfolio: (id: string) => Promise<void>
  addStock: (stockCode: string) => Promise<void>
  removeStock: (stockCode: string) => Promise<void>
  openForm: (editingId?: string) => void
  closeForm: () => void
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  current: null,
  loading: false,
  formOpen: false,
  editingId: null,

  async fetchPortfolios() {
    set({ loading: true })
    const portfolios = await api.portfolio.list()
    set({ portfolios, loading: false })
  },

  async fetchPortfolio(id) {
    set({ loading: true })
    const current = (await api.portfolio.getById(id)) ?? null
    set({ current, loading: false })
  },

  async createPortfolio(data) {
    await api.portfolio.create(data)
    await get().fetchPortfolios()
    set({ formOpen: false, editingId: null })
  },

  async updatePortfolio(id, data) {
    await api.portfolio.update(id, data)
    await get().fetchPortfolios()
    set({ formOpen: false, editingId: null })
  },

  async deletePortfolio(id) {
    await api.portfolio.delete(id)
    await get().fetchPortfolios()
  },

  async addStock(stockCode) {
    const { current } = get()
    if (!current) return
    const updated = await api.portfolio.addStock(current.id, stockCode)
    if (updated) set({ current: updated })
  },

  async removeStock(stockCode) {
    const { current } = get()
    if (!current) return
    const updated = await api.portfolio.removeStock(current.id, stockCode)
    if (updated) set({ current: updated })
  },

  openForm(editingId) {
    set({ formOpen: true, editingId: editingId ?? null })
    if (editingId && get().current?.id !== editingId) {
      api.portfolio.getById(editingId).then(p => {
        if (p) set({ current: p })
      })
    }
  },

  closeForm() {
    set({ formOpen: false, editingId: null })
  },
}))
