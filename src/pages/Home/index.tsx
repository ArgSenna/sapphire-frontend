import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useChatStore } from '@/stores/chatStore'
import { SessionItem } from '@/components/SessionItem'

export default function HomePage() {
  const { sessions } = useChatStore()
  const navigate = useNavigate()

  return (
    <div className="relative min-h-full pb-20">
      {/* Filter Tabs (Mock) */}
      <div className="sticky top-0 z-10 bg-slate-50 px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium whitespace-nowrap">
          全部
        </button>
        <button className="px-4 py-1.5 rounded-full bg-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap">
          收藏
        </button>
        <button className="px-4 py-1.5 rounded-full bg-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap">
          已定时
        </button>
      </div>

      {/* Session List */}
      <div className="divide-y divide-transparent space-y-2 mt-2">
        {sessions.map(session => (
          <SessionItem key={session.id} session={session} />
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/chat/new')}
        className="fixed bottom-8 right-6 h-14 w-14 bg-black text-white rounded-full 
                   shadow-lg flex items-center justify-center active:scale-95 transition-transform z-20"
      >
        <Plus className="h-7 w-7" strokeWidth={3} />
        {/* Chat icon overlay if needed, but Plus is clean */}
        <div className="absolute -bottom-1 -right-1 bg-transparent">
          {/* Small icon capability if detailed design needs it */}
        </div>
      </button>
    </div>
  )
}
