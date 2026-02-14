import { Search, Database, FileText, BarChart3, LineChart, PenTool } from 'lucide-react'

import { cn } from '@/utils'

import type { ToolName } from '@/stores/chatStore'

const toolConfig: Record<ToolName, { icon: typeof Search; label: string; color: string }> = {
    web_search: { icon: Search, label: '网页搜索', color: 'bg-blue-50 text-blue-600' },
    database_query: { icon: Database, label: '数据查询', color: 'bg-violet-50 text-violet-600' },
    document_read: { icon: FileText, label: '文档读取', color: 'bg-amber-50 text-amber-600' },
    data_analysis: { icon: BarChart3, label: '数据分析', color: 'bg-emerald-50 text-emerald-600' },
    chart_generate: { icon: LineChart, label: '图表生成', color: 'bg-cyan-50 text-cyan-600' },
    report_write: { icon: PenTool, label: '报告撰写', color: 'bg-rose-50 text-rose-600' },
}

export function ToolCallBadge({ name }: { name: ToolName }) {
    const config = toolConfig[name]
    const Icon = config.icon

    return (
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', config.color)}>
            <Icon className="h-3 w-3" />
            {config.label}
        </span>
    )
}
