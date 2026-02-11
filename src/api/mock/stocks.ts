import type { Stock, StockQuote } from '../types'

export const mockStocks: Stock[] = [
  { code: '600519', name: '贵州茅台', market: 'SH', sector: '白酒' },
  { code: '000858', name: '五粮液', market: 'SZ', sector: '白酒' },
  { code: '601318', name: '中国平安', market: 'SH', sector: '保险' },
  { code: '600036', name: '招商银行', market: 'SH', sector: '银行' },
  { code: '000333', name: '美的集团', market: 'SZ', sector: '家电' },
  { code: '600900', name: '长江电力', market: 'SH', sector: '电力' },
  { code: '601012', name: '隆基绿能', market: 'SH', sector: '光伏' },
  { code: '300750', name: '宁德时代', market: 'SZ', sector: '电池' },
  { code: '002594', name: '比亚迪', market: 'SZ', sector: '汽车' },
  { code: '600276', name: '恒瑞医药', market: 'SH', sector: '医药' },
  { code: '000001', name: '平安银行', market: 'SZ', sector: '银行' },
  { code: '601888', name: '中国中免', market: 'SH', sector: '免税' },
  { code: '002475', name: '立讯精密', market: 'SZ', sector: '电子' },
  { code: '600809', name: '山西汾酒', market: 'SH', sector: '白酒' },
  { code: '002714', name: '牧原股份', market: 'SZ', sector: '养殖' },
  { code: '601899', name: '紫金矿业', market: 'SH', sector: '矿业' },
  { code: '300059', name: '东方财富', market: 'SZ', sector: '券商' },
  { code: '688981', name: '中芯国际', market: 'SH', sector: '半导体' },
  { code: '002415', name: '海康威视', market: 'SZ', sector: '安防' },
  { code: '600030', name: '中信证券', market: 'SH', sector: '券商' },
  { code: 'ATAT', name: '亚朵', market: 'NASDAQ', sector: '酒店' },
]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function generateMockQuote(code: string): StockQuote {
  const bases: Record<string, number> = {
    '600519': 1680, '000858': 145, '601318': 48, '600036': 36,
    '000333': 62, '600900': 28, '601012': 22, '300750': 195,
    '002594': 245, '600276': 43, '000001': 11, '601888': 68,
    '002475': 35, '600809': 215, '002714': 38, '601899': 16,
    '300059': 16, '688981': 48, '002415': 32, '600030': 22, 'ATAT': 22,
  }
  const base = bases[code] ?? 50
  const changePercent = rand(-5, 5)
  const prevClose = base * rand(0.95, 1.05)
  const price = prevClose * (1 + changePercent / 100)
  const change = price - prevClose

  return {
    code,
    price: +price.toFixed(2),
    change: +change.toFixed(2),
    changePercent: +changePercent.toFixed(2),
    volume: Math.floor(rand(5000, 500000)),
    turnover: Math.floor(rand(1e8, 5e9)),
    high: +(price * rand(1, 1.03)).toFixed(2),
    low: +(price * rand(0.97, 1)).toFixed(2),
    open: +(prevClose * rand(0.99, 1.01)).toFixed(2),
    prevClose: +prevClose.toFixed(2),
  }
}

export function findStock(query: string): Stock | undefined {
  return mockStocks.find(s => s.code === query || s.name.includes(query))
}
