import { delay } from '@/utils'
import {
  mockStocks, findStock, generateMockQuote,
  getMockPortfolios, getMockPortfolioById,
  createMockPortfolio, updateMockPortfolio, deleteMockPortfolio,
  addStockToPortfolio, removeStockFromPortfolio,
  generateMockAnalysis,
  getMockResearchReports, getMockResearchById,
  createMockResearch, deleteMockResearch,
} from '../mock'

import type { Stock, StockQuote, Portfolio, PortfolioFormData, AnalysisData, ResearchReport, ResearchType } from '../types'

const DELAY = 300

export const api = {
  stock: {
    async list(): Promise<Stock[]> {
      await delay(DELAY)
      return mockStocks
    },
    async find(query: string): Promise<Stock | undefined> {
      await delay(DELAY)
      return findStock(query)
    },
    async quote(code: string): Promise<StockQuote> {
      await delay(DELAY)
      return generateMockQuote(code)
    },
  },

  portfolio: {
    async list(): Promise<Portfolio[]> {
      await delay(DELAY)
      return getMockPortfolios()
    },
    async getById(id: string): Promise<Portfolio | undefined> {
      await delay(DELAY)
      return getMockPortfolioById(id)
    },
    async create(data: PortfolioFormData): Promise<Portfolio> {
      await delay(DELAY)
      return createMockPortfolio(data)
    },
    async update(id: string, data: PortfolioFormData): Promise<Portfolio | undefined> {
      await delay(DELAY)
      return updateMockPortfolio(id, data)
    },
    async delete(id: string): Promise<boolean> {
      await delay(DELAY)
      return deleteMockPortfolio(id)
    },
    async addStock(portfolioId: string, stockCode: string): Promise<Portfolio | undefined> {
      await delay(DELAY)
      return addStockToPortfolio(portfolioId, stockCode)
    },
    async removeStock(portfolioId: string, stockCode: string): Promise<Portfolio | undefined> {
      await delay(DELAY)
      return removeStockFromPortfolio(portfolioId, stockCode)
    },
  },

  analysis: {
    async getForStock(code: string): Promise<AnalysisData> {
      await delay(DELAY + 200)
      return generateMockAnalysis(code)
    },
  },

  research: {
    async list(): Promise<ResearchReport[]> {
      await delay(DELAY)
      return getMockResearchReports()
    },
    async getById(id: string): Promise<ResearchReport | undefined> {
      await delay(DELAY)
      return getMockResearchById(id)
    },
    async create(stockCode: string, type: ResearchType): Promise<ResearchReport> {
      await delay(DELAY + 500)
      return createMockResearch(stockCode, type)
    },
    async delete(id: string): Promise<boolean> {
      await delay(DELAY)
      return deleteMockResearch(id)
    },
  },
}
