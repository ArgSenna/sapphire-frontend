import { create } from 'zustand'

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
    attachments?: string[]
}

export interface Session {
    id: string
    title: string
    lastMessage: string
    timestamp: number
    status: 'completed' | 'running' | 'failed'
    type: 'analysis' | 'chat' | 'report' | 'coding'
}

interface ChatState {
    sessions: Session[]
    currentSessionId: string | null
    messages: Record<string, Message[]>
    addSession: (session: Session) => void
    addMessage: (sessionId: string, message: Message) => void
    setCurrentSession: (sessionId: string) => void
}

const mockSessions: Session[] = [
    {
        id: '1',
        title: 'AI分析与商业化关键要素解析',
        lastMessage: '已完成对 Nvidia 的深度分析报告',
        timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
        status: 'completed',
        type: 'analysis'
    },
    {
        id: '2',
        title: '贵州茅台每日开盘前分析四维...',
        lastMessage: '已成功为您设置贵州茅台每日分析任...',
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        status: 'completed',
        type: 'analysis'
    },
    {
        id: '3',
        title: 'mamba模型与transformer模...',
        lastMessage: '我已完成对Mamba与Transformer竞争...',
        timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        status: 'running',
        type: 'coding'
    },
    {
        id: '4',
        title: 'AI驱动的投研体系设计与优化...',
        lastMessage: '收到，我将基于白皮书内容构建一个可...',
        timestamp: Date.now() - 1000 * 60 * 60 * 25, // 1 day 1 hour ago
        status: 'completed',
        type: 'report'
    },
    {
        id: '5',
        title: 'Contract Review for Beijing ...',
        lastMessage: '已完成 contract-review 技能的修改...',
        timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
        status: 'completed',
        type: 'coding'
    },
    {
        id: '6',
        title: 'Hi',
        lastMessage: '你已取消排队。你可以稍后重试或创建新任务。',
        timestamp: Date.now() - 1000 * 60 * 60 * 50, // 2 days 2 hours ago
        status: 'failed',
        type: 'chat'
    }
]

export const useChatStore = create<ChatState>((set) => ({
    sessions: mockSessions,
    currentSessionId: null,
    messages: {},
    addSession: (session) => set((state) => ({ sessions: [session, ...state.sessions] })),
    addMessage: (sessionId, message) => set((state) => ({
        messages: {
            ...state.messages,
            [sessionId]: [...(state.messages[sessionId] || []), message]
        }
    })),
    setCurrentSession: (sessionId) => set({ currentSessionId: sessionId })
}))
