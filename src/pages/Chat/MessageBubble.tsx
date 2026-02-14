import { cn } from '@/utils'
import { Bot, User } from 'lucide-react'
import { AgentTaskCard } from './components/AgentTaskCard'

import type { AgentExecution } from '@/stores/chatStore'

interface MessageProps {
    role: 'user' | 'assistant'
    content: string
    agentExecution?: AgentExecution
}

export function MessageBubble({ role, content, agentExecution }: MessageProps) {
    const isUser = role === 'user'

    return (
        <div className={cn(
            "flex gap-3 mb-6",
            isUser ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Avatar */}
            <div className={cn(
                "flex-none h-8 w-8 rounded-full flex items-center justify-center mt-0.5",
                isUser ? "bg-slate-200" : "bg-black text-white"
            )}>
                {isUser ? <User className="h-5 w-5 text-slate-600" /> : <Bot className="h-5 w-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 max-w-[85%] space-y-3">
                {agentExecution && (
                    <AgentTaskCard execution={agentExecution} />
                )}

                {content && (
                    <div className={cn(
                        "rounded-2xl p-3 text-[15px] leading-relaxed whitespace-pre-wrap",
                        isUser
                            ? "bg-slate-900 text-white rounded-tr-sm"
                            : "bg-white border border-slate-100 rounded-tl-sm shadow-sm text-slate-800"
                    )}>
                        {content}
                    </div>
                )}
            </div>
        </div>
    )
}
