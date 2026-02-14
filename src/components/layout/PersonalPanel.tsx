import { useState, useRef, useEffect, useCallback } from 'react'
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

import { api } from '@/api/services'
import { cn } from '@/utils'
import { useUserStore } from '@/stores/userStore'
import { usePortfolioStore } from '@/stores'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import PortfolioCard from '@/pages/Portfolio/components/PortfolioCard'
import PortfolioForm from '@/pages/Portfolio/components/PortfolioForm'
import StockAnalysisRow from '@/pages/Portfolio/components/StockAnalysisRow'
import ResearchCard from '@/pages/Research/components/ResearchCard'
import CreateResearchModal from '@/pages/Research/components/CreateResearchModal'
import RatingBadge from '@/pages/Research/components/RatingBadge'
import ResearchElementCard from '@/pages/Research/components/ResearchElementCard'
import EvidenceDrawer from '@/pages/Portfolio/components/EvidenceDrawer'

import type { ResearchReport, ResearchType, Evidence } from '@/api/types'

// --- Types ---
type ViewType = 'main' | 'portfolio' | 'portfolio-detail' | 'research' | 'research-detail' | 'scheduled-tasks' | 'knowledge' | 'skills'

interface MenuItem {
    id: ViewType
    label: string
    icon?: React.ElementType
    type?: 'item' | 'header'
}

const menuItems: MenuItem[] = [
    { id: 'main', label: 'Keywisus', type: 'header' },
    { id: 'portfolio', label: '投资组合', icon: Briefcase },
    { id: 'research', label: '投研报告', icon: BookOpen },
    { id: 'scheduled-tasks', label: '定时任务', icon: Clock },
    { id: 'knowledge', label: '知识', icon: BookMarked },
    { id: 'skills', label: '技能', icon: Zap },
]

// --- Sub-view: Portfolio List ---
function PortfolioListView({ onSelect }: { onSelect: (id: string) => void }) {
    const { portfolios, loading, fetchPortfolios, openForm, deletePortfolio } = usePortfolioStore()
    const [deleteId, setDeleteId] = useState<string | null>(null)

    useEffect(() => { fetchPortfolios() }, [fetchPortfolios])

    if (loading && portfolios.length === 0) return <Spinner />

    return (
        <div className="px-4 pb-8">
            {portfolios.length === 0 ? (
                <EmptyState message="还没有投资组合，点击右上角按钮创建" />
            ) : (
                <div className="grid gap-3">
                    {portfolios.map(p => (
                        <PortfolioCard
                            key={p.id}
                            portfolio={p}
                            onEdit={() => openForm(p.id)}
                            onDelete={() => setDeleteId(p.id)}
                            onClick={() => onSelect(p.id)}
                        />
                    ))}
                </div>
            )}

            <PortfolioForm />

            <ConfirmDialog
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={() => { if (deleteId) deletePortfolio(deleteId) }}
                title="删除组合"
                message="确定要删除该投资组合吗？此操作不可撤销。"
                confirmText="删除"
                danger
            />
        </div>
    )
}

