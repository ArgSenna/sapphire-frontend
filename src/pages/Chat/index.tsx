import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useChatStore } from '@/stores/chatStore'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { MessageBubble } from './MessageBubble'

export default function ChatPage() {
    const { id } = useParams()
    const { messages, setCurrentSession } = useChatStore()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (id) {
            setCurrentSession(id)
        }
    }, [id, setCurrentSession])

    const currentMessages = id ? messages[id] || [] : []

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [currentMessages])

    return (
        <div className="flex flex-col h-screen bg-slate-50 relative">
            <ChatHeader />

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 pt-4 pb-24 scroll-smooth"
            >
                {currentMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 pb-20">
                        <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 flex items-center justify-center">
                            <span className="text-2xl font-serif">M</span>
                        </div>
                        <p>此时此刻，想在这个世界创造些什么？</p>
                    </div>
                ) : (
                    currentMessages.map((msg, idx) => (
                        <MessageBubble
                            key={idx}
                            role={msg.role}
                            content={msg.content}
                        />
                    ))
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <ChatInput />
            </div>
        </div>
    )
}
