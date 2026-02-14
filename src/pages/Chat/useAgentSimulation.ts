import { useRef, useCallback } from 'react'

import { useChatStore } from '@/stores/chatStore'
import { delay, randomId } from '@/utils'

import type { Step, ToolCall, ToolName, AgentExecution } from '@/stores/chatStore'

interface ScenarioStep {
    title: string
    tools: { name: ToolName; label: string; params: string; result: string }[]
    summary: string
    duration: number
}

interface Scenario {
    steps: ScenarioStep[]
    finalContent: string
}

function makeToolCall(tool: { name: ToolName; label: string; params: string; result: string }, duration: number): ToolCall {
    return {
        id: randomId(),
        name: tool.name,
        label: tool.label,
        paramsSummary: tool.params,
        resultSummary: tool.result,
        timestamp: Date.now(),
        duration,
    }
}

function matchScenario(input: string): Scenario {
    const lower = input.toLowerCase()

    if (/分析|股票|茅台|腾讯|英伟达|nvidia|比亚迪|宁德|行情/.test(lower)) {
        return {
            steps: [
                {
                    title: '搜索市场数据',
                    tools: [
                        { name: 'web_search', label: '网页搜索', params: '搜索最新行情与新闻', result: '获取到 12 条相关结果' },
                        { name: 'database_query', label: '数据查询', params: '查询历史价格数据', result: '返回 180 条日K数据' },
                    ],
                    summary: '已获取最新市场数据与历史行情',
                    duration: 3200,
                },
                {
                    title: '读取研报资料',
                    tools: [
                        { name: 'document_read', label: '文档读取', params: '读取近期研究报告', result: '解析 3 份研报，共 45 页' },
                    ],
                    summary: '完成机构研报要点提取',
                    duration: 2800,
                },
                {
                    title: '多维度分析',
                    tools: [
                        { name: 'data_analysis', label: '数据分析', params: '基本面与技术面综合分析', result: '生成分析矩阵' },
                        { name: 'chart_generate', label: '图表生成', params: '生成K线与指标图表', result: '已生成 3 张图表' },
                    ],
                    summary: '技术指标与基本面分析完成',
                    duration: 3500,
                },
                {
                    title: '撰写分析报告',
                    tools: [
                        { name: 'report_write', label: '报告撰写', params: '整合数据生成分析报告', result: '报告已生成（约 800 字）' },
                    ],
                    summary: '投资分析报告生成完成',
                    duration: 2500,
                },
            ],
            finalContent: '根据对该标的的多维度分析，当前市场表现如下：\n\n**基本面**：营收同比增长 15.2%，净利润率维持在 28.3%，ROE 达到 24.1%，整体基本面保持稳健。\n\n**技术面**：目前股价运行在 20 日均线上方，MACD 金叉形成，RSI 处于 58 中性偏强区间，短期趋势偏多。\n\n**资金面**：近 5 日主力资金净流入 3.2 亿元，北向资金持续增持，机构持仓比例提升至 42.5%。\n\n**风险提示**：需关注行业政策变动、原材料价格波动以及海外市场不确定性。\n\n综合评级：**谨慎看好** ⭐⭐⭐⭐',
        }
    }

    if (/研究|报告|调研|白皮书/.test(lower)) {
        return {
            steps: [
                {
                    title: '收集资料',
                    tools: [
                        { name: 'web_search', label: '网页搜索', params: '搜索相关研究文献', result: '找到 8 篇相关文献' },
                        { name: 'document_read', label: '文档读取', params: '阅读核心文献', result: '提取 5 篇关键文献摘要' },
                    ],
                    summary: '已收集并整理相关研究资料',
                    duration: 3000,
                },
                {
                    title: '数据分析与整理',
                    tools: [
                        { name: 'data_analysis', label: '数据分析', params: '交叉分析多源数据', result: '生成数据摘要表' },
                    ],
                    summary: '关键数据分析完成',
                    duration: 2500,
                },
                {
                    title: '生成研究报告',
                    tools: [
                        { name: 'report_write', label: '报告撰写', params: '撰写完整研究报告', result: '报告已完成（约 1200 字）' },
                    ],
                    summary: '研究报告已生成',
                    duration: 2800,
                },
            ],
            finalContent: '已为您完成研究报告。报告涵盖了行业现状、竞争格局、核心技术趋势以及未来发展预测。\n\n主要发现：\n1. 市场规模预计在未来 3 年内增长 45%\n2. 头部企业市占率集中度提升明显\n3. 技术创新是驱动增长的关键因素\n\n详细报告已整理完毕，您可以进一步询问具体细节。',
        }
    }

    // 默认对话场景
    return {
        steps: [
            {
                title: '理解问题',
                tools: [
                    { name: 'web_search', label: '网页搜索', params: '搜索相关信息', result: '获取到 5 条参考信息' },
                ],
                summary: '已理解您的问题并收集参考资料',
                duration: 1800,
            },
            {
                title: '生成回复',
                tools: [
                    { name: 'data_analysis', label: '数据分析', params: '分析整理信息', result: '信息整理完成' },
                ],
                summary: '回复内容已生成',
                duration: 2000,
            },
        ],
        finalContent: '根据我的分析和搜索结果，以下是我的回答：\n\n这是一个很好的问题。基于当前可获取的信息，我已经为您整理了相关要点。如果您需要更深入的分析或有其他问题，请随时告诉我。',
    }
}

