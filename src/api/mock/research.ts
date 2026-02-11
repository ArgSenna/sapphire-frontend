import { randomId } from '@/utils'
import { mockStocks } from './stocks'

import type { Evidence } from '../types'
import type { ResearchType, Rating, ResearchElement, ResearchCounterArgument, ResearchReport } from '../types'

const ratings: Rating[] = ['strongBuy', 'buy', 'neutral', 'reduce', 'sell']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
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

const elementTitles: Record<ResearchType, string[]> = {
  investment: [
    '行业空间与增长潜力',
    '核心竞争力与护城河',
    '财务健康度与盈利质量',
    '竞争格局与市场地位',
    '关键经营指标追踪',
    '估值水平与安全边际',
    '催化剂与风险因素',
  ],
  service: [
    '服务市场规模与渗透率',
    '服务差异化与客户粘性',
    '收入模式与现金流稳定性',
    '竞争对标与服务质量',
    '客户满意度与续约率KPI',
    '扩张能力与边际成本',
    '监管环境与合规风险',
  ],
  innovation: [
    '技术创新能力与研发投入',
    '专利布局与技术壁垒',
    '产品管线与商业化进度',
    '竞争技术路线对标',
    '研发效率与转化率KPI',
    '市场接受度与用户反馈',
    '技术迭代风险与替代威胁',
  ],
}

const summaries = [
  '公司在该维度表现优异，核心指标持续向好，具备明显的竞争优势。',
  '整体表现稳健，部分指标有改善空间，但基本面扎实。',
  '该维度存在一定隐忧，需持续关注相关风险因素的演变。',
  '表现中规中矩，与行业平均水平基本持平，缺乏明显亮点。',
  '该领域具备突出优势，是公司核心价值的重要支撑。',
]

const contents = [
  '经过深入分析，该公司在此维度展现出强劲的竞争力。从定量指标来看，核心数据连续三个季度保持两位数增长，远超行业平均水平。定性层面，管理层战略清晰，执行力强，资源配置合理。综合来看，该维度对投资价值形成正面支撑。',
  '该维度整体表现稳健但存在分化。积极方面：市场份额稳步提升，品牌影响力增强；需关注方面：成本端压力上升，部分细分领域竞争加剧。建议投资者重点跟踪下季度的边际变化。',
  '从多维度数据交叉验证来看，该领域是公司的核心竞争优势所在。无论是横向对比同业还是纵向对比历史，公司均处于领先地位。预计这一优势在中期内将持续巩固。',
  '该维度表现平稳，未出现明显的正面或负面信号。关键指标在合理区间内波动，与市场预期基本一致。建议保持关注，等待更明确的方向性信号出现。',
  '需要警惕该维度的潜在风险。近期数据显示部分先行指标出现走弱迹象，虽然尚未影响到核心业务，但如果趋势延续，可能在未来1-2个季度对业绩产生压力。',
]

const counterSummaries = [
  '尽管整体看好，但需警惕估值过高带来的回调风险，以及行业政策不确定性。',
  '市场对公司的乐观预期可能已充分反映在股价中，边际改善空间有限。',
  '竞争对手的追赶速度不容忽视，公司护城河的持久性需要持续验证。',
]

const counterContents = [
  '从反方视角审视，当前市场对该公司的一致性预期过于乐观。首先，估值水平已处于历史高位区间，隐含了较高的增长预期，一旦业绩不及预期，股价面临较大回调压力。其次，行业竞争格局正在发生变化，新进入者凭借差异化策略正在蚕食市场份额。此外，宏观经济下行压力可能对消费端需求产生抑制。建议投资者在乐观中保持审慎。',
  '反方观点认为，公司当前的高增长难以持续。一方面，基数效应将逐步消退；另一方面，原材料成本上升和人力成本增加将压缩利润空间。同时，监管趋严可能增加合规成本。从技术面看，股价已偏离均线系统较远，短期存在均值回归的压力。',
  '需要关注的反面因素包括：1）行业产能过剩风险正在累积；2）海外市场拓展面临地缘政治不确定性；3）核心技术人才流失风险；4）替代技术路线的潜在颠覆。这些因素虽然短期影响有限，但中长期可能改变投资逻辑。',
]

function generateElement(title: string): ResearchElement {
  const now = new Date().toISOString()
  return {
    title,
    rating: pick(ratings),
    summary: pick(summaries),
    content: pick(contents),
    evidences: generateEvidence(3),
    promptVersion: 'v1.0.0',
    model: 'Manus-Agent-v1',
    analyzedAt: now,
  }
}

function generateCounterArgument(): ResearchCounterArgument {
  return {
    summary: pick(counterSummaries),
    content: pick(counterContents),
    evidences: generateEvidence(3),
    promptVersion: 'v1.0.0',
    model: 'Manus-Agent-v1',
    analyzedAt: new Date().toISOString(),
  }
}

const conclusions = [
  '综合七大要素分析及AI反方意见，该标的整体投资价值较高。核心竞争力突出，财务状况健康，估值处于合理区间。主要风险点在于行业竞争加剧和宏观环境不确定性。建议投资者在当前价位适度配置，并设置合理的止盈止损位。',
  '经过全面评估，该标的基本面扎实但估值偏高。建议等待更好的介入时机，或在回调时分批建仓。重点关注下季度业绩能否延续高增长态势。',
  '该标的在多个维度表现优异，具备中长期投资价值。短期内可能受市场情绪影响出现波动，但核心逻辑未变。建议以中长期视角持有，短期波动可视为加仓机会。',
]

function generateReport(code: string, type: ResearchType): ResearchReport {
  const stock = mockStocks.find(s => s.code === code)
  const titles = elementTitles[type]
  return {
    id: randomId(),
    stockCode: code,
    stockName: stock?.name ?? code,
    type,
    rating: pick(ratings),
    conclusion: pick(conclusions),
    elements: titles.map(t => generateElement(t)),
    counterArgument: generateCounterArgument(),
    createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
    model: 'Manus-Agent-v1',
  }
}

// in-memory store
const reports: ResearchReport[] = [
  generateReport('600519', 'investment'),
  generateReport('300750', 'innovation'),
  generateReport('601318', 'service'),
]

export function getMockResearchReports(): ResearchReport[] {
  return reports
}

export function getMockResearchById(id: string): ResearchReport | undefined {
  return reports.find(r => r.id === id)
}

export function createMockResearch(stockCode: string, type: ResearchType): ResearchReport {
  const report = generateReport(stockCode, type)
  reports.unshift(report)
  return report
}

export function deleteMockResearch(id: string): boolean {
  const idx = reports.findIndex(r => r.id === id)
  if (idx === -1) return false
  reports.splice(idx, 1)
  return true
}
