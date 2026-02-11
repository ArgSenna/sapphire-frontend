import { randomId } from '@/utils'
import { mockStocks } from './stocks'

import type { Portfolio, PortfolioFormData } from '../types'

let portfolios: Portfolio[] = [
  {
    id: 'p1',
    name: '核心持仓',
    description: '长期价值投资组合，聚焦消费和金融龙头',
    stocks: [
      { stock: mockStocks[0]!, addedAt: '2025-01-15' },
      { stock: mockStocks[2]!, addedAt: '2025-01-15' },
      { stock: mockStocks[3]!, addedAt: '2025-02-01' },
      { stock: mockStocks[7]!, addedAt: '2025-02-10' },
      { stock: mockStocks[8]!, addedAt: '2025-03-01' },
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-03-01',
  },
  {
    id: 'p2',
    name: '成长赛道',
    description: '新能源、半导体等高成长赛道标的',
    stocks: [
      { stock: mockStocks[6]!, addedAt: '2025-02-01' },
      { stock: mockStocks[7]!, addedAt: '2025-02-01' },
      { stock: mockStocks[17]!, addedAt: '2025-02-15' },
    ],
    createdAt: '2025-02-01',
    updatedAt: '2025-02-15',
  },
  {
    id: 'p3',
    name: '高股息策略',
    description: '稳定分红、低波动的防御性组合',
    stocks: [
      { stock: mockStocks[5]!, addedAt: '2025-01-20' },
      { stock: mockStocks[3]!, addedAt: '2025-01-20' },
    ],
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
  },
]

export function getMockPortfolios(): Portfolio[] {
  return [...portfolios]
}

export function getMockPortfolioById(id: string): Portfolio | undefined {
  return portfolios.find(p => p.id === id)
}

export function createMockPortfolio(data: PortfolioFormData): Portfolio {
  const now = new Date().toISOString().slice(0, 10)
  const portfolio: Portfolio = {
    id: randomId(),
    name: data.name,
    description: data.description,
    stocks: [],
    createdAt: now,
    updatedAt: now,
  }
  portfolios = [...portfolios, portfolio]
  return portfolio
}

export function updateMockPortfolio(id: string, data: PortfolioFormData): Portfolio | undefined {
  const idx = portfolios.findIndex(p => p.id === id)
  if (idx === -1) return undefined
  const updated = {
    ...portfolios[idx]!,
    ...data,
    updatedAt: new Date().toISOString().slice(0, 10),
  }
  portfolios = portfolios.map(p => p.id === id ? updated : p)
  return updated
}

export function deleteMockPortfolio(id: string): boolean {
  const len = portfolios.length
  portfolios = portfolios.filter(p => p.id !== id)
  return portfolios.length < len
}

export function addStockToPortfolio(portfolioId: string, stockCode: string): Portfolio | undefined {
  const portfolio = portfolios.find(p => p.id === portfolioId)
  if (!portfolio) return undefined
  const stock = mockStocks.find(s => s.code === stockCode)
  if (!stock) return undefined
  if (portfolio.stocks.some(s => s.stock.code === stockCode)) return portfolio

  const updated: Portfolio = {
    ...portfolio,
    stocks: [...portfolio.stocks, { stock, addedAt: new Date().toISOString().slice(0, 10) }],
    updatedAt: new Date().toISOString().slice(0, 10),
  }
  portfolios = portfolios.map(p => p.id === portfolioId ? updated : p)
  return updated
}

export function removeStockFromPortfolio(portfolioId: string, stockCode: string): Portfolio | undefined {
  const portfolio = portfolios.find(p => p.id === portfolioId)
  if (!portfolio) return undefined

  const updated: Portfolio = {
    ...portfolio,
    stocks: portfolio.stocks.filter(s => s.stock.code !== stockCode),
    updatedAt: new Date().toISOString().slice(0, 10),
  }
  portfolios = portfolios.map(p => p.id === portfolioId ? updated : p)
  return updated
}
