import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { cn } from '@/utils'
import Sidebar from './Sidebar'

const mobileNavItems = [
  { to: '/', label: '总览', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
  { to: '/portfolio', label: '组合', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { to: '/research', label: '研究', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
]

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // 判断是否在 portfolio detail 页面（移动端底部导航高亮"组合"）
  const isPortfolioActive = location.pathname.startsWith('/portfolio')
  const isResearchActive = location.pathname.startsWith('/research')

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* 桌面端 Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* 移动端 Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full w-64">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
        {/* 移动端顶部栏 */}
        <div className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-slate-400 active:bg-slate-800"
            aria-label="菜单"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20">
              <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-100">Sapphire</span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl p-4 lg:p-6">
          <Outlet />
        </div>
      </main>

      {/* 移动端底部导航 */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur safe-bottom lg:hidden">
        <div className="flex items-center justify-around">
          {mobileNavItems.map(item => {
            const active = item.to === '/'
              ? location.pathname === '/'
              : item.to === '/portfolio'
                ? isPortfolioActive
                : item.to === '/research'
                  ? isResearchActive
                  : location.pathname === item.to

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] transition-colors',
                  active ? 'text-amber-400' : 'text-slate-500 active:text-slate-300',
                )}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
