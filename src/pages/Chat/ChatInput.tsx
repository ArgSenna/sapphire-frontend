import { Plus, Mic, ArrowUp } from 'lucide-react'

export function ChatInput() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-50 p-4 pb-safe-area safe-bottom">
            <div className="flex items-end gap-3 bg-white rounded-3xl p-2 shadow-sm border border-slate-200">
                <button className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors">
                    <Plus className="h-6 w-6" />
                </button>

                <button className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors">
                    {/* Plugin icon placeholder */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </button>

                <textarea
                    placeholder="向 Manus 发送消息"
                    className="flex-1 max-h-32 py-3 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 resize-none overflow-y-auto leading-relaxed"
                    rows={1}
                    style={{ minHeight: '44px' }}
                />

                <div className="flex gap-1 pb-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors">
                        <Mic className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-slate-200 text-slate-400 rounded-full active:bg-slate-300 transition-colors">
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
