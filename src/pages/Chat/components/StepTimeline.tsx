import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react'

import { cn } from '@/utils'
import { ToolCallBadge } from './ToolCallBadge'

import type { Step } from '@/stores/chatStore'

const statusIcon = {
    done: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    running: <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />,
    pending: <Circle className="h-4 w-4 text-slate-300" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
}

export function StepTimeline({ steps }: { steps: Step[] }) {
    return (
        <div className="space-y-0">
            {steps.map((step, idx) => (
                <div key={step.id} className="relative flex gap-3">
                    {/* Vertical line + icon */}
                    <div className="flex flex-col items-center">
                        <div className="mt-0.5">{statusIcon[step.status]}</div>
                        {idx < steps.length - 1 && (
                            <div className="w-px flex-1 bg-slate-200 my-1" />
                        )}
                    </div>

                    {/* Content */}
                    <div className={cn('pb-4 flex-1 min-w-0', idx === steps.length - 1 && 'pb-0')}>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                'text-sm font-medium',
                                step.status === 'pending' ? 'text-slate-400' : 'text-slate-700'
                            )}>
                                {step.title}
                            </span>
                            {step.status === 'done' && step.duration > 0 && (
                                <span className="text-xs text-slate-400">{(step.duration / 1000).toFixed(1)}s</span>
                            )}
                        </div>
                        {step.summary && step.status === 'done' && (
                            <p className="text-xs text-slate-500 mt-0.5">{step.summary}</p>
                        )}
                        {step.toolCalls.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {step.toolCalls.map((tc) => (
                                    <ToolCallBadge key={tc.id} name={tc.name} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