// --- Sub-view: Portfolio Detail ---
function PortfolioDetailView({ id }: { id: string }) {
    const { current, loading, fetchPortfolio, openForm } = usePortfolioStore()
    const [expandedCodes, setExpandedCodes] = useState<Set<string>>(new Set())

    useEffect(() => { fetchPortfolio(id) }, [id, fetchPortfolio])

    useEffect(() => {
        if (!current) return
        setExpandedCodes(new Set(current.stocks.map(ps => ps.stock.code)))
    }, [current])

    const handleToggle = useCallback((code: string) => {
        setExpandedCodes(prev => {
            const next = new Set(prev)
            if (next.has(code)) next.delete(code)
            else next.add(code)
            return next
        })
    }, [])

    if (loading) return <Spinner />
    if (!current) return <EmptyState message="组合不存在" />

    return (
        <div className="px-4 pb-8">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-semibold text-slate-900">{current.name}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{current.description}</p>
                </div>
                <button
                    onClick={() => openForm(current.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                >
                    编辑组合
                </button>
            </div>

            {current.stocks.length === 0 ? (
                <EmptyState message="暂无标的，请在编辑组合中添加" />
            ) : (
                <div className="space-y-3">
                    {current.stocks.map(ps => (
                        <StockAnalysisRow
                            key={ps.stock.code}
                            stock={ps.stock}
                            expanded={expandedCodes.has(ps.stock.code)}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            )}

            <PortfolioForm />
        </div>
    )
}

// --- Sub-view: Research List ---
function ResearchListView({ onSelect }: { onSelect: (id: string) => void }) {
    const [reports, setReports] = useState<ResearchReport[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        api.research.list()
            .then(setReports)
            .finally(() => setLoading(false))
    }, [])

    async function handleDelete(id: string) {
        await api.research.delete(id)
        setReports(prev => prev.filter(r => r.id !== id))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
            </div>
        )
    }

    return (
        <div className="px-4 pb-8">
            {reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <svg className="mb-3 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">暂无研究报告</p>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="mt-3 text-sm text-slate-900 font-medium hover:text-slate-700"
                    >
                        创建第一份研究
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {reports.map(report => (
                        <div key={report.id} onClick={() => onSelect(report.id)}>
                            <ResearchCard report={report} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )}

            <CreateResearchModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onCreated={report => {
                    setShowCreate(false)
                    onSelect(report.id)
                }}
            />
        </div>
    )
}

// --- Sub-view: Research Detail ---
const typeLabels: Record<ResearchType, { label: string; color: string }> = {
    investment: { label: '投资驱动', color: 'bg-amber-500/20 text-amber-400' },
    service: { label: '服务驱动', color: 'bg-blue-500/20 text-blue-400' },
    innovation: { label: '创新驱动', color: 'bg-purple-500/20 text-purple-400' },
}

function ResearchDetailView({ id, onBack }: { id: string; onBack: () => void }) {
    const [report, setReport] = useState<ResearchReport | null>(null)
    const [loading, setLoading] = useState(true)
    const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set())
    const [counterExpanded, setCounterExpanded] = useState(true)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerEvidences, setDrawerEvidences] = useState<Evidence[]>([])
    const [drawerTitle, setDrawerTitle] = useState('')

    useEffect(() => {
        api.research.getById(id)
            .then(r => {
                if (!r) onBack()
                else {
                    setReport(r)
                    setExpandedSet(new Set(r.elements.map((_, i) => i)))
                    setCounterExpanded(true)
                }
            })
            .finally(() => setLoading(false))
    }, [id, onBack])

    function toggleElement(idx: number) {
        setExpandedSet(prev => {
            const next = new Set(prev)
            if (next.has(idx)) next.delete(idx)
            else next.add(idx)
            return next
        })
    }

    function showEvidence(evidences: Evidence[], title: string) {
        setDrawerEvidences(evidences)
        setDrawerTitle(title)
        setDrawerOpen(true)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
            </div>
        )
    }

    if (!report) return null

    const typeConfig = typeLabels[report.type]

    return (
        <div className="px-4 pb-8">
            {/* 报告头部 */}
            <div className="mb-6 rounded-lg border border-slate-200 bg-white shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-slate-900">{report.stockName}</h2>
                            <span className="text-sm text-slate-500">{report.stockCode}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeConfig.color}`}>
                                {typeConfig.label}
                            </span>
                            <RatingBadge rating={report.rating} size="lg" />
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                    <span>生成时间: {new Date(report.createdAt).toLocaleString('zh-CN')}</span>
                </div>
            </div>

            {/* 总体结论 */}
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-slate-700">总体结论</h3>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-sm leading-relaxed text-slate-600">{report.conclusion}</p>
                </div>
            </div>

            {/* 要素分析 */}
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-slate-700">要素分析</h3>
                <div className="space-y-2">
                    {report.elements.map((el, i) => (
                        <ResearchElementCard
                            key={i}
                            element={el}
                            expanded={expandedSet.has(i)}
                            onToggle={() => toggleElement(i)}
                            onShowEvidence={() => showEvidence(el.evidences, el.title)}
                        />
                    ))}
                </div>
            </div>

            {/* AI反方意见 */}
            <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-slate-700">AI 反方意见</h3>
                <div className={cn(
                    'rounded-lg border transition-colors',
                    counterExpanded ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-white',
                )}>
                    <button
                        onClick={() => setCounterExpanded(!counterExpanded)}
                        className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:px-4"
                    >
                        <svg className="h-5 w-5 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-slate-800">反方观点</span>
                        </div>
                        <svg
                            className={cn('h-4 w-4 shrink-0 text-slate-500 transition-transform', counterExpanded && 'rotate-180')}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {counterExpanded && (
                        <div className="border-t border-slate-200 px-3.5 py-3.5 sm:px-4 sm:py-4">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                                {report.counterArgument.content}
                                {' '}
                                <button
                                    onClick={() => showEvidence(report.counterArgument.evidences, '反方观点')}
                                    className="text-xs text-amber-500 hover:text-amber-400"
                                >
                                    查看证据链
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 研究员补充意见 */}
            <div className="mb-8">
                <h3 className="mb-2 text-sm font-medium text-slate-700">研究员补充意见</h3>
                {report.researcherNotes ? (
                    <div className="space-y-3">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-xs font-medium text-cyan-400">关键变量</span>
                            </div>
                            <ul className="space-y-1.5">
                                {report.researcherNotes.keyVariables.map((v, i) => (
                                    <li key={i} className="text-sm leading-relaxed text-slate-500">
                                        <span className="mr-1.5 text-cyan-500/60">•</span>{v}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                <span className="text-xs font-medium text-red-400">硬约束</span>
                            </div>
                            <ul className="space-y-1.5">
                                {report.researcherNotes.hardConstraints.map((c, i) => (
                                    <li key={i} className="text-sm leading-relaxed text-slate-500">
                                        <span className="mr-1.5 text-red-500/60">•</span>{c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                                <span className="text-xs font-medium text-amber-400">交易计划</span>
                            </div>
                            <ul className="space-y-1.5">
                                {report.researcherNotes.tradingPlan.map((p, i) => (
                                    <li key={i} className="text-sm leading-relaxed text-slate-500">
                                        <span className="mr-1.5 text-amber-500/60">•</span>{p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-sm italic text-slate-400">暂无研究员补充意见。此区域将由研究员手动填写补充分析。</p>
                    </div>
                )}
            </div>

            <EvidenceDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                evidences={drawerEvidences}
                title={drawerTitle}
            />
        </div>
    )
}


// ======== Main Component ========
export default function PersonalPanel() {
    const { user, closeDrawer } = useUserStore()
    const { openForm: openPortfolioForm } = usePortfolioStore()
    const [viewStack, setViewStack] = useState<ViewType[]>(['main'])
    const [detailId, setDetailId] = useState<string | null>(null)
    const [showCreateResearch, setShowCreateResearch] = useState(false)

    // Gesture State
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartY = useRef<number>(0)
    const touchCurrentY = useRef<number>(0)
    const isDragging = useRef<boolean>(false)

    const currentView = viewStack[viewStack.length - 1] ?? 'main'

    const pushView = (view: ViewType, id?: string) => {
        if (id) setDetailId(id)
        setViewStack(prev => [...prev, view])
    }

    const popView = useCallback(() => {
        if (viewStack.length > 1) {
            setViewStack(prev => prev.slice(0, -1))
            // 从详情返回列表时清除 detailId
            const parent = viewStack[viewStack.length - 2]
            if (parent === 'portfolio' || parent === 'research' || parent === 'main') {
                setDetailId(null)
            }
        }
    }, [viewStack])

    const resetView = () => {
        setViewStack(['main'])
        setDetailId(null)
    }

    // --- Touch Handlers for Drag-to-Close ---
    const handleTouchStart = (e: React.TouchEvent) => {
        const container = containerRef.current
        const touch = e.touches[0]
        if (!container || !touch) return

        touchStartY.current = touch.clientY
        touchCurrentY.current = touch.clientY
        isDragging.current = true

        container.style.transition = 'none'
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const container = containerRef.current
        if (!isDragging.current || !container) return

        const touch = e.touches[0]
        if (!touch) return
        touchCurrentY.current = touch.clientY
        const deltaY = touchCurrentY.current - touchStartY.current

        if (deltaY > 0) {
            container.style.transform = `translateY(${deltaY}px)`
        }
    }

    const handleTouchEnd = () => {
        const container = containerRef.current
        if (!isDragging.current || !container) return
        isDragging.current = false

        const deltaY = touchCurrentY.current - touchStartY.current
        const threshold = 150

        if (deltaY > threshold) {
            container.style.transition = 'transform 0.3s ease-out'
            container.style.transform = 'translateY(100%)'
            setTimeout(() => {
                closeDrawer()
                resetView()
            }, 300)
        } else {
            container.style.transition = 'transform 0.3s ease-out'
            container.style.transform = ''
        }
    }

    // --- Header config per view ---
    function getViewHeader(view: ViewType): { title: string; showAdd?: boolean; onAdd?: () => void } {
        switch (view) {
            case 'portfolio': return { title: '投资组合', showAdd: true, onAdd: () => openPortfolioForm() }
            case 'portfolio-detail': return { title: '组合详情' }
            case 'research': return { title: '投研报告', showAdd: true, onAdd: () => setShowCreateResearch(true) }
            case 'research-detail': return { title: '研究报告' }
            case 'scheduled-tasks': return { title: '定时任务', showAdd: true }
            case 'knowledge': return { title: '知识' }
            case 'skills': return { title: '技能' }
            default: return { title: '' }
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
                    <button onClick={closeDrawer} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
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
                            onClick={() => pushView(item.id)}
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

    const renderSubViewContent = (view: ViewType) => {
        switch (view) {
            case 'portfolio':
                return <PortfolioListView onSelect={id => pushView('portfolio-detail', id)} />
            case 'portfolio-detail':
                return detailId ? <PortfolioDetailView id={detailId} /> : null
            case 'research':
                return (
                    <>
                        <ResearchListView onSelect={id => pushView('research-detail', id)} />
                        <CreateResearchModal
                            open={showCreateResearch}
                            onClose={() => setShowCreateResearch(false)}
                            onCreated={report => {
                                setShowCreateResearch(false)
                                pushView('research-detail', report.id)
                            }}
                        />
                    </>
                )
            case 'research-detail':
                return detailId ? <ResearchDetailView id={detailId} onBack={popView} /> : null
            case 'scheduled-tasks':
                return (
                    <>
                        <div className="px-4 py-2">
                            <div className="bg-slate-100 p-1 rounded-xl flex">
                                <button className="flex-1 bg-white shadow-sm rounded-lg py-1.5 text-sm font-medium text-slate-900">已定时</button>
                                <button className="flex-1 rounded-lg py-1.5 text-sm font-medium text-slate-500">已完成</button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                                <Clock className="w-8 h-8" />
                            </div>
                            <p className="text-slate-500 mb-6">规划未来任务，让 Keywisus 定时处理您的日常规划。</p>
                            <button className="bg-white border border-slate-200 shadow-sm text-slate-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 active:scale-95 transition-transform">
                                <Plus className="w-4 h-4" />
                                新建定时任务
                            </button>
                        </div>
                    </>
                )
            case 'knowledge':
                return (
                    <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                            <BookMarked className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500">该功能正在开发中，敬请期待</p>
                    </div>
                )
            case 'skills':
                return (
                    <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                            <Zap className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500">该功能正在开发中，敬请期待</p>
                    </div>
                )
            default:
                return <div className="p-8 text-center text-slate-400">该功能正在开发中，敬请期待</div>
        }
    }

    const renderSubView = (view: ViewType) => {
        const header = getViewHeader(view)

        return (
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center px-4 py-4 border-b border-slate-100">
                    <button onClick={popView} className="p-2 -ml-2 text-slate-700 active:bg-slate-100 rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="flex-1 text-center text-lg font-bold mr-8">{header.title}</h2>
                    {header.showAdd ? (
                        <button onClick={header.onAdd} className="p-2 text-slate-700 active:bg-slate-100 rounded-full">
                            <Plus className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="w-10" />
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    {renderSubViewContent(view)}
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
