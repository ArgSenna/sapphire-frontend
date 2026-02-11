export interface AgentPrompt {
  id: string
  name: string
  version: string
  description: string
  template: string
}

const prompts: AgentPrompt[] = [
  {
    id: 'daily-summary',
    name: '每日信息汇总',
    version: 'v1.0.0',
    description: '汇总标的每日市场信息，包括行情走势、重要新闻、市场情绪等',
    template: `你是一个专业的投资分析助手。请对以下股票进行每日信息汇总分析：

股票代码：{{code}}
股票名称：{{name}}

请从以下维度进行分析：
1. 今日行情走势分析
2. 重要新闻和公告
3. 市场情绪判断
4. 短期趋势研判

输出格式：
- signal: green(利好) / red(利空) / yellow(中性)
- summary: 一句话总结
- content: 详细分析（200-500字）
- evidences: 信息来源列表`,
  },
  {
    id: 'event-prediction',
    name: '重大事件预测',
    version: 'v1.0.0',
    description: '预测可能影响标的价格的重大事件及其概率',
    template: `你是一个专业的事件预测分析师。请对以下股票进行重大事件预测：

股票代码：{{code}}
股票名称：{{name}}

请预测未来1-3个月内可能发生的重大事件：
1. 事件描述
2. 发生概率（0-100%）
3. 对股价的影响方向
4. 预计时间窗口

输出格式：
- signal: green(正面事件为主) / red(负面事件为主) / yellow(中性)
- events: 事件列表
- content: 综合分析`,
  },
  {
    id: 'capital-flow',
    name: '资金流分析',
    version: 'v1.0.0',
    description: '分析标的资金流向，包括主力资金、北向资金、机构持仓等',
    template: `你是一个专业的资金流分析师。请对以下股票进行资金流向分析：

股票代码：{{code}}
股票名称：{{name}}

请分析以下维度：
1. 主力资金流向（流入/流出/净额）
2. 北向资金动向
3. 机构持仓变化
4. 资金面综合研判

输出格式：
- signal: green(资金流入) / red(资金流出) / yellow(中性)
- data: 资金数据
- content: 详细分析`,
  },
  {
    id: 'risk-control',
    name: '风险控制',
    version: 'v1.0.0',
    description: '评估标的风险水平，提供止损止盈建议和风险预警',
    template: `你是一个专业的风险控制分析师。请对以下股票进行风险评估：

股票代码：{{code}}
股票名称：{{name}}

请评估以下维度：
1. 当前风险等级（低/中/高）
2. 建议止损位
3. 建议止盈位
4. 风险预警信号

输出格式：
- signal: green(风险可控) / red(风险偏高) / yellow(需关注)
- riskLevel: low/medium/high
- content: 详细分析和建议`,
  },
]

export function getPrompt(id: string): AgentPrompt | undefined {
  return prompts.find(p => p.id === id)
}

export function getAllPrompts(): AgentPrompt[] {
  return [...prompts]
}
