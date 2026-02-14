import { useState, useRef, useCallback } from 'react'
import { Plus, Mic, ArrowUp } from 'lucide-react'

import { cn } from '@/utils'

interface ChatInputProps {
    onSend: (content: string) => void
    disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [value, setValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSend = useCallback(() => {
        const trimmed = value.trim()
        if (!trimmed || disabled) return
        onSend(trimmed)
        setValue('')
        if (textareaRef.current) {
            textareaRef.current.style.height = '44px'
        }
    }, [value, disabled, onSend])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        const el = e.target
        el.style.height = '44px'
        el.style.height = Math.min(el.scrollHeight, 128) + 'px'
    }

    const hasContent = value.trim().length > 0

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-50 p-4 pb-safe-area safe-bottom">
            <div className="flex items-end gap-3 bg-white rounded-3xl p-2 shadow-sm border border-slate-200">
                <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors"
                    disabled={disabled}
                >
                    <Plus className="h-6 w-6" />
                </button>

                <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors"
                    disabled={disabled}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </button>

                <textarea
                    ref={textareaRef}
                    placeholder="向 Manus 发送消息"
                    className="flex-1 max-h-32 py-3 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 resize-none overflow-y-auto leading-relaxed outline-none"
                    rows={1}
                    style={{ minHeight: '44px' }}
                    value={value}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />

                <div className="flex gap-1 pb-1">
                    <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full transition-colors"
                        disabled={disabled}
                    >
                        <Mic className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'p-2 rounded-full transition-colors',
                            hasContent && !disabled
                                ? 'bg-slate-900 text-white active:bg-slate-700'
                                : 'bg-slate-200 text-slate-400'
                        )}
                        onClick={handleSend}
                        disabled={disabled || !hasContent}
                    >
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
