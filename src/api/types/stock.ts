export interface Stock {
  code: string
  name: string
  market: 'SH' | 'SZ' | 'NASDAQ' | 'NYSE'
  sector: string
}

export interface StockQuote {
  code: string
  price: number
  change: number
  changePercent: number
  volume: number
  turnover: number
  high: number
  low: number
  open: number
  prevClose: number
}
