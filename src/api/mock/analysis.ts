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

function generateMaotaiAnalysis(): AnalysisData {
  const now = new Date().toISOString()
  const model = 'Manus-Agent-v1'

  // 以下数据基于东方财富API真实行情（2026-02-11收盘）
  // K线来源: push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.600519
  // 资金流来源: push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?secid=1.600519
  // 板块来源: push2.eastmoney.com/api/qt/clist/get?fs=b:BK0477
  // 公告来源: np-anotice-stock.eastmoney.com/api/security/ann?stock_list=600519
  // 北向来源: datacenter-web.eastmoney.com RPT_MUTUAL_HOLDSTOCKNORTH_STA

  return {
    dailySummary: {
      signal: 'yellow',
      title: '每日信息汇总',
      summary: '缩量微跌收1504.33，跌破MA5，白酒板块全线走弱',
      content: `【行情数据】
开盘1504.80 | 收盘1504.33 | 最高1514.00 | 最低1496.00
成交3.09万手/46.48亿 | 换手率0.25% | 振幅1.20% | 跌幅0.03%

【技术指标】
MA5(1520.82) > 现价，已跌破5日线；MA10(1489.17)仍构成支撑
春节后冲高回落：02/05高点1565→连续回调至1504

【消息面】
股份回购持续推进中（最新进展公告02-03）

【板块联动】
白酒板块全线下跌：金徽酒-1.86%、酒鬼酒-1.05%、水井坊-0.74%、五粮液-0.43%、山西汾酒-0.36%，无一上涨`,
      evidences: [
        {
          source: '东方财富API-日K线数据',
          url: 'https://quote.eastmoney.com/sh600519.html',
          date: '2026-02-11',
          snippet: '贵州茅台(600519) 2026-02-11收盘数据：开盘1504.80 收盘1504.33 最高1514.00 最低1496.00，成交量30928手，成交额4,648,360,030元。',
          reliability: 'high',
          children: [
            {
              source: '东方财富API-近10日K线',
              url: 'https://quote.eastmoney.com/sh600519.html',
              date: '2026-02-11',
              snippet: '近10日收盘序列：01/29:1437.72 | 01/30:1401.00 | 02/02:1427.00 | 02/03:1474.92 | 02/04:1525.00 | 02/05:1555.00 | 02/06:1515.01 | 02/09:1524.96 | 02/10:1504.80 | 02/11:1504.33。MA5≈1520.82，MA10≈1489.17。',
              reliability: 'high',
            },
          ],
        },
        {
          source: '巨潮资讯网-公司公告',
          url: 'https://www.cninfo.com.cn/new/disclosure/detail?stockCode=600519',
          date: '2026-02-03',
          snippet: '贵州茅台关于回购股份实施进展的公告（2026-02-03）；控股股东增持股份结果公告（2025-12-29）；2025年中期权益分派实施公告（2025-12-10）。',
          reliability: 'high',
        },
        {
          source: '东方财富API-白酒板块(BK0477)行情',
          url: 'https://quote.eastmoney.com/center/boardlist.html#boards-BK0477',
          date: '2026-02-11',
          snippet: '白酒板块今日全线下跌。五粮液-0.43%、山西汾酒-0.36%、酒鬼酒-1.05%、水井坊-0.74%、金徽酒-1.86%、口子窖-0.31%，板块内无一上涨。',
          reliability: 'high',
        },
      ],
      promptVersion: 'v2.0.0',
      model,
      analyzedAt: now,
      data: {
        marketSentiment: '偏弱',
        keyNews: [
          '股份回购持续推进中，最新进展公告02-03发布（来源：巨潮资讯网）',
        ],
        priceAnalysis: '跌破MA5(1520.82)，MA10(1489.17)为短期支撑，冲高回落形态',
      },
    },
    eventPrediction: {
      signal: 'yellow',
      title: '重大事件预测',
      summary: '2025年报3月底前披露，回购持续推进中',
      content: `【已确定事件日历】
• 2025年年报：预计2026年3月底前披露，尚未发布业绩快报
• 股份回购进行中：最新进展公告2026-02-03

【高概率事件推演】
业绩面：市场关注2025全年营收及净利润增速是否放缓
技术面：若跌破MA10(≈1489)可能回踩1月低点1329元

【事件影响评估】
2025年报披露 → 中性(中) | 业绩稳健但市场已有预期
回购持续推进 → 利好(中) | 构成股价底部支撑
年度分红方案 → 利好(中) | 随年报披露`,
      evidences: [
        {
          source: '巨潮资讯网-回购进展公告',
          url: 'https://www.cninfo.com.cn/new/disclosure/detail?stockCode=600519',
          date: '2026-02-03',
          snippet: '贵州茅台关于回购股份实施进展的公告（2026-02-03）。',
          reliability: 'high',
        },
        {
          source: '东方财富API-K线数据',
          url: 'https://quote.eastmoney.com/sh600519.html',
          date: '2026-02-11',
          snippet: '春节后走势：01/29收1437.72→02/05最高1565.00→02/11回落至1504.33。MA10≈1489为关键支撑。',
          reliability: 'high',
        },
      ],
      promptVersion: 'v2.0.0',
      model,
      analyzedAt: now,
      data: {
        events: [
          { event: '2025年年报披露', probability: 0.95, impact: 'yellow', timeframe: '1-2个月' },
          { event: '股份回购持续推进', probability: 0.9, impact: 'green', timeframe: '持续中' },
          { event: '年度分红方案公布', probability: 0.95, impact: 'green', timeframe: '2-3个月' },
        ],
      },
    },
    capitalFlow: {
      signal: 'red',
      title: '资金流分析',
      summary: '主力连续3日净流出累计14.5亿，成交额持续萎缩，资金面偏空',
      content: `【主力资金】
今日主力净流出1.70亿（大单+1.71亿，中单-1.33亿，小单-0.37亿）
近3日持续净流出：02/09 -6.42亿 | 02/10 -6.38亿 | 02/11 -1.70亿
成交额连续萎缩：02/05 141.8亿 → 02/11 46.5亿

【北向资金】
陆股通持股5504.88万股，占流通A股4.40%（截至2025-12-31）

【筹码分布】
近期成交密集区1496-1565元，当前价处于下沿
01/29跳空缺口1329-1437元存在支撑`,
      evidences: [
        {
          source: '东方财富API-日资金流向',
          url: 'https://data.eastmoney.com/zjlx/600519.html',
          date: '2026-02-11',
          snippet: '贵州茅台近10日主力资金流向(单位:亿元)：01/29 +33.39 | 01/30 -4.49 | 02/02 +5.46 | 02/03 +12.12 | 02/04 +14.89 | 02/05 +4.21 | 02/06 -5.44 | 02/09 -6.42 | 02/10 -6.38 | 02/11 -1.70。近3日累计净流出14.50亿。',
          reliability: 'high',
          children: [
            {
              source: '东方财富API-分钟资金流',
              url: 'https://data.eastmoney.com/zjlx/600519.html',
              date: '2026-02-11',
              snippet: '2026-02-11 15:00 资金流数据：主力净流出1.70亿，超大单约持平(-34万)，大单净流入1.71亿，中单净流出1.33亿，小单净流出0.37亿。',
              reliability: 'high',
            },
          ],
        },
        {
          source: '东方财富-北向资金持股',
          url: 'https://data.eastmoney.com/hsgtcg/StockHdStatistics/600519.html',
          date: '2025-12-31',
          snippet: '截至2025-12-31，陆股通持有贵州茅台5504.88万股，持仓市值758.12亿元，占流通A股4.40%，占总股本4.39%。当日收盘价1377.18元。',
          reliability: 'high',
        },
        {
          source: '东方财富API-K线成交额',
          url: 'https://quote.eastmoney.com/sh600519.html',
          date: '2026-02-11',
          snippet: '近5日成交额持续萎缩：02/05 141.8亿 → 02/06 120.2亿 → 02/09 78.1亿 → 02/10 59.5亿 → 02/11 46.5亿。量能衰减明显，市场观望情绪浓厚。',
          reliability: 'high',
        },
      ],
      promptVersion: 'v2.0.0',
      model,
      analyzedAt: now,
      data: {
        mainForce: { inflow: 170682624, outflow: 340983608, net: -170341984 },
        northbound: -55048844,
        institutionRatio: 4.4,
      },
    },
    riskControl: {
      signal: 'yellow',
      title: '风险控制',
      summary: '跌破MA5，主力连续流出，短期偏弱。MA10(1489)为关键支撑，回购构成底部安全垫。',
      content: `股价跌破MA5(1520.82)，MA10(1489)为短期关键支撑，跌破则看1401和1329。主力连续3日净流出14.5亿，板块全线下跌，缩量明显。止损建议1459(MA10下方2%)，止盈看1565(春节后高点)。公司回购进行中，构成底部支撑。`,
      evidences: [
        {
          source: '东方财富API-K线数据',
          url: 'https://quote.eastmoney.com/sh600519.html',
          date: '2026-02-11',
          snippet: 'MA5≈1520.82，MA10≈1489.17。股价跌破MA5，MA10为关键支撑。近5日成交额：141.8→120.2→78.1→59.5→46.5亿，持续萎缩。',
          reliability: 'high',
        },
        {
          source: '巨潮资讯网-回购进展公告',
          url: 'https://www.cninfo.com.cn/new/disclosure/detail?stockCode=600519',
          date: '2026-02-03',
          snippet: '贵州茅台正在实施股份回购（2026-02-03进展公告），构成股价底部安全垫。',
          reliability: 'high',
        },
      ],
      promptVersion: 'v2.0.0',
      model,
      analyzedAt: now,
      data: {
        riskLevel: 'medium',
        stopLoss: 3.0,
        takeProfit: 4.0,
        warnings: ['主力资金连续3日净流出累计14.5亿', '白酒板块全线下跌', '成交量持续萎缩'],
      },
    },
  }
}

export function generateMockAnalysis(code: string): AnalysisData {
  if (code === '600519') return generateMaotaiAnalysis()

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
