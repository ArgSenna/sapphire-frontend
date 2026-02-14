import { useState, useRef } from 'react'
import {
    BookOpen,
    Briefcase,
    Clock,
    BookMarked,
    Zap,
    ChevronLeft,
    X,
    Plus
} from 'lucide-react'

import { useUserStore } from '@/stores/userStore'

// --- Types ---
type ViewType = 'main' | 'scheduled-tasks' | 'knowledge' | 'skills' | 'portfolio' | 'research'

interface MenuItem {
    id: ViewType | string
    label: string
    icon?: React.ElementType
    type?: 'item' | 'header'
    to?: string // for actual routes
}

const menuItems: MenuItem[] = [
    { id: 'header-1', label: 'Manus', type: 'header' },
    { id: 'portfolio', label: '投资组合', icon: Briefcase }, // Maybe route?
    { id: 'research', label: '投研报告', icon: BookOpen }, // Maybe route?
    { id: 'scheduled-tasks', label: '定时任务', icon: Clock },
    { id: 'knowledge', label: '知识', icon: BookMarked },
    { id: 'skills', label: '技能', icon: Zap },
]

export default function PersonalPanel() {
    const { user, closeDrawer } = useUserStore()
    const [viewStack, setViewStack] = useState<ViewType[]>(['main'])

    // Gesture State
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartY = useRef<number>(0)
    const touchCurrentY = useRef<number>(0)
    const isDragging = useRef<boolean>(false)

    const currentView = viewStack[viewStack.length - 1]

    const pushView = (view: ViewType) => {
        setViewStack(prev => [...prev, view])
    }

    const popView = () => {
        if (viewStack.length > 1) {
            setViewStack(prev => prev.slice(0, -1))
        }
    }

    // Reset view when closed
    const resetView = () => {
        setViewStack(['main'])
    }

    // --- Touch Handlers for Drag-to-Close ---
    const handleTouchStart = (e: React.TouchEvent) => {
        const container = containerRef.current
        if (!container) return

        // Only allow drag if we are at the top of the scroll container?
        // For simplicity, allow drag from header area only or if content is scrolled to top.
        // For now, let's attach listener to the whole panel but check scroll implementation later.
        // Better: Attach specific drag handle or Header.
        touchStartY.current = e.touches[0].clientY
        touchCurrentY.current = e.touches[0].clientY
        isDragging.current = true

        container.style.transition = 'none'
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const container = containerRef.current
        if (!isDragging.current || !container) return

        touchCurrentY.current = e.touches[0].clientY
        const deltaY = touchCurrentY.current - touchStartY.current

        if (deltaY > 0) {
            // Dragging down
            container.style.transform = `translateY(${deltaY}px)`
        }
    }

    const handleTouchEnd = () => {
        const container = containerRef.current
        if (!isDragging.current || !container) return
        isDragging.current = false

        const deltaY = touchCurrentY.current - touchStartY.current
        const threshold = 150 // px to close

        if (deltaY > threshold) {
            // Close
            container.style.transition = 'transform 0.3s ease-out'
            container.style.transform = 'translateY(100%)'

            setTimeout(() => {
                closeDrawer()
                // Reset transform defined in CSS/Parent or let unmount handle it
                // But since we modified style directly, we should clear it next render or after close
                resetView()
            }, 300)
        } else {
            // Reset
            container.style.transition = 'transform 0.3s ease-out'
            container.style.transform = ''
        }
    }


    // --- Render Content ---
    const renderMainContent = () => (
        <>
            {/* User Header */}
            <div className="flex items-center gap-3 p-6 pb-6">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-16 w-16 rounded-full bg-slate-200"
                />
                <div className="flex flex-col">
                    <span className="text-xl font-bold">{user.name}</span>
                    <span className="text-sm text-slate-500">{user.email}</span>
                </div>
                <div className="ml-auto">
                    {/* Exchange icon / Settings or Close */}
                    <button onClick={closeDrawer} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Card (Manus 团队版) */}
            <div className="px-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg">Manus 团队版</span>
                    </div>
                    <div className="flex items-baseline gap-1 my-2">
                        <span className="text-sm text-slate-500">积分</span>
                        <span className="text-xl font-bold ml-auto">✨ 476260</span>
                    </div>
                    <div className="h-px bg-slate-100 my-3" />
                    <div className="flex items-center text-xs text-slate-400 justify-between">
                        <span>探索 Manus 团队版 用户权益</span>
                        <ChevronLeft className="w-4 h-4 rotate-180" />
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-1">
                {menuItems.map((item, index) => {
                    if (item.type === 'header') {
                        return (
                            <div key={index} className="px-2 py-2 text-sm font-medium text-slate-400 mt-4 first:mt-0">
                                {item.label}
                            </div>
                        )
                    }

                    const Icon = item.icon
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.type !== 'header') {
                                    pushView(item.id as ViewType)
                                }
                            }}
                            className="w-full flex items-center justify-between rounded-xl px-2 py-4 text-[16px] font-medium transition-colors text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                        >
                            <div className="flex items-center gap-4">
                                {Icon && <Icon className="h-6 w-6 text-slate-600" strokeWidth={1.5} />}
                                <span>{item.label}</span>
                            </div>
                            <ChevronLeft className="h-5 w-5 text-slate-300 rotate-180" />
                        </button>
                    )
                })}

                {/* Universal Links */}
                <div className="pt-4 mt-2 border-t border-slate-100">
                    <div className="px-2 py-2 text-sm font-medium text-slate-400">通用</div>
                    <button className="w-full flex items-center justify-between rounded-xl px-2 py-4 text-[16px] font-medium transition-colors text-slate-700 hover:bg-slate-50 active:bg-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 flex items-center justify-center"><div className="w-5 h-5 rounded-full border-2 border-slate-600" /></div>
                            <span>账号</span>
                        </div>
                        <ChevronLeft className="h-5 w-5 text-slate-300 rotate-180" />
                    </button>
                </div>
            </div>
        </>
    )

    const renderSubView = (view: ViewType) => {
        // Content based on view
        let title = ''
        let content = null

        switch (view) {
            case 'scheduled-tasks':
                title = '定时任务'
                content = (
                    <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                            <Clock className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500 mb-6">规划未来任务，让 Manus 定时处理您的日常规划。</p>
                        <button className="bg-white border border-slate-200 shadow-sm text-slate-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 active:scale-95 transition-transform">
                            <Plus className="w-4 h-4" />
                            新建定时任务
                        </button>
                    </div>
                )
                break;
            default:
                title = view.charAt(0).toUpperCase() + view.slice(1)
                content = <div className="p-8 text-center text-slate-400">Functionality for {title} coming soon.</div>
        }

        return (
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100">
                    <button onClick={popView} className="p-2 -ml-2 text-slate-700 active:bg-slate-100 rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="flex-1 text-center text-lg font-bold mr-8">{title}</h2>
                    <button className="p-2 text-slate-700 active:bg-slate-100 rounded-full">
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                {/* Custom Tab Switcher for Scheduled Tasks (Mock) */}
                {view === 'scheduled-tasks' && (
                    <div className="px-4 py-2">
                        <div className="bg-slate-100 p-1 rounded-xl flex">
                            <button className="flex-1 bg-white shadow-sm rounded-lg py-1.5 text-sm font-medium text-slate-900">已定时</button>
                            <button className="flex-1 rounded-lg py-1.5 text-sm font-medium text-slate-500">已完成</button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto">
                    {content}
                </div>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="flex h-full flex-col bg-slate-50 text-slate-900 rounded-t-3xl overflow-hidden relative"
        >
            {/* Drag Handle Area */}
            <div
                className="w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing touch-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>

            {currentView === 'main' ? renderMainContent() : renderSubView(currentView)}
        </div>
    )
}
