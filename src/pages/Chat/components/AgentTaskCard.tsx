import { useState } from 'react'
import { CheckCircle2, Loader2, AlertCircle, ChevronDown, Zap } from 'lucide-react'

import { cn } from '@/utils'
import { StepTimeline } from './StepTimeline'

import type { AgentExecution } from '@/stores/chatStore'

const statusDisplay = {
    idle: { icon: <Loader2 className="h-4 w-4 text-slate-400" />, text: '准备中', color: 'text-slate-500' },
    running: { icon: <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />, text: '执行中', color: 'text-amber-600' },
    done: { icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />, text: '已完成', color: 'text-emerald-600' },
    error: { icon: <AlertCircle className="h-4 w-4 text-red-500" />, text: '失败', color: 'text-red-600' },
}

export function AgentTaskCard({ execution }: { execution: AgentExecution }) {
    const [expanded, setExpanded] = useState(true)
    const display = statusDisplay[execution.status]
    const isRunning = execution.status === 'running' || execution.status === 'idle'

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <button
                type="button"
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => !isRunning && setExpanded((v) => !v)}
            >
                {display.icon}
                <span className={cn('text-sm font-medium flex-1', display.color)}>
                    {display.text}
                </span>
                {execution.totalDuration > 0 && (
                    <span className="text-xs text-slate-400">
                        {(execution.totalDuration / 1000).toFixed(1)}s
                    </span>
                )}
                <ChevronDown className={cn(
                    'h-4 w-4 text-slate-400 transition-transform duration-200',
                    expanded && 'rotate-180'
                )} />
            </button>

            {/* Body — collapsible */}
            <div
                className={cn(
                    'overflow-hidden transition-all duration-300',
                    expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="px-3.5 pb-3 pt-1 border-t border-slate-100">
                    <StepTimeline steps={execution.steps} />

                    {/* Token usage — only after completion */}
                    {execution.status === 'done' && execution.tokenUsage.input > 0 && (
                        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-400">
                            <Zap className="h-3 w-3" />
                            <span>Token: {execution.tokenUsage.input.toLocaleString()} 输入 / {execution.tokenUsage.output.toLocaleString()} 输出</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
