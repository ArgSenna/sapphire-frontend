import { useLocation } from 'react-router-dom'

import { Clock, BookMarked, Zap } from 'lucide-react'

const config: Record<string, { title: string; icon: typeof Clock }> = {
  '/features/scheduled-tasks': { title: '定时任务', icon: Clock },
  '/features/knowledge': { title: '知识', icon: BookMarked },
  '/features/skills': { title: '技能', icon: Zap },
}

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const page = config[pathname] ?? { title: '功能', icon: Clock }
  const Icon = page.icon

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:py-6 bg-slate-50 min-h-screen">
      <h1 className="text-lg font-bold text-slate-900 mb-6">{page.title}</h1>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20">
        <Icon className="mb-3 h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="text-sm font-medium text-slate-500">即将推出</p>
        <p className="mt-1 text-xs text-slate-400">该功能正在开发中，敬请期待</p>
      </div>
    </div>
  )
}
