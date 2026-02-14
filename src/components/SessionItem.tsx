import { useNavigate } from 'react-router-dom'
import {
    BarChart2,
    BrainCircuit,
    FileText,
    MessageSquare,
    CheckCircle2,
    Settings
} from 'lucide-react'

import type { Session } from '@/stores/chatStore'

const TypeIcons = {
    analysis: BarChart2,
    coding: Settings,
    report: FileText,
    chat: MessageSquare,
    default: BrainCircuit
}


interface SessionItemProps {
    session: Session
}

export function SessionItem({ session }: SessionItemProps) {
    const navigate = useNavigate()
    const Icon = TypeIcons[session.type] || TypeIcons.default

    // Format time (e.g., "周三") - Simple mock for now
    const dateStr = new Date(session.timestamp).toLocaleDateString('zh-CN', { weekday: 'short' })

    return (
        <div
            onClick={() => navigate(`/chat/${session.id}`)}
            className="flex items-start gap-4 p-4 active:bg-slate-100 transition-colors cursor-pointer"
        >
            {/* Icon */}
            <div className="flex-none flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
                <Icon className="h-6 w-6 text-slate-700" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[17px] font-medium text-slate-900 truncate pr-2">
                        {session.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                        {dateStr.replace('周', '周')}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-[15px] text-slate-500 truncate leading-snug">
                    {session.status === 'completed' && session.lastMessage.includes('已成功') && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 inline-block flex-none" />
                    )}
                    <span className="truncate">{session.lastMessage}</span>
                </div>
            </div>
        </div>
    )
}
