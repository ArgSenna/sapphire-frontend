import { useEffect, useRef, useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useChatStore } from '@/stores/chatStore'
import { randomId } from '@/utils'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { MessageBubble } from './MessageBubble'
import { useAgentSimulation } from './useAgentSimulation'

export default function ChatPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { messages, addSession, addMessage, setCurrentSession, updateSession } = useChatStore()
    const scrollRef = useRef<HTMLDivElement>(null)
    const { simulate, cancel } = useAgentSimulation()
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if (id && id !== 'new') {
            setCurrentSession(id)
        }
    }, [id, setCurrentSession])

    useEffect(() => {
        return () => { cancel() }
    }, [cancel])

    const currentMessages = (id && id !== 'new') ? messages[id] || [] : []

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [currentMessages])

    const handleSend = useCallback(async (content: string) => {
        let sessionId = id

        // Create new session on first message
        if (!sessionId || sessionId === 'new') {
            sessionId = randomId()
            const title = content.length > 20 ? content.slice(0, 20) + '...' : content
            addSession({
                id: sessionId,
                title,
                lastMessage: content,
                timestamp: Date.now(),
                status: 'running',
                type: 'analysis',
            })
            setCurrentSession(sessionId)
            navigate(`/chat/${sessionId}`, { replace: true })
        }

        // Add user message
        const userMsg = { id: randomId(), role: 'user' as const, content, timestamp: Date.now() }
        addMessage(sessionId, userMsg)

        // Add assistant placeholder message
        const assistantId = randomId()
        addMessage(sessionId, {
            id: assistantId,
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
            agentExecution: {
                status: 'idle',
                steps: [],
                totalDuration: 0,
                tokenUsage: { input: 0, output: 0 },
            },
        })

        // Run simulation
        setIsRunning(true)
        await simulate(sessionId, assistantId, content)
        setIsRunning(false)

        // Update session metadata
        updateSession(sessionId, {
            lastMessage: content,
            timestamp: Date.now(),
            status: 'completed',
        })
    }, [id, navigate, addSession, addMessage, setCurrentSession, simulate, updateSession])

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
                    currentMessages.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            role={msg.role}
                            content={msg.content}
                            agentExecution={msg.agentExecution}
                        />
                    ))
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <ChatInput onSend={handleSend} disabled={isRunning} />
            </div>
        </div>
    )
}
