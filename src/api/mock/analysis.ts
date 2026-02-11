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

  return {
    dailySummary: {
      signal: 'green',
      title: '每日信息汇总',
      summary: '白酒板块走强，茅台放量上涨，主力资金积极介入',
      content: '贵州茅台今日高开高走，收盘报1688.50元，涨幅1.82%，成交额42.3亿元，换手率0.34%，振幅2.15%。技术面上，股价站稳MA5(1672)与MA10(1658)上方，MA20(1645)形成有力支撑，均线多头排列延续。MACD红柱持续放大，KDJ金叉向上运行，RSI(62)处于强势区间但未超买，布林带中轨上行、股价运行于中上轨之间。消息面上，公司公告2024年度分红方案每股派现30.876元，股息率约1.83%；白酒行业春节旺季动销数据超预期，渠道库存处于健康水平。板块联动方面，白酒板块整体上涨1.35%，五粮液涨1.56%、山西汾酒涨2.10%，茅台作为龙头表现稳健。',
      evidences: [
        {
          source: '东方财富行情数据',
          url: 'https://www.eastmoney.com',
          date: '2025-02-11',
          snippet: '贵州茅台(600519)收盘价1688.50元，涨1.82%，成交额42.3亿元，换手率0.34%。MA5/MA10/MA20均线多头排列，MACD红柱放大。',
          reliability: 'high',
          children: [
            {
              source: '同花顺技术分析',
              url: 'https://www.10jqka.com.cn',
              date: '2025-02-11',
              snippet: 'KDJ指标金叉运行(K:72, D:65, J:86)，RSI(14)=62处于强势区间，布林带开口向上，股价沿中上轨运行，短期上行动能充足。',
              reliability: 'high',
            },
          ],
        },
        {
          source: '公司公告',
          url: 'https://www.cninfo.com.cn',
          date: '2025-02-10',
          snippet: '贵州茅台发布2024年度利润分配预案：拟每股派发现金红利30.876元(含税)，分红总额约387.9亿元，分红比例达75.5%，股息率约1.83%。',
          reliability: 'high',
        },
        {
          source: '财联社',
          url: 'https://www.cls.cn',
          date: '2025-02-11',
          snippet: '春节期间白酒动销数据出炉：飞天茅台批价稳定在2200-2250元区间，渠道库存约1.5个月处于健康水平，经销商补货意愿积极。',
          reliability: 'high',
          children: [
            {
              source: '券商研报-中信证券',
              url: 'https://data.eastmoney.com',
              date: '2025-02-10',
              snippet: '中信证券发布白酒行业跟踪报告：春节旺季茅台动销同比增长约8%，批价企稳回升，维持贵州茅台"买入"评级，目标价1900元。',
              reliability: 'medium',
            },
          ],
        },
      ],
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        marketSentiment: '积极',
        keyNews: [
          '2024年度分红方案公布：每股派现30.876元，分红比例75.5%',
          '春节旺季飞天茅台动销同比增长约8%，批价稳定在2200-2250元',
          '中信证券维持"买入"评级，目标价1900元',
        ],
        priceAnalysis: '股价站稳MA5/MA10上方，均线多头排列，MACD红柱放大，短期趋势偏多',
      },
    },
    eventPrediction: {
      signal: 'green',
      title: '重大事件预测',
      summary: '年报披露窗口临近，业绩确定性高，分红落地构成正面催化',
      content: '基于多源信息交叉验证，贵州茅台未来1-3个月存在多个关键事件节点。首先，2024年年报预计于3月底前披露，结合已公布的前三季度营收1207亿元(+16.9%)和净利润608亿元(+15.0%)，全年业绩大概率延续双位数增长，市场预期充分但仍有超预期可能。其次，年度分红方案已公告待股东大会审议，每股30.876元的高分红将在4月除权，对长线资金具有吸引力。此外，茅台1935等系列酒持续放量，i茅台数字化直销平台GMV稳步增长，产品矩阵优化构成中期催化。风险方面，大股东贵州省国资委持股比例稳定(54%)，质押比例为零，无减持风险；但需关注宏观消费复苏节奏及白酒行业库存周期变化。',
      evidences: [
        {
          source: '公司公告',
          url: 'https://www.cninfo.com.cn',
          date: '2025-02-10',
          snippet: '贵州茅台2024年前三季度实现营收1207.03亿元，同比增长16.9%；归母净利润608.28亿元，同比增长15.0%。年报预计于2025年3月底前披露。',
          reliability: 'high',
          children: [
            {
              source: '券商研报-国泰君安',
              url: 'https://data.eastmoney.com',
              date: '2025-02-08',
              snippet: '国泰君安预计贵州茅台2024年全年营收约1650亿元(+15.5%)，归母净利润约830亿元(+15.2%)，Q4单季度收入增速有望达14%以上。',
              reliability: 'medium',
            },
          ],
        },
        {
          source: '证券时报',
          url: 'https://www.stcn.com',
          date: '2025-02-09',
          snippet: '贵州茅台2024年度股东大会定于2025年3月召开，审议利润分配方案。拟每股派现30.876元，分红总额387.9亿元，分红比例75.5%，创近三年新高。',
          reliability: 'high',
        },
        {
          source: '财联社',
          url: 'https://www.cls.cn',
          date: '2025-02-07',
          snippet: 'i茅台平台2024年GMV突破200亿元，注册用户超5000万。茅台1935全年销售额预计超150亿元，系列酒收入占比提升至约25%，产品矩阵持续优化。',
          reliability: 'high',
          children: [
            {
              source: '雪球用户调研',
              url: 'https://xueqiu.com',
              date: '2025-02-06',
              snippet: '多地经销商反馈茅台1935终端动销良好，部分区域出现阶段性供不应求，渠道利润空间约15-20%，经销商积极性较高。',
              reliability: 'medium',
            },
          ],
        },
        {
          source: '东方财富股东研究',
          url: 'https://www.eastmoney.com',
          date: '2025-02-11',
          snippet: '贵州茅台大股东贵州省国资委持股54.00%，无质押无减持计划。前十大流通股东中，香港中央结算(陆股通)持股比例约7.8%，较上季度增持0.3个百分点。',
          reliability: 'high',
        },
      ],
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        events: [
          { event: '2024年年报披露', probability: 0.95, impact: 'green', timeframe: '1-2个月' },
          { event: '年度分红除权(每股30.876元)', probability: 0.98, impact: 'green', timeframe: '2-3个月' },
          { event: '系列酒提价预期', probability: 0.45, impact: 'green', timeframe: '3-6个月' },
          { event: '白酒消费税改革传闻', probability: 0.2, impact: 'red', timeframe: '6个月以上' },
        ],
      },
    },
    capitalFlow: {
      signal: 'green',
      title: '资金流分析',
      summary: '主力资金连续净流入，北向资金持续增持，筹码集中度提升',
      content: '贵州茅台今日主力资金净流入3.28亿元，其中超大单净买入1.85亿元、大单净买入1.43亿元，主力资金占成交额比例达38.2%。近5日主力累计净流入8.76亿元，呈现持续加仓态势。北向资金方面，陆股通今日净买入1.12亿元，近10个交易日累计净买入约9.5亿元，持仓市值约1650亿元，占流通盘比例升至7.8%。融资融券数据显示，融资余额98.6亿元，较上周增加2.3亿元，融券余额仅1.2亿元，多空比约82:1，多头力量占绝对优势。筹码分布上，1600-1700元区间为主要成本密集区，集中度约65%，当前价位获利盘比例约72%，套牢盘主要集中在1750-1850元区间。机构方面，近一个月共有12家机构调研，包括3家外资机构，关注重点为2025年经营目标和渠道改革进展。',
      evidences: [
        {
          source: '东方财富资金流向',
          url: 'https://www.eastmoney.com',
          date: '2025-02-11',
          snippet: '贵州茅台今日主力净流入3.28亿元(超大单+1.85亿，大单+1.43亿)，近5日累计净流入8.76亿元。散户资金净流出2.15亿元，主力吸筹特征明显。',
          reliability: 'high',
          children: [
            {
              source: '同花顺大单分析',
              url: 'https://www.10jqka.com.cn',
              date: '2025-02-11',
              snippet: '今日超大单(>100万)成交占比18.5%，大单(20-100万)占比19.7%，合计主力成交占比38.2%，较昨日提升3.1个百分点，资金介入力度加大。',
              reliability: 'high',
            },
          ],
        },
        {
          source: '东方财富北向资金',
          url: 'https://www.eastmoney.com',
          date: '2025-02-11',
          snippet: '陆股通今日净买入贵州茅台1.12亿元，近10日累计净买入9.5亿元。当前北向持仓9800万股，持仓市值约1650亿元，占流通盘7.8%。',
          reliability: 'high',
        },
        {
          source: '同花顺融资融券',
          url: 'https://www.10jqka.com.cn',
          date: '2025-02-11',
          snippet: '贵州茅台融资余额98.6亿元(+2.3亿)，融券余额1.2亿元(-0.1亿)，融资净买入2.4亿元。多空比82:1，杠杆资金看多情绪浓厚。',
          reliability: 'high',
          children: [
            {
              source: '雪球筹码分析',
              url: 'https://xueqiu.com',
              date: '2025-02-11',
              snippet: '当前筹码主要集中在1600-1700元(约65%)，获利盘72%，套牢盘集中在1750-1850元(约18%)。筹码集中度较上月提升，主力控盘程度增强。',
              reliability: 'medium',
            },
          ],
        },
      ],
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        mainForce: { inflow: 628000000, outflow: 300000000, net: 328000000 },
        northbound: 112000000,
        institutionRatio: 38.2,
      },
    },
    riskControl: {
      signal: 'green',
      title: '风险控制',
      summary: '风险可控，趋势健康，均线支撑有力',
      content: '当前贵州茅台整体风险水平较低。股价运行在MA5/MA10/MA20均线系统上方，多头排列完好，MA60(1620)构成中期强支撑。技术指标方面，MACD处于零轴上方且红柱放大，趋势向好；RSI(62)处于强势区间但距超买(70)仍有空间；布林带开口适中，股价沿中上轨运行，无极端偏离。建议止损设置在MA20(1645元)下方约3%位置即1595元，止盈目标参考前高1780元及券商一致目标价1900元。需关注的风险点：一是白酒行业整体估值处于历史中位数偏上，若宏观经济数据不及预期可能引发板块回调；二是飞天茅台批价若跌破2100元可能影响市场信心。当前大股东持股稳定、无质押风险、无诉讼或审计异常，基本面风险极低。',
      evidences: [
        {
          source: '同花顺技术诊断',
          url: 'https://www.10jqka.com.cn',
          date: '2025-02-11',
          snippet: '贵州茅台技术评分82/100。均线多头排列(MA5>MA10>MA20>MA60)，MACD金叉运行，RSI=62未超买，布林带中上轨运行。综合技术面健康，短期支撑位1645元(MA20)，压力位1780元(前高)。',
          reliability: 'high',
        },
        {
          source: '新浪财经估值分析',
          url: 'https://finance.sina.com.cn',
          date: '2025-02-11',
          snippet: '贵州茅台当前PE(TTM)约25.5倍，处于近5年估值中位数(28倍)下方，PB约9.8倍。白酒板块平均PE约30倍，茅台估值具有相对优势。',
          reliability: 'medium',
          children: [
            {
              source: '券商研报-招商证券',
              url: 'https://data.eastmoney.com',
              date: '2025-02-09',
              snippet: '招商证券认为茅台2025年合理PE区间为25-30倍，对应股价区间1650-1980元。当前价位处于合理估值下沿，安全边际充足，维持"强烈推荐"评级。',
              reliability: 'medium',
            },
          ],
        },
      ],
      promptVersion: 'v1.0.0',
      model,
      analyzedAt: now,
      data: {
        riskLevel: 'low',
        stopLoss: 5.5,
        takeProfit: 12.5,
        warnings: [],
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
