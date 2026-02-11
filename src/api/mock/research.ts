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
    '新品竞争力（产品力×落地难度）',
    '研发效率（投入→产出→商业化）',
    '商业化与留存（增长质量）',
    '竞争格局与公司竞争水平',
    '经营阶段与KPI验证体系（创新型≥10项）',
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

// 创新研究固定要素数据
const innovationElements: Omit<ResearchElement, 'promptVersion' | 'model' | 'analyzedAt'>[] = [
  {
    title: '新品竞争力（产品力×落地难度）',
    rating: 'buy',
    summary: '新品在性能与成本维度均具备对标优势，POC转化率表现突出，但规模化落地仍面临集成与合规门槛。',
    content: `产品力维度，新品ROI 2.8x显著优于竞品A的2.1x，性能领先来自自研推理引擎，短期可持续但需关注竞品迭代节奏。替代路径清晰，先切标准化场景（60%），迁移成本中等，主要难点在历史数据兼容与审批流程再造。

落地维度，POC→签约转化率38%，金融行业最高达45%，大客户50%+，中小客群样本不足是当前缺口。上线周期3-6个月，瓶颈在客户安全审批（6周）和定制集成（4周）。部署需GPU算力+等保三级，金融客户要求数据不出境。

切换成本评估"中高"——数据迁移、流程改造、人员培训、合同排他条款构成多层锁定，但生态绑定风险较低。综合看，产品力强但落地周期偏长，需通过合规预审和标准化交付缩短转化路径。`,
    evidences: [
      { source: '性能/成本/ROI对标', url: 'https://www.cninfo.com.cn', date: '2025-12-15', snippet: '对标竞品A及开源方案B。推理延迟降低40%，准确率提升15%/40%，单次调用成本低22%，ROI 2.8x vs 2.1x。差距来源：自研推理引擎优化。可持续性：短期可持续，需关注竞品迭代。', reliability: 'high' },
      { source: '替代路径分析', url: 'https://data.eastmoney.com', date: '2025-12-20', snippet: '替代对象：规则引擎+人工审核。替代顺序：先标准化场景（60%）再长尾。数据迁移2-4周，流程改造需客户IT配合，难点在历史数据格式兼容与审批流程再造。', reliability: 'high' },
      { source: 'POC转化率跟踪', url: 'https://www.10jqka.com.cn', date: '2025-12-18', snippet: '整体POC→签约38%。分行业：金融45%、制造35%、零售30%。分客群：大型50%+、中型30%。缺口：中小客群样本不足，计划Q3渠道合作补齐。', reliability: 'high' },
      { source: '上线周期调研', url: 'https://xueqiu.com', date: '2025-12-16', snippet: 'POC到规模化部署3-6个月。瓶颈：客户安全审批6周、定制集成开发4周、数据回流与模型微调3周。', reliability: 'medium' },
      { source: '部署门槛评估', url: 'https://www.cls.cn', date: '2025-12-14', snippet: '算力：推荐4卡A10 GPU，支持私有化与混合云。集成：标准API/SDK，需对接ERP/CRM。合规：等保三级，金融客户要求数据不出境。', reliability: 'high' },
      { source: '切换成本评估', url: 'https://www.stcn.com', date: '2025-12-12', snippet: '综合评估"中高"。数据层：格式转换；流程层：审批与告警重配；组织层：培训2-3天；合同层：部分排他条款；生态绑定：主流云厂商适配，锁定风险低。', reliability: 'medium' },
    ],
  },
  {
    title: '研发效率（投入→产出→商业化）',
    rating: 'strongBuy',
    summary: '研发费用率趋势健康且与毛利改善正相关，人均产出行业领先，立项到收入贡献周期仅8个月，全链路效率处于同业前20%。',
    content: `研发费用率从19.2%降至17.9%，费用杠杆效应显现，每下降1pct对应毛利率改善约0.8pct。管理层指引未来稳定在16-18%区间。

人均产出突出：420人团队年发布186个功能点，人均4.4个/年（行业均值2.8），领先57%。专利人均0.38件/年（行业0.15），关键岗位流失率<5%保障了持续性。

商业化周期短：立项→原型4.2个月→内测1.8个月→首付费客户2个月，全程约8个月（行业10-14个月）。近三个项目首年贡献1.2亿，回收周期18个月。

历史相关性验证：研发投入与次季度毛利率改善相关系数0.72，剔除2024Q3基础研究异常季度后达0.81。传导路径：研发→功能完善→ARPU提升→收入增长快于成本→毛利改善。`,
    evidences: [
      { source: '研发费用率趋势', url: 'https://www.cninfo.com.cn', date: '2025-11-30', snippet: '近四季研发费用率：19.2%→18.8%→18.5%→17.9%，收入增速31%快于研发投入增速22%，费用杠杆显现。毛利率同期69%→72%，每降1pct费用率对应毛利改善0.8pct。管理层指引16-18%。', reliability: 'high' },
      { source: '研发人均产出', url: 'https://www.cls.cn', date: '2025-12-10', snippet: '研发420人，年发布186功能点，人均4.4个/年（行业2.8）。12个项目9个按期交付，按期率75%（行业60%）。人均专利0.38件/年（行业0.15），发明专利占比72%。关键岗位流失率<5%。', reliability: 'high' },
      { source: '研发到商业化周期', url: 'https://data.eastmoney.com', date: '2025-12-08', snippet: '立项→原型4.2个月→内测上线1.8个月→首付费客户2个月，全程约8个月。近三个项目首年营收1.2亿，回收周期18个月。瓶颈在原型→内测阶段（QA资源与合规测试）。', reliability: 'high' },
      { source: '投入与毛利相关性', url: 'https://www.10jqka.com.cn', date: '2025-12-05', snippet: '近8季度研发费用与次季毛利率相关系数0.72。传导：研发→功能完善→ARPU↑→收入增长快于成本→毛利改善。反例：2024Q3投入+15%但毛利未改善，因集中于基础研究，剔除后系数0.81。', reliability: 'medium' },
    ],
  },
  {
    title: '商业化与留存（增长质量）',
    rating: 'buy',
    summary: 'NRR 118%且大客户留存97%，ARPU扩张主要来自模块渗透与用量增长，但CAC上升8%与小客户流失需关注。',
    content: `留存质量优异：整体NRR 118%，大客户NRR 128%（驱动：模块渗透45%+用量增长35%+提价20%），小客户NRR仅95%存在净流失，流失主因预算缩减和竞品替代。

ARPU扩张健康：86万/年同比+18%，模块渗透贡献40%为最大驱动力，其次用量增长35%、席位扩展15%、价格调整10%。扩张来源多元化降低了单一依赖风险。

客户结构方面，大客户68家占收入55%，Top10占比35%呈上升趋势需关注。RPO 6.2亿同比+28%，转化周期4.5个月，取消率<3%，订单质量高。

获客效率承压：大客户CAC 42万（周期5-7月），近两季上升8%。渠道伙伴贡献新签22%但收入仅12%。折扣纪律良好，大客户折扣率12%优于行业15-20%，续费提价执行率92%。`,
    evidences: [
      { source: 'NRR/留存分层', url: 'https://www.eastmoney.com', date: '2025-12-12', snippet: '整体NRR 118%。大客户（>100万）：Logo留存97%，NRR 128%，驱动=模块渗透45%+用量35%+提价20%。中型：留存88%，NRR 112%，驱动=席位50%+模块30%+用量20%。小型（<20万）：留存78%，NRR 95%净流失，原因=预算缩减45%+竞品替代30%+需求不匹配25%。', reliability: 'high' },
      { source: 'ARPU/单客收入', url: 'https://www.stcn.com', date: '2025-12-10', snippet: 'ARPU 86万/年，同比+18%。扩张来源：模块渗透40%（数据分析+合规模块交叉销售）、用量增长35%（API调用量随业务量提升）、席位扩展15%（跨部门推广）、价格调整10%（年度提价3-5%）。', reliability: 'high' },
      { source: '客户结构分析', url: 'https://www.cninfo.com.cn', date: '2025-12-08', snippet: '大客户68家占收入55%，同比+25%。行业分布：金融35%、制造20%、零售15%、医疗12%、其他18%。Top10占比35%（去年32%）上升中，Top1占比8%尚安全。', reliability: 'high' },
      { source: '订单/RPO', url: 'https://data.eastmoney.com', date: '2025-12-06', snippet: 'RPO 6.2亿，同比+28%。订单→收入转化周期4.5个月。历史取消率<3%，主要发生在中小客户。大客户多为年度预付，取消风险极低。', reliability: 'high' },
      { source: '渠道转化效率', url: 'https://www.cls.cn', date: '2025-12-04', snippet: 'CAC：大客户42万（周期5-7月）、中型18万（周期2-3月），近两季上升8%因大客户拓展需更多售前资源。渠道伙伴贡献新签22%、收入12%（以中小客户为主）。CAC回收11个月，LTV/CAC 5.2x。', reliability: 'high' },
      { source: '价格与折扣', url: 'https://xueqiu.com', date: '2025-12-01', snippet: '折扣纪律：大客户平均12%（行业15-20%）、中型8%。续费提价3-5%，执行率92%。竞争压力：面对云厂商免费策略，中小客户市场被迫首年7折，大客户价格体系稳固。', reliability: 'medium' },
    ],
  },
  {
    title: '竞争格局与公司竞争水平',
    rating: 'neutral',
    summary: '竞争定位：领先（有条件）。产品力与客户覆盖领先，但成本结构与生态建设存在短板，大厂入局是最大变量。',
    content: `行业增长由5个变量决定：企业数字化预算增速→采购需求、AI技术成熟度→TAM扩大、监管趋严→利好持证厂商、云厂商捆绑→中小客户分流、开源成熟→差异化要求提高。

胜负手3条：1）大客户续约率维持95%+（当前97%，季度可验证）；2）模块渗透率从2.8提升至3.5+（半年度验证）；3）云厂商免费策略对中小客户新签冲击幅度（季度验证，红线>30%下降）。

竞争定位"领先（有条件）"：Gartner领导者、Top100企业覆盖38家、NRR行业最高。条件限制：成本结构未形成规模优势，生态收入<5%，领先依赖持续迭代速度。

对标表核心差距：产品力领先15%但可追赶性中等；成本结构毛利率低竞对3pct（定制化占比大）可追赶性高；生态落后2年（伙伴120 vs 200，ISV收入<5% vs 12%）可追赶性中等；交付服务领先（NPS 62 vs 55）可追赶性低；合规基本对等，医疗资质Q2补齐。`,
    evidences: [
      { source: '行业增长拆解', url: 'https://data.eastmoney.com', date: '2025-12-16', snippet: '决定性变量5个：1）企业数字化预算增速→采购需求↑→行业收入↑；2）AI技术成熟度→应用场景扩展→TAM扩大；3）监管合规趋严→专业方案需求↑→利好持证厂商；4）云厂商捆绑策略→中小客户分流→份额承压；5）开源生态成熟→标准化场景被替代→差异化要求提高。', reliability: 'high' },
      { source: '胜负手验证', url: 'https://www.cls.cn', date: '2025-12-14', snippet: '胜负手3条：①大客户续约率≥95%（当前97%，季度验证）——基本盘指标；②模块渗透率→3.5+（当前2.8，半年度验证）——ARPU扩张核心；③云厂商免费策略冲击（季度新签数据验证）——若中小客户新签降>30%需重构增长模型。', reliability: 'high' },
      { source: '竞争定位判断', url: 'https://www.cninfo.com.cn', date: '2025-12-12', snippet: '定位：领先（有条件）。证据：Gartner象限领导者+功能完整度第一；Top100企业覆盖38家，行业最高；NRR 118%为行业最高之一。条件：成本结构无规模优势，生态收入<5%，领先依赖迭代速度。', reliability: 'high' },
      { source: '竞争对标-产品力/成本', url: 'https://www.10jqka.com.cn', date: '2025-12-10', snippet: '产品力：公司功能完整度第一+AI性能领先15%，竞对覆盖90%场景依赖第三方引擎。差距源于自研引擎+3年数据积累，可追赶性中。成本结构：公司毛利72% vs 竞对75%，差距源于定制化占比大，可追赶性高（平台化可改善）。验证：产品评测+毛利率，季度/半年度。', reliability: 'high' },
      { source: '竞争对标-渠道/交付/合规', url: 'https://finance.sina.com.cn', date: '2025-12-08', snippet: '渠道/生态：公司120伙伴ISV<5% vs 竞对200伙伴ISV 12%，落后约2年，可追赶性中。交付服务：公司NPS 62/交付4.5月 vs 竞对NPS 55/5月，领先且可追赶性低。合规：基本对等，公司医疗资质申请中预计Q2取得，可追赶性高。', reliability: 'medium' },
    ],
  },
  {
    title: '经营阶段与KPI验证体系（创新型≥10项）',
    rating: 'buy',
    summary: '当前处于规模化爬坡期，12项KPI中8项达标。下一阶段关键条件：现金流转正、模块渗透率突破3.5、生态收入占比>8%。',
    content: `经营阶段判断：规模化爬坡期。PMF已验证（NPS 62，续约率97%），ARR增速31%连续4季>25%，LTV/CAC 5.2x但现金流仍为负，组织从产品驱动向双驱动转型，产品从单模块向平台化演进（客均渗透2.8个模块）。

下一阶段3个必要条件：1）自由现金流转正（当前-0.8亿，目标2026Q3）；2）模块渗透率突破3.5（当前2.8）；3）生态收入占比>8%（当前<5%）。三项达成标志进入放量期。

阶段性风险3条：1）现金流转正推迟——若销售费用超预期（对应CAC上升趋势）；2）大客户集中度持续上升——Top10占比35%（对应客户结构风险）；3）云厂商免费策略冲击中小客户获客——若新签降>30%需重构增长模型。

KPI总览：12项中8项达标（✓），2项接近（△切换成本6.5/10、客户集中度35%），2项需关注（✗现金流为负、竞品迭代差距缩至85%）。整体支持"爬坡期"判断。`,
    evidences: [
      { source: '经营阶段判断', url: 'https://www.cninfo.com.cn', date: '2025-12-20', snippet: '阶段：规模化爬坡期。证据5条：①PMF验证（NPS 62，行业45）；②ARR增速31%连续4季>25%；③LTV/CAC 5.2x但FCF为负；④销售团队扩张40%+渠道搭建；⑤5个模块上线，客均渗透2.8个。', reliability: 'high' },
      { source: '下一阶段条件', url: 'https://www.stcn.com', date: '2025-12-17', snippet: '必要条件3条（可跟踪）：①FCF转正（当前-0.8亿，目标2026Q3，季度跟踪）；②模块渗透率→3.5+（当前2.8，半年度跟踪）；③生态收入占比>8%（当前<5%，半年度跟踪）。达成=进入放量期。', reliability: 'high' },
      { source: '阶段性风险', url: 'https://data.eastmoney.com', date: '2025-12-15', snippet: '风险3条：①FCF转正推迟——销售费用超预期（对应CAC上升8%趋势）；②大客户集中度上升——Top10占比35%且仍升（核心客户流失冲击大）；③云厂商免费策略——中小客户新签若降>30%需重构增长模型。', reliability: 'high' },
      { source: 'KPI表-新品竞争力', url: 'https://www.10jqka.com.cn', date: '2025-12-13', snippet: '①ROI对标：≥2.5x绿灯/<2x红灯，半年度，内部测试+客户反馈，关联收入；②POC转化率：≥35%绿灯/<25%红灯，季度，CRM，关联收入；③上线周期：≤180天绿灯/>270天红灯，季度，项目系统，关联收入；④切换成本：评分≥7/10绿灯，年度，客户成功评估，关联溢价。', reliability: 'high' },
      { source: 'KPI表-研发效率', url: 'https://www.cls.cn', date: '2025-12-11', snippet: '⑤研发费用率：15-20%绿灯/>22%黄灯，季度，财报，关联利润；⑥人均产出：≥4个/人绿灯/<3红灯，半年度，发布日志，关联利润；⑦研发→商业化周期：≤10月绿灯/>14月红灯，半年度，项目系统，关联收入。', reliability: 'high' },
      { source: 'KPI表-商业化/竞争', url: 'https://xueqiu.com', date: '2025-12-09', snippet: '⑧NRR：≥115%绿灯/<105%红灯，季度，财务系统，关联收入；⑨ARPU：同比≥10%绿灯，季度，关联收入；⑩客户集中度：Top10≤30%绿灯/>40%红灯，季度，关联溢价；⑪RPO：同比≥20%绿灯，季度，财报，关联收入；⑫竞品迭代：竞品更新<公司80%绿灯，季度，竞品监测，关联溢价。', reliability: 'medium' },
    ],
  },
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
  '综合各要素分析及AI反方意见，该标的整体投资价值较高。核心竞争力突出，财务状况健康，估值处于合理区间。主要风险点在于行业竞争加剧和宏观环境不确定性。建议投资者在当前价位适度配置，并设置合理的止盈止损位。',
  '经过全面评估，该标的基本面扎实但估值偏高。建议等待更好的介入时机，或在回调时分批建仓。重点关注下季度业绩能否延续高增长态势。',
  '该标的在多个维度表现优异，具备中长期投资价值。短期内可能受市场情绪影响出现波动，但核心逻辑未变。建议以中长期视角持有，短期波动可视为加仓机会。',
]

