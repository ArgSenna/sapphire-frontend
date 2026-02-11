import type { Evidence } from './analysis'

export type ResearchType = 'investment' | 'service' | 'innovation'
export type Rating = 'strongBuy' | 'buy' | 'neutral' | 'reduce' | 'sell'

export interface ResearchElement {
  title: string
  rating: Rating
  summary: string
  content: string
  evidences: Evidence[]
  promptVersion: string
  model: string
  analyzedAt: string
}

export interface ResearchCounterArgument {
  summary: string
  content: string
  evidences: Evidence[]
  promptVersion: string
  model: string
  analyzedAt: string
}

export interface ResearchReport {
  id: string
  stockCode: string
  stockName: string
  type: ResearchType
  rating: Rating
  conclusion: string
  elements: ResearchElement[]
  counterArgument: ResearchCounterArgument
  createdAt: string
  model: string
}
