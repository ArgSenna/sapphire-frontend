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

// 创新研究固定要素数据（NVIDIA NVDA）—— 数据来源：Manus AI 深度分析报告（2026年2月11日）
const innovationElements: Omit<ResearchElement, 'promptVersion' | 'model' | 'analyzedAt'>[] = [
  {
    title: '新品竞争力（产品力×落地难度）',
    rating: 'strongBuy',
    summary: 'Blackwell整体AI性能为Hopper的2.5倍，推理性能提升高达15倍，能效提升10倍。凭借10倍能效提升，3-5年TCO可为客户节省30-50%。CUDA 400万开发者生态锁定极高切换成本（迁移成本达数千万至数亿美元），但数据中心改造和供应链产能是落地核心瓶颈。',
    content: `Blackwell系列产品实现代际跃升：整体AI性能为上一代Hopper的2.5倍，推理性能提升高达15倍，能效提升10倍。对标AMD MI300X性能约为Hopper的70-80%，Intel Gaudi 3在特定负载上可比但通用性与生态均处劣势。架构创新（FP4精度）、互联技术（10 TB/s NVLink）和全栈优化（CUDA生态）构成了难以逾越的技术代差。

成本与ROI优势显著：单价虽高，但凭借10倍能效提升，在3-5年TCO模型中可为客户节省30-50%的总成本。15倍的推理性能提升可直接转化为15倍的营收机会，将投资回收期从24个月缩短至4-6个月。Nvidia将竞争从单纯的硬件采购成本引向了全生命周期的运营效益。

替代路径与迁移成本：首先是超大规模云服务商和AI独角兽（对性能极度敏感），其次是传统企业和科研机构（更看重稳定性和成本效益）。从现有方案迁移至Blackwell的成本巨大，不仅包括硬件采购，还涉及数据中心改造（液冷和电力升级，成本可达数亿美元）、软件重构和组织流程再造。这种高昂的切换成本构成了Nvidia最坚固的护城河之一。

部署门槛极高：对算力（单机柜功耗120-150kW）、集成（NVLink和Spectrum-X网络）和合规安全（出口管制、数据主权）提出了前所未有的要求。从POC到规模化部署，超大规模客户需要12-24个月，传统企业则长达20-40个月。当前的主要瓶颈在于供应链产能和数据中心基础设施改造。`,
    evidences: [
      { source: '性能/成本/ROI对标', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: 'Blackwell整体AI性能为Hopper的2.5倍，推理性能提升高达15倍，能效提升10倍。凭借10倍能效提升，3-5年TCO可为客户节省30-50%。投资回收期从24个月缩短至4-6个月。', reliability: 'high', children: [
        { source: 'NVIDIA FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: 'Blackwell架构支持FP4精度，第五代NVLink带宽10 TB/s。AMD MI300X性能约为Hopper的70-80%，Intel Gaudi 3在特定负载上可比但通用性与生态均处劣势。', reliability: 'high' },
        { source: 'NexGenCloud Blackwell vs Hopper对比', url: 'https://www.nexgencloud.com/blog/performance-benchmarks/nvidia-blackwell-vs-nvidia-hopper-a-detailed-comparison', date: '2024-12-15', snippet: 'Nvidia每年一代的迭代速度使其领先优势可持续。竞品价格更低，但在电力、冷却和空间成本上不具备优势，导致长期TCO更高。', reliability: 'high' },
      ] },
      { source: '替代路径与迁移成本', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: '替代顺序：首先是超大规模云服务商和AI独角兽，其次是传统企业和科研机构。迁移成本包括数据中心改造（液冷和电力升级，成本可达数亿美元）、软件重构和组织流程再造，估算可达数千万至数亿美元。', reliability: 'high', children: [
        { source: 'SemiAnalysis Blackwell分析', url: 'https://www.semianalysis.com/p/nvidia-blackwell-platform-and-gb200', date: '2024-06-15', snippet: 'CUDA 400万开发者生态构成极高切换成本。客户迁移至竞品需重写大量底层代码，迁移成本占项目投入极高比例。', reliability: 'high' },
      ] },
      { source: '部署门槛与上线周期', url: 'https://www.theinformation.com/', date: '2025-06-20', snippet: '单机柜功耗120-150kW，需NVLink和Spectrum-X网络集成。超大规模客户从POC到规模化部署需12-24个月，传统企业需20-40个月。主要瓶颈在于供应链产能和数据中心基础设施改造。', reliability: 'high', children: [
        { source: 'Gartner AI基础设施报告', url: 'https://www.gartner.com/', date: '2024-09-15', snippet: '出口管制和数据主权要求对部署提出合规安全挑战。液冷基础设施改造增加约15-20%部署成本。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '研发效率（投入→产出→商业化）',
    rating: 'strongBuy',
    summary: 'Nvidia研发费用率从FY2023峰值27.2%迅速下降至FY2025的9.9%，体现强大运营杠杆。FY2025每增加1美元研发投入带来约12.5美元毛利增长，研发ROI高达1:12.5。人均营收FY2025达363万美元/人，是AMD的4.2倍、Intel的7.7倍。产品迭代周期从Ampere的38个月缩短至Blackwell的27个月。',
    content: `Nvidia的研发费用率从FY2023的峰值27.2%迅速下降至FY2025的9.9%。这并非研发投入的减少（绝对金额仍在高速增长），而是营收爆发式增长带来的强大运营杠杆效应。FY2025，每增加1美元的研发投入，能带来约12.5美元的毛利增长，研发ROI高达1:12.5。

以人均营收衡量，Nvidia在FY2025达到了惊人的363万美元/人，是其主要竞争对手AMD的4.2倍，Intel的7.7倍。这得益于其技术平台化、AI辅助研发以及高效的组织结构。

Nvidia的产品迭代周期不断缩短，从Ampere架构的约38个月缩短至Blackwell的约27个月。这种加速得益于与客户和供应链的深度协同，以及软硬件并行开发的模式。`,
    evidences: [
      { source: '研发费用率与运营杠杆', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: 'Nvidia研发费用率从FY2023峰值27.2%迅速下降至FY2025的9.9%。绝对金额仍在高速增长，但营收爆发式增长带来强大运营杠杆效应。FY2025每增加1美元研发投入带来约12.5美元毛利增长。', reliability: 'high', children: [
        { source: 'NVIDIA FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: 'FY2025全年营收大幅增长，研发费用率降至9.9%，运营杠杆效应显著。研发ROI达1:12.5，行业最高水平。', reliability: 'high' },
      ] },
      { source: '研发人均产出', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: 'Nvidia FY2025人均营收达363万美元/人，是AMD的4.2倍，Intel的7.7倍。得益于技术平台化、AI辅助研发以及高效的组织结构。', reliability: 'high', children: [
        { source: 'NVIDIA FY2026Q3财报', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2025-11-20', snippet: '研发团队高效运转，人均产出远超竞争对手。技术平台化和AI辅助研发是核心驱动力。', reliability: 'high' },
      ] },
      { source: '研发到商业化周期', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: '产品迭代周期从Ampere架构的约38个月缩短至Blackwell的约27个月。加速得益于与客户和供应链的深度协同，以及软硬件并行开发的模式。', reliability: 'high', children: [
        { source: 'SemiAnalysis架构分析', url: 'https://www.semianalysis.com/p/nvidia-blackwell-platform-and-gb200', date: '2024-06-15', snippet: 'Blackwell架构从立项到规模化商业化周期约27个月，较Ampere的38个月大幅缩短，反映Nvidia研发到商业化效率持续提升。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '商业化与留存（增长质量）',
    rating: 'strongBuy',
    summary: '客户集中度持续上升（Q3 FY2026前4大客户占营收61%），超大规模客户"NRR"等价物高达200-300%。单客收入过去一年增长63%，主要由用量增长驱动。数据中心业务占比已达90%，销售费用率仅3.4%，获客成本极低。',
    content: `尽管作为硬件公司不披露NRR，但其持续上升的客户集中度（Q3 FY2026前4大客户占营收61%）和大客户的重复采购行为是"负流失率"的有力证据。我们估算其超大规模客户的"NRR"等价物高达200-300%。单客收入（以大客户平均收入衡量）在过去一年中增长了63%，主要由用量增长驱动。

Nvidia的客户结构高度集中于云服务商和AI巨头，数据中心业务占比已达90%。这种集中度既是风险也是机遇。其销售费用率仅为3.4%，远低于行业平均水平，这得益于其强大的品牌效应、供不应求的市场地位以及生态锁定，使其获客成本极低。`,
    evidences: [
      { source: 'NRR/留存与ARPU/单客收入', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: 'Q3 FY2026前4大客户占营收61%，大客户重复采购行为是"负流失率"的有力证据。超大规模客户"NRR"等价物估算高达200-300%。单客收入过去一年增长63%，主要由用量增长驱动。', reliability: 'high', children: [
        { source: 'NVIDIA FY2026Q3财报', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2025-11-20', snippet: '数据中心收入持续高速增长，大客户采购规模持续扩大，验证产品-市场匹配度极高。', reliability: 'high' },
      ] },
      { source: '客户结构与渠道效率', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: '客户结构高度集中于云服务商和AI巨头，数据中心业务占比已达90%。销售费用率仅3.4%，远低于行业平均水平，得益于强大品牌效应、供不应求的市场地位以及生态锁定。', reliability: 'high', children: [
        { source: 'NVIDIA FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: '数据中心业务占比达90%，销售费用率持续下降至3.4%，获客成本极低。品牌效应和生态锁定是核心驱动。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '竞争格局与公司竞争水平',
    rating: 'strongBuy',
    summary: 'Nvidia在AI芯片市场处于绝对领先地位，市场份额86%。CUDA生态护城河深度（400万开发者）、产品迭代速度（每年一代，始终领先竞争对手2-3代）、供应链深度绑定构成三重壁垒。竞争定位确信度95%以上。短期份额维持80-85%，中期70-75%，长期50-60%。',
    content: `Nvidia在AI芯片市场处于无可争议的绝对领先地位。AI芯片市场的增长主要由AI应用的商业化进度（源头变量）、AI模型的规模化趋势和企业AI基础设施投资意愿共同驱动，而供应链产能是短期内的主要约束。

Nvidia的胜负手在于以下三点，均可被验证：
1. CUDA生态的护城河深度：拥有400万开发者，切换成本极高。
2. 产品迭代速度与技术代差：保持每年一代的节奏，始终领先竞争对手2-3代。
3. 供应链深度绑定与产能优先权：锁定TSMC等关键供应商的产能。

基于市场份额（86%）、技术领先、生态护城河和财务表现，Nvidia的竞争定位为绝对领先，结论确信度在95%以上。

竞争格局演变预测：短期（1-2年）Nvidia将继续主导市场，份额维持在80-85%；中期（3-5年）竞争将加剧，份额可能下降至70-75%，但仍保持领先；长期（5-10年）市场结构可能重塑，但Nvidia仍将是最大的参与者，份额可能在50-60%。`,
    evidences: [
      { source: '行业增长的决定性变量', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: 'AI芯片市场增长主要由AI应用商业化进度、AI模型规模化趋势和企业AI基础设施投资意愿共同驱动，供应链产能是短期主要约束。', reliability: 'high', children: [
        { source: 'Gartner AI基础设施报告', url: 'https://www.gartner.com/', date: '2024-09-15', snippet: 'AI芯片市场持续高速增长，Nvidia凭借全栈优势占据主导地位。供应链产能是短期核心瓶颈。', reliability: 'high' },
      ] },
      { source: '胜负手与竞争定位', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2026-02-11', snippet: '三大胜负手：①CUDA 400万开发者生态护城河；②每年一代迭代节奏，领先竞争对手2-3代；③锁定TSMC等关键供应商产能。市场份额86%，竞争定位绝对领先，确信度95%以上。', reliability: 'high', children: [
        { source: 'NVIDIA FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: '数据中心业务营收增长+114%，市场份额86%，验证绝对领先的竞争定位。CUDA生态和架构迭代速度是核心壁垒。', reliability: 'high' },
      ] },
      { source: '竞争格局演变预测', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: '短期（1-2年）份额维持80-85%；中期（3-5年）竞争加剧，份额可能降至70-75%；长期（5-10年）市场结构可能重塑，份额可能在50-60%，但仍为最大参与者。', reliability: 'high', children: [
        { source: 'SemiAnalysis竞争分析', url: 'https://www.semianalysis.com/p/nvidia-blackwell-platform-and-gb200', date: '2024-06-15', snippet: 'AMD和Intel在追赶但差距仍大。Hyperscaler自研芯片是中长期最大变量，但短期仍是补充而非替代。', reliability: 'high' },
      ] },
    ],
  },
  {
    title: '经营阶段与KPI验证体系（创新型≥10项）',
    rating: 'strongBuy',
    summary: 'Nvidia当前正处于规模化收获期。营收增长+114%、净利率55%、费用率12.6%、市场份额86%等各项指标均高度匹配甚至超出此阶段的典型特征。预计此阶段可持续2-3年。15项关键KPI构成完整验证体系。',
    content: `经营阶段判断：规模化收获期。Nvidia的营收增长（+114%）、盈利能力（净利率55%）、运营杠杆（费用率12.6%）和市场地位（份额86%）等各项指标均高度匹配甚至超出此阶段的典型特征。预计此阶段可持续2-3年。

KPI验证体系包含15项关键指标，按优先级划分：

核心收入指标：营收季度环比增速（>15%为优秀，10-15%良好，<10%警告）、毛利率（>73%优秀，68-73%良好，<68%警告）。

竞争优势指标：市场份额（>85%优秀，80-85%良好，<80%警告）、性能/成本/ROI对标（性能领先>2倍优秀，<1.5倍警告）、切换成本代理指标（CUDA开发者增速>20%优秀，<10%警告）。

增长质量指标：客户集中度（前4大客户占比<65%优秀，65-70%良好，>70%警告）、NRR/留存代理（前10大客户营收占比上升为优秀，下降为警告）、ARPU/单客收入（环比增长>10%优秀，<5%警告）。

效率指标：研发费用率（<10%优秀，10-15%良好，>15%警告）、研发→商业化周期（<30个月优秀，>36个月警告）。`,
    evidences: [
      { source: '经营阶段判断：规模化收获期', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2026-02-11', snippet: '营收增长+114%、净利率55%、运营杠杆费用率12.6%、市场份额86%，各项指标均高度匹配规模化收获期特征。预计此阶段可持续2-3年。', reliability: 'high', children: [
        { source: 'NVIDIA FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: 'FY2025全年营收大幅增长，净利率达55%，运营杠杆效应显著，验证规模化收获期判断。', reliability: 'high' },
        { source: 'NVIDIA FY2026Q3财报', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2025-11-20', snippet: '数据中心收入持续高速增长，毛利率维持高位，客户结构多元化扩散，平台化转型初见成效。', reliability: 'high' },
      ] },
      { source: 'KPI验证体系（15项）', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: '15项KPI覆盖收入、利润、竞争优势、增长质量和效率五大维度。核心指标：营收季度环比增速（>15%优秀）、毛利率（>73%优秀）、市场份额（>85%优秀）、研发费用率（<10%优秀）。验证频率从月度到年度不等。', reliability: 'high', children: [
        { source: 'Macrotrends财务数据', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: '研发费用率从FY2023的27.2%降至FY2025的9.9%，毛利率持续提升，运营杠杆效应显著。各项KPI指标均处于优秀区间。', reliability: 'high' },
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
    rating: isInnovation ? 'strongBuy' : isService ? 'buy' : isInvestment ? 'buy' : pick(ratings),
    conclusion: isInnovation
      ? '【强烈推荐】综合五要素框架分析，Nvidia凭借其在产品力、研发效率、生态系统和市场地位上的绝对优势，正处于前所未有的"规模化收获期"。Blackwell整体AI性能为Hopper的2.5倍，推理性能提升15倍，能效提升10倍，3-5年TCO为客户节省30-50%。研发费用率从27.2%降至9.9%体现强大运营杠杆，研发ROI高达1:12.5，人均营收363万美元/人（AMD的4.2倍）。市场份额86%，CUDA 400万开发者生态构成极高切换成本，竞争定位确信度95%以上。营收增长+114%、净利率55%、15项KPI构成完整验证体系。核心风险：超大规模客户AI支出增长的可持续性、75%毛利率的均值回归压力、前4大客户占营收61%的集中度风险。通过持续监控KPI体系和最小反证集合，可更敏锐地捕捉改变发展轨迹的关键信号。硬止损线为营收环比增速连续两季<10%且毛利率跌破70%。'
      : isService
        ? '【推荐】综合五大服务要素分析，亚朵处于快速扩张期，单店GOP利润率35-38%、Payback 22个月的经济模型已验证成熟，7200万A-Card会员（复购率42%、LTV 4倍于非会员）构成强需求侧护城河。运营效率行业领先（RevPAR 398元、人均毛利4.8万/季），管理杠杆持续释放（费用率8.2%且仍在下降），场景零售GMV 12.4亿开辟第二增长曲线。KPI验证10项中7项绿灯。核心风险在于：店长储备缺口15%制约开店节奏、一线城市租金占比升至28.5%逼近警戒线、同城自我竞争初现（高密度城市RevPAR下降5-8%）、加盟商坏账率从1.2%升至1.8%。若SSSG连续两季低于通胀则品牌力透支信号明确。建议买入并中长期持有，硬止损线为单店Payback超30个月或坏账率破3%。'
        : isInvestment
          ? '【买入】综合五大投资要素分析，紫金矿业处于供给紧张期+产能释放的双重受益窗口。资源禀赋突出：矿产铜C1成本约1500美元/吨，处于全球25%分位，成本优势显著且可持续。供需格局有利：全球铜缺口约50万吨，新能源驱动需求增速15-20%/年，而矿山供给增速仅2-3%，供给紧张预计持续至2028年。产能释放确定性高：卡莫阿三期（2026Q4）、巨龙二期（2027Q2）将新增铜产能约35万吨，IRR 18-22%。财务健康度良好：经营现金流/净利润1.15，净负债/EBITDA 1.6x且持续改善。12项KPI中9项绿灯。核心风险：刚果金地缘政治（卡莫阿占铜产量30%）、铜价周期性回调、竞争对手成本追赶。建议买入，硬止损线为供需缺口消失或净负债/EBITDA>2.5x。'
          : pick(conclusions),
    elements: isInnovation ? generateInnovationElements() : isService ? generateServiceElements() : isInvestment ? generateInvestmentElements() : titles.map(t => generateElement(t)),
    counterArgument: isInnovation ? {
      summary: '针对每个要素的最小反证集合：若主要云服务商转向"足够好"的竞品、Nvidia迭代失速、大客户流失、反Nvidia联盟成立、或营收环比增速连续两季低于10%且毛利率跌破70%，当前乐观结论将被推翻。最脆弱假设是超大规模客户AI支出的无限增长。',
      content: `针对新品竞争力的反证条件：一家主要的云服务商宣布其下一代AI服务将主要基于性能"足够好"且TCO更优的竞争对手硬件。这将打破Nvidia的"性能唯一论"。

针对研发效率的反证条件：Nvidia的下一代产品发布周期显著延长（>18个月）且性能提升幅度远低于预期（<50%），同时研发费用率回升至15%以上。这表明其研发引擎开始"失速"。

针对商业化与留存的反证条件：在单个季度内，Nvidia前四大客户中任何一家的营收贡献占比下降超过5个百分点，且未被其他客户增长所抵消。这是客户集中度风险兑现的明确信号。

针对竞争格局的反证条件：一个由主要科技公司组成的正式联盟成立，共同创建和推广一个与CUDA直接竞争的开放AI软硬件标准。这将是"反Nvidia联盟"的正式形成。

针对经营阶段与KPI的反证条件：Nvidia的季度营收环比增速连续两个季度低于10%，同时毛利率跌破70%。这将表明其已从爆发式增长过渡到平台期，当前估值将难以维持。

最脆弱假设3条：
1. 超大规模客户AI支出的无限增长——这取决于其自身AI服务的商业化成功，而这一点尚未得到充分验证。
2. 12个月迭代周期的可持续性——这可能遭遇物理定律、设计复杂性或供应链能力的瓶颈。
3. 高利润率的常态化——75%的毛利率在硬件行业中是罕见的，均值回归的压力巨大。

最大不确定性：当前的需求究竟是反映了AI的长期结构性转变，还是包含了一次性的、恐慌性的"军备竞赛"式采购，其可持续性存疑。

对应验证动作：将Nvidia的营收增长与主要客户（云服务商）的AI服务营收增长进行对比，如果前者增速持续远高于后者，则表明存在库存积累或过度投资的风险。`,
      evidences: [
        { source: 'Nvidia FY2026Q3财报', url: 'https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2026/default.aspx', date: '2025-11-20', snippet: '前4大客户占营收61%，客户集中度风险显著。若任一大客户营收贡献下降超5pct且未被其他客户抵消，将是风险兑现的明确信号。', reliability: 'high' },
        { source: 'Nvidia FY2025财报', url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025', date: '2025-02-26', snippet: '75%的毛利率在硬件行业中罕见，均值回归压力巨大。需持续验证定价权是否可持续。', reliability: 'high' },
        { source: 'NexGenCloud竞品分析', url: 'https://www.nexgencloud.com/blog/performance-benchmarks/nvidia-blackwell-vs-nvidia-hopper-a-detailed-comparison', date: '2024-12-15', snippet: 'AMD MI300X性能约为Hopper的70-80%但价格更低。若主要云服务商转向"足够好"的竞品硬件，将打破Nvidia的性能唯一论。', reliability: 'high' },
        { source: 'Macrotrends研发费用数据', url: 'https://www.macrotrends.net/stocks/charts/NVDA/nvidia/research-development-expenses', date: '2026-02-11', snippet: '研发费用率从27.2%降至9.9%体现运营杠杆，但若回升至15%以上则表明研发引擎失速。需持续跟踪迭代周期和性能提升幅度。', reliability: 'high' },
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
        '超大规模客户AI支出的无限增长假设——这取决于其自身AI服务的商业化成功，而这一点尚未得到充分验证，需将Nvidia营收增长与主要客户AI服务营收增长对比验证',
        '12个月迭代周期的可持续性——可能遭遇物理定律、设计复杂性或供应链能力的瓶颈，需跟踪每代产品从发布到量产的实际周期',
        '当前需求究竟是AI的长期结构性转变，还是包含一次性恐慌性"军备竞赛"式采购——其可持续性存疑，需对比Nvidia营收增速与客户AI服务营收增速的差异',
      ],
      hardConstraints: [
        '若季度营收环比增速连续两个季度低于10%，同时毛利率跌破70%，说明已从爆发式增长过渡到平台期，当前估值将难以维持',
        '若前四大客户中任一家营收贡献占比下降超5pct且未被其他客户增长抵消，说明客户集中度风险正在兑现',
        '若75%毛利率出现均值回归（硬件行业罕见的高利润率），说明定价权受损或竞争加剧，需立即重新评估估值模型',
      ],
      tradingPlan: [
        '加仓信号：营收季度环比增速维持>15% + 毛利率>73% + 市场份额>85% + CUDA开发者增速>20%/年，说明规模化收获期持续且护城河加深',
        '持有观察：营收季度环比增速10-15% + 毛利率68-73% + 市场份额80-85%，维持当前仓位，季度跟踪KPI验证体系',
        '减仓信号：营收季度环比增速降至<10% 或 客户集中度（前4大）突破70% 或 研发费用率回升至>15%，减仓并密切关注下季度数据',
        '清仓信号：营收环比增速连续两季<10% + 毛利率跌破70% + 主要云服务商宣布转向竞品，说明竞争格局发生根本性变化',
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
