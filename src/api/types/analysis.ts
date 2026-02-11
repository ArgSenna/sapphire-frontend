import type { SignalColor } from './index'

export interface Evidence {
  source: string
  url: string
  date: string
  snippet: string
  reliability: 'high' | 'medium' | 'low'
  children?: Evidence[]
}

export interface AgentAnalysis {
  signal: SignalColor
  title: string
  summary: string
  content: string
  evidences: Evidence[]
  promptVersion: string
  model: string
  analyzedAt: string
}

export interface DailySummaryData {
  marketSentiment: string
  keyNews: string[]
  priceAnalysis: string
}

export interface EventPredictionData {
  events: Array<{
    event: string
    probability: number
    impact: SignalColor
    timeframe: string
  }>
}

export interface CapitalFlowData {
  mainForce: { inflow: number; outflow: number; net: number }
  northbound: number
  institutionRatio: number
}

export interface RiskControlData {
  riskLevel: 'low' | 'medium' | 'high'
  stopLoss: number
  takeProfit: number
  warnings: string[]
}

export interface AnalysisData {
  dailySummary: AgentAnalysis & { data: DailySummaryData }
  eventPrediction: AgentAnalysis & { data: EventPredictionData }
  capitalFlow: AgentAnalysis & { data: CapitalFlowData }
  riskControl: AgentAnalysis & { data: RiskControlData }
}
