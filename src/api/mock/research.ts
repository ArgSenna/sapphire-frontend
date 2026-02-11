import { randomId } from '@/utils'
import { mockStocks } from './stocks'
import { investmentElements, investmentCounterArgument, investmentResearcherNotes } from './investmentData'

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
    '资源禀赋与成本竞争力',
    '供需关系与行业周期',
    '资本开支与产能周期',
    '资产负债表与现金流分析',
    '利润弹性与投资结论',
    'KPI验证体系（投资型≥12项）',
  ],
  service: [
    '单位经济模型（UE）与标准化能力',
    '运营效率与周转（核心杠杆）',
    '客户忠诚与生命周期价值（LTV）',
    '竞争格局与运营水平',
    '经营阶段与KPI验证体系（服务型≥10项）',
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

// 服务型研究固定要素数据（亚朵酒店 ATAT）
const serviceElements: Omit<ResearchElement, 'promptVersion' | 'model' | 'analyzedAt'>[] = [
  {
    title: '单位经济模型（UE）与标准化能力',
    rating: 'buy',
    summary: '亚朵单店模型成熟，GOP利润率35-38%，Payback约22个月，标准化程度高但快速扩张下交付一致性面临压力。',
    content: `单店经济模型健康：标准亚朵酒店（120间客房）总投资1500-1800万元，年GOP约350-420万元，GOP利润率35-38%。收入结构中客房占82%、场景零售占12%、其他服务占6%，零售业务毛利率55%显著高于客房业务，是利润增量的关键来源。

盈亏平衡与回收周期表现良好：新店BEP约6-8个月（OCC达到65%即可覆盖固定成本），投资回收期中位数22个月，二三线城市约20个月、一线约26个月。较2023年缩短约2个月，主因会员体系导流加速爬坡。

标准化程度较高：SOP覆盖率92%，核心环节（预订、入住、客房清洁、退房）数字化程度85%，自助入住机覆盖率85%。但人工依赖度仍有35%集中在客房服务和个性化体验环节。跨区域品质抽检合格率91%，新店前6个月合格率约85%，存在爬坡期品控缺口。

可复制性门槛中等：选址要求聚焦核心商圈3公里内，人才培养周期12-18个月是主要瓶颈。规模效应正向——单位获客成本随门店密度提升持续下降，但管理复杂度随区域扩散上升，需关注反规模效应拐点。`,
    evidences: [
      { source: '单店模型拆解', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-15', snippet: '标准店120间客房，总投资1500-1800万。收入结构：客房82%、零售12%、其他6%。直接成本（COGS）占比52%，折旧摊销占比10%，单体GOP利润率35-38%。零售毛利率55%，客房毛利率42%。', reliability: 'high', children: [
        { source: 'ATAT 2025年报（20-F）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '2025Q3单店平均营收约125万元/月，GOP约46万元/月。成熟店（>18月）GOP率38.2%，爬坡期店GOP率28.5%。', reliability: 'high' },
        { source: '加盟商经营数据', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '样本150家加盟店：客房收入占比81-84%，零售占比10-14%。零售渗透率高的门店（>15%）GOP率高出平均约3pct。', reliability: 'medium' },
      ] },
      { source: '盈亏平衡点（BEP）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-18', snippet: 'BEP约6-8个月（OCC≥65%即覆盖固定成本）。初始投入1500-1800万元（含装修1200万+加盟费150万+首年运营资金150-450万）。Payback中位数22个月，一线26个月、二三线20个月。', reliability: 'high', children: [
        { source: '加盟商回报调研', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-20', snippet: '120家成熟店样本：Payback中位数22个月，75分位26个月，90分位30个月。2025年新开店Payback较2023年缩短约2个月，主因会员导流加速。', reliability: 'high' },
        { source: '城市能级差异', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-05', snippet: '一线城市Payback 24-28个月（租金高但ADR也高），二线18-22个月（性价比最优），三线20-24个月（ADR偏低拉长回收期）。', reliability: 'medium' },
      ] },
      { source: '标准化程度', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-12', snippet: 'SOP覆盖率92%，核心环节数字化程度85%（PMS+自助入住+智能排班+集采平台）。人工依赖度35%，集中在客房清洁和个性化服务。自助入住机覆盖率85%，减少前台人力30%。', reliability: 'high', children: [
        { source: '数字化系统审计', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-10', snippet: '自研PMS覆盖100%门店，中央预订系统日处理订单15万+。智能排班系统上线后人效提升12%，客房清洁外包比例40%。', reliability: 'high' },
        { source: '运营标准化报告', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: 'SOP手册覆盖268个服务触点，每季度更新。新员工培训周期从21天压缩至14天，标准化培训通过率88%。', reliability: 'medium' },
      ] },
      { source: '交付一致性', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '跨区域品质抽检合格率91%（目标95%）。客诉率0.8%（行业1.2%）。新店前6个月合格率约85%，成熟店95%+。服务质量方差系数0.12（行业0.18），一致性优于同业。', reliability: 'high', children: [
        { source: '品质巡检系统', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-25', snippet: '总部品质团队48人，每店每季度至少1次暗访巡检。2025年累计巡检4200+店次，整改率98%。重点关注客房清洁度、前台响应速度、早餐品质。', reliability: 'high' },
        { source: 'OTA评分追踪', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-06', snippet: '携程/美团平均评分4.7/5.0（行业中高端均值4.5）。评分标准差0.15，跨区域一致性良好。差评集中在隔音和停车位，非服务标准化问题。', reliability: 'medium' },
      ] },
      { source: '可复制性门槛', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-14', snippet: '选址要求：核心商圈3km内，交通枢纽/商务区优先，物业面积4500-6500㎡。人才瓶颈：店长培养周期12-18个月，合格率60%，当前储备缺口15%。供应链半径：集采平台覆盖全国，物流配送48小时达。', reliability: 'high', children: [
        { source: '选址模型分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-20', snippet: '选址评分模型覆盖12个维度（商圈等级、交通便利度、竞品密度等），评分>75分方可立项。2025年通过率约45%，一线城市通过率降至30%。', reliability: 'high' },
        { source: '人才储备计划', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-01', snippet: '2025年管培生招募800人，合格率60%（432人）。店长平均培养成本8万元，年薪15-25万。储备缺口约80人，制约年开店节奏。', reliability: 'medium' },
      ] },
      { source: '规模效应/反规模效应', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-16', snippet: '正向规模效应：单位获客成本随门店密度提升下降18%（会员交叉导流），集采成本下降12%，管理费用率从9.2%降至6.8%。反规模信号：三线城市新店OCC低于均值5pct，跨区域管理复杂度上升。', reliability: 'high', children: [
        { source: '获客成本趋势', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '会员CAC从2022年的62元降至2025年的45元，降幅27%。门店密度每提升10%，区域获客成本下降约3%，会员交叉导流是核心驱动。', reliability: 'high' },
        { source: '管理半径分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '区域总经理管辖门店从平均25家增至35家，管理效率边际下降。三线城市门店巡检频次不足，品质合格率低于一二线约6pct，反规模效应初现。', reliability: 'medium' },
      ] },
    ],
  },
  {
    title: '经营阶段与KPI验证体系（服务型≥10项）',
  rating: 'buy',
  summary: '亚朵处于快速扩张期，门店数突破1300家且加速开店，10项核心KPI中7项达标、2项接近、1项需关注，扩张质量整体可控。',
  content: `经营阶段判断：快速扩张期。模式验证期已过（单店模型成熟，Payback约22个月），当前年净增门店250+家，管理半径快速扩大。会员体系A-Card超7200万注册用户，复购率42%构成需求侧护城河，支撑高速开店的入住率底线。

扩张瓶颈集中在三个方面：①店长储备不足——合格店长培养周期12-18个月，当前储备缺口约15%，制约开店节奏；②核心商圈物业饱和——一线城市优质点位竞争激烈，新签物业向二三线城市及交通枢纽下沉；③品控一致性压力——快速扩张下部分新店爬坡期OCC低于成熟店8-10pct，需6个月左右收敛。

KPI总览：10项中7项绿灯（SSSG、Payback、人均毛利、OCC、会员活跃度、管理费用率、CAC/LTV），2项黄灯（员工流失率偏高、租金占比上升），1项需关注（坏账/预收比因加盟商扩张略有抬头）。整体支持"快速扩张期"判断，扩张质量可控但需密切跟踪人才储备与品控指标。`,
  evidences: [
    { source: '当前阶段：快速扩张期', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-20', snippet: '阶段判断：快速扩张期。证据：①门店数从2023年底约900家增至2025Q3约1320家，年净增250+；②单店模型成熟，成熟店GOP利润率35%+；③会员7200万+，复购率42%支撑新店爬坡；④管理层指引2026年底目标1800家。', reliability: 'high', children: [
      { source: 'ATAT 2025Q3财报（20-F）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '截至2025Q3，亚朵在营门店1321家（直营68家+加盟1253家），较2024年底净增198家。管道储备签约未开业门店约480家，开店节奏加速。', reliability: 'high' },
      { source: '管理层业绩电话会', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-18', snippet: 'CEO王海军表示：2026年底门店目标1800家，长期目标3000家。当前开店速度受限于店长培养而非资金或物业，正加大管培生投入。', reliability: 'high' },
      { source: '华住/锦江对标', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-05', snippet: '对标华住（9500+店）和锦江（12000+店），亚朵1300家仍处早期扩张阶段，中高端定位的天花板约4000-5000家，渗透率不足30%。', reliability: 'medium' },
    ] },
    { source: '扩张瓶颈分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-15', snippet: '瓶颈3条：①店长储备缺口约15%，培养周期12-18个月，2025年管培生招募800人但合格率仅60%；②一线城市核心商圈签约难度加大，新签物业60%来自二三线城市；③新店爬坡期OCC较成熟店低8-10pct，需6个月收敛。', reliability: 'high', children: [
      { source: '亚朵人才发展报告', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-10-30', snippet: '2025年管培生计划招募800人，截至Q3实际入职720人，经6个月培训后合格率约60%（432人），缺口约80名店长岗位。店长平均培养成本约8万元。', reliability: 'high' },
      { source: '物业签约趋势', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '2025年新签物业城市分布：一线15%、新一线25%、二线35%、三线及以下25%。一线占比较2023年的30%显著下降，核心商圈饱和趋势明显。', reliability: 'medium' },
    ] },
    { source: 'KPI-SSSG（同店销售增长）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-18', snippet: '口径：开业满18个月门店的RevPAR同比增速。2025Q3 SSSG +6.2%（Q2 +5.8%，Q1 +7.1%）。阈值：≥5%绿灯/0-5%黄灯/<0%红灯。验证频率：季度。数据源：财报。与估值关联：直接影响同店收入增速预测，是DCF收入端核心假设。', reliability: 'high', children: [
      { source: '季度财报RevPAR数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '2025Q3同店RevPAR 398元（同比+6.2%），其中ADR 468元（+3.1%）、OCC 85.1%（+2.5pct）。ADR提升来自会员体系升级和场景零售联动。', reliability: 'high' },
      { source: '行业对标', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-08', snippet: '同期华住中高端品牌SSSG +3.8%，锦江中高端+2.5%。亚朵+6.2%领先同业，主因会员复购率高和场景零售增量贡献约1.5pct。', reliability: 'medium' },
      { source: '季节性分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-12', snippet: 'SSSG季节性特征：Q1（春节）最高约7%，Q2/Q3稳定5-6%，Q4（淡季）约4%。全年中枢5-6%，管理层指引2026年维持5%+。', reliability: 'medium' },
    ] },
    { source: 'KPI-Payback周期', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-16', snippet: '口径：加盟商初始投资回收期（含装修+加盟费+首年运营资金）。当前中位数22个月（2024年为24个月）。阈值：≤24月绿灯/24-30月黄灯/>30月红灯。验证频率：半年度。数据源：加盟商调研+财报。与估值关联：决定加盟商投资意愿，影响开店速度和管道储备。', reliability: 'high', children: [
      { source: '加盟商回报调研', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-20', snippet: '样本120家成熟加盟店（开业>24月）：中位数Payback 22个月，75分位26个月，90分位30个月。一线城市因租金高Payback约26个月，二三线约20个月。', reliability: 'high' },
      { source: '单店投资模型', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-10-15', snippet: '标准亚朵酒店（120间客房）：总投资约1500-1800万元，年GOP约350-420万元，GOP利润率35-38%。投资回收期18-26个月，取决于城市能级和物业条件。', reliability: 'high' },
    ] },
    { source: 'KPI-人均毛利', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-14', snippet: '口径：单店GOP/员工人数。2025Q3人均毛利4.8万元/季（同比+12%）。阈值：≥4万/季绿灯/3-4万黄灯/<3万红灯。验证频率：季度。数据源：财报+运营数据。与估值关联：反映人效水平，直接影响利润率假设和扩张边际成本。', reliability: 'high', children: [
      { source: '人效提升分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '人均毛利提升驱动：①智能化前台/自助入住降低人力需求15%；②场景零售（亚朵生活馆）贡献增量毛利约8%；③客房清洁外包比例提升至40%，降低固定人力成本。', reliability: 'high' },
      { source: '同业人效对比', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-05', snippet: '亚朵人均毛利4.8万/季，华住中高端约4.2万，锦江中高端约3.5万。亚朵领先主因：①客单价高（ADR 468 vs 行业380）；②场景零售增量；③智能化投入早。', reliability: 'medium' },
    ] },
    { source: 'KPI-入住率OCC', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-12', snippet: '口径：已售客房数/可售客房数。2025Q3整体OCC 85.1%（成熟店88.5%，新店76.2%）。阈值：≥82%绿灯/75-82%黄灯/<75%红灯。验证频率：月度。数据源：PMS系统+财报。与估值关联：OCC是RevPAR核心驱动，1pct OCC变动对应约0.8%收入变动。', reliability: 'high', children: [
      { source: '月度OCC趋势', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '2025年月度OCC：1月82%、2月88%（春节）、3月84%、4月83%、5月85%、6月86%、7月89%（暑期）、8月88%、9月85%。全年中枢85%，较2024年+2.3pct。', reliability: 'high' },
      { source: '新店爬坡曲线', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '新店OCC爬坡：开业月55%→3个月68%→6个月78%→12个月83%→18个月86%。爬坡期约12-18个月收敛至成熟店水平，较2023年缩短约2个月。', reliability: 'medium' },
      { source: '渠道结构', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-03', snippet: '客源结构：A-Card会员直订52%、OTA 30%、协议客户12%、Walk-in 6%。会员直订占比同比+5pct，降低OTA佣金成本约1.2pct。', reliability: 'medium' },
    ] },
    { source: 'KPI-会员活跃度', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '口径：12个月内有消费行为的会员占比。A-Card注册会员7200万，12个月活跃率18.5%（约1330万人），核心会员（年消费≥3次）占比6.2%（约450万人）。阈值：活跃率≥15%绿灯/10-15%黄灯/<10%红灯。验证频率：季度。数据源：CRM系统。与估值关联：活跃会员是OCC底线保障和SSSG的核心驱动。', reliability: 'high', children: [
      { source: '会员分层数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: 'A-Card会员分层：普通会员82%、银卡10%、金卡5.5%、铂金卡2%、黑金卡0.5%。黑金+铂金会员贡献间夜量28%，ARPU是普通会员的3.2倍。', reliability: 'high' },
      { source: '复购率与LTV', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-06', snippet: '会员年均复购率42%（同比+3pct），核心会员复购率78%。会员LTV约4800元/年（含客房+零售），非会员约1200元/年，LTV差距4倍。', reliability: 'medium' },
    ] },
    { source: 'KPI-管理费用率', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-08', snippet: '口径：总部管理费用（含IT、总部人力、行政）/总营收。2025Q3管理费用率8.2%（Q2 8.5%，2024全年9.1%）。阈值：≤10%绿灯/10-13%黄灯/>13%红灯。验证频率：季度。数据源：财报。与估值关联：反映规模效应释放程度，每降1pct直接提升净利率1pct。', reliability: 'high', children: [
      { source: '费用结构拆解', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '管理费用构成：总部人力45%、IT系统25%、行政办公15%、其他15%。IT投入占比提升（2023年20%→2025年25%），但总费用率下降，规模杠杆效应显著。', reliability: 'high' },
      { source: '规模效应测算', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-02', snippet: '管理费用率从2022年的11.5%降至2025Q3的8.2%，门店数从600增至1320。每新增100家店，管理费用率下降约0.5pct，预计1800家时降至7%左右。', reliability: 'medium' },
    ] },
    { source: 'KPI-获客成本比（CAC/LTV）', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-06', snippet: '口径：单个新会员获取成本/会员生命周期价值。CAC约45元/人（含线上投放+门店转化），LTV约4800元/年×平均留存3.2年=15360元。CAC/LTV=0.3%。阈值：≤2%绿灯/2-5%黄灯/>5%红灯。验证频率：半年度。数据源：营销系统+CRM。与估值关联：衡量获客效率，过高意味增长不可持续。', reliability: 'high', children: [
      { source: '获客渠道分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '新会员获取渠道：门店自然转化55%（CAC≈15元）、线上投放25%（CAC≈85元）、异业合作15%（CAC≈40元）、老带新5%（CAC≈20元）。加权CAC约45元。', reliability: 'high' },
      { source: 'LTV验证', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-01', snippet: '2022年入会会员3年留存追踪：年均消费4800元，3年累计留存率62%，LTV约8900元（折现后）。CAC/LTV=0.5%，获客效率极高，主因门店自然转化占比大。', reliability: 'medium' },
      { source: '场景零售对LTV贡献', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-28', snippet: '亚朵生活馆（枕头、床垫等）对会员LTV贡献约12%，核心会员零售渗透率35%，客单价280元/次。零售业务毛利率55%，显著高于客房业务。', reliability: 'medium' },
    ] },
    { source: 'KPI-员工流失率', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-04', snippet: '口径：年度离职员工数/平均在职人数。2025年整体员工流失率38%（行业均值45%），其中店长级流失率12%（行业20%），基层服务员流失率52%。阈值：整体≤35%绿灯/35-45%黄灯/>45%红灯。验证频率：季度。数据源：HR系统。与估值关联：高流失推高培训成本并影响服务品质，间接影响OCC和复购率。', reliability: 'medium', children: [
      { source: 'HR系统数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-10-30', snippet: '2025年前三季度离职率：店长12%（去年15%，改善）、主管25%、基层52%。基层流失集中在入职前6个月（占离职总量65%），主因薪资竞争力不足。', reliability: 'high' },
      { source: '薪酬竞争力分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-25', snippet: '亚朵基层员工月薪4500-5500元（含食宿），较华住高约8%，但较本地餐饮/零售业低约10%。店长年薪15-25万（含绩效），行业中上水平。', reliability: 'medium' },
    ] },
    { source: 'KPI-租金/人工占比', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-02', snippet: '口径：（租金+人工成本）/单店营收。2025Q3租金占比28.5%（同比+1.2pct），人工占比22.3%（同比-0.8pct），合计50.8%。阈值：合计≤52%绿灯/52-58%黄灯/>58%红灯。验证频率：季度。数据源：财报。与估值关联：两项合计是GOP利润率的决定性因素，直接影响单店盈利模型和估值。', reliability: 'high', children: [
      { source: '租金趋势分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '租金占比上升主因：①一线城市存量店续租涨幅5-8%；②新签物业向核心地段倾斜。对冲措施：二三线城市新店租金占比仅22-25%，拉低整体均值。', reliability: 'high' },
      { source: '人工成本优化', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-20', snippet: '人工占比下降驱动：①自助入住机覆盖率85%（2023年50%），减少前台人力30%；②客房清洁外包比例40%（2023年25%），将固定成本转为变动成本；③智能排班系统上线，人效提升约12%。', reliability: 'medium' },
      { source: '城市能级差异', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-01', snippet: '租金+人工占比分城市：一线56%、新一线50%、二线47%、三线44%。随门店向低线城市下沉，整体占比有望从50.8%降至48-49%。', reliability: 'medium' },
    ] },
    { source: 'KPI-坏账/预收比', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-30', snippet: '口径：加盟商应收账款坏账率/预收加盟费余额比。坏账率1.8%（2024年1.2%），预收加盟费余额3.2亿元。阈值：坏账率≤1.5%绿灯/1.5-3%黄灯/>3%红灯。验证频率：半年度。数据源：财报。与估值关联：反映加盟体系健康度，坏账上升可能预示加盟商盈利恶化和退出风险。', reliability: 'high', children: [
      { source: '应收账款分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '加盟商应收账款余额1.85亿元，账龄结构：90天内82%、90-180天12%、180天以上6%。坏账率从1.2%升至1.8%，主因部分三线城市新加盟商经营不及预期。', reliability: 'high' },
      { source: '加盟商健康度监测', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-25', snippet: '加盟商分级：A级（盈利良好）65%、B级（盈亏平衡）25%、C级（亏损）10%。C级集中在三线城市2023年下半年开业的新店，预计6个月内多数可改善至B级。', reliability: 'medium' },
      { source: '预收款保障', url: 'https://xueqiu.com/S/ATAT', date: '2025-11-20', snippet: '预收加盟费余额3.2亿元（对应约480家签约未开业门店），平均每家预收约67万元。预收款覆盖应收坏账的17倍，整体风险可控。', reliability: 'medium' },
    ] },
  ],
  },
  {
    title: '运营效率与周转（核心杠杆）',
    rating: 'strongBuy',
    summary: '亚朵RevPAR行业领先，轻资产模式下管理杠杆持续释放，运营效率处于中高端酒店第一梯队。',
    content: `亚朵2025Q3 RevPAR达398元，入住率OCC 85.1%，在中高端连锁酒店中处于领先水平。得益于A-Card会员体系的高粘性（超7200万会员），淡旺季入住率波动控制在12pct以内，远优于同业平均。

人效方面，单店平均35人，人均毛利4.8万元/季（同比+12%），人均年产值约42万元。场景零售贡献增量坪效，单位面积收入较纯住宿模型提升约18%。

管理费用率从2022年的11.5%降至2025Q3的8.2%，总部费用被快速扩张的门店网络有效稀释。每新增100家店管理费用率下降约0.5pct，规模杠杆效应显著。

供应链端，集中采购平台覆盖85%+品类，库存周转天数22天。预收款占营收比约14%，经营性现金流持续为正，现金转化率112%。`,
    evidences: [
      { source: '资产周转率/入住率OCC', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-15', snippet: '2025Q3 RevPAR 398元（同比+6.2%），ADR 468元（+3.1%），OCC 85.1%（+2.5pct）。成熟店RevPAR 420元，爬坡期店约340元。淡旺季OCC波动：Q1 82%→Q2 85%→Q3暑期89%→Q4约82%。', reliability: 'high', children: [
        { source: 'Q3财报数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '成熟门店（开业>18月）RevPAR 420元，爬坡期门店约340元，成熟店占比约72%。', reliability: 'high' },
        { source: '行业对比', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-10', snippet: '同期华住中高端RevPAR约338元，锦江中高端约296元。亚朵领先18-34%，主因品牌溢价和会员直销占比超70%。', reliability: 'medium' },
        { source: '会员运营数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: 'A-Card会员7200万+，会员贡献间夜占比75%，直销渠道占比超70%，降低OTA佣金成本约3.5pct。', reliability: 'high' },
      ] },
      { source: '人效/坪效', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-12', snippet: '单店平均35人，人均毛利4.8万元/季（同比+12%），人均年产值约42万元。单位面积年收入约4850元/㎡，场景零售贡献约18%增量坪效。', reliability: 'high', children: [
        { source: '人效提升驱动', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '三大驱动：①智能前台/自助入住降低人力需求15%；②场景零售贡献增量毛利约8%；③客房清洁外包比例提升至40%。', reliability: 'high' },
        { source: '同业人效对比', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-05', snippet: '亚朵人均毛利4.8万/季，华住中高端约4.2万，锦江约3.5万。亚朵领先主因客单价高（ADR 468 vs 行业380）和场景零售增量。', reliability: 'medium' },
      ] },
      { source: '管理费用率趋势', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-08', snippet: '管理费用率：2022年11.5%→2023年10.2%→2024年9.1%→2025Q3 8.2%。总部约1850人，人员增速远低于门店扩张速度。管理层指引2026年目标6.0-6.3%。', reliability: 'high', children: [
        { source: '费用稀释测算', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-02', snippet: '门店从600家增至1320家，单店分摊管理费用从18.6万降至11.2万。每新增100家店费用率降约0.5pct，预计1800家时降至7%左右。', reliability: 'medium' },
        { source: '数字化系统投入', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '自研PMS覆盖100%门店，IT年投入约8500万（占营收2.1%），支撑门店快速扩张而无需线性增加管理人员。', reliability: 'high' },
      ] },
      { source: '存货/账期管理', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-06', snippet: '库存周转天数22天（同比缩短3天）。预收款占营收比约14%，经营性净现金流约9.6亿元，现金转化率112%。应收账款周转天数约8天，坏账率<0.3%。', reliability: 'high', children: [
        { source: '供应链集采效率', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-02', snippet: '集中采购平台覆盖布草、洗护、家居等核心品类，集采比例超85%，应付账期约45天，对上游议价能力较强。', reliability: 'medium' },
        { source: '现金流质量', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '经营性现金流9.6亿，净利润8.6亿，现金转化率112%。加盟商保证金6.2亿+会员储值3.8亿，合计约10亿无息资金沉淀。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '客户忠诚与生命周期价值（LTV）',
    rating: 'strongBuy',
    summary: 'A-Card会员体系构成强复购护城河，会员LTV是非会员4倍，获客效率极高（CAC/LTV=0.3%），场景零售交叉销售进一步放大客户价值。',
    content: `会员复购率42%（同比+3pct），核心会员复购率78%，A-Card注册会员7200万，12个月活跃率18.5%。会员消费占比75%，构成OCC底线保障。流失率方面，整体年流失率约22%，核心会员仅8%，会员粘性行业领先。

获客成本极低：加权CAC约45元/人，其中门店自然转化占55%（CAC仅15元），会员LTV约4800元/年×留存3.2年=15360元，CAC/LTV=0.3%。自有流量占比70%+，OTA依赖度持续下降。

品牌溢价力突出：ADR 468元，较同档竞品高15-25%，提价能力来自差异化体验（IP主题店、深睡系列）和会员忠诚度。同店增长SSSG +6.2%，领先华住+3.8%和锦江+2.5%。

服务延展性良好：亚朵生活馆零售GMV约12.4亿，核心会员零售渗透率35%，客单价280元/次，零售毛利率55%。交叉销售对会员LTV贡献约12%，是利润增量的重要来源。`,
    evidences: [
      { source: '复购率/会员贡献', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-18', snippet: 'A-Card注册会员7200万，12个月活跃率18.5%（约1330万人）。会员复购率42%（同比+3pct），核心会员复购率78%。会员贡献间夜量75%，年流失率22%，核心会员流失率仅8%。', reliability: 'high', children: [
        { source: '会员分层数据', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '会员分层：普通82%、银卡10%、金卡5.5%、铂金2%、黑金0.5%。黑金+铂金贡献间夜量28%，ARPU是普通会员的3.2倍。', reliability: 'high' },
        { source: '复购趋势追踪', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '复购率连续6个季度提升，从2024Q1的36%升至2025Q3的42%。驱动因素：会员权益升级、积分体系优化、场景零售联动。', reliability: 'medium' },
      ] },
      { source: '获客成本（CAC）对比', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-14', snippet: '加权CAC约45元/人。渠道拆分：门店自然转化55%（CAC≈15元）、线上投放25%（CAC≈85元）、异业合作15%（CAC≈40元）、老带新5%（CAC≈20元）。自有流量占比70%+，OTA佣金率从2023年的12%降至9.5%。', reliability: 'high', children: [
        { source: '渠道成本分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '会员直订占比52%（同比+5pct），OTA占比30%（同比-3pct），协议客户12%，Walk-in 6%。直订占比提升降低OTA佣金成本约1.2pct。', reliability: 'high' },
        { source: 'CAC趋势', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '会员CAC从2022年的62元降至2025年的45元，降幅27%。门店密度每提升10%，区域获客成本下降约3%。', reliability: 'medium' },
      ] },
      { source: '品牌溢价力', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-12', snippet: 'ADR 468元，较华住中高端高约23%，较锦江高约38%。2025年ADR同比+3.1%，连续8个季度正增长。IP主题店（音乐、篮球、知乎等）ADR溢价约15-20%，占新开店比例提升至25%。', reliability: 'high', children: [
        { source: '定价能力验证', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '2025年两次提价（3月+2%、9月+1.5%），会员接受度良好，提价后OCC未出现显著下降（波动<1pct），验证品牌定价权。', reliability: 'high' },
        { source: '竞品价格对比', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-06', snippet: '同商圈对比：亚朵ADR 468 vs 全季320 vs 维也纳350 vs 桔子水晶380。亚朵溢价23-46%，但OCC差距仅2-5pct，说明溢价被市场认可。', reliability: 'medium' },
      ] },
      { source: '同店增长（SSSG）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-16', snippet: '2025Q3 SSSG +6.2%（Q2 +5.8%，Q1 +7.1%），连续6个季度>5%。驱动拆分：ADR提升贡献+3.1pct，OCC提升贡献+2.5pct，场景零售增量贡献+0.6pct。管理层指引2026年维持5%+。', reliability: 'high', children: [
        { source: '行业SSSG对标', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-08', snippet: '同期华住中高端SSSG +3.8%，锦江+2.5%，首旅+2.0%。亚朵+6.2%领先同业，主因会员复购率高和场景零售增量。', reliability: 'medium' },
        { source: '季节性分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-12', snippet: 'SSSG季节性：Q1（春节）最高约7%，Q2/Q3稳定5-6%，Q4（淡季）约4%。全年中枢5-6%。', reliability: 'medium' },
      ] },
      { source: '客户集中度与画像', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '核心客群：25-45岁商旅人群占68%，休闲旅游占32%。地域分布：华东35%、华南20%、华北18%、其他27%，分布较均衡。Top10城市贡献45%间夜量，集中度适中。', reliability: 'high', children: [
        { source: '客群画像分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '会员画像：男性55%、女性45%，平均年龄33岁，本科及以上学历78%，年收入15-50万占比62%。商旅出行频次年均8.2次。', reliability: 'high' },
        { source: '区域分布趋势', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-05', snippet: '华东占比从2023年的40%降至35%，中西部从18%升至22%，区域分布趋于均衡。二三线城市间夜量增速（+25%）快于一线（+12%）。', reliability: 'medium' },
      ] },
      { source: '服务延展性（交叉销售）', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-14', snippet: '亚朵生活馆2025年零售GMV约12.4亿（同比+32%）。核心会员零售渗透率35%，客单价280元/次，零售毛利率55%。对会员LTV贡献约12%。深睡枕Pro单品年销超3亿。', reliability: 'high', children: [
        { source: '零售业务拆解', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '零售品类：深睡系列（枕头/床垫/被子）占55%、洗护占20%、生活用品占15%、其他10%。酒店场景转化率6.8%，线上复购率28%。', reliability: 'high' },
        { source: 'LTV增量测算', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '会员LTV 4800元/年（含客房+零售），非会员约1200元/年，差距4倍。零售对LTV贡献从2023年的8%提升至12%，预计2026年达15%。', reliability: 'medium' },
        { source: '深睡IP价值', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-03', snippet: '深睡枕Pro年销3.2亿，复购率32%，NPS 75分。已成为亚朵品牌符号，带动酒店预订转化率提升约5%。', reliability: 'medium' },
      ] },
    ],
  },
  {
    title: '竞争格局与运营水平',
    rating: 'buy',
    summary: '亚朵在中高端酒店赛道差异化定位清晰，品牌心智和会员体系构成核心壁垒，但华住规模优势和数字化能力仍是主要追赶目标。',
    content: `行业准入门槛中高：中高端连锁酒店需要品牌积累（5年+）、管理体系（SOP+数字化）、供应链网络和资金实力。规模壁垒显著——华住9500+店、锦江12000+店的网络效应难以短期复制。亚朵1300家处于早期阶段，但品牌差异化构成独特壁垒。

胜负手三条：①高粘性会员体系（7200万A-Card会员，复购率42%，行业最高）；②场景零售差异化（零售GMV 12.4亿，竞品无可比业务）；③极致的服务体验标准化（NPS 72分，行业均值58分）。

竞争定位：中高端差异化。亚朵不走华住的大众规模化路线，也非万豪/希尔顿的高端国际化路线，而是聚焦"人文体验+场景零售"的差异化中高端定位，目标客群为25-45岁新中产商旅人群。

竞争对标：单体毛利率亚朵35%略低于华住中高端38%（差距来自规模采购），但品牌心智和零售创新领先。数字化系统华住领先（覆盖率95% vs 亚朵85%），供应链响应亚朵48小时达与华住24小时达有差距，可通过区域仓加密追赶。`,
    evidences: [
      { source: '行业准入门槛', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-18', snippet: '中高端连锁酒店准入门槛：品牌积累5年+、管理体系（SOP+数字化系统）、全国供应链网络、单店投资1500万+。规模壁垒显著：华住9500+店、锦江12000+店的网络效应和会员池难以短期复制。新进入者3年内难以突破200家。', reliability: 'high', children: [
        { source: '行业研究报告', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-12', snippet: '中国中高端连锁酒店CR5约35%（华住15%、锦江10%、首旅5%、亚朵3%、其他2%），集中度仍在提升。单体酒店占比从2020年的75%降至2025年的62%，连锁化率加速。', reliability: 'high' },
        { source: '新进入者分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '近3年新进入中高端赛道的品牌（如朗丽兹、凯里亚德等）门店数均未超过150家，验证了品牌+管理+供应链的综合壁垒。', reliability: 'medium' },
      ] },
      { source: '胜负手分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-16', snippet: '亚朵三大胜负手：①会员体系——7200万A-Card会员，复购率42%（行业最高），会员贡献间夜75%；②场景零售——GMV 12.4亿，竞品无可比业务，毛利率55%；③服务体验——NPS 72分（行业58分），OTA评分4.7/5.0。', reliability: 'high', children: [
        { source: '会员体系竞争力', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: '会员复购率对比：亚朵42% vs 华住35% vs 锦江28%。亚朵会员ARPU 4800元/年，华住约3200元，差距50%。会员体系是最核心的竞争壁垒。', reliability: 'high' },
        { source: '场景零售独特性', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '亚朵生活馆模式在酒店行业独一无二，深睡枕Pro年销3.2亿。华住、锦江均无类似零售业务，短期难以复制（需要产品研发+供应链+品牌IP积累）。', reliability: 'high' },
      ] },
      { source: '竞争定位', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-14', snippet: '定位：中高端差异化。区别于华住（大众规模化，全季/汉庭为主力）和万豪/希尔顿（高端国际化）。亚朵聚焦"人文体验+场景零售"，目标客群25-45岁新中产商旅人群，ADR 468元处于中高端价格带上沿。', reliability: 'high', children: [
        { source: '定位策略分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-11-15', snippet: 'CEO王海军定义亚朵为"生活方式品牌"而非传统酒店。IP主题店（音乐、篮球、知乎等）占新开店25%，ADR溢价15-20%，强化差异化定位。', reliability: 'high' },
        { source: '价格带分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-06', snippet: 'ADR分布：经济型100-200元、中端200-350元、中高端350-550元、高端550+元。亚朵ADR 468元处于中高端上沿，与高端入门（如美居、诺富特）形成竞争。', reliability: 'medium' },
      ] },
      { source: '竞争对标表', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-20', snippet: '五维对标：①单体毛利率：亚朵35% vs 华住中高端38%，差距来自规模采购，可追赶性高（验证：集采成本年降3-5%）；②运营人效：亚朵4.8万/季 vs 华住4.2万，亚朵领先（验证：人均毛利季度跟踪）；③品牌心智：亚朵NPS 72 vs 华住65，亚朵领先（验证：NPS半年度调研）；④数字化系统：亚朵85% vs 华住95%，华住领先（验证：系统覆盖率年度评估）；⑤供应链响应：亚朵48h vs 华住24h，华住领先（验证：配送时效月度监测）。', reliability: 'high', children: [
        { source: '毛利率差距分析', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-15', snippet: '亚朵GOP 35% vs 华住中高端38%，3pct差距主要来自：采购成本（华住集采规模是亚朵7倍，成本低约5%）和能耗管理（华住智能能耗系统更成熟）。随亚朵规模扩大，差距预计2年内收窄至1-2pct。', reliability: 'high' },
        { source: '数字化差距评估', url: 'https://xueqiu.com/S/HTHT', date: '2025-12-10', snippet: '华住数字化覆盖率95%（含智能收益管理、AI客服、IoT客房），亚朵85%。差距集中在IoT客房（华住覆盖60%，亚朵20%）和AI动态定价精度。亚朵计划2026年投入1.2亿追赶。', reliability: 'medium' },
        { source: '供应链对标', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-08', snippet: '华住全国12个区域仓，配送24h达；亚朵6个区域仓，配送48h达。差距来自仓网密度，亚朵计划2026年增至9个仓，目标36h达。', reliability: 'medium' },
      ] },
    ],
  },
]

// 创新研究固定要素数据（NVIDIA NVDA）
const innovationElements: Omit<ResearchElement, 'promptVersion' | 'model' | 'analyzedAt'>[] = [
  {
    title: '新品竞争力（产品力×落地难度）',
    rating: 'strongBuy',
    summary: 'Blackwell B200/GB200性能较H100提升5倍、能效比提升25倍，对标AMD MI300X训练吞吐量领先40%。CUDA生态锁定切换成本极高（迁移成本占项目30-50%），但CoWoS封装产能缺口25%和对华出口管制是落地核心瓶颈。',
    content: `性能/成本/ROI对标：Blackwell B200 FP8算力20 PFLOPS（H100为4 PFLOPS），单位算力成本下降约75%。GB200 NVL72机柜1.4 EFLOPS，客户TCO较H100方案节省约60%。对标AMD MI300X，MLPerf v4.1基准中B200训练吞吐量领先40%，推理延迟低32%；对标Intel Gaudi 3，性能领先约3倍但后者价格仅为1/3，生态不成熟（市场份额<3%）。ROI口径：客户部署B200后大模型训练周期缩短60-70%，推理成本降低80%，典型ROI 3-6个月回本。

替代路径：NVIDIA GPU是当前AI训练的事实标准，替代顺序为AMD MI系列→Google TPU→华为昇腾→Intel Gaudi。AMD为最接近替代者，但ROCm生态仅覆盖CUDA的40%，迁移需重写30-50%底层代码，周期6-12个月。Google TPU仅限自用+GCP客户，非通用替代。华为昇腾910B在中国市场份额约25%，但训练效率仅为A100的60-70%。

POC→签约转化率：Blackwell产品无需传统POC流程——Hyperscaler客户（占收入45%）直接大额采购，企业客户通过DGX Cloud试用后转化率约65%（行业AI硬件平均约40%）。FY2026 Fortune 500客户覆盖从200家扩至380家，新客获取加速。

上线周期：从下单到部署，风冷方案约8-12周，液冷方案（GB200 NVL72）约16-20周（含机房改造）。从芯片发布到规模化收入贡献约18个月（Blackwell 2024Q1发布→2025Q3贡献60%数据中心收入），较上代Hopper的24个月缩短25%。

部署门槛：GB200 NVL72机柜功耗约120kW，需液冷散热基础设施改造（增加约15%部署成本）。CoWoS先进封装月产能约6万片，需求约8万片，缺口25%（台积电计划2026H1扩至8.5万片）。美国对华出口管制限制中国市场（收入占比从22%降至8%，年化损失80-100亿美元）。合规要求：部分主权AI项目需美国政府审批。

切换成本：评估"极高"。CUDA开发者超400万，累计下载超5000万次，PyTorch/TensorFlow/JAX均深度优化CUDA。客户迁移至AMD ROCm需重写30-50%底层代码，迁移周期6-12个月，总成本约项目投入的35%。某头部云厂商评估后放弃迁移。CUDA生态绑定是NVIDIA最核心的护城河。`,
    evidences: [
      { source: '性能/成本/ROI对标', url: 'https://investor.nvidia.com', date: '2025-12-15', snippet: 'B200 FP8算力20 PFLOPS（H100为4 PFLOPS），能效比提升25倍（推理）。GB200 NVL72单机柜1.4 EFLOPS。MLPerf v4.1：B200训练较H100快4.2倍，较MI300X快1.4倍；推理延迟较MI300X低32%。客户TCO较H100节省约60%。', reliability: 'high', children: [
        { source: 'NVIDIA GTC 2025技术白皮书', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: 'Blackwell架构采用台积电4NP工艺，双芯片封装2080亿晶体管。第五代NVLink带宽1.8TB/s，较H100提升2倍。支持FP4精度，推理性能再翻倍。', reliability: 'high' },
        { source: 'MLPerf Benchmark v4.1', url: 'https://mlcommons.org', date: '2025-12-10', snippet: 'B200在GPT-3 175B训练基准中较H100快4.2倍，较AMD MI300X快1.4倍。推理基准（Llama-2 70B）中B200延迟较MI300X低32%。', reliability: 'high' },
        { source: '竞品定价对比', url: 'https://xueqiu.com/S/AMD', date: '2025-12-06', snippet: 'B200单卡约3-4万美元（较H100提升30%但性能提升5倍）。AMD MI300X约1.5万美元（性能差距40%）。Intel Gaudi 3定价更低但生态不成熟，份额<3%。', reliability: 'high' },
      ] },
      { source: '替代路径与迁移成本', url: 'https://investor.nvidia.com', date: '2025-12-14', snippet: 'CUDA开发者超400万，累计下载超5000万次。PyTorch/TensorFlow/JAX均深度优化CUDA。客户迁移至ROCm需重写30-50%底层代码，迁移周期6-12个月。AMD ROCm生态覆盖约CUDA的40%。替代顺序：AMD MI→Google TPU→华为昇腾→Intel Gaudi。', reliability: 'high', children: [
        { source: 'NVIDIA开发者大会数据', url: 'https://developer.nvidia.com', date: '2025-11-15', snippet: 'CUDA 12.x支持超800个加速库，覆盖AI训练/推理、HPC、图形渲染、自动驾驶等全场景。年新增开发者约60万。', reliability: 'high' },
        { source: '客户迁移成本调研', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-08', snippet: '某头部云厂商评估从CUDA迁移至ROCm：核心训练框架适配约3个月，自定义算子重写约6个月，总成本约项目投入的35%。最终放弃迁移。', reliability: 'medium' },
        { source: '华为昇腾替代评估', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-05', snippet: '华为昇腾910B在国内大模型训练中份额约25%，但CUDA→CANN迁移成本高，客户反馈训练效率仅为A100的60-70%，生态成熟度差距约3-5年。', reliability: 'medium' },
      ] },
      { source: 'POC转化与客户获取', url: 'https://investor.nvidia.com', date: '2025-12-20', snippet: 'FY2026Q3数据中心收入355亿美元（同比+93%）。Blackwell贡献约60%。Hyperscaler直接大额采购无需POC，企业客户通过DGX Cloud试用转化率约65%。Fortune 500覆盖从200家扩至380家。RPO约280亿美元。', reliability: 'high', children: [
        { source: 'NVDA FY2026Q3财报', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: '总营收410亿美元（同比+78%），数据中心355亿（+93%），游戏38亿（+15%），汽车16亿（+55%）。毛利率74.5%，Non-GAAP EPS $0.82。', reliability: 'high' },
        { source: '大客户CapEx追踪', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-15', snippet: 'Hyperscaler 2025年AI CapEx合计约2800亿美元（同比+45%）。Microsoft约800亿、Google约600亿、Meta约500亿、Amazon约500亿，NVIDIA GPU占AI CapEx约65-70%。', reliability: 'high' },
      ] },
      { source: '上线周期与部署门槛', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-18', snippet: '风冷方案交付8-12周，液冷方案（GB200 NVL72）16-20周（含机房改造）。CoWoS月产能约6万片，需求约8万片，缺口25%。台积电计划2026H1扩至8.5万片/月。GB200机柜功耗120kW，需液冷改造增加约15%部署成本。', reliability: 'high', children: [
        { source: '台积电法说会', url: 'https://investor.tsmc.com', date: '2025-12-12', snippet: 'CoWoS产能2025年底约6万片/月，2026Q2目标8.5万片。NVIDIA占CoWoS产能约55%，其余为AMD、Google TPU等。', reliability: 'high' },
        { source: '供应链调研', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-08', snippet: '液冷方案（Vertiv、Cooltera）交付周期16-20周，较传统风冷长约8周。GB200 NVL72机柜功耗约120kW，需配套液冷改造。', reliability: 'medium' },
      ] },
      { source: '出口管制与地缘风险', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-16', snippet: '美国对华AI芯片出口管制持续收紧，H20（中国特供版）性能受限。中国市场收入占比从2023年的22%降至2025年的约8%，年化损失约80-100亿美元。2025年10月BIS新规进一步限制算力密度阈值。', reliability: 'high', children: [
        { source: 'BIS出口管制更新', url: 'https://www.commerce.gov', date: '2025-12-10', snippet: '2025年10月新规进一步限制算力密度阈值，H20面临合规风险。NVIDIA已准备H20替代方案但性能进一步缩水。', reliability: 'high' },
        { source: '主权AI审批风险', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-01', snippet: '主权AI项目受地缘政治影响较大，中东项目需美国政府审批。目前已获批项目执行顺利，但潜在管制风险需持续关注。', reliability: 'medium' },
      ] },
      { source: '定价权与ASP趋势', url: 'https://investor.nvidia.com', date: '2025-12-12', snippet: 'GB200 NVL72机柜ASP约300万美元。数据中心GPU ASP同比+35%，毛利率维持74-76%。客户接受度高——AI训练TCO中GPU仅占35-40%，性能提升带来的效率收益远超价格增量。', reliability: 'high', children: [
        { source: '定价策略分析', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-10', snippet: 'B200单卡定价约3-4万美元，较H100的2.5-3万美元提升约30%，但性能提升5倍，性价比大幅改善。客户TCO分析显示B200较H100节省约60%总训练成本。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '研发效率（投入→产出→商业化）',
    rating: 'strongBuy',
    summary: 'NVIDIA年研发超120亿美元（行业第一），费用率从14.2%降至12.5%体现收入杠杆。架构2年一代严格执行，每代性能提升4-5倍。从流片到主力收入贡献仅18个月，较上代缩短25%。每1美元研发产出约12美元营收，ROI行业最高。',
    content: `研发费用率：FY2026前三季度研发费用约92亿美元（同比+28%），全年预计超120亿美元。费用率约12.5%，较FY2024的14.2%下降1.7pct——收入增速（+78%）远快于研发增速（+28%），费用杠杆效应显著。管理层指引研发费用率稳定在12-13%。与毛利关系：研发投入集中在下一代架构（Rubin约35%）和软件栈（约20%），每代新架构量产后毛利率提升2-3pct（Blackwell量产后毛利率从72%升至74.5%），研发投入与毛利改善呈正相关。对比AMD研发60亿（费用率25%）、Intel 160亿（含制造，费用率28%），NVIDIA研发ROI最高（每1美元研发产出约12美元营收，AMD约4美元，Intel约1美元）。

研发人均产出：研发团队约32000人（占总员工76000人的42%），人均年营收贡献约50万美元（FY2024约35万，同比+43%）。核心架构师团队稳定性极高，关键岗位流失率<3%（行业约8-10%）。研发人员平均薪酬约35万美元/年（含股票激励），较AMD高约20%，较Intel高约30%，Glassdoor评分4.5/5。专利累计超25000件，年新增约3000件（2025年3200件），覆盖GPU微架构35%、AI加速25%、互联技术20%、软件栈15%、汽车5%。

研发到商业化周期：Blackwell时间线——2024Q1发布→2024Q3流片→2025Q1量产→2025Q3贡献60%数据中心收入，从发布到主力收入贡献约18个月，较Hopper的24个月缩短25%。出货爬坡：2025Q1约5万颗→Q2约15万颗→Q3约30万颗→Q4预计45万颗，爬坡速度较Hopper快约40%。架构迭代节奏严格：Ampere(2020)→Hopper(2022)→Blackwell(2024)→Rubin(2026E)，2年一代从未延迟，每代性能提升4-5倍、能效比提升3-5倍，保持对AMD约1-1.5代领先。

研发投入与毛利改善相关性：历史验证——Ampere时代（FY2022-2023）研发费用率15-16%，毛利率62-65%；Hopper时代（FY2024-2025）费用率14-15%，毛利率70-73%；Blackwell时代（FY2026）费用率12-13%，毛利率74-76%。每代架构商业化后，研发费用率下降约2pct的同时毛利率提升约5pct，核心驱动是新架构的定价权提升和软件栈的增量毛利贡献（软件毛利率约90%）。CUDA软件栈年更新2个大版本+12个小版本，确保硬件性能被充分释放。`,
    evidences: [
      { source: '研发费用率与毛利关系', url: 'https://investor.nvidia.com', date: '2025-11-30', snippet: 'FY2026前三季度研发费用92亿美元（同比+28%），费用率12.5%（FY2024为14.2%）。收入增速+78%远快于研发增速+28%，费用杠杆显著。Blackwell量产后毛利率从72%升至74.5%，研发投入与毛利改善正相关。', reliability: 'high', children: [
        { source: 'NVDA FY2026Q3财报', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: 'Q3研发费用32亿美元（同比+25%），占营收7.8%。研发投向：下一代Rubin架构约35%、Blackwell优化约25%、软件栈约20%、汽车/机器人约15%、其他5%。', reliability: 'high' },
        { source: '行业研发ROI对比', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-10', snippet: 'NVIDIA年研发120亿，每1美元研发产出约12美元营收。AMD年研发60亿，每1美元产出约4美元。Intel年研发160亿（含制造），每1美元产出约1美元。NVIDIA研发ROI行业最高。', reliability: 'high' },
      ] },
      { source: '研发人均产出与专利', url: 'https://investor.nvidia.com', date: '2025-12-08', snippet: '研发团队约32000人，人均年营收贡献约50万美元（FY2024约35万，+43%）。核心架构师流失率<3%。累计专利超25000件，年新增约3000件，覆盖GPU微架构、NVLink互联、CUDA编译器、TensorRT推理优化等。', reliability: 'high', children: [
        { source: '人才竞争力分析', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-05', snippet: 'NVIDIA研发人员平均薪酬约35万美元/年（含股票激励），较AMD高约20%，较Intel高约30%。Glassdoor评分4.5/5，员工满意度行业最高。', reliability: 'medium' },
        { source: '专利布局分析', url: 'https://investor.nvidia.com', date: '2025-12-01', snippet: '2025年新增专利3200件，其中GPU架构35%、AI加速25%、互联技术20%、软件栈15%、汽车5%。关键专利被引用次数行业第一。', reliability: 'high' },
      ] },
      { source: '研发到商业化周期', url: 'https://investor.nvidia.com', date: '2025-12-05', snippet: 'Blackwell时间线：2024Q1发布→2024Q3流片→2025Q1量产→2025Q3贡献60%数据中心收入。从发布到主力收入贡献约18个月，较Hopper的24个月缩短25%。', reliability: 'high', children: [
        { source: '产品上量追踪', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-02', snippet: 'Blackwell出货节奏：2025Q1约5万颗→Q2约15万颗→Q3约30万颗→Q4预计45万颗。爬坡速度较Hopper快约40%，反映供应链协同效率提升。', reliability: 'high' },
        { source: '架构迭代节奏', url: 'https://investor.nvidia.com', date: '2025-12-10', snippet: '2年一代严格执行：Ampere(2020)→Hopper(2022)→Blackwell(2024)→Rubin(2026E)。Rubin预计采用台积电3nm+HBM4，性能较Blackwell再提升3-4倍。AMD MI400预计2026H2（间隔2年），Intel Falcon Shores延迟至2026Q4。', reliability: 'high' },
      ] },
      { source: '毛利改善历史相关性', url: 'https://investor.nvidia.com', date: '2025-12-12', snippet: '历史验证：Ampere时代研发费用率15-16%/毛利率62-65%→Hopper时代14-15%/70-73%→Blackwell时代12-13%/74-76%。每代架构商业化后费用率降约2pct、毛利率升约5pct。软件ARR 20亿（毛利率90%）是增量毛利的重要来源。', reliability: 'high', children: [
        { source: 'CUDA软件迭代', url: 'https://developer.nvidia.com', date: '2025-11-28', snippet: 'CUDA 12.6发布，新增Blackwell专属优化（FP4支持、NVLink 5.0通信库）。TensorRT 10.x推理性能较9.x提升约35%。年更新2个大版本+12个小版本。', reliability: 'high' },
        { source: '软件毛利贡献', url: 'https://investor.nvidia.com', date: '2025-12-05', snippet: 'AI Enterprise + CUDA Enterprise + Omniverse合计ARR约20亿美元，毛利率约90%，远高于硬件的73%。软件收入占比从FY2024的2%提升至约4%，管理层目标FY2028达10%。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '商业化与留存（增长质量）',
    rating: 'strongBuy',
    summary: '数据中心收入同比+93%，Top50客户NRR约145%，客户结构从Hyperscaler（45%）向企业（30%）/主权AI（15%）多元化扩散。软件ARR突破20亿美元（毛利率90%），主权AI签约80亿美元成为新增长极。Hyperscaler客户100%留存且持续扩单。',
    content: `NRR/留存：Top50数据中心客户NRR约145%（硬件换代+软件渗透双驱动），Hyperscaler客户100%留存且持续扩单。分层看：Hyperscaler NRR约160%（Microsoft从FY2024约50亿扩至FY2026E约120亿，Meta从约30亿扩至约80亿）；企业客户NRR约125%（模块渗透+用量扩展）；主权AI为新增客群，无历史NRR但合同周期2-3年锁定性强。驱动因素：硬件换代（Hopper→Blackwell）贡献约60%扩展，软件渗透（AI Enterprise）贡献约25%，新场景（推理/边缘）贡献约15%。

ARPU/单客收入：Hyperscaler年均采购约40-120亿美元（Top4合计占数据中心收入约35%）。企业客户（Fortune 500）平均合同规模约500万美元/年（较FY2024的300万增长67%），扩张来自"用量"（GPU集群扩容）和"模块"（从训练扩展到推理+AI Enterprise软件）。主权AI项目平均合同约3-5亿美元，硬件占60%、软件服务占25%、集成占15%。

客户结构：Hyperscaler占数据中心收入约45%（FY2024为55%，集中度改善）。企业客户占30%（+8pct），Fortune 500覆盖从约200家扩至约380家。主权AI占15%（新增），约40国启动、NVIDIA签约25个项目。CSP/托管占10%。Top4（MSFT/GOOG/META/AMZN）占比从42%降至35%，Top10从55%降至48%，客户多元化趋势明确。

订单/RPO：RPO（剩余履约义务）约280亿美元，同比+65%。主权AI合同总额约80亿美元（沙特NEOM约20亿、日本ABCI 3.0约10亿、法国约8亿、印度约6亿、新加坡约5亿），项目周期2-3年，取消风险低（政府背书）。Hyperscaler CapEx指引持续上调：Microsoft FY2026约800亿（+40%）、Google约600亿（+35%）、Meta约500亿（+30%），NVIDIA GPU占AI CapEx约65-70%。

渠道转化效率：NVIDIA以直销为主（Hyperscaler/企业直接采购），渠道伙伴（OEM/SI）覆盖中小企业和主权AI集成。DGX Cloud作为试用入口，企业客户转化率约65%。销售周期：Hyperscaler约2-4周（标准化采购），企业客户约3-6个月（含POC和集成），主权AI约6-12个月（含政府审批）。销售费用率约5%（FY2024为6%），费用杠杆持续释放。

价格与折扣：NVIDIA定价权极强——B200单卡约3-4万美元（较H100提升30%但性能提升5倍），客户接受度高（AI训练TCO中GPU仅占35-40%）。折扣纪律严格：Hyperscaler大额采购折扣约5-8%，企业客户基本原价，主权AI项目含软件服务溢价约10-15%。AMD MI300X定价约为B200的40-50%但性能差距40%，价格竞争压力有限。毛利率维持74-76%，定价权来自CUDA生态锁定和性能代差。`,
    evidences: [
      { source: 'NRR与客户留存', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-10', snippet: 'Top50数据中心客户NRR约145%。Microsoft GPU采购从FY2024约50亿扩至FY2026E约120亿（+140%），Meta从约30亿扩至约80亿（+167%）。Hyperscaler客户100%留存。企业客户Fortune 500覆盖从约200家扩至约380家。', reliability: 'high', children: [
        { source: 'Hyperscaler CapEx追踪', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-06', snippet: 'Microsoft FY2026 CapEx指引约800亿美元（+40%），其中AI基础设施约60%。Google约600亿（+35%），Meta约500亿（+30%）。NVIDIA GPU占AI CapEx约65-70%。', reliability: 'high' },
        { source: '企业客户拓展', url: 'https://investor.nvidia.com', date: '2025-12-04', snippet: '企业AI部署案例：摩根大通（风控+交易）、丰田（自动驾驶训练）、辉瑞（药物发现）、沃尔玛（供应链优化）。企业客户平均合同规模约500万美元/年，较FY2024的300万增长67%。', reliability: 'high' },
      ] },
      { source: '客户结构与集中度', url: 'https://investor.nvidia.com', date: '2025-12-12', snippet: 'FY2026Q3数据中心收入355亿美元。客户结构：Hyperscaler约45%（160亿）、企业约30%（107亿）、主权AI约15%（53亿）、CSP/托管约10%（35亿）。Top4占比从42%降至35%，Top10从55%降至48%，客户多元化改善。', reliability: 'high', children: [
        { source: 'NVDA FY2026Q3财报电话会', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: 'CEO黄仁勋：企业AI采用进入拐点，Fortune 500中约380家已部署NVIDIA AI平台，较去年增加约180家。主权AI是最快增长的新客群。', reliability: 'high' },
        { source: '客户集中度趋势', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-08', snippet: '大客户集中度持续下降：Top4占比FY2024 42%→FY2026Q3 35%，Top10从55%降至48%。企业和主权AI客户的增长稀释了Hyperscaler集中度。', reliability: 'high' },
      ] },
      { source: '订单/RPO与主权AI', url: 'https://investor.nvidia.com', date: '2025-12-06', snippet: 'RPO约280亿美元（同比+65%）。主权AI签约约25个项目，合同总额约80亿美元。沙特NEOM约20亿、日本ABCI 3.0约10亿、法国约8亿、印度约6亿、新加坡约5亿。主权AI收入从FY2025约20亿增至FY2026E约55亿。', reliability: 'high', children: [
        { source: '主权AI项目追踪', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-04', snippet: '主权AI驱动因素：数据主权要求、AI产业政策、地缘竞争。典型配置：数千颗GPU+DGX SuperPOD+AI Enterprise软件栈。项目周期2-3年，取消风险低（政府背书+战略优先级高）。', reliability: 'high' },
      ] },
      { source: '软件ARR与收入质量', url: 'https://investor.nvidia.com', date: '2025-12-08', snippet: 'CUDA Enterprise + AI Enterprise + Omniverse合计ARR约20亿美元（同比+85%）。AI Enterprise订阅客户约4500家（+60%），年均ACV约25万美元。软件毛利率约90%，远高于硬件的73%。NIM微服务增速最快（+120%）。', reliability: 'high', children: [
        { source: '软件产品拆解', url: 'https://investor.nvidia.com', date: '2025-12-05', snippet: 'AI Enterprise ARR约12亿（含NIM微服务、Triton推理服务器、cuOpt优化库），CUDA Enterprise约5亿，Omniverse约3亿。每1美元GPU硬件可带动约0.3-0.5美元软件订阅。', reliability: 'high' },
      ] },
      { source: '定价权与折扣纪律', url: 'https://investor.nvidia.com', date: '2025-12-12', snippet: 'GB200 NVL72机柜ASP约300万美元。数据中心GPU ASP同比+35%，毛利率维持74-76%。Hyperscaler大额采购折扣约5-8%，企业客户基本原价，主权AI含软件服务溢价10-15%。AMD MI300X定价约为B200的40-50%但性能差距40%，价格竞争压力有限。', reliability: 'high', children: [
        { source: '竞品价格压力评估', url: 'https://xueqiu.com/S/AMD', date: '2025-12-06', snippet: 'AMD MI300X定价约1.5万美元，约为B200的40-50%，但性能差距约40%且ROCm生态不成熟。Intel Gaudi 3定价更低但市场份额<3%。NVIDIA定价权来自CUDA生态锁定和性能代差，短期无实质性价格竞争压力。', reliability: 'medium' },
      ] },
    ],
  },
  {
    title: '竞争格局与公司竞争水平',
    rating: 'buy',
    summary: '竞争定位：领先。NVIDIA在AI加速芯片领域占据约80%市场份额，CUDA生态+架构迭代速度+全栈平台构成三重壁垒。AMD为最接近挑战者但性能差距约40%且生态覆盖仅40%。最大变量是Hyperscaler自研芯片（Google TPU、Amazon Trainium）对通用GPU的替代风险。',
    content: `行业增长拆解（5个决定性变量）：①全球AI CapEx增速→直接决定GPU采购量（2025年约2800亿美元，+45%）；②大模型参数量增长→算力需求指数级扩张（每代模型算力需求增长约10倍）；③推理占比提升→从训练为主转向推理为主，扩大TAM约3倍；④Hyperscaler自研芯片进展→Google TPU v6、Amazon Trainium 2对NVIDIA份额的替代程度；⑤出口管制政策→限制中国市场（约占潜在TAM 15-20%）。传导关系：AI CapEx↑→GPU采购↑，但自研芯片↑→NVIDIA份额承压；推理占比↑→TAM扩大但竞争加剧。

胜负手3条（均可验证）：①CUDA生态开发者增速维持>15%/年（当前400万+，年增60万，季度可验证——若增速降至<10%说明替代生态成熟）；②Blackwell→Rubin架构迭代按时交付（2026H2量产，半年度可验证——若延迟>6个月则AMD追赶窗口打开）；③Hyperscaler自研芯片占其AI算力比例<30%（当前约15-20%，半年度可验证——若突破30%说明通用GPU被实质性替代）。

竞争定位：领先。证据：①AI加速芯片市场份额约80%（AMD约12%、Intel约3%、其他约5%）；②数据中心收入355亿美元/季，是AMD数据中心收入的约5倍；③CUDA生态400万+开发者，覆盖主流AI框架100%；④架构迭代保持对AMD约1-1.5代领先；⑤软件平台（AI Enterprise）开辟第二增长曲线，竞品无可比产品。

竞争对标表：
产品力——NVIDIA B200性能领先AMD MI300X约40%（MLPerf验证），领先Intel Gaudi 3约3倍。差距来源：架构设计（双芯片封装+NVLink互联）和软件栈优化深度。可追赶性：中（AMD每代缩小约10%差距，但NVIDIA迭代速度同样快）。验证：MLPerf半年度基准测试。
成本结构——NVIDIA毛利率74-76%，AMD约52%，Intel数据中心约40%。NVIDIA毛利率优势来自定价权（CUDA锁定）和规模效应（台积电最大客户之一）。可追赶性：低（CUDA生态锁定短期无法打破）。验证：季度财报毛利率跟踪。
渠道/生态——NVIDIA CUDA 400万+开发者/800+加速库，AMD ROCm覆盖约40%。差距来源：CUDA积累15年+，ROCm起步晚约8年。可追赶性：低（生态迁移成本极高，需5年+追赶）。验证：开发者数量/框架支持度年度评估。
交付与服务——NVIDIA DGX/HGX标准化交付+DGX Cloud试用，AMD依赖OEM合作伙伴。NVIDIA企业客户NPS约75（行业约60）。可追赶性：中（AMD通过OEM伙伴可部分弥补）。验证：NPS半年度调研。
合规与资质——NVIDIA受美国出口管制影响最大（中国市场收入从22%降至8%），AMD同样受限但影响较小（中国收入占比约15%）。可追赶性：不适用（政策风险，非企业可控）。验证：BIS政策更新季度跟踪。`,
    evidences: [
      { source: '行业增长拆解', url: 'https://investor.nvidia.com', date: '2025-12-16', snippet: '决定性变量5个：①全球AI CapEx 2025年约2800亿（+45%）→GPU采购量；②大模型参数量增长→算力需求指数级扩张；③推理占比提升→TAM扩大约3倍；④Hyperscaler自研芯片→替代风险；⑤出口管制→限制中国市场。', reliability: 'high', children: [
        { source: 'Hyperscaler AI CapEx追踪', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-14', snippet: '2025年全球AI CapEx约2800亿美元（+45%）。Microsoft约800亿、Google约600亿、Meta约500亿、Amazon约500亿。NVIDIA GPU占AI CapEx约65-70%，但Hyperscaler自研芯片占比从10%升至15-20%。', reliability: 'high' },
        { source: '推理市场扩张', url: 'https://investor.nvidia.com', date: '2025-12-12', snippet: 'AI推理占数据中心GPU用量从2023年的约30%升至2025年的约45%，预计2027年达60%。推理市场竞争更激烈（AMD/Intel/自研芯片均瞄准推理场景），但NVIDIA凭借TensorRT优化仍领先。', reliability: 'high' },
      ] },
      { source: '胜负手验证', url: 'https://investor.nvidia.com', date: '2025-12-14', snippet: '胜负手3条：①CUDA开发者增速>15%/年（当前400万+，年增60万=15%，季度验证）；②Rubin架构2026H2按时量产（半年度验证）；③Hyperscaler自研芯片占AI算力<30%（当前15-20%，半年度验证）。', reliability: 'high', children: [
        { source: 'Google TPU进展', url: 'https://xueqiu.com/S/GOOG', date: '2025-12-12', snippet: 'Google TPU v6（Trillium）2025Q3量产，性能较v5e提升约4倍。Google内部AI训练约40%使用TPU，60%使用NVIDIA GPU。TPU仅限GCP客户使用，非通用替代。', reliability: 'high' },
        { source: 'Amazon Trainium追踪', url: 'https://xueqiu.com/S/AMZN', date: '2025-12-10', snippet: 'Amazon Trainium 2 2025Q4量产，定位训练+推理。AWS内部约25%AI负载使用Trainium，75%仍用NVIDIA GPU。Trainium生态不成熟，第三方采用率低。', reliability: 'medium' },
      ] },
      { source: '竞争定位与市场份额', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-12', snippet: '竞争定位：领先。AI加速芯片市场份额：NVIDIA约80%、AMD约12%、Intel约3%、其他约5%。数据中心收入NVIDIA 355亿/季 vs AMD约70亿/季（约5倍差距）。CUDA 400万+开发者，架构领先AMD约1-1.5代。', reliability: 'high', children: [
        { source: 'AMD竞争力评估', url: 'https://xueqiu.com/S/AMD', date: '2025-12-08', snippet: 'AMD MI300X在部分推理场景性价比接近B200（价格低50%，性能差距40%），ROCm生态改善中（PyTorch支持度从60%升至75%）。但大模型训练场景仍显著落后，客户迁移意愿低。', reliability: 'medium' },
        { source: 'Intel竞争力评估', url: 'https://xueqiu.com/S/INTC', date: '2025-12-06', snippet: 'Intel Gaudi 3市场份额<3%，Falcon Shores延迟至2026Q4。Intel在AI加速领域持续失去份额，短期不构成实质威胁。', reliability: 'medium' },
      ] },
      { source: '竞争对标表', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-20', snippet: '五维对标：①产品力：NVIDIA B200领先MI300X约40%，可追赶性中（验证：MLPerf半年度）；②成本结构：毛利率NVIDIA 74% vs AMD 52%，可追赶性低（验证：季度财报）；③生态：CUDA 400万开发者 vs ROCm覆盖40%，可追赶性低（验证：年度开发者统计）；④交付：NVIDIA DGX标准化+DGX Cloud，NPS 75 vs AMD约60，可追赶性中；⑤合规：均受出口管制影响，NVIDIA影响更大（中国收入从22%降至8%）。', reliability: 'high', children: [
        { source: '生态差距分析', url: 'https://developer.nvidia.com', date: '2025-12-15', snippet: 'CUDA积累15年+，800+加速库，覆盖AI/HPC/图形/自动驾驶全场景。AMD ROCm起步晚约8年，加速库约320个，主要覆盖AI训练/推理。生态差距需5年+追赶。', reliability: 'high' },
        { source: '自研芯片替代评估', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-10', snippet: 'Hyperscaler自研芯片（TPU/Trainium/MTIA）当前占其AI算力约15-20%，主要用于内部推理负载。训练场景仍高度依赖NVIDIA GPU（占比>80%）。自研芯片短期是补充而非替代。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '经营阶段与KPI验证体系（创新型≥10项）',
    rating: 'buy',
    summary: '当前处于规模化放量期，Blackwell量产驱动数据中心收入同比+93%，12项KPI中10项绿灯、1项黄灯（出口管制）、1项需关注（Hyperscaler自研芯片占比上升）。下一阶段关键：Rubin按时量产、软件收入占比突破10%、推理市场份额维持>60%。',
    content: `经营阶段判断：规模化放量期。证据5条：①Blackwell量产后6个月即贡献60%数据中心收入，产品-市场匹配度极高；②数据中心季度收入355亿美元（同比+93%），连续6季加速增长；③毛利率从Hopper时代的72%提升至74.5%，规模效应+定价权双重验证；④客户结构从Hyperscaler单一驱动向企业/主权AI多元化扩散，增长基础更健康；⑤软件ARR突破20亿美元，平台化转型初见成效。

下一阶段必要条件3条（可跟踪）：①Rubin架构2026H2按时量产——若延迟>6个月，AMD MI400将缩小代差，市场份额面临侵蚀（半年度验证）；②软件收入占比从4%提升至10%——标志从硬件公司向平台公司转型成功（FY2028目标，年度验证）；③推理市场份额维持>60%——推理是未来最大增量市场，竞争最激烈（AMD/Intel/自研芯片均瞄准推理），份额守住=TAM扩张红利独享（半年度验证）。

阶段性风险3条：①Hyperscaler CapEx周期性回调——若2026年AI CapEx增速从+45%降至<15%，NVIDIA收入增速将显著放缓（对应行业增长变量①）；②自研芯片替代加速——若Hyperscaler自研芯片占其AI算力比例从20%升至>30%，通用GPU需求增速将低于AI CapEx增速（对应竞争格局胜负手③）；③出口管制进一步收紧——若限制扩展至中东/东南亚市场，主权AI增长极将受阻（对应出口管制变量）。

KPI总览：12项中10项绿灯（✓），1项黄灯（△出口管制影响），1项需关注（✗Hyperscaler自研芯片占比上升趋势）。整体支持"规模化放量期"判断，增长质量高但需密切跟踪CapEx周期和自研芯片替代进展。`,
    evidences: [
      { source: '经营阶段判断', url: 'https://investor.nvidia.com', date: '2025-12-20', snippet: '阶段：规模化放量期。证据5条：①Blackwell量产6个月贡献60%数据中心收入；②数据中心季度收入355亿（+93%），连续6季加速；③毛利率从72%升至74.5%；④客户结构多元化（Hyperscaler占比从55%降至45%）；⑤软件ARR突破20亿。', reliability: 'high', children: [
        { source: 'NVDA FY2026Q3财报', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: '总营收410亿美元（同比+78%），数据中心355亿（+93%）。毛利率74.5%（FY2024为72%）。Blackwell贡献约60%数据中心收入，量产爬坡速度较Hopper快40%。', reliability: 'high' },
        { source: '平台化转型进展', url: 'https://investor.nvidia.com', date: '2025-12-15', snippet: '软件ARR 20亿美元（+85%），AI Enterprise客户4500家。NIM微服务成为企业AI部署标准入口，增速+120%。软件收入占比从2%升至4%，目标FY2028达10%。', reliability: 'high' },
      ] },
      { source: '下一阶段条件', url: 'https://investor.nvidia.com', date: '2025-12-17', snippet: '必要条件3条：①Rubin 2026H2按时量产（半年度验证，延迟>6月=AMD追赶窗口打开）；②软件收入占比→10%（年度验证，FY2028目标）；③推理市场份额>60%（半年度验证，竞争最激烈的增量市场）。', reliability: 'high', children: [
        { source: 'Rubin路线图', url: 'https://investor.nvidia.com', date: '2025-11-15', snippet: 'Rubin架构2026H2量产，采用台积电3nm+HBM4，单芯片算力较B200提升约3倍。Rubin Ultra 2027年推出。当前研发进度正常，无延迟信号。', reliability: 'high' },
        { source: '推理市场竞争', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-13', snippet: '推理占AI算力从30%升至45%，预计2027年达60%。NVIDIA推理份额约65%（凭借TensorRT优化），AMD约15%，自研芯片约15%，Intel约5%。推理场景竞争比训练更激烈。', reliability: 'high' },
      ] },
      { source: '阶段性风险', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-15', snippet: '风险3条：①Hyperscaler CapEx周期性回调——若2026年AI CapEx增速降至<15%，NVIDIA收入增速将显著放缓；②自研芯片替代加速——若占比从20%升至>30%，通用GPU需求增速低于CapEx增速；③出口管制扩展至中东/东南亚，主权AI增长极受阻。', reliability: 'high', children: [
        { source: 'CapEx周期分析', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-13', snippet: '历史参考：2022年云CapEx增速从+35%骤降至+5%，NVIDIA数据中心收入增速从+83%降至+14%。当前AI CapEx增速+45%处于高位，2026年若宏观转弱存在回调风险。', reliability: 'high' },
        { source: '自研芯片进展追踪', url: 'https://xueqiu.com/S/GOOG', date: '2025-12-11', snippet: 'Google TPU v6性能较v5e提升4倍，内部AI训练约40%使用TPU。Amazon Trainium 2量产，AWS内部约25%AI负载使用。Meta MTIA v2用于推理。自研芯片占Hyperscaler AI算力约15-20%，趋势上升。', reliability: 'high' },
      ] },
      { source: 'KPI表-新品竞争力（4项）', url: 'https://investor.nvidia.com', date: '2025-12-13', snippet: '①性能/成本/ROI对标：B200较H100性能提升5倍/TCO降60%，≥3倍代际提升=绿灯，半年度验证（MLPerf），关联收入/溢价；②POC转化率：企业客户DGX Cloud试用转化率65%（≥50%绿灯），季度验证，关联收入；③上线周期：风冷8-12周/液冷16-20周（≤20周绿灯），季度验证，关联收入；④切换成本：CUDA迁移成本占项目30-50%（≥20%绿灯），年度验证，关联溢价/留存。', reliability: 'high', children: [
        { source: 'MLPerf最新数据', url: 'https://mlcommons.org', date: '2025-12-10', snippet: 'B200在GPT-3 175B训练基准中较H100快4.2倍，较MI300X快1.4倍。推理基准（Llama-2 70B）延迟较MI300X低32%。性能代差维持，绿灯。', reliability: 'high' },
        { source: '企业客户转化追踪', url: 'https://investor.nvidia.com', date: '2025-12-08', snippet: 'DGX Cloud试用企业客户约2800家，转化为付费客户约1820家，转化率65%。金融行业最高（72%），制造业次之（68%），零售（58%）。', reliability: 'high' },
      ] },
      { source: 'KPI表-研发效率（3项）', url: 'https://investor.nvidia.com', date: '2025-12-11', snippet: '⑤研发费用率：12.5%（10-15%绿灯），季度验证（财报），关联利润；⑥研发人均产出：人均年营收50万美元（≥30万绿灯），半年度验证，关联利润；⑦研发→商业化周期：Blackwell 18个月（≤24月绿灯），每代架构验证，关联收入。三项均绿灯。', reliability: 'high', children: [
        { source: 'FY2026Q3研发数据', url: 'https://investor.nvidia.com', date: '2025-11-20', snippet: 'Q3研发费用32亿美元，费用率7.8%（单季）/12.5%（TTM）。研发团队32000人，人均年营收贡献50万美元（FY2024为35万，+43%）。', reliability: 'high' },
      ] },
      { source: 'KPI表-商业化/竞争（5项）', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-09', snippet: '⑧NRR：Top50客户约145%（≥120%绿灯），季度验证，关联收入；⑨ARPU：企业客户500万/年（同比+67%，≥+20%绿灯），季度验证，关联收入；⑩客户集中度：Top4占比35%（≤40%绿灯，FY2024为42%，改善），季度验证，关联风险；⑪RPO：280亿美元（同比+65%，≥+30%绿灯），季度验证，关联收入可见性；⑫竞品份额变化：NVIDIA约80%（≥70%绿灯），半年度验证，关联溢价。', reliability: 'high', children: [
        { source: '竞品份额追踪', url: 'https://xueqiu.com/S/AMD', date: '2025-12-07', snippet: 'AI加速芯片市场份额：NVIDIA约80%（FY2024约82%，微降）、AMD约12%（+2pct）、Intel约3%（持平）、自研芯片约5%（+2pct）。NVIDIA份额微降但绝对收入大幅增长，市场扩大是主因。', reliability: 'high' },
        { source: 'RPO与收入可见性', url: 'https://investor.nvidia.com', date: '2025-12-05', snippet: 'RPO 280亿美元，覆盖约2个季度收入。主权AI合同80亿（周期2-3年），Hyperscaler框架协议持续滚动。收入可见性行业最高。', reliability: 'high' },
      ] },
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

function generateInvestmentElements(): ResearchElement[] {
  const now = new Date().toISOString()
  const order = elementTitles.investment
  return order.map(title => {
    const el = investmentElements.find(e => e.title === title)!
    return { ...el, promptVersion: 'v1.2.0', model: 'Manus-Agent-v1', analyzedAt: now }
  })
}

function generateServiceElements(): ResearchElement[] {
  const now = new Date().toISOString()
  return serviceElements.map(e => ({
    ...e,
    promptVersion: 'v1.2.0',
    model: 'Manus-Agent-v1',
    analyzedAt: now,
  }))
}

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
  const isService = type === 'service'
  const isInvestment = type === 'investment'
  return {
    id: randomId(),
    stockCode: code,
    stockName: stock?.name ?? code,
    type,
    rating: isInnovation ? 'buy' : isService ? 'buy' : isInvestment ? 'buy' : pick(ratings),
    conclusion: isInnovation
      ? '【推荐买入】综合五大创新要素分析，NVIDIA处于规模化放量期。Blackwell架构性能领先竞品40%+，CUDA生态锁定极高切换成本（迁移成本占项目30-50%），数据中心季度收入355亿美元（+93%）验证产品-市场匹配度极高。研发效率行业第一（每1美元研发产出12美元营收），架构2年一代从未延迟。客户结构从Hyperscaler向企业/主权AI多元化扩散，NRR约145%，软件ARR突破20亿美元开启平台化转型。12项KPI中10项绿灯。核心风险：Hyperscaler CapEx周期性回调（历史上曾骤降）、自研芯片替代加速（当前占AI算力15-20%且上升）、出口管制进一步收紧。当前估值隐含高增长预期，建议买入并中长期持有，硬止损线为数据中心收入连续两季环比增速<5%或毛利率跌破70%。'
      : isService
        ? '【推荐】综合五大服务要素分析，亚朵处于快速扩张期，单店GOP利润率35-38%、Payback 22个月的经济模型已验证成熟，7200万A-Card会员（复购率42%、LTV 4倍于非会员）构成强需求侧护城河。运营效率行业领先（RevPAR 398元、人均毛利4.8万/季），管理杠杆持续释放（费用率8.2%且仍在下降），场景零售GMV 12.4亿开辟第二增长曲线。KPI验证10项中7项绿灯。核心风险在于：店长储备缺口15%制约开店节奏、一线城市租金占比升至28.5%逼近警戒线、同城自我竞争初现（高密度城市RevPAR下降5-8%）、加盟商坏账率从1.2%升至1.8%。若SSSG连续两季低于通胀则品牌力透支信号明确。建议买入并中长期持有，硬止损线为单店Payback超30个月或坏账率破3%。'
        : isInvestment
          ? '【买入】综合五大投资要素分析，紫金矿业处于供给紧张期+产能释放的双重受益窗口。资源禀赋突出：矿产铜C1成本约1500美元/吨，处于全球25%分位，成本优势显著且可持续。供需格局有利：全球铜缺口约50万吨，新能源驱动需求增速15-20%/年，而矿山供给增速仅2-3%，供给紧张预计持续至2028年。产能释放确定性高：卡莫阿三期（2026Q4）、巨龙二期（2027Q2）将新增铜产能约35万吨，IRR 18-22%。财务健康度良好：经营现金流/净利润1.15，净负债/EBITDA 1.6x且持续改善。12项KPI中9项绿灯。核心风险：刚果金地缘政治（卡莫阿占铜产量30%）、铜价周期性回调、竞争对手成本追赶。建议买入，硬止损线为供需缺口消失或净负债/EBITDA>2.5x。'
          : pick(conclusions),
    elements: isInnovation ? generateInnovationElements() : isService ? generateServiceElements() : isInvestment ? generateInvestmentElements() : titles.map(t => generateElement(t)),
    counterArgument: isInnovation ? {
      summary: '针对要素1-5的最小反证集合：若Hyperscaler CapEx增速降至<15%、自研芯片占AI算力>30%、或Rubin延迟>6个月，当前"规模化放量"结论将被推翻。最脆弱假设是AI CapEx持续高增长，最大不确定性是Hyperscaler自研芯片的替代速度。',
      content: `针对要素1（新品竞争力）的反证条件：若AMD MI400发布后MLPerf基准差距从40%缩小至<15%，且ROCm生态覆盖从40%升至>70%，则CUDA生态锁定的护城河将被实质性削弱，"极高切换成本"结论需改写为"中等"。验证时间点：2026H2 MI400发布后的首次MLPerf测试。

针对要素2（研发效率）的反证条件：若Rubin架构量产延迟>6个月（即推迟至2027年），则2年一代的迭代节奏被打破，AMD将获得追赶窗口，"研发效率行业最高"结论需降级。验证时间点：2026Q2 Rubin流片进展。

针对要素3（商业化与留存）的反证条件：若Hyperscaler 2026年AI CapEx增速从+45%骤降至<15%（类似2022年云CapEx回调），NVIDIA数据中心收入增速将从+93%降至<20%，"高质量增长"结论需改写为"周期性放缓"。验证时间点：2026Q1各Hyperscaler CapEx指引。

针对要素4（竞争格局）的反证条件：若Hyperscaler自研芯片（TPU/Trainium/MTIA）占其AI算力比例从当前15-20%升至>30%，且开始对外提供服务（如Google将TPU开放给非GCP客户），则"NVIDIA市场份额80%"的结论将面临实质性挑战。验证时间点：半年度Hyperscaler财报中自研芯片部署数据。

针对要素5（经营阶段）的反证条件：若连续两个季度数据中心收入环比增速降至<5%（当前+12%），说明Blackwell需求饱和或被替代，"规模化放量期"需改写为"增速换挡期"。验证时间点：季度财报。

最脆弱假设3条：①AI CapEx持续高增长（+30%以上）——历史上云CapEx曾出现骤降，AI CapEx同样可能周期性回调，下一次验证：2026Q1 Hyperscaler CapEx指引；②CUDA生态不可替代——若开源AI编译器（如MLIR/Triton语言层）成熟到屏蔽底层硬件差异，CUDA锁定效应将减弱，下一次验证：2026年PyTorch对非CUDA后端的原生支持进展；③中国市场损失可控——若出口管制扩展至更多国家/地区，损失将从80-100亿扩大至200亿+，下一次验证：BIS下一轮政策更新（预计2026H1）。

最大不确定性：Hyperscaler自研芯片的替代速度——当前占AI算力15-20%且趋势上升，若加速至30%+将实质性改变NVIDIA的增长斜率。验证动作：每半年跟踪Google/Amazon/Meta自研芯片部署量和对外开放进展。`,
      evidences: [
        { source: 'CapEx周期性风险', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-19', snippet: '历史参考：2022年云CapEx增速从+35%骤降至+5%，NVIDIA数据中心收入增速从+83%降至+14%。当前AI CapEx增速+45%处于历史高位，2026年若宏观转弱或AI ROI验证不及预期，存在回调风险。', reliability: 'high' },
        { source: '自研芯片替代趋势', url: 'https://xueqiu.com/S/GOOG', date: '2025-12-15', snippet: 'Google TPU v6性能较v5e提升4倍，内部AI训练约40%使用TPU。Amazon Trainium 2量产，AWS约25%AI负载使用。Meta MTIA v2用于推理。自研芯片占Hyperscaler AI算力约15-20%，趋势上升。', reliability: 'high' },
        { source: 'CUDA替代风险', url: 'https://xueqiu.com/S/NVDA', date: '2025-12-12', snippet: '开源AI编译器（MLIR/Triton）正在发展，目标是屏蔽底层硬件差异。若PyTorch原生支持非CUDA后端达到生产级别，CUDA锁定效应将减弱。当前进展：PyTorch对ROCm支持度从60%升至75%，但距生产级仍有差距。', reliability: 'medium' },
        { source: '出口管制扩展风险', url: 'https://www.commerce.gov', date: '2025-12-10', snippet: '美国正评估将AI芯片出口管制扩展至中东部分国家。若实施，NVIDIA主权AI项目（中东合同约30亿美元）将受直接影响，年化损失可能从80-100亿扩大至130-150亿。', reliability: 'high' },
      ],
      promptVersion: 'v1.2.0',
      model: 'Manus-Agent-v1',
      analyzedAt: new Date().toISOString(),
    } : isService ? {
      summary: '亚朵快速扩张面临店长储备不足、租金成本上升、同城自我竞争三大风险，若SSSG连续两季低于通胀则品牌力透支信号明确。',
      content: '从反方视角审视，市场对亚朵扩张故事的定价可能过于乐观。\n\n首先，人才瓶颈被低估。店长培养周期12-18个月，合格率仅60%，当前储备缺口15%。若年开店目标350+家，店长缺口将进一步扩大，可能导致新店服务品质下降、爬坡期拉长，反噬品牌口碑。\n\n其次，租金成本结构性上升。一线城市存量店续租涨幅5-8%，租金占比从27%升至28.5%。假设当前租金/人工成本不发生结构性上涨的前提可能过于乐观，社保合规趋严将进一步推高人力成本。\n\n第三，同城自我竞争风险。上海、杭州等高密度城市（单城>30家）已出现同品牌分流，存量店RevPAR下降5-8%。随门店向二三线下沉，单城天花板更低，自我竞争可能更早出现。\n\n最后，加盟商盈利恶化信号初现。坏账率从1.2%升至1.8%，C级加盟商占比10%，集中在三线城市新店。若经济下行导致商旅需求萎缩，加盟商退出风险将显著上升。',
      evidences: [
        { source: '店长储备风险', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-18', snippet: '店长培养周期12-18个月，合格率60%，储备缺口15%。若2026年目标净增400家，需新增店长400+人，按当前培养效率仅能供给约480人，几乎无冗余。', reliability: 'high' },
        { source: '租金成本压力', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=ATAT', date: '2025-12-15', snippet: '一线城市续租涨幅5-8%，租金占比从27%升至28.5%。若叠加社保合规成本上升，租金+人工合计可能突破52%警戒线。', reliability: 'high' },
        { source: '同城竞争分析', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-12', snippet: '上海/杭州单城>30家后存量店RevPAR下降5-8%，IP主题店差异化仅部分缓解。二三线城市单城天花板约15-20家，自我竞争拐点更早。', reliability: 'medium' },
        { source: '加盟商健康度', url: 'https://xueqiu.com/S/ATAT', date: '2025-12-10', snippet: '坏账率从1.2%升至1.8%，C级加盟商10%。若SSSG连续两季低于通胀（约2%），说明品牌力已透支，加盟商退出风险将加速暴露。', reliability: 'medium' },
      ],
      promptVersion: 'v1.2.0',
      model: 'Manus-Agent-v1',
      analyzedAt: new Date().toISOString(),
    } : isInvestment ? {
      ...investmentCounterArgument,
      promptVersion: 'v1.2.0',
      model: 'Manus-Agent-v1',
      analyzedAt: new Date().toISOString(),
    } : generateCounterArgument(),
    researcherNotes: isInnovation ? {
      keyVariables: [
        'Hyperscaler内部自研芯片的实际部署进度与对外开放计划——这是AI分析中最难量化的变量，需通过云厂商工程师访谈和招聘动态间接验证',
        'CUDA生态的实际迁移摩擦——需与正在评估AMD/Intel方案的企业CTO深度访谈，了解迁移的真实痛点和决策因素，而非仅依赖NVIDIA官方数据',
        'AI CapEx的ROI验证进展——Hyperscaler大规模投入AI基础设施，但企业端AI应用的实际ROI尚未充分验证，若ROI不及预期将触发CapEx回调',
      ],
      hardConstraints: [
        '若连续两个季度数据中心收入环比增速降至<5%（当前+12%），说明需求饱和或被替代，立即将"规模化放量"结论降级为"增速换挡"',
        '若Hyperscaler自研芯片占其AI算力比例突破30%（当前15-20%），说明通用GPU被实质性替代，需重新评估NVIDIA的长期增长天花板',
        '若毛利率连续两季低于70%（当前74.5%），说明定价权受损或竞争加剧，CUDA生态锁定效应可能弱于预期',
      ],
      tradingPlan: [
        '加仓信号：Rubin按时量产 + 数据中心收入环比增速维持>10% + 软件ARR突破30亿，说明平台化转型加速且增长动能未衰减，目标仓位可提升至组合的10-12%',
        '持有观察：数据中心收入环比增速5-10% + 毛利率维持72-76% + 市场份额>75%，维持当前仓位（7-8%），季度跟踪Hyperscaler CapEx指引',
        '减仓信号：数据中心收入环比增速降至<5% 或 AMD份额升至>18% 或 出口管制扩展至中东市场，减仓至4%以下',
        '清仓信号：Rubin延迟>6个月 + Hyperscaler自研芯片占比>30% + 毛利率跌破70%，说明竞争格局发生根本性变化',
      ],
    } : isService ? {
      keyVariables: [
        '实地探店观察员工精神面貌与服务主动性——亚朵强调"温暖感"文化，店长是否真正践行直接决定复购体验，这是财报无法量化的软实力',
        '加盟商实际满意度与续约意愿——通过加盟商私下访谈获取真实经营感受，关注是否存在"报喜不报忧"的信息过滤',
        'IP主题店的实际客户反馈与溢价接受度——25%新店为IP店，需验证溢价是否可持续还是仅靠新鲜感驱动',
        '二三线城市新店周边竞品密度与客源结构——下沉市场商旅需求是否足以支撑ADR 400+的定价',
      ],
      hardConstraints: [
        '若单店Payback中位数拉长至30个月以上，立即暂停扩张逻辑，说明单店模型在新区域不成立',
        '若加盟商坏账率突破3%或C级加盟商占比超15%，触发加盟体系健康度红线，需重新评估扩张节奏',
        '若租金+人工合计占比突破55%，GOP利润率将被压缩至30%以下，单店盈利模型面临重构',
        '若SSSG连续两个季度低于CPI（约2%），说明品牌力已透支，同店增长逻辑不再成立',
      ],
      tradingPlan: [
        '加仓信号：SSSG连续两季≥6% + Payback缩短至20个月以内 + 管理费用率降至7%以下，说明规模效应加速释放，目标仓位可提升至组合的8-10%',
        '持有观察：SSSG 3-5% + Payback 22-26个月 + 员工流失率稳定在35-40%，维持当前仓位（5-6%），季度跟踪',
        '减仓信号：SSSG降至2%以下 或 坏账率升至2.5%+ 或 新店OCC连续两季低于72%，减仓至3%以下并暂停加仓计划',
        '清仓信号：Payback超30个月 + SSSG转负 + 加盟商大规模退出（年退出率>5%），说明商业模型遭遇系统性挑战',
      ],
    } : isInvestment ? investmentResearcherNotes : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
    model: 'Manus-Agent-v1',
  }
}

// in-memory store
const reports: ResearchReport[] = [
  generateReport('601899', 'investment'),
  generateReport('NVDA', 'innovation'),
  generateReport('ATAT', 'service'),
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
