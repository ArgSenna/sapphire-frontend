import type { SignalColor, AnalysisData, Evidence } from '../types'

const signals: SignalColor[] = ['green', 'red', 'yellow']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function randomSignal(): SignalColor {
  return pick(signals)
}

function generateEvidence(count: number): Evidence[] {
  const sources = [
    { source: '东方财富', url: 'https://www.eastmoney.com', reliability: 'high' as const },
    { source: '同花顺', url: 'https://www.10jqka.com.cn', reliability: 'high' as const },
    { source: '新浪财经', url: 'https://finance.sina.com.cn', reliability: 'medium' as const },
    { source: '证券时报', url: 'https://www.stcn.com', reliability: 'high' as const },
    { source: '雪球', url: 'https://xueqiu.com', reliability: 'medium' as const },
    { source: '财联社', url: 'https://www.cls.cn', reliability: 'high' as const },
    { source: '券商研报', url: 'https://data.eastmoney.com', reliability: 'medium' as const },
    { source: '公司公告', url: 'https://www.cninfo.com.cn', reliability: 'high' as const },
  ]
  const snippets = [
    '该公司近期业绩表现超出市场预期，营收同比增长显著。',
    '行业政策面出现积极变化，有望带动板块整体估值修复。',
    '机构资金持续流入，北向资金连续多日净买入。',
    '技术面显示股价已突破关键阻力位，上行趋势确立。',
    '公司发布重大战略合作公告，市场反应积极。',
    '近期市场波动加大，需关注系统性风险。',
    '行业竞争格局发生变化，公司市场份额面临挑战。',
    '原材料价格上涨可能对公司毛利率产生压力。',
  ]
  return Array.from({ length: count }, () => {
    const s = pick(sources)
    return {
      ...s,
      date: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString().slice(0, 10),
      snippet: pick(snippets),
    }
  })
}

const dailySummaries = [
  '今日市场整体表现活跃，该股受行业利好消息刺激，资金关注度提升。盘面显示主力资金有明显建仓迹象，短期看多情绪占优。',
  '市场情绪偏谨慎，该股随大盘震荡调整。成交量较前日萎缩，观望情绪浓厚。建议关注后续量能变化。',
  '受宏观经济数据影响，市场出现分化行情。该股所在板块表现强势，资金持续流入，短期有望延续上行趋势。',
]

const eventContents = [
  '基于多源信息分析，预计公司将在未来1-2周内发布重要战略公告。历史数据显示类似事件对股价有正面催化作用。',
  '行业监管政策调整窗口期临近，可能对公司业务模式产生影响。建议密切关注政策动向，做好风险预案。',
  '公司即将进入财报披露期，根据行业景气度和公司经营数据推算，业绩大概率超预期。',
]

const capitalContents = [
  '主力资金连续3日净流入，累计金额超过5亿元。北向资金同步增持，机构持仓比例上升至历史高位。资金面强势支撑股价。',
  '近期资金面出现分歧，主力资金小幅净流出，但北向资金仍在增持。整体资金格局偏中性，需关注后续主力动向。',
  '资金面承压明显，主力资金大幅流出，散户接盘意愿不强。建议控制仓位，等待资金面企稳信号。',
]

const riskContents = [
  '当前风险水平可控。股价运行在均线系统上方，技术面健康。建议设置止损位于20日均线下方，止盈目标上看前高。',
  '风险水平中等。市场波动率上升，需注意仓位管理。建议适当降低持仓比例，设置严格止损。',
  '风险水平偏高。多项技术指标发出预警信号，MACD顶背离形成。建议减仓观望，严格执行止损纪律。',
]

export function generateMockAnalysis(code: string): AnalysisData {
  const now = new Date().toISOString()
  const model = 'Manus-Agent-v1'

  const dsSignal = randomSignal()
  const epSignal = randomSignal()
  const cfSignal = randomSignal()
  const rcSignal = randomSignal()

  return {
    dailySummary: {
      signal: dsSignal,
      title: '每日信息汇总',
      summary: dsSignal === 'green' ? '市场情绪积极，资金关注度高' : dsSignal === 'red' ? '市场情绪低迷，成交萎缩' : '市场震荡整理，方向不明',
      content: pick(dailySummaries),
      evidences: generateEvidence(3),
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        marketSentiment: dsSignal === 'green' ? '积极' : dsSignal === 'red' ? '消极' : '中性',
        keyNews: ['公司发布新产品线规划', '行业政策面出现积极信号', '机构上调目标价'],
        priceAnalysis: '股价运行在5日均线上方，短期趋势偏多',
      },
    },
    eventPrediction: {
      signal: epSignal,
      title: '重大事件预测',
      summary: epSignal === 'green' ? '预期有正面催化事件' : epSignal === 'red' ? '潜在负面事件风险' : '暂无重大事件预期',
      content: pick(eventContents),
      evidences: generateEvidence(4),
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        events: [
          { event: '业绩预告发布', probability: 0.85, impact: 'green', timeframe: '1-2周' },
          { event: '行业政策调整', probability: 0.6, impact: epSignal, timeframe: '1个月' },
          { event: '大股东减持', probability: 0.2, impact: 'red', timeframe: '3个月' },
        ],
      },
    },
    capitalFlow: {
      signal: cfSignal,
      title: '资金流分析',
      summary: cfSignal === 'green' ? '主力资金持续流入' : cfSignal === 'red' ? '主力资金大幅流出' : '资金面中性偏弱',
      content: pick(capitalContents),
      evidences: generateEvidence(3),
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        mainForce: {
          inflow: Math.floor(Math.random() * 5e8 + 1e8),
          outflow: Math.floor(Math.random() * 5e8 + 1e8),
          net: cfSignal === 'green' ? Math.floor(Math.random() * 3e8 + 5e7) : -Math.floor(Math.random() * 3e8 + 5e7),
        },
        northbound: cfSignal === 'green' ? Math.floor(Math.random() * 2e8) : -Math.floor(Math.random() * 2e8),
        institutionRatio: +(Math.random() * 30 + 20).toFixed(1),
      },
    },
    riskControl: {
      signal: rcSignal,
      title: '风险控制',
      summary: rcSignal === 'green' ? '风险可控，趋势健康' : rcSignal === 'red' ? '风险偏高，建议减仓' : '风险中等，注意仓位',
      content: pick(riskContents),
      evidences: generateEvidence(2),
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        riskLevel: rcSignal === 'green' ? 'low' : rcSignal === 'red' ? 'high' : 'medium',
        stopLoss: +(Math.random() * 5 + 3).toFixed(1),
        takeProfit: +(Math.random() * 10 + 8).toFixed(1),
        warnings: rcSignal === 'red'
          ? ['MACD顶背离', '成交量异常放大', '融资余额快速上升']
          : rcSignal === 'yellow'
            ? ['波动率上升', '需关注支撑位']
            : [],
      },
    },
  }
  void code
}