export function useAgentSimulation() {
    const cancelRef = useRef(false)
    const updateMessage = useChatStore((s) => s.updateMessage)

    const simulate = useCallback(async (sessionId: string, messageId: string, userInput: string) => {
        cancelRef.current = false
        const scenario = matchScenario(userInput)

        // Initialize all steps as pending
        const initialSteps: Step[] = scenario.steps.map((s, i) => ({
            id: `step-${i}`,
            title: s.title,
            status: 'pending' as const,
            duration: 0,
            summary: '',
            toolCalls: [],
        }))

        const execution: AgentExecution = {
            status: 'running',
            steps: initialSteps,
            totalDuration: 0,
            tokenUsage: { input: 0, output: 0 },
        }

        // Set initial execution state
        updateMessage(sessionId, messageId, (msg) => ({ ...msg, agentExecution: { ...execution } }))
        await delay(400)

        let totalElapsed = 0

        for (let i = 0; i < scenario.steps.length; i++) {
            if (cancelRef.current) return
            const scenarioStep = scenario.steps[i]!

            // Set step to running
            updateMessage(sessionId, messageId, (msg) => {
                const steps = [...(msg.agentExecution?.steps || [])]
                const step = steps[i]
                if (step) steps[i] = { ...step, status: 'running' }
                return { ...msg, agentExecution: { ...msg.agentExecution!, steps, status: 'running' } }
            })

            // Add tool calls one by one
            for (let t = 0; t < scenarioStep.tools.length; t++) {
                if (cancelRef.current) return
                await delay(600)
                const tool = scenarioStep.tools[t]!
                const tc = makeToolCall(tool, 400 + Math.random() * 800)

                updateMessage(sessionId, messageId, (msg) => {
                    const steps = [...(msg.agentExecution?.steps || [])]
                    const step = steps[i]
                    if (step) {
                        steps[i] = { ...step, toolCalls: [...step.toolCalls, tc] }
                    }
                    return { ...msg, agentExecution: { ...msg.agentExecution!, steps } }
                })
            }

            // Simulate step processing time
            await delay(800 + Math.random() * 600)
            if (cancelRef.current) return

            totalElapsed += scenarioStep.duration

            // Mark step as done
            updateMessage(sessionId, messageId, (msg) => {
                const steps = [...(msg.agentExecution?.steps || [])]
                const step = steps[i]
                if (step) {
                    steps[i] = {
                        ...step,
                        status: 'done',
                        duration: scenarioStep.duration,
                        summary: scenarioStep.summary,
                    }
                }
                return {
                    ...msg,
                    agentExecution: { ...msg.agentExecution!, steps, totalDuration: totalElapsed },
                }
            })
        }

        if (cancelRef.current) return

        // Mark execution as done with final content
        updateMessage(sessionId, messageId, (msg) => ({
            ...msg,
            content: scenario.finalContent,
            agentExecution: {
                ...msg.agentExecution!,
                status: 'done',
                totalDuration: totalElapsed,
                tokenUsage: {
                    input: 2400 + Math.floor(Math.random() * 1600),
                    output: 800 + Math.floor(Math.random() * 600),
                },
            },
        }))
    }, [updateMessage])

    const cancel = useCallback(() => {
        cancelRef.current = true
    }, [])

    return { simulate, cancel }
}
