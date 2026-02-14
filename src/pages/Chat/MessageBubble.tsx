import { cn } from '@/utils'
import { Bot, User } from 'lucide-react'

interface MessageProps {
    role: 'user' | 'assistant'
    content: string
    // Add more props like attachments, status, etc.
}

export function MessageBubble({ role, content }: MessageProps) {
    const isUser = role === 'user'

    return (
        <div className={cn(
            "flex gap-3 mb-6",
            isUser ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Avatar */}
            <div className={cn(
                "flex-none h-8 w-8 rounded-full flex items-center justify-center",
                isUser ? "bg-slate-200" : "bg-black text-white"
            )}>
                {isUser ? <User className="h-5 w-5 text-slate-600" /> : <Bot className="h-5 w-5" />}
            </div>

            {/* Content */}
            <div className={cn(
                "flex-1 max-w-[85%] rounded-2xl p-3 text-[15px] leading-relaxed",
                isUser ? "bg-slate-900 text-white rounded-tr-sm" : "bg-white border border-slate-100 rounded-tl-sm shadow-sm text-slate-800"
            )}>
                {content}
            </div>
        </div>
    )
}
