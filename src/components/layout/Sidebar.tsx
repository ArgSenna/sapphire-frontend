import { NavLink } from 'react-router-dom'
import {
  BookOpen,
  Briefcase,
  Clock,
  BookMarked,
  Zap,
} from 'lucide-react'

import { cn } from '@/utils'
import { useUserStore } from '@/stores/userStore'

const menuItems = [
  { label: 'Manus', type: 'header' },
  { to: '/features/portfolio', label: '投资组合', icon: Briefcase },
  { to: '/features/research-reports', label: '投研报告', icon: BookOpen },
  { to: '/features/scheduled-tasks', label: '定时任务', icon: Clock, placeholder: true },
  { to: '/features/knowledge', label: '知识', icon: BookMarked, placeholder: true },
  { to: '/features/skills', label: '技能', icon: Zap, placeholder: true },
]

export default function Sidebar() {
  const { user, closeDrawer } = useUserStore()

  return (
    <div className="flex h-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* User Header */}
      <div className="flex items-center gap-3 p-4 pt-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-12 w-12 rounded-full bg-slate-200"
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold">{user.name}</span>
          <span className="text-xs text-slate-500">{user.email}</span>
        </div>
        <div className="ml-auto">
          {/* Exchange icon placeholder */}
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {menuItems.map((item, index) => {
          if (item.type === 'header') {
            return (
              <div key={index} className="px-2 py-2 text-xs font-medium text-slate-400 mt-2 first:mt-0">
                {item.label}
              </div>
            )
          }

          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to!}
              onClick={closeDrawer}
              className={({ isActive }) => cn(
                'flex items-center justify-between rounded-lg px-2 py-3 text-[15px] font-medium transition-colors',
                isActive
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100',
              )}
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="h-5 w-5 text-slate-600" strokeWidth={1.5} />}
                <span>{item.label}</span>
              </div>
              <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
