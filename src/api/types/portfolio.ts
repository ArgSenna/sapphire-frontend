import type { SignalColor, AnalysisDimension } from './index'
import type { Stock, StockQuote } from './stock'
import type { AnalysisData } from './analysis'

export interface DimensionSummary {
  dimension: AnalysisDimension
  signal: SignalColor
  title: string
  summary: string
}

export interface StockAnalysisSummary {
  stock: Stock
  quote: StockQuote
  dimensions: DimensionSummary[]
  analysis?: AnalysisData
}

export interface PortfolioStock {
  stock: Stock
  addedAt: string
}

export interface Portfolio {
  id: string
  name: string
  description: string
  stocks: PortfolioStock[]
  createdAt: string
  updatedAt: string
}

export interface PortfolioListItem {
  id: string
  name: string
  description: string
  stockCount: number
  signals: { green: number; red: number; yellow: number }
  updatedAt: string
}

export interface PortfolioFormData {
  name: string
  description: string
}
