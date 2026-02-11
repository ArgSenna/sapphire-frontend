import { randomId } from '@/utils'
import { mockStocks } from './stocks'

import type { Evidence } from '../types'
import type { ResearchType, Rating, ResearchElement, ResearchCounterArgument, ResearchReport, ResearcherNote } from '../types'

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
      { source: '性能/成本/ROI对标', url: 'https://www.cninfo.com.cn', date: '2025-12-15', snippet: '对标竞品A及开源方案B。推理延迟降低40%，准确率提升15%/40%，单次调用成本低22%，ROI 2.8x vs 2.1x。差距来源：自研推理引擎优化。可持续性：短期可持续，需关注竞品迭代。', reliability: 'high', children: [
        { source: '公司产品白皮书', url: 'https://www.cninfo.com.cn', date: '2025-12-10', snippet: '第三代推理引擎Benchmark测试：延迟P99降至45ms，准确率98.2%，较竞品A的83ms/96.8%有显著优势。', reliability: 'high' },
        { source: '客户POC测试报告', url: 'https://xueqiu.com', date: '2025-12-08', snippet: '某金融客户实测ROI 3.1x，超出预期。单次调用成本0.012元 vs 竞品A的0.015元，年化节省约180万。', reliability: 'medium' },
      ] },
      { source: '替代路径分析', url: 'https://data.eastmoney.com', date: '2025-12-20', snippet: '替代对象：规则引擎+人工审核。替代顺序：先标准化场景（60%）再长尾。数据迁移2-4周，流程改造需客户IT配合，难点在历史数据格式兼容与审批流程再造。', reliability: 'high', children: [
        { source: '客户迁移案例', url: 'https://www.cninfo.com.cn', date: '2025-12-15', snippet: '某制造业客户从规则引擎迁移，标准化场景2周完成切换，长尾场景仍需人工兜底，整体替代率达75%。', reliability: 'high' },
        { source: '售前团队反馈', url: 'https://www.cls.cn', date: '2025-12-12', snippet: '历史数据格式兼容是最大痛点，约30%客户需要额外的ETL开发，平均增加1-2周迁移时间。', reliability: 'medium' },
      ] },
      { source: 'POC转化率跟踪', url: 'https://www.10jqka.com.cn', date: '2025-12-18', snippet: '整体POC→签约38%。分行业：金融45%、制造35%、零售30%。分客群：大型50%+、中型30%。缺口：中小客群样本不足，计划Q3渠道合作补齐。', reliability: 'high', children: [
        { source: 'CRM系统数据', url: 'https://www.cninfo.com.cn', date: '2025-12-16', snippet: 'Q3累计POC 82家，签约31家，转化率37.8%。金融行业22家POC签约10家（45.5%），为最高转化行业。', reliability: 'high' },
        { source: '渠道合作进展', url: 'https://www.cls.cn', date: '2025-12-14', snippet: '已与3家渠道商签署中小客户拓展协议，预计Q4新增POC 40+家，补齐中小客群数据缺口。', reliability: 'medium' },
      ] },
      { source: '上线周期调研', url: 'https://xueqiu.com', date: '2025-12-16', snippet: 'POC到规模化部署3-6个月。瓶颈：客户安全审批6周、定制集成开发4周、数据回流与模型微调3周。', reliability: 'medium', children: [
        { source: '项目管理系统统计', url: 'https://www.cninfo.com.cn', date: '2025-12-12', snippet: '近6个月完成部署的18个项目，中位数周期4.2个月。最快2.5个月（标准化场景），最慢7个月（金融定制化）。', reliability: 'high' },
        { source: '客户访谈纪要', url: 'https://xueqiu.com', date: '2025-12-10', snippet: '某银行客户反馈：内部安全审批流程固定6-8周，建议公司提前介入预审，可缩短2周。', reliability: 'medium' },
      ] },
      { source: '部署门槛评估', url: 'https://www.cls.cn', date: '2025-12-14', snippet: '算力：推荐4卡A10 GPU，支持私有化与混合云。集成：标准API/SDK，需对接ERP/CRM。合规：等保三级，金融客户要求数据不出境。', reliability: 'high', children: [
        { source: '技术架构文档', url: 'https://www.cninfo.com.cn', date: '2025-12-10', snippet: '最低配置4卡A10（推理）或2卡A100（训练+推理），已适配阿里云、华为云、腾讯云三大平台的GPU实例。', reliability: 'high' },
        { source: '合规审计报告', url: 'https://www.stcn.com', date: '2025-12-08', snippet: '已通过等保三级认证（证书编号XXX），ISO27001年审通过。金融行业数据不出境方案已落地5家客户。', reliability: 'high' },
      ] },
      { source: '切换成本评估', url: 'https://www.stcn.com', date: '2025-12-12', snippet: '综合评估"中高"。数据层：格式转换；流程层：审批与告警重配；组织层：培训2-3天；合同层：部分排他条款；生态绑定：主流云厂商适配，锁定风险低。', reliability: 'medium', children: [
        { source: '客户成功团队评估', url: 'https://www.cninfo.com.cn', date: '2025-12-08', snippet: '对已上线客户的切换成本评分：数据沉淀7.2/10、流程集成6.8/10、组织依赖5.5/10，综合6.5/10。', reliability: 'high' },
        { source: '竞品替换案例', url: 'https://xueqiu.com', date: '2025-12-05', snippet: '某客户从竞品切换至公司产品耗时3个月，主要时间花在数据迁移和流程重配，反向验证了切换壁垒。', reliability: 'medium' },
      ] },
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
      { source: '研发费用率趋势', url: 'https://www.cninfo.com.cn', date: '2025-11-30', snippet: '近四季研发费用率：19.2%→18.8%→18.5%→17.9%，收入增速31%快于研发投入增速22%，费用杠杆显现。毛利率同期69%→72%，每降1pct费用率对应毛利改善0.8pct。管理层指引16-18%。', reliability: 'high', children: [
        { source: '季度财报', url: 'https://www.cninfo.com.cn', date: '2025-11-28', snippet: 'Q4研发费用2.15亿，同比+22%；营收12.0亿，同比+31%。费用结构：基础研究25%、应用开发50%、工程化25%，结构稳定。', reliability: 'high' },
        { source: '管理层电话会纪要', url: 'https://data.eastmoney.com', date: '2025-11-29', snippet: 'CFO指引：研发费用率将稳定在16-18%，释放的费用空间优先投向销售团队扩张和生态伙伴激励。', reliability: 'high' },
      ] },
      { source: '研发人均产出', url: 'https://www.cls.cn', date: '2025-12-10', snippet: '研发420人，年发布186功能点，人均4.4个/年（行业2.8）。12个项目9个按期交付，按期率75%（行业60%）。人均专利0.38件/年（行业0.15），发明专利占比72%。关键岗位流失率<5%。', reliability: 'high', children: [
        { source: '产品发布日志', url: 'https://www.cninfo.com.cn', date: '2025-12-08', snippet: 'Q3发布52个功能点（Q2 48个），含3个重大功能：实时风控引擎v2、多模态数据分析、自动化合规报告。', reliability: 'high' },
        { source: '专利数据库', url: 'https://www.stcn.com', date: '2025-12-05', snippet: '年度申请专利160件，其中发明专利115件（72%）。核心专利集中在推理优化（38件）和数据处理（27件）领域。', reliability: 'high' },
        { source: 'HR年度报告', url: 'https://www.10jqka.com.cn', date: '2025-12-01', snippet: '研发团队420人，同比+15%。关键岗位（架构师/算法负责人）流失率4.2%，低于行业12%均值。人均薪酬同比+8%。', reliability: 'medium' },
      ] },
      { source: '研发到商业化周期', url: 'https://data.eastmoney.com', date: '2025-12-08', snippet: '立项→原型4.2个月→内测上线1.8个月→首付费客户2个月，全程约8个月。近三个项目首年营收1.2亿，回收周期18个月。瓶颈在原型→内测阶段（QA资源与合规测试）。', reliability: 'high', children: [
        { source: '项目管理系统', url: 'https://www.cninfo.com.cn', date: '2025-12-05', snippet: '近12个月商业化项目：实时风控v2（立项→收入7个月）、智能客服（9个月）、合规引擎（8个月），均值8个月。', reliability: 'high' },
        { source: '财务数据', url: 'https://data.eastmoney.com', date: '2025-12-03', snippet: '实时风控v2首年贡献5200万，智能客服3800万，合规引擎3000万，合计1.2亿。研发投入合计6800万，回收周期约18个月。', reliability: 'high' },
      ] },
      { source: '投入与毛利相关性', url: 'https://www.10jqka.com.cn', date: '2025-12-05', snippet: '近8季度研发费用与次季毛利率相关系数0.72。传导：研发→功能完善→ARPU↑→收入增长快于成本→毛利改善。反例：2024Q3投入+15%但毛利未改善，因集中于基础研究，剔除后系数0.81。', reliability: 'medium', children: [
        { source: '财务模型回归', url: 'https://data.eastmoney.com', date: '2025-12-02', snippet: '8季度数据回归：研发费用每增加1000万，次季毛利率平均改善0.3pct（R²=0.52）。滞后一季度效果最显著。', reliability: 'high' },
        { source: '2024Q3异常分析', url: 'https://www.cninfo.com.cn', date: '2025-12-01', snippet: '2024Q3研发费用环比+15%（+2800万），其中2100万投向新技术路线探索（大模型微调框架），属前置投入，产品化预计2025Q2。', reliability: 'high' },
      ] },
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
      { source: 'NRR/留存分层', url: 'https://www.eastmoney.com', date: '2025-12-12', snippet: '整体NRR 118%。大客户（>100万）：Logo留存97%，NRR 128%，驱动=模块渗透45%+用量35%+提价20%。中型：留存88%，NRR 112%。小型（<20万）：留存78%，NRR 95%净流失。', reliability: 'high', children: [
        { source: '客户成功系统', url: 'https://www.cninfo.com.cn', date: '2025-12-10', snippet: '大客户流失仅2家（共68家），均因企业并购导致采购主体变更，非产品原因。中型客户流失12家，主因预算缩减（7家）和竞品替代（5家）。', reliability: 'high' },
        { source: '续约分析报告', url: 'https://data.eastmoney.com', date: '2025-12-08', snippet: '大客户扩展收入中，数据分析模块交叉销售贡献最大（45%），其次API用量自然增长（35%），年度提价3-5%贡献20%。', reliability: 'high' },
      ] },
      { source: 'ARPU/单客收入', url: 'https://www.stcn.com', date: '2025-12-10', snippet: 'ARPU 86万/年，同比+18%。扩张来源：模块渗透40%、用量增长35%、席位扩展15%、价格调整10%。扩张来源多元化降低单一依赖风险。', reliability: 'high', children: [
        { source: '产品使用数据', url: 'https://www.cninfo.com.cn', date: '2025-12-08', snippet: '客均使用模块数从2.3提升至2.8个/年，数据分析模块渗透率从35%提升至52%，合规模块从20%提升至38%。', reliability: 'high' },
        { source: '计费系统统计', url: 'https://www.10jqka.com.cn', date: '2025-12-06', snippet: '按用量计费客户占比42%，该群体ARPU同比+25%，高于整体18%，主要因业务量增长带动API调用量提升。', reliability: 'medium' },
      ] },
      { source: '客户结构分析', url: 'https://www.cninfo.com.cn', date: '2025-12-08', snippet: '大客户68家占收入55%，同比+25%。行业分布：金融35%、制造20%、零售15%、医疗12%、其他18%。Top10占比35%上升中，Top1占比8%。', reliability: 'high', children: [
        { source: '销售CRM数据', url: 'https://www.cninfo.com.cn', date: '2025-12-06', snippet: '新增大客户14家（去年同期11家），金融+5、制造+4、医疗+3、零售+2。医疗行业增速最快，同比+60%。', reliability: 'high' },
        { source: '集中度风险评估', url: 'https://data.eastmoney.com', date: '2025-12-04', snippet: 'Top10客户占比35%（去年32%），Top1为某国有银行占比8%，合同期至2027年。若Top1流失，收入影响约6400万。', reliability: 'high' },
      ] },
      { source: '订单/RPO', url: 'https://data.eastmoney.com', date: '2025-12-06', snippet: 'RPO 6.2亿，同比+28%。订单→收入转化周期4.5个月。历史取消率<3%，大客户多为年度预付，取消风险极低。', reliability: 'high', children: [
        { source: '财务系统', url: 'https://www.cninfo.com.cn', date: '2025-12-04', snippet: 'RPO构成：1年内确认4.8亿（77%），1-2年确认1.4亿（23%）。新签合同平均期限1.6年，较去年1.3年延长。', reliability: 'high' },
        { source: '合同管理系统', url: 'https://www.stcn.com', date: '2025-12-02', snippet: '年度取消订单7笔（总计218笔），取消金额占比2.1%，均为年付费<20万的小客户，原因为预算冻结。', reliability: 'medium' },
      ] },
      { source: '渠道转化效率', url: 'https://www.cls.cn', date: '2025-12-04', snippet: 'CAC：大客户42万（周期5-7月）、中型18万（周期2-3月），近两季上升8%。渠道伙伴贡献新签22%、收入12%。CAC回收11个月，LTV/CAC 5.2x。', reliability: 'high', children: [
        { source: '销售效率分析', url: 'https://data.eastmoney.com', date: '2025-12-02', snippet: '大客户CAC上升主因：售前方案定制工时增加20%（客户需求复杂化），销售周期从4.5月延长至5.8月。', reliability: 'high' },
        { source: '渠道合作报告', url: 'https://www.cls.cn', date: '2025-11-30', snippet: '渠道伙伴120家，活跃伙伴58家（48%）。伙伴贡献新签48家客户（占22%），但以中小客户为主，客单价仅32万。', reliability: 'medium' },
      ] },
      { source: '价格与折扣', url: 'https://xueqiu.com', date: '2025-12-01', snippet: '折扣纪律：大客户平均12%（行业15-20%）、中型8%。续费提价3-5%，执行率92%。竞争压力：中小客户市场被迫首年7折，大客户价格稳固。', reliability: 'medium', children: [
        { source: '定价委员会纪要', url: 'https://www.cninfo.com.cn', date: '2025-11-28', snippet: '大客户折扣审批权限：10%以内销售总监审批，10-15%需VP审批，>15%需CEO审批。Q3超15%折扣仅2笔（战略客户）。', reliability: 'high' },
        { source: '续费数据', url: 'https://www.stcn.com', date: '2025-11-25', snippet: '年度续费提价执行率92%（目标95%），未执行的8%主要因竞品报价压力（5%）和客户预算限制（3%）。', reliability: 'medium' },
      ] },
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
      { source: '行业增长拆解', url: 'https://data.eastmoney.com', date: '2025-12-16', snippet: '决定性变量5个：1）企业数字化预算增速→采购需求↑；2）AI技术成熟度→TAM扩大；3）监管趋严→利好持证厂商；4）云厂商捆绑→中小客户分流；5）开源成熟→差异化要求提高。', reliability: 'high', children: [
        { source: 'IDC行业报告', url: 'https://data.eastmoney.com', date: '2025-12-14', snippet: '2025年中国企业AI应用市场规模680亿，同比+38%。增长主驱动：数字化预算中AI占比从8%提升至14%，金融和制造业贡献55%增量。', reliability: 'high' },
        { source: '政策跟踪', url: 'https://www.stcn.com', date: '2025-12-12', snippet: '《数据安全法》实施细则落地，要求金融/医疗行业AI应用必须通过安全评估，利好持证厂商，预计淘汰30%小型供应商。', reliability: 'high' },
      ] },
      { source: '胜负手验证', url: 'https://www.cls.cn', date: '2025-12-14', snippet: '胜负手3条：①大客户续约率≥95%（当前97%，季度验证）；②模块渗透率→3.5+（当前2.8，半年度验证）；③云厂商免费策略冲击（季度新签验证，红线>30%下降）。', reliability: 'high', children: [
        { source: '续约率追踪', url: 'https://www.cninfo.com.cn', date: '2025-12-12', snippet: '近4季度大客户续约率：98%→97%→97%→97%，稳定在高位。Q3到期续约16家，实际续约16家，续约率100%。', reliability: 'high' },
        { source: '云厂商动态监测', url: 'https://www.cls.cn', date: '2025-12-10', snippet: '阿里云"通义千问企业版"免费策略上线2个月，已影响公司3笔中小客户新签（合计年付费45万），占中小客户新签的8%，尚在可控范围。', reliability: 'high' },
      ] },
      { source: '竞争定位判断', url: 'https://www.cninfo.com.cn', date: '2025-12-12', snippet: '定位：领先（有条件）。Gartner领导者+功能完整度第一；Top100企业覆盖38家；NRR 118%行业最高。条件：成本结构无规模优势，生态收入<5%。', reliability: 'high', children: [
        { source: 'Gartner报告', url: 'https://data.eastmoney.com', date: '2025-12-08', snippet: '2025年Gartner魔力象限：公司位于领导者象限右上角，执行力评分4.2/5（行业最高），愿景完整性3.8/5（第二）。', reliability: 'high' },
        { source: '客户覆盖统计', url: 'https://www.cninfo.com.cn', date: '2025-12-06', snippet: 'Fortune China 100企业中覆盖38家（竞对A 35家、竞对B 22家）。新增覆盖6家（金融3、能源2、医疗1）。', reliability: 'high' },
      ] },
      { source: '竞争对标-产品力/成本', url: 'https://www.10jqka.com.cn', date: '2025-12-10', snippet: '产品力：功能完整度第一+AI性能领先15%，竞对依赖第三方引擎，可追赶性中。成本：毛利72% vs 竞对75%，定制化占比大，可追赶性高。', reliability: 'high', children: [
        { source: '产品评测对比', url: 'https://www.10jqka.com.cn', date: '2025-12-08', snippet: '第三方评测（36氪）：公司产品功能覆盖度95%（竞对A 88%、竞对B 82%），AI准确率领先竞对A约15个百分点。', reliability: 'medium' },
        { source: '成本结构拆解', url: 'https://data.eastmoney.com', date: '2025-12-06', snippet: '公司交付成本中定制化占比38%（竞对A 25%），拉低毛利3pct。平台化改造后预计定制化占比降至25%，毛利率可提升至75%。', reliability: 'high' },
      ] },
      { source: '竞争对标-渠道/交付/合规', url: 'https://finance.sina.com.cn', date: '2025-12-08', snippet: '渠道：120伙伴ISV<5% vs 竞对200伙伴ISV 12%，落后2年。交付：NPS 62 vs 55，领先。合规：基本对等，医疗资质Q2补齐。', reliability: 'medium', children: [
        { source: '生态伙伴报告', url: 'https://www.cls.cn', date: '2025-12-06', snippet: '伙伴数量120家（竞对A 200+），活跃率48% vs 竞对A 55%。ISV贡献收入占比4.8%，竞对A为12%。差距主因：生态激励政策晚推出2年。', reliability: 'high' },
        { source: 'NPS调研', url: 'https://xueqiu.com', date: '2025-12-04', snippet: '年度NPS调研（样本186家客户）：公司62分（去年58分），竞对A 55分（去年52分）。公司优势项：响应速度（8.5/10）、客户成功（8.2/10）。', reliability: 'medium' },
      ] },
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
      { source: '经营阶段判断', url: 'https://www.cninfo.com.cn', date: '2025-12-20', snippet: '阶段：规模化爬坡期。证据5条：①PMF验证（NPS 62，行业45）；②ARR增速31%连续4季>25%；③LTV/CAC 5.2x但FCF为负；④销售团队扩张40%+渠道搭建；⑤5个模块上线，客均渗透2.8个。', reliability: 'high', children: [
        { source: 'NPS调研报告', url: 'https://www.cninfo.com.cn', date: '2025-12-18', snippet: 'NPS 62分（行业均值45分），样本186家客户。推荐者68%，被动者22%，贬损者10%。PMF充分验证。', reliability: 'high' },
        { source: '组织发展报告', url: 'https://www.cls.cn', date: '2025-12-16', snippet: '销售团队从85人扩至119人（+40%），渠道团队从12人扩至22人。组织重心从产品驱动向销售+产品双驱动转型。', reliability: 'high' },
        { source: '产品平台化进展', url: 'https://www.10jqka.com.cn', date: '2025-12-14', snippet: '已上线5个功能模块（核心引擎、数据分析、合规、智能客服、风控），客均渗透2.8个，平台化雏形显现。', reliability: 'medium' },
      ] },
      { source: '下一阶段条件', url: 'https://www.stcn.com', date: '2025-12-17', snippet: '必要条件3条（可跟踪）：①FCF转正（当前-0.8亿，目标2026Q3，季度跟踪）；②模块渗透率→3.5+（当前2.8，半年度跟踪）；③生态收入占比>8%（当前<5%，半年度跟踪）。达成=进入放量期。', reliability: 'high', children: [
        { source: '现金流预测模型', url: 'https://data.eastmoney.com', date: '2025-12-15', snippet: 'FCF转正路径：收入增速维持25%+，销售费用率从28%降至24%（产品自助化），预计2026Q3单季FCF转正。', reliability: 'high' },
        { source: '模块渗透计划', url: 'https://www.cninfo.com.cn', date: '2025-12-13', snippet: '渗透率提升策略：Q1模块捆绑套餐（+0.3）、Q2自助开通（+0.2）、Q3新模块上线（+0.2），目标年底达3.5。', reliability: 'medium' },
      ] },
      { source: '阶段性风险', url: 'https://data.eastmoney.com', date: '2025-12-15', snippet: '风险3条：①FCF转正推迟——销售费用超预期（对应CAC上升8%趋势）；②大客户集中度上升——Top10占比35%且仍升（核心客户流失冲击大）；③云厂商免费策略——中小客户新签若降>30%需重构增长模型。', reliability: 'high', children: [
        { source: '费用预警分析', url: 'https://data.eastmoney.com', date: '2025-12-13', snippet: 'Q3销售费用同比+35%，超预算8%，主因大客户拓展售前成本上升。若Q4延续，FCF转正可能推迟至2026Q4。', reliability: 'high' },
        { source: '客户集中度监测', url: 'https://www.cninfo.com.cn', date: '2025-12-11', snippet: 'Top10占比：Q1 33%→Q2 34%→Q3 35%，连续上升。Top1（某国有银行）占比8%，合同期至2027年，短期可控。', reliability: 'high' },
      ] },
      { source: 'KPI表-新品竞争力', url: 'https://www.10jqka.com.cn', date: '2025-12-13', snippet: '①ROI对标：≥2.5x绿灯/<2x红灯，半年度，内部测试+客户反馈，关联收入；②POC转化率：≥35%绿灯/<25%红灯，季度，CRM，关联收入；③上线周期：≤180天绿灯/>270天红灯，季度，项目系统，关联收入；④切换成本：评分≥7/10绿灯，年度，客户成功评估，关联溢价。', reliability: 'high', children: [
        { source: 'ROI实测数据', url: 'https://www.cninfo.com.cn', date: '2025-12-11', snippet: '最新半年度ROI实测：金融3.1x、制造2.6x、零售2.4x，加权平均2.8x，绿灯。竞品A同期2.1x。', reliability: 'high' },
        { source: 'POC转化追踪', url: 'https://www.10jqka.com.cn', date: '2025-12-09', snippet: 'Q3 POC转化率37.8%（82家/31家），绿灯。环比Q2的35.2%改善，金融行业45.5%最高。', reliability: 'high' },
      ] },
      { source: 'KPI表-研发效率', url: 'https://www.cls.cn', date: '2025-12-11', snippet: '⑤研发费用率：15-20%绿灯/>22%黄灯，季度，财报，关联利润；⑥人均产出：≥4个/人绿灯/<3红灯，半年度，发布日志，关联利润；⑦研发→商业化周期：≤10月绿灯/>14月红灯，半年度，项目系统，关联收入。', reliability: 'high', children: [
        { source: '最新季度数据', url: 'https://www.cninfo.com.cn', date: '2025-12-09', snippet: 'Q4研发费用率17.9%（绿灯），人均产出4.4个/年（绿灯），最新商业化项目周期7个月（绿灯）。三项均达标。', reliability: 'high' },
      ] },
      { source: 'KPI表-商业化/竞争', url: 'https://xueqiu.com', date: '2025-12-09', snippet: '⑧NRR：≥115%绿灯/<105%红灯，季度，财务系统，关联收入；⑨ARPU：同比≥10%绿灯，季度，关联收入；⑩客户集中度：Top10≤30%绿灯/>40%红灯，季度，关联溢价；⑪RPO：同比≥20%绿灯，季度，财报，关联收入；⑫竞品迭代：竞品更新<公司80%绿灯，季度，竞品监测，关联溢价。', reliability: 'medium', children: [
        { source: '竞品迭代监测', url: 'https://www.10jqka.com.cn', date: '2025-12-07', snippet: '竞对A季度功能更新：Q1 38个、Q2 42个、Q3 45个，追赶加快。公司Q3为52个，竞对达85%（去年70%），窗口期收窄。', reliability: 'high' },
        { source: 'NRR/ARPU验证', url: 'https://www.eastmoney.com', date: '2025-12-05', snippet: 'Q3 NRR 118%（绿灯），ARPU同比+18%（绿灯），RPO同比+28%（绿灯）。三项核心商业化指标均健康。', reliability: 'high' },
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
  return {
    id: randomId(),
    stockCode: code,
    stockName: stock?.name ?? code,
    type,
    rating: isInnovation ? 'buy' : isService ? 'buy' : pick(ratings),
    conclusion: isInnovation
      ? '综合五大创新要素分析，该标的新品竞争力突出，研发效率行业领先，商业化留存质量优异。竞争格局尚未固化但公司处于第一梯队，KPI验证体系完整且多数达标。主要风险在于大厂入局冲击与自由现金流尚未转正。建议以中长期视角配置，重点跟踪规模化放量节奏与现金流拐点。'
      : isService
        ? '【推荐】综合五大服务要素分析，亚朵处于快速扩张期，单店GOP利润率35-38%、Payback 22个月的经济模型已验证成熟，7200万A-Card会员（复购率42%、LTV 4倍于非会员）构成强需求侧护城河。运营效率行业领先（RevPAR 398元、人均毛利4.8万/季），管理杠杆持续释放（费用率8.2%且仍在下降），场景零售GMV 12.4亿开辟第二增长曲线。KPI验证10项中7项绿灯。核心风险在于：店长储备缺口15%制约开店节奏、一线城市租金占比升至28.5%逼近警戒线、同城自我竞争初现（高密度城市RevPAR下降5-8%）、加盟商坏账率从1.2%升至1.8%。若SSSG连续两季低于通胀则品牌力透支信号明确。建议买入并中长期持有，硬止损线为单店Payback超30个月或坏账率破3%。'
        : pick(conclusions),
    elements: isInnovation ? generateInnovationElements() : isService ? generateServiceElements() : titles.map(t => generateElement(t)),
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
    } : generateCounterArgument(),
    researcherNotes: isService ? {
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
    } : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
    model: 'Manus-Agent-v1',
  }
}

// in-memory store
const reports: ResearchReport[] = [
  generateReport('600519', 'investment'),
  generateReport('300750', 'innovation'),
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