function generateInnovationElements(): ResearchElement[] {
  const now = new Date().toISOString()
  return innovationElements.map(e => ({
    ...e,
    promptVersion: 'v1.2.0',
    model: 'Manus-Agent-v1',
    analyzedAt: now,
  }))
}

function generateReport(code: string, type: ResearchType): ResearchReport {
  const stock = mockStocks.find(s => s.code === code)
  const titles = elementTitles[type]
  const isInnovation = type === 'innovation'
  return {
    id: randomId(),
    stockCode: code,
    stockName: stock?.name ?? code,
    type,
    rating: isInnovation ? 'buy' : pick(ratings),
    conclusion: isInnovation
      ? '综合五大创新要素分析，该标的新品竞争力突出，研发效率行业领先，商业化留存质量优异。竞争格局尚未固化但公司处于第一梯队，KPI验证体系完整且多数达标。主要风险在于大厂入局冲击与自由现金流尚未转正。建议以中长期视角配置，重点跟踪规模化放量节奏与现金流拐点。'
      : pick(conclusions),
    elements: isInnovation ? generateInnovationElements() : titles.map(t => generateElement(t)),
    counterArgument: isInnovation ? {
      summary: '尽管创新指标整体向好，但需警惕技术路线被颠覆、大厂免费策略冲击中小客户市场、以及规模化扩张期现金流持续为负的风险。',
      content: '从反方视角审视，当前市场对公司创新能力的定价可能过于乐观。\n\n首先，技术路线风险不容忽视。AI领域技术迭代极快，公司当前的技术优势窗口期可能仅有12-18个月，一旦底层大模型能力趋同，应用层的差异化壁垒将大幅削弱。\n\n其次，大厂入局的威胁被低估。阿里云、华为云等已开始将类似功能免费内置，虽然短期对大客户影响有限，但中小客户市场（占公司潜在TAM的60%）可能被快速蚕食。\n\n第三，现金流问题值得关注。公司自由现金流连续为负，虽然管理层预计Q3转正，但规模化扩张期的销售费用和研发投入可能超预期，转正时点存在推迟风险。\n\n最后，客户集中度风险正在累积。Top10客户占比35%且仍在上升，一旦核心大客户流失或缩减预算，对收入的冲击将非常显著。',
      evidences: [
        { source: '券商研报', url: 'https://data.eastmoney.com', date: '2025-12-19', snippet: '大模型能力趋同化趋势明显，应用层厂商的技术壁垒可能在12-18个月内被显著削弱。', reliability: 'high' },
        { source: '财联社', url: 'https://www.cls.cn', date: '2025-12-15', snippet: '多家云厂商宣布AI应用功能免费策略，中小客户市场竞争格局面临重塑。', reliability: 'high' },
        { source: '雪球', url: 'https://xueqiu.com', date: '2025-12-12', snippet: '公司Top10客户收入占比已达35%，客户集中度风险需要引起重视。', reliability: 'medium' },
      ],
      promptVersion: 'v1.2.0',
      model: 'Manus-Agent-v1',
      analyzedAt: new Date().toISOString(),
    } : generateCounterArgument(),
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
