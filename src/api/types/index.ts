export type SignalColor = 'green' | 'red' | 'yellow'

export type AnalysisDimension = 'dailySummary' | 'eventPrediction' | 'capitalFlow' | 'riskControl'

export const dimensionLabels: Record<AnalysisDimension, string> = {
  dailySummary: '每日信息汇总',
  eventPrediction: '重大事件预测',
  capitalFlow: '资金流分析',
  riskControl: '风险控制',
}

export const signalLabels: Record<SignalColor, string> = {
  green: '利好',
  red: '利空',
  yellow: '中性',
}

export type { Stock, StockQuote } from './stock'
export type { Portfolio, PortfolioStock, StockAnalysisSummary, DimensionSummary, PortfolioFormData, PortfolioListItem } from './portfolio'
export type { AgentAnalysis, Evidence, DailySummaryData, EventPredictionData, CapitalFlowData, RiskControlData, AnalysisData } from './analysis'
