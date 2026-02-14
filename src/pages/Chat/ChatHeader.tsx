import { useState } from 'react'
import { ChevronDown, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils'

const models = [
    { id: 'manus-1.6', name: 'Manus 1.6 Lite', icon: 'M' },
    { id: 'gpt-4', name: 'GPT-4 Turbo', icon: 'G' },
    { id: 'claude-3', name: 'Claude 3 Opus', icon: 'C' },
]

export function ChatHeader() {
    const navigate = useNavigate()
    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false)
    const [currentModel, setCurrentModel] = useState(models[0])

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between bg-slate-50/95 backdrop-blur px-4 py-3 border-b border-slate-100/50">
            <button
                onClick={() => navigate(-1)}
                className="p-1 -ml-1 text-slate-700 active:bg-slate-200 rounded-full"
            >
                <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="relative">
                <button
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 active:bg-slate-200 transition-colors"
                >
                    <span className="text-sm font-semibold text-slate-700">{currentModel?.name}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                {/* Model Dropdown */}
                {isModelMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsModelMenuOpen(false)}
                        />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden py-1">
                            {models.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => {
                                        setCurrentModel(model)
                                        setIsModelMenuOpen(false)
                                    }}
                                    className={cn(
                                        "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2",
                                        currentModel?.id === model.id ? "bg-slate-50 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                        {model.icon}
                                    </span>
                                    {model.name}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button className="p-1 -mr-1 text-slate-700 active:bg-slate-200 rounded-full">
                <MoreHorizontal className="h-6 w-6" />
            </button>
        </div>
    )
}
